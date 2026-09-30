"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, FilePlus2, FileText, Info, MousePointerClick, PenLine, QrCode as QrIcon, X } from "lucide-react";
import { placementHeight, useApp } from "@/lib/app-store";
import { formatBytes } from "@/lib/load-document";
import { buildSignedPdf, downloadBytes, signedFileName } from "@/lib/sign-pdf";
import { loadAccount } from "@/lib/account";
import { savePending } from "@/lib/pending";
import { Logo } from "./Logo";
import { DEFAULT_WIDTH, PdfPage } from "./PdfPage";
import { PageRail } from "./PageRail";
import { PhonePanel } from "./PhonePanel";
import { SignatureTray } from "./SignatureTray";
import { DrawDialog } from "./DrawDialog";
import { usePhoneSession } from "./usePhoneSession";
import { useI18n } from "@/i18n/client";
import { plural, rich } from "@/i18n/format";

export function Workspace() {
  // A kilépő animáció alatt a store-ban már nincs dokumentum — az utolsót tartjuk meg.
  const liveDoc = useApp((s) => s.doc);
  const lastDoc = useRef(liveDoc);
  if (liveDoc) lastDoc.current = liveDoc;
  const doc = lastDoc.current!;
  const placements = useApp((s) => s.placements);
  const signatures = useApp((s) => s.signatures);
  const armedSigId = useApp((s) => s.armedSigId);
  const freshSigId = useApp((s) => s.freshSigId);
  const setDoc = useApp((s) => s.setDoc);
  const notify = useApp((s) => s.notify);
  const { lang, t } = useI18n();
  const { renew } = usePhoneSession();

  const scroller = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(0);
  const [drawOpen, setDrawOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const done = useApp((s) => s.done);
  const setDone = useApp((s) => s.setDone);
  const setPaywall = useApp((s) => s.setPaywall);

  // Oldalszélesség a görgethető terület szélességéből
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const inner = e.contentRect.width;
      const pad = inner < 640 ? 24 : 96;
      setPageWidth(Math.max(240, Math.min(860, Math.floor(inner - pad))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollToPage = useCallback((index: number, fractionY = 0) => {
    const el = scroller.current?.querySelector<HTMLElement>(`[data-page-index="${index}"]`);
    const sc = scroller.current;
    if (!el || !sc) return;
    const top = el.offsetTop + el.offsetHeight * fractionY - (fractionY ? sc.clientHeight / 2 : 24);
    sc.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  // Az első beérkező aláírást automatikusan az utolsó oldal aljára tesszük.
  const handled = useRef<string | null>(null);
  useEffect(() => {
    if (!freshSigId || handled.current === freshSigId) return;
    handled.current = freshSigId;
    const sig = useApp.getState().signatures.find((s) => s.id === freshSigId);
    if (!sig) return;
    setDrawOpen(false);
    setQrOpen(false);
    if (useApp.getState().placements.length === 0) {
      const last = doc.pages.length - 1;
      const info = doc.pages[last];
      const w = DEFAULT_WIDTH(info);
      const h = placementHeight({ w }, sig, info);
      useApp.getState().place({ sigId: sig.id, page: last, w, x: 1 - 0.09 - w, y: Math.max(0, 0.86 - h) });
      notify(t.workspace.autoPlaced, "success");
      setTimeout(() => scrollToPage(last, 0.8), 150);
    } else {
      notify(t.workspace.newSignature, "success");
    }
  }, [freshSigId, doc.pages, notify, scrollToPage, t]);

  // Billentyűk: nyilak mozgatnak, Delete töröl, Esc kijelölést szüntet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const { selectedId, placements, updatePlacement, removePlacement, select, signatures } = useApp.getState();
      const pl = placements.find((p) => p.id === selectedId);
      if (!pl) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        removePlacement(pl.id);
      } else if (e.key === "Escape") {
        select(null);
      } else if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        const sig = signatures.find((s) => s.id === pl.sigId);
        if (!sig) return;
        const step = e.shiftKey ? 0.02 : 0.004;
        const h = placementHeight(pl, sig, doc.pages[pl.page]);
        const dx = e.key === "ArrowLeft" ? -step : e.key === "ArrowRight" ? step : 0;
        const dy = e.key === "ArrowUp" ? -step : e.key === "ArrowDown" ? step : 0;
        updatePlacement(pl.id, {
          x: Math.min(Math.max(pl.x + dx, 0), 1 - pl.w),
          y: Math.min(Math.max(pl.y + dy, 0), 1 - h),
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [doc.pages]);

  const download = async () => {
    if (!placements.length || busy) return;
    setBusy(true);
    try {
      const { data, rasterized } = await buildSignedPdf(doc.bytes, doc.pdf, placements, signatures);
      const result = { data, name: signedFileName(doc.name, t.files.signedSuffix), rasterized };
      // Az aláírás ingyenes, a letöltéshez előfizetés kell: enélkül a fizetési ablak nyílik meg.
      const account = await loadAccount().catch(() => null);
      if (account?.access?.active) {
        downloadBytes(result.data, result.name);
        setDone(result);
      } else {
        const expiresAt = await savePending(result);
        setPaywall({ result, expiresAt });
      }
    } catch (err) {
      console.error(err);
      notify(t.workspace.exportFailed, "error");
    } finally {
      setBusy(false);
    }
  };

  const newDocument = () => {
    if (placements.length && !done && !window.confirm(t.workspace.confirmNew)) return;
    setDone(null);
    setDoc(null);
  };

  const pageCount = doc.pages.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 flex flex-col bg-paper"
    >
      {/* Felső sáv */}
      <header className="relative z-20 flex h-16 shrink-0 items-center gap-3 border-b border-ink/10 bg-paper/90 px-3 backdrop-blur sm:px-5">
        <button onClick={newDocument} className="shrink-0 rounded-lg" aria-label={t.common.home}>
          <span className="hidden sm:inline">
            <Logo />
          </span>
          <span className="sm:hidden">
            <Logo compact />
          </span>
        </button>
        <span className="hidden h-7 w-px bg-ink/10 sm:block" />
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="hidden size-9 shrink-0 place-items-center rounded-xl bg-sheet text-ink-2 shadow-[0_0_0_1px_rgb(17_19_28/0.08)] md:grid">
            <FileText className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-[14px] font-medium leading-tight">{doc.name}</div>
            <div className="truncate text-[12px] text-ink-3">
              {plural(lang, t.workspace.pages, pageCount)} · {formatBytes(doc.size, lang)}
              {doc.convertedFrom && ` · ${t.workspace.converted.replace("{ext}", doc.convertedFrom)}`}
            </div>
          </div>
        </div>
        <button onClick={newDocument} className="btn btn-ghost hidden h-10 px-4 text-sm md:inline-flex">
          <FilePlus2 className="size-4" /> {t.workspace.newDocument}
        </button>
        <button onClick={download} disabled={!placements.length || busy} className="btn btn-royal h-10 px-3.5 text-sm sm:px-4">
          {busy ? (
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Download className="size-4" />
          )}
          <span className="hidden sm:inline">{t.workspace.download}</span>
          <span className="sm:hidden">{t.workspace.downloadShort}</span>
          {placements.length > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white/20 px-1.5 text-[11px] font-semibold">
              {placements.length}
            </span>
          )}
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <PageRail onJump={(i) => scrollToPage(i)} />

        {/* Dokumentum */}
        <div className="relative min-w-0 flex-1">
          <main
            ref={scroller}
            data-scroll-root
            className="thin-scrollbar absolute inset-0 overflow-y-auto overflow-x-hidden bg-desk bg-[radial-gradient(rgb(255_255_255/0.055)_1px,transparent_1px)] [background-size:22px_22px]"
            onPointerDown={(e) => e.target === e.currentTarget && useApp.getState().select(null)}
          >
            <div className="flex flex-col items-center gap-8 px-3 pb-44 pt-8 sm:px-12 lg:pb-16">
              {pageWidth > 0 &&
                doc.pages.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i, 4) * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PdfPage pdf={doc.pdf} index={i} info={info} width={pageWidth} total={pageCount} />
                  </motion.div>
                ))}
            </div>
          </main>

          <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex justify-center px-3">
            <AnimatePresence>
              {armedSigId && (
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-royal py-1.5 pl-3.5 pr-1.5 text-[13px] text-white shadow-[0_12px_30px_-10px_rgb(43_54_232/0.8)]"
                >
                  <MousePointerClick className="size-4 shrink-0" />
                  {t.workspace.armHint}
                  <button
                    onClick={() => useApp.getState().arm(null)}
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15 hover:bg-white/25"
                    aria-label={t.common.cancel}
                  >
                    <X className="size-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Jobb oldali panel */}
        <aside className="hidden w-[372px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-ink/10 bg-paper p-4 lg:flex">
          <PhonePanel onRenew={renew} />
          <section className="card rounded-[22px] p-4">
            <div className="mb-3 flex items-end justify-between px-1">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">{t.workspace.yourSignatures}</div>
                <p className="mt-0.5 text-[12.5px] text-ink-3">{t.workspace.trayHint}</p>
              </div>
              <button onClick={() => setDrawOpen(true)} className="btn btn-ghost h-8 px-3 text-[12.5px]">
                <PenLine className="size-3.5" /> {t.workspace.draw}
              </button>
            </div>
            <SignatureTray onDraw={() => setDrawOpen(true)} />
          </section>
          <Tips />
        </aside>
      </div>

      {/* Mobil alsó sáv */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink/10 bg-paper/95 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur lg:hidden">
        <SignatureTray onDraw={() => setDrawOpen(true)} layout="row" />
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button onClick={() => setQrOpen(true)} className="btn btn-ghost h-11 text-sm">
            <QrIcon className="size-4" /> {t.workspace.withPhone}
          </button>
          <button onClick={() => setDrawOpen(true)} className="btn btn-primary h-11 text-sm">
            <PenLine className="size-4" /> {t.workspace.drawHere}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {qrOpen && (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-end bg-ink/40 backdrop-blur-sm sm:place-items-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onPointerDown={(e) => e.target === e.currentTarget && setQrOpen(false)}
          >
            <motion.div
              initial={{ y: 60 }}
              animate={{ y: 0 }}
              exit={{ y: 60 }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              className="relative w-full max-w-sm p-3"
            >
              <button
                onClick={() => setQrOpen(false)}
                className="absolute right-6 top-6 z-10 grid size-9 place-items-center rounded-full bg-ink/5"
                aria-label={t.common.close}
              >
                <X className="size-4" />
              </button>
              <PhonePanel onRenew={renew} />
            </motion.div>
          </motion.div>
        )}
        {drawOpen && <DrawDialog key="draw" onClose={() => setDrawOpen(false)} />}
      </AnimatePresence>

    </motion.div>
  );
}

function Tips() {
  const { t } = useI18n();
  return (
    <div className="flex gap-3 rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed text-ink-3">
      <Info className="mt-0.5 size-4 shrink-0" />
      <p>
        {rich(t.workspace.tips, {
          key: <kbd className="rounded border border-ink/15 bg-sheet px-1 font-mono text-[11px]">Delete</kbd>,
        })}
      </p>
    </div>
  );
}
