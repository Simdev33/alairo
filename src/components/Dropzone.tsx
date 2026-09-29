"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpFromLine, FileText, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ACCEPT } from "@/lib/load-document";
import type { ErrorCode } from "@/lib/errors";
import { useI18n } from "@/i18n/client";
import { fmt, rich } from "@/i18n/format";

export type LoadState =
  | { phase: "idle" }
  | { phase: "loading"; kind: "pdf" | "word" }
  | { phase: "error"; code: ErrorCode; vars?: Record<string, string> };

export function Dropzone({ state, onFile, onSample }: { state: LoadState; onFile: (f: File) => void; onSample: () => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const { lang, t } = useI18n();
  const loading = state.phase === "loading";

  return (
    <div className="relative">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f && !loading) onFile(f);
        }}
        animate={{ scale: over ? 1.015 : 1 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
        className={`card relative overflow-hidden rounded-[26px] p-2 transition-colors ${over ? "bg-royal-soft/60" : ""}`}
      >
        <button
          type="button"
          disabled={loading}
          onClick={() => input.current?.click()}
          className={`group relative flex w-full flex-col items-center rounded-[20px] border-[1.5px] border-dashed px-6 py-9 text-center transition-colors sm:py-11 ${
            over ? "border-royal" : "border-ink/15 hover:border-ink/30"
          }`}
        >
          <div className="relative h-16 w-32">
            <motion.span
              className="absolute left-0 top-2 grid h-14 w-11 -rotate-12 place-items-end rounded-lg bg-[#fbe4df] pb-1.5 text-[9px] font-bold tracking-wider text-seal shadow-sm"
              animate={over ? { rotate: -20, x: -6, y: -4 } : { rotate: -12, x: 0, y: 0 }}
            >
              PDF
            </motion.span>
            <motion.span
              className="absolute right-0 top-2 grid h-14 w-11 rotate-12 place-items-end rounded-lg bg-[#dfe6fb] pb-1.5 text-[9px] font-bold tracking-wider text-[#2a55c9] shadow-sm"
              animate={over ? { rotate: 20, x: 6, y: -4 } : { rotate: 12, x: 0, y: 0 }}
            >
              DOC
            </motion.span>
            <motion.span
              className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 place-items-center rounded-2xl bg-ink text-sheet shadow-[0_14px_28px_-12px_rgb(17_19_28/0.7)]"
              animate={over ? { y: -8 } : { y: 0 }}
            >
              {loading ? (
                <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <ArrowUpFromLine className="size-6 transition-transform group-hover:-translate-y-0.5" />
              )}
            </motion.span>
          </div>

          <div className="mt-6 font-serif text-[1.75rem] leading-tight sm:text-[2rem]">
            {state.phase === "loading"
              ? state.kind === "word"
                ? t.dropzone.convertingWord
                : t.dropzone.openingPdf
              : over
                ? t.dropzone.over
                : t.dropzone.idle}
          </div>
          <p className="mt-1.5 text-[14.5px] text-ink-3">
            {loading ? (
              t.dropzone.wait
            ) : (
              <>
                {t.dropzone.or}{" "}
                <span className="font-medium text-royal underline decoration-royal/30 underline-offset-4">{t.dropzone.choose}</span>
              </>
            )}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-1.5">
            {["PDF", "DOCX", "DOC"].map((t) => (
              <span key={t} className="rounded-full bg-ink/[0.05] px-2.5 py-1 font-mono text-[11px] text-ink-2">
                {t}
              </span>
            ))}
            <span className="rounded-full px-1.5 py-1 text-[11px] text-ink-4">{t.dropzone.maxSize}</span>
          </div>

          {loading && (
            <div className="absolute inset-x-8 bottom-4 h-1 overflow-hidden rounded-full bg-ink/5">
              <motion.div
                className="h-full w-1/3 rounded-full bg-royal"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}
        </button>
        <input
          ref={input}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) onFile(f);
          }}
        />
      </motion.div>

      <AnimatePresence>
        {state.phase === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-seal/[0.08] px-4 py-3 text-[13.5px] leading-snug text-seal">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              {fmt(t.errors[state.code], state.vars ?? {})}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onSample}
        disabled={loading}
        className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-left text-[13.5px] text-ink-3 transition-colors hover:text-ink disabled:opacity-50"
      >
        <FileText className="size-4" />
        {t.dropzone.sampleQuestion}{" "}
        <span className="font-medium text-ink underline decoration-ink/20 underline-offset-4">{t.dropzone.sampleCta}</span>
      </button>

      <p className="mt-2 text-[12px] leading-relaxed text-ink-4">
        {rich(t.dropzone.consent, {
          terms: (
            <Link href={`/${lang}/terms`} className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
              {t.dropzone.consentTerms}
            </Link>
          ),
          privacy: (
            <Link href={`/${lang}/privacy`} className="underline decoration-ink/20 underline-offset-2 hover:text-ink">
              {t.dropzone.consentPrivacy}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
