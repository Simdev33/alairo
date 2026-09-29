"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Trash2, Undo2, X } from "lucide-react";
import { uid, useApp } from "@/lib/app-store";
import { INK_COLORS, INK_WIDTHS } from "@/lib/ink";
import { SignaturePad, type SignaturePadHandle } from "./SignaturePad";
import { useI18n } from "@/i18n/client";

export function DrawDialog({ onClose }: { onClose: () => void }) {
  const [color, setColor] = useState<string>(INK_COLORS[0].value);
  const [widthId, setWidthId] = useState("medium");
  const [hasInk, setHasInk] = useState(false);
  const pad = useRef<SignaturePadHandle>(null);
  const addSignature = useApp((s) => s.addSignature);
  const { t } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = () => {
    const shape = pad.current?.exportCropped();
    if (!shape) return;
    addSignature({ id: uid("sig"), ...shape, color, source: "desktop", createdAt: Date.now() });
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/40 backdrop-blur-sm sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal
        aria-label={t.drawDialog.aria}
        initial={{ y: 30, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
        className="card flex h-dvh w-full flex-col p-4 pb-[max(env(safe-area-inset-bottom),16px)] sm:h-[min(560px,92dvh)] sm:w-[min(760px,100%)] sm:rounded-[26px] sm:p-5"
      >
        <div className="flex items-start justify-between gap-4 px-1">
          <div>
            <h2 className="font-serif text-[1.7rem] leading-tight sm:text-3xl">{t.drawDialog.title}</h2>
            <p className="mt-1 hidden text-sm text-ink-3 sm:block">{t.drawDialog.subtitle}</p>
          </div>
          <button onClick={onClose} className="btn btn-ghost size-10 shrink-0" aria-label={t.common.close}>
            <X className="size-5" />
          </button>
        </div>

        <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <SignaturePad
            ref={pad}
            color={color}
            widthFactor={INK_WIDTHS.find((w) => w.id === widthId)?.factor ?? 1}
            onChange={(s) => setHasInk(s.strokes.length > 0)}
            className="absolute inset-0"
            hint={t.pad.hint}
            lineLabel={t.pad.line}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            {INK_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.value)}
                aria-label={t.ink[c.id]}
                className={`grid size-9 place-items-center rounded-full border-2 transition ${color === c.value ? "" : "border-transparent"}`}
                style={{ borderColor: color === c.value ? c.value : undefined }}
              >
                <span className="size-6 rounded-full" style={{ background: c.value }} />
              </button>
            ))}
          </div>
          <div className="flex rounded-full bg-ink/[0.06] p-1">
            {INK_WIDTHS.map((w) => (
              <button
                key={w.id}
                onClick={() => setWidthId(w.id)}
                aria-label={t.ink[w.id]}
                title={t.ink[w.id]}
                className={`grid h-8 w-10 place-items-center rounded-full transition ${widthId === w.id ? "bg-sheet shadow-sm" : ""}`}
              >
                <span className="block w-5 rounded-full bg-ink" style={{ height: 2 * w.factor + 0.5 }} />
              </button>
            ))}
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => pad.current?.undo()} disabled={!hasInk} className="btn btn-ghost h-10 px-3 text-sm" aria-label={t.common.undo}>
              <Undo2 className="size-4" /> <span className="hidden sm:inline">{t.common.undoShort}</span>
            </button>
            <button onClick={() => pad.current?.clear()} disabled={!hasInk} className="btn btn-ghost h-10 px-3 text-sm" aria-label={t.common.clear}>
              <Trash2 className="size-4" /> <span className="hidden sm:inline">{t.common.clear}</span>
            </button>
          </div>
          <button onClick={save} disabled={!hasInk} className="btn btn-royal h-12 w-full px-5 text-[15px] sm:ml-auto sm:h-11 sm:w-auto">
            <Check className="size-4" /> {t.drawDialog.add}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
