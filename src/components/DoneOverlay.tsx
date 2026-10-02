"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { Download, FilePlus2, PencilLine } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { rich } from "@/i18n/format";

export function Seal({ text }: { text: string }) {
  // Hullámos szélű viaszpecsét
  const bumps = 28;
  const pts: string[] = [];
  for (let i = 0; i <= bumps * 2; i++) {
    const a = (i / (bumps * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? 96 : 90;
    pts.push(`${(100 + Math.cos(a) * r).toFixed(1)},${(100 + Math.sin(a) * r).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 200 200" className="size-full drop-shadow-[0_18px_24px_rgb(120_24_12/0.45)]">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#e0654f" />
          <stop offset="0.55" stopColor="#b93a26" />
          <stop offset="1" stopColor="#8a2515" />
        </radialGradient>
        <path id="ring" d="M100,100 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
      </defs>
      <polygon points={pts.join(" ")} fill="url(#wax)" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="rgb(255 220 200 / 0.35)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="48" fill="none" stroke="rgb(255 220 200 / 0.35)" strokeWidth="1.5" />
      <text fill="rgb(255 236 226 / 0.9)" fontSize="13.5" fontWeight="600" letterSpacing="4.2" style={{ fontFamily: "var(--font-geist)" }}>
        <textPath href="#ring" textLength="386" lengthAdjust="spacingAndGlyphs">{text}</textPath>
      </text>
      <path
        d="M76 106c5-11 10-22 14-21 4 1-4 18-2 21 2 2 8-12 12-11 4 1-2 11 1 11 3 0 7-9 11-8 3 1-1 7 2 7 3 0 5-3 8-5"
        fill="none"
        stroke="#fff3ec"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M78 118h44" stroke="#fff3ec" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function DoneOverlay({
  fileName,
  rasterized,
  onAgain,
  onClose,
  onNew,
}: {
  fileName: string;
  rasterized: boolean;
  onAgain: () => void;
  onClose: () => void;
  onNew: () => void;
}) {
  const { t } = useI18n();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/55 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className="card relative w-[min(460px,100%)] rounded-[28px] px-7 pb-7 pt-24 text-center"
        role="dialog"
        aria-modal
        aria-label={t.done.aria}
      >
        <div className="absolute left-1/2 top-0 size-40 -translate-x-1/2 -translate-y-1/2">
          <motion.span
            className="absolute inset-4 rounded-full bg-seal/30"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.9], opacity: [0.7, 0] }}
            transition={{ delay: 0.42, duration: 0.9, ease: "easeOut" }}
          />
          <motion.div
            className="size-full"
            initial={{ scale: 2.2, rotate: -28, opacity: 0 }}
            animate={{ scale: 1, rotate: -9, opacity: 1 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 420, damping: 18, mass: 0.9 }}
          >
            <Seal text={t.done.seal} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="font-serif text-[2.6rem] leading-none">{t.done.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            {rich(t.done.downloaded, { name: <span className="break-all font-medium text-ink">{fileName}</span> })}
          </p>
          {rasterized && (
            <p className="mt-2 rounded-xl bg-paper-2 px-3 py-2 text-[12.5px] leading-snug text-ink-3">
              {t.done.rasterized}
            </p>
          )}
          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            <button onClick={onClose} className="btn btn-ghost h-11 px-4 text-sm">
              <PencilLine className="size-4" /> {t.done.keepEditing}
            </button>
            <button onClick={onNew} className="btn btn-primary h-11 px-4 text-sm">
              <FilePlus2 className="size-4" /> {t.done.newDocument}
            </button>
          </div>
          <button onClick={onAgain} className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink">
            <Download className="size-3.5" /> {t.done.again}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
