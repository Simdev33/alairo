"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Check, FileText, RotateCcw, Send, Smartphone, Trash2, Undo2, X } from "lucide-react";
import { INK_COLORS, INK_WIDTHS } from "@/lib/ink";
import { SignaturePad, type PadSnapshot, type SignaturePadHandle } from "./SignaturePad";
import { SignatureSvg } from "./SignatureSvg";
import { LogoMark } from "./Logo";
import Link from "next/link";
import { useI18n } from "@/i18n/client";
import { rich } from "@/i18n/format";

type Status = "ready" | "sending" | "sent" | "expired" | "error";
type Sent = { d: string; width: number; height: number; color: string };

export function PhoneSigner({ id, fileName }: { id: string; fileName: string | null }) {
  const { lang, t } = useI18n();
  const [status, setStatus] = useState<Status>(fileName ? "ready" : "expired");
  const [color, setColor] = useState<string>(INK_COLORS[0].value);
  const [widthId, setWidthId] = useState<string>("medium");
  const [hasInk, setHasInk] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [showTip, setShowTip] = useState(true);
  const pad = useRef<SignaturePadHandle>(null);

  const post = useCallback(
    async (body: object) => {
      const res = await fetch(`/api/session/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 404) setStatus("expired");
      return res;
    },
    [id],
  );

  useEffect(() => {
    if (fileName) post({ type: "hello" }).catch(() => undefined);
  }, [fileName, post]);

  // Élő előnézet a gépre — legfeljebb 5 kérés másodpercenként, egyszerre egy.
  const preview = useRef({ timer: 0 as unknown as ReturnType<typeof setTimeout>, last: 0, busy: false, dirty: false });
  const colorRef = useRef(color);
  colorRef.current = color;
  const sizeRef = useRef({ w: 0, h: 0 });

  const flushPreview = useCallback(async () => {
    const p = preview.current;
    if (p.busy) {
      p.dirty = true;
      return;
    }
    p.busy = true;
    p.dirty = false;
    p.last = Date.now();
    const d = pad.current?.livePath() ?? "";
    const { w, h } = sizeRef.current;
    try {
      if (!d) await post({ type: "clear" });
      else await post({ type: "preview", d, width: Math.round(w), height: Math.round(h), color: colorRef.current });
    } catch {}
    p.busy = false;
    if (p.dirty) flushPreview();
  }, [post]);

  const onChange = useCallback(
    (snap: PadSnapshot) => {
      setHasInk(snap.strokes.length > 0);
      sizeRef.current = { w: snap.width, h: snap.height };
      const p = preview.current;
      clearTimeout(p.timer);
      p.timer = setTimeout(flushPreview, Math.max(0, 200 - (Date.now() - p.last)));
    },
    [flushPreview],
  );

  useEffect(() => {
    if (hasInk) flushPreview();
  }, [color, hasInk, flushPreview]);

  const send = async () => {
    const shape = pad.current?.exportCropped();
    if (!shape) return;
    clearTimeout(preview.current.timer);
    setStatus("sending");
    try {
      const res = await post({ type: "signature", ...shape, color });
      if (res.status === 404) return;
      if (!res.ok) throw new Error();
      setSent({ ...shape, color });
      setStatus("sent");
      navigator.vibrate?.(30);
    } catch {
      setStatus("error");
    }
  };

  const again = () => {
    pad.current?.clear();
    setSent(null);
    setStatus("ready");
  };

  const factor = INK_WIDTHS.find((w) => w.id === widthId)?.factor ?? 1;

  if (status === "expired") return <Expired />;

  return (
    <MotionConfig reducedMotion="user">
      <main className="fixed inset-0 flex flex-col overflow-hidden bg-paper phone-land:flex-row">
        {/* Fejléc / fekvő módban oldalsáv */}
        <div className="flex shrink-0 items-center gap-3 px-4 pb-2 pt-[max(env(safe-area-inset-top),14px)] phone-land:order-2 phone-land:w-60 phone-land:flex-col phone-land:items-stretch phone-land:gap-4 phone-land:py-4 phone-land:pl-0 phone-land:pr-[max(env(safe-area-inset-right),16px)]">
          <div className="flex min-w-0 flex-1 items-center gap-3 phone-land:flex-none">
            <LogoMark className="size-9 shrink-0 text-ink" />
            <div className="min-w-0">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">{t.phone.signFor}</div>
              <div className="flex items-center gap-1.5 truncate text-[15px] font-medium">
                <FileText className="size-3.5 shrink-0 text-ink-3" />
                <span className="truncate">{fileName}</span>
              </div>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-xs font-medium text-mint phone-land:self-start">
            <span className="size-1.5 rounded-full bg-mint" /> {t.phone.connected}
          </span>

          <div className="hidden flex-1 phone-land:block" />
          <div className="hidden phone-land:block">
            <Controls {...{ color, setColor, widthId, setWidthId }} />
          </div>
          <div className="hidden space-y-2 phone-land:block">
            <SendButton disabled={!hasInk || status === "sending"} sending={status === "sending"} onClick={send} />
            <Consent lang={lang} />
          </div>
        </div>

        {/* Rajzfelület */}
        <div className="relative min-h-0 flex-1 px-3 pb-2 phone-land:order-1 phone-land:py-3 phone-land:pl-[max(env(safe-area-inset-left),12px)]">
          <div className="card relative h-full overflow-hidden rounded-[26px]">
            <SignaturePad
              ref={pad}
              color={color}
              widthFactor={factor}
              onChange={onChange}
              className="absolute inset-0"
              hint={t.pad.hint}
              lineLabel={t.pad.line}
            />

            <div className="absolute left-3 top-3 flex gap-2">
              <IconButton label={t.common.undo} onClick={() => pad.current?.undo()} disabled={!hasInk}>
                <Undo2 className="size-[18px]" />
              </IconButton>
              <IconButton label={t.common.clear} onClick={() => pad.current?.clear()} disabled={!hasInk}>
                <Trash2 className="size-[18px]" />
              </IconButton>
            </div>

            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-ink px-3.5 py-2.5 text-[13px] text-sheet shadow-lg phone-land:hidden"
                >
                  <motion.span
                    animate={{ rotate: [0, 0, 90, 90, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeInOut" }}
                    className="grid size-7 shrink-0 place-items-center"
                  >
                    <Smartphone className="size-5" />
                  </motion.span>
                  <span className="flex-1 leading-snug">{t.phone.rotateTip}</span>
                  <button
                    onClick={() => setShowTip(false)}
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10"
                    aria-label={t.phone.closeTip}
                  >
                    <X className="size-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Álló módban alul: vezérlők + küldés */}
        <div className="shrink-0 space-y-3 px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-1 phone-land:hidden">
          <Controls {...{ color, setColor, widthId, setWidthId }} />
          <SendButton disabled={!hasInk || status === "sending"} sending={status === "sending"} onClick={send} />
          <Consent lang={lang} />
        </div>

        <AnimatePresence>
          {(status === "sent" || status === "error") && (
            <Result key="result" ok={status === "sent"} sent={sent} onAgain={again} onRetry={send} />
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}

function Controls({
  color,
  setColor,
  widthId,
  setWidthId,
}: {
  color: string;
  setColor: (c: string) => void;
  widthId: string;
  setWidthId: (w: string) => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-between gap-3 phone-land:flex-col phone-land:items-stretch">
      <div className="flex items-center gap-2" role="radiogroup" aria-label={t.ink.colorGroup}>
        {INK_COLORS.map((c) => (
          <button
            key={c.id}
            role="radio"
            aria-checked={color === c.value}
            aria-label={t.ink[c.id]}
            onClick={() => setColor(c.value)}
            className="relative grid size-10 place-items-center rounded-full"
          >
            <span className="size-7 rounded-full shadow-[inset_0_-2px_4px_rgb(0_0_0/0.25)]" style={{ background: c.value }} />
            {color === c.value && (
              <motion.span layoutId="ink-ring" className="absolute inset-0 rounded-full border-2" style={{ borderColor: c.value }} />
            )}
          </button>
        ))}
      </div>
      <div className="flex rounded-full bg-ink/[0.06] p-1" role="radiogroup" aria-label={t.ink.widthGroup}>
        {INK_WIDTHS.map((w) => (
          <button
            key={w.id}
            role="radio"
            aria-checked={widthId === w.id}
            aria-label={t.ink[w.id]}
            onClick={() => setWidthId(w.id)}
            className="relative grid h-9 w-11 flex-1 place-items-center rounded-full"
          >
            {widthId === w.id && (
              <motion.span layoutId="width-pill" className="absolute inset-0 rounded-full bg-sheet shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
            )}
            <span className="relative block w-5 rounded-full bg-ink" style={{ height: 2 * w.factor + 0.5 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function SendButton({ disabled, sending, onClick }: { disabled: boolean; sending: boolean; onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-royal h-14 w-full text-[16px]">
      {sending ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> {t.phone.sending}
        </>
      ) : (
        <>
          <Send className="size-[18px]" /> {t.phone.send}
        </>
      )}
    </button>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full border border-ink/10 bg-sheet/90 text-ink-2 shadow-sm backdrop-blur transition active:scale-95 disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function Result({ ok, sent, onAgain, onRetry }: { ok: boolean; sent: Sent | null; onAgain: () => void; onRetry: () => void }) {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 grid place-items-center bg-paper/95 px-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
        className="flex w-full max-w-sm flex-col items-center text-center phone-land:max-w-md"
      >
        {ok ? (
          <>
            <div className="relative grid size-24 place-items-center phone-land:size-16">
              <motion.span
                initial={{ scale: 0.4, opacity: 0.6 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.35 }}
                className="absolute inset-0 rounded-full bg-mint/30"
              />
              <motion.svg viewBox="0 0 96 96" className="size-full" initial="h" animate="v">
                <motion.circle
                  cx="48"
                  cy="48"
                  r="44"
                  fill="var(--color-mint)"
                  variants={{ h: { scale: 0 }, v: { scale: 1 } }}
                  transition={{ type: "spring", bounce: 0.45, duration: 0.6 }}
                  style={{ transformOrigin: "center" }}
                />
                <motion.path
                  d="M30 49 l12 12 l24 -26"
                  fill="none"
                  stroke="white"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{ h: { pathLength: 0 }, v: { pathLength: 1 } }}
                  transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
                />
              </motion.svg>
            </div>
            <h1 className="mt-6 font-serif text-5xl leading-none phone-land:mt-3 phone-land:text-4xl">{t.phone.sentTitle}</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              {t.phone.sentText}
            </p>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card mt-6 w-full rounded-2xl px-6 py-4 phone-land:mt-3 phone-land:py-2"
              >
                <SignatureSvg sig={sent} className="mx-auto h-16 w-full phone-land:h-12" />
              </motion.div>
            )}
            <button onClick={onAgain} className="btn btn-ghost mt-6 h-12 px-6 text-[15px] phone-land:mt-3">
              <RotateCcw className="size-4" /> {t.phone.again}
            </button>
          </>
        ) : (
          <>
            <div className="grid size-20 place-items-center rounded-full bg-seal/10 text-seal">
              <X className="size-9" />
            </div>
            <h1 className="mt-5 font-serif text-4xl">{t.phone.failTitle}</h1>
            <p className="mt-2 text-[15px] text-ink-2">{t.phone.failText}</p>
            <div className="mt-6 flex gap-2">
              <button onClick={onAgain} className="btn btn-ghost h-12 px-5">
                {t.phone.back}
              </button>
              <button onClick={onRetry} className="btn btn-royal h-12 px-6">
                <Check className="size-4" /> {t.phone.retry}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Expired() {
  const { t } = useI18n();
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-paper px-6 text-center">
      <div className="max-w-sm">
        <LogoMark className="mx-auto size-12 text-ink" />
        <h1 className="mt-6 font-serif text-4xl leading-tight">{t.phone.expiredTitle}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          {t.phone.expiredText}
        </p>
      </div>
    </main>
  );
}

/** Apró betűs hozzájárulás a küldés gomb alatt, linkkel a jogi oldalakra. */
function Consent({ lang }: { lang: string }) {
  const { t } = useI18n();
  const link = (href: string, text: string) => (
    <Link href={`/${lang}/${href}`} target="_blank" className="underline decoration-ink/20 underline-offset-2">
      {text}
    </Link>
  );
  return (
    <p className="text-center text-[11px] leading-snug text-ink-4">
      {rich(t.phone.consent, { terms: link("terms", t.dropzone.consentTerms), privacy: link("privacy", t.dropzone.consentPrivacy) })}
    </p>
  );
}
