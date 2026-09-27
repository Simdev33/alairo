"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { GripVertical, MousePointer2, PenLine, Smartphone, Trash2 } from "lucide-react";
import { placementHeight, useApp } from "@/lib/app-store";
import type { Signature } from "@/lib/types";
import { DEFAULT_WIDTH } from "./PdfPage";
import { SignatureSvg } from "./SignatureSvg";

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const time = (t: number) => new Date(t).toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" });

type Drag = { sig: Signature; x: number; y: number; w: number; over: boolean };

function pageAt(x: number, y: number) {
  const el = document.elementFromPoint(x, y)?.closest("[data-page-index]") as HTMLElement | null;
  return el ? { el, index: Number(el.dataset.pageIndex) } : null;
}

export function SignatureTray({ onDraw, layout = "list" }: { onDraw: () => void; layout?: "list" | "row" }) {
  const signatures = useApp((s) => s.signatures);
  const placements = useApp((s) => s.placements);
  const armedSigId = useApp((s) => s.armedSigId);
  const freshSigId = useApp((s) => s.freshSigId);
  const [drag, setDrag] = useState<Drag | null>(null);

  const startDrag = (sig: Signature, e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const sx = e.clientX;
    const sy = e.clientY;
    let dragging = false;

    const move = (ev: PointerEvent) => {
      if (!dragging && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
      dragging = true;
      document.body.style.cursor = "grabbing";
      const hit = pageAt(ev.clientX, ev.clientY);
      const doc = useApp.getState().doc;
      const w = hit && doc ? DEFAULT_WIDTH(doc.pages[hit.index]) * hit.el.getBoundingClientRect().width : 190;
      setDrag({ sig, x: ev.clientX, y: ev.clientY, w, over: !!hit });
    };
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      document.body.style.cursor = "";
      setDrag(null);
      const { doc, place, arm, armedSigId: armed } = useApp.getState();
      if (!dragging) {
        if (ev.type === "pointerup") arm(armed === sig.id ? null : sig.id);
        return;
      }
      const hit = ev.type === "pointerup" ? pageAt(ev.clientX, ev.clientY) : null;
      if (!hit || !doc) return;
      const info = doc.pages[hit.index];
      const r = hit.el.getBoundingClientRect();
      const w = DEFAULT_WIDTH(info);
      const h = placementHeight({ w }, sig, info);
      place({
        sigId: sig.id,
        page: hit.index,
        w,
        x: clamp((ev.clientX - r.left) / r.width - w / 2, 0, 1 - w),
        y: clamp((ev.clientY - r.top) / r.height - h / 2, 0, 1 - h),
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const row = layout === "row";

  return (
    <>
      {signatures.length === 0 ? (
        <div
          className={`flex items-center gap-3 rounded-2xl border border-dashed border-ink/15 text-ink-3 ${
            row ? "px-3 py-2.5" : "flex-col px-5 py-6 text-center"
          }`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-paper-2">
            <PenLine className="size-[18px]" />
          </span>
          <p className="text-[13px] leading-snug">
            {row ? "Még nincs aláírás." : "Itt jelennek meg a beérkező aláírások."}{" "}
            <button onClick={onDraw} className="font-medium text-royal underline-offset-2 hover:underline">
              Rajzolj egyet itt
            </button>
            {row ? "" : " — egérrel vagy érintőpaddal."}
          </p>
        </div>
      ) : (
        <ul className={row ? "no-scrollbar flex gap-2.5 overflow-x-auto" : "space-y-2.5"}>
          <AnimatePresence initial={false}>
            {signatures.map((sig) => {
              const used = placements.filter((p) => p.sigId === sig.id).length;
              const armed = armedSigId === sig.id;
              return (
                <motion.li
                  key={sig.id}
                  layout
                  initial={{ opacity: 0, y: -12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.18 } }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.55 }}
                  className={row ? "w-52 shrink-0" : ""}
                >
                  <div
                    onPointerDown={(e) => startDrag(sig, e)}
                    className={`group relative cursor-grab rounded-2xl ${row ? "touch-pan-x" : "touch-none"} border bg-sheet p-2 transition-[box-shadow,border-color] active:cursor-grabbing ${
                      armed
                        ? "border-royal shadow-[0_0_0_3px_rgb(43_54_232/0.18)]"
                        : "border-ink/10 hover:border-ink/20 hover:shadow-[0_8px_20px_-12px_rgb(17_19_28/0.35)]"
                    }`}
                    title="Húzd a dokumentumra, vagy kattints, majd kattints az oldalra"
                  >
                    {freshSigId === sig.id && (
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0.9 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 2.4, ease: "easeOut" }}
                        className="pointer-events-none absolute -inset-px rounded-2xl ring-2 ring-mint"
                      />
                    )}
                    <div className={`relative flex ${row ? "h-12" : "h-[68px]"} items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(transparent_calc(72%-1px),rgb(17_19_28/0.08)_calc(72%-1px),rgb(17_19_28/0.08)_72%,transparent_72%)] px-3`}>
                      <motion.div
                        className="size-full"
                        initial={freshSigId === sig.id ? { clipPath: "inset(0 100% 0 0)" } : false}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
                      >
                        <SignatureSvg sig={sig} className="size-full" />
                      </motion.div>
                      <GripVertical className="absolute left-1 top-1/2 size-4 -translate-y-1/2 text-ink-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 whitespace-nowrap px-1 text-[11.5px] text-ink-3">
                      {sig.source === "phone" ? <Smartphone className="size-3.5" /> : <MousePointer2 className="size-3.5" />}
                      <span>
                        {sig.source === "phone" ? "Telefon" : "Rajzolt"} · {time(sig.createdAt)}
                      </span>
                      {used > 0 && (
                        <span className="rounded-full bg-royal-soft px-1.5 py-px text-[10.5px] font-medium text-royal">{used}×</span>
                      )}
                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => useApp.getState().removeSignature(sig.id)}
                        className="ml-auto grid size-6 place-items-center rounded-full text-ink-4 transition-colors hover:bg-seal/10 hover:text-seal"
                        aria-label="Aláírás törlése"
                        title="Törlés"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}

      <DragGhost drag={drag} />
      <ArmHint />
    </>
  );
}

function DragGhost({ drag }: { drag: Drag | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !drag) return null;
  const h = (drag.w * drag.sig.height) / drag.sig.width;
  return createPortal(
    <div
      className="pointer-events-none fixed z-[100] rounded-lg transition-[width,height,background-color] duration-150"
      style={{
        left: drag.x - drag.w / 2,
        top: drag.y - h / 2,
        width: drag.w,
        height: h,
        background: drag.over ? "rgb(43 54 232 / 0.07)" : "rgb(255 253 248 / 0.92)",
        outline: `1.5px dashed ${drag.over ? "#2b36e8" : "rgb(17 19 28 / 0.25)"}`,
        boxShadow: drag.over ? "none" : "0 18px 40px -16px rgb(0 0 0 / 0.45)",
      }}
    >
      <SignatureSvg sig={drag.sig} className="size-full" />
    </div>,
    document.body,
  );
}

/** Kattintásos elhelyezéskor Esc-re kilép. */
function ArmHint() {
  const armed = useApp((s) => s.armedSigId);
  const arm = useApp((s) => s.arm);
  const ref = useRef(arm);
  ref.current = arm;
  useEffect(() => {
    if (!armed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && ref.current(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [armed]);
  return null;
}
