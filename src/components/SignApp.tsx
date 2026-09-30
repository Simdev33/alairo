"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useApp } from "@/lib/app-store";
import { AppError } from "@/lib/errors";
import { fileKind, loadDocument } from "@/lib/load-document";
import { useI18n } from "@/i18n/client";
import { Landing } from "./Landing";
import { Workspace } from "./Workspace";
import type { LoadState } from "./Dropzone";
import { DoneOverlay } from "./DoneOverlay";
import { Toast } from "./Toast";
import { CheckoutReturn } from "./paywall/CheckoutReturn";
import { downloadBytes } from "@/lib/sign-pdf";

// A Stripe.js és a fizetési ablak csak akkor töltődik be, amikor egy letöltéshez fizetés kell.
const Paywall = dynamic(() => import("./paywall/Paywall"), { ssr: false });

export function SignApp() {
  const doc = useApp((s) => s.doc);
  const setDoc = useApp((s) => s.setDoc);
  const paywallOpen = useApp((s) => s.paywall !== null);
  const done = useApp((s) => s.done);
  const setDone = useApp((s) => s.setDone);
  const { lang, t } = useI18n();
  const [state, setState] = useState<LoadState>({ phase: "idle" });
  const [dragging, setDragging] = useState(false);

  const open = useCallback(
    async (file: File) => {
      setState({ phase: "loading", kind: fileKind(file) === "word" ? "word" : "pdf" });
      try {
        const loaded = await loadDocument(file);
        setDoc(loaded);
        setState({ phase: "idle" });
        window.scrollTo({ top: 0 });
      } catch (err) {
        console.error(err);
        setState(
          err instanceof AppError ? { phase: "error", code: err.code, vars: err.vars } : { phase: "error", code: "generic" },
        );
      }
    },
    [setDoc],
  );

  const openSample = useCallback(async () => {
    const res = await fetch(`/samples/${lang}.pdf`);
    const blob = await res.blob();
    open(new File([blob], t.files.sampleName, { type: "application/pdf" }));
  }, [open, lang, t]);

  // A kezdőlapon bárhová ejtheted a fájlt
  useEffect(() => {
    if (doc) return;
    let depth = 0;
    const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer?.types ?? []).includes("Files");
    const enter = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      depth++;
      setDragging(true);
    };
    const leave = () => {
      depth = Math.max(0, depth - 1);
      if (!depth) setDragging(false);
    };
    const over = (e: DragEvent) => hasFiles(e) && e.preventDefault();
    const drop = (e: DragEvent) => {
      e.preventDefault();
      depth = 0;
      setDragging(false);
      const f = e.dataTransfer?.files?.[0];
      if (f) open(f);
    };
    window.addEventListener("dragenter", enter);
    window.addEventListener("dragleave", leave);
    window.addEventListener("dragover", over);
    window.addEventListener("drop", drop);
    return () => {
      window.removeEventListener("dragenter", enter);
      window.removeEventListener("dragleave", leave);
      window.removeEventListener("dragover", over);
      window.removeEventListener("drop", drop);
    };
  }, [doc, open]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {doc ? <Workspace key="ws" /> : <Landing key="landing" state={state} onFile={open} onSample={openSample} />}
      </AnimatePresence>

      <AnimatePresence>
        {dragging && !doc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-royal/10 p-6 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              className="grid size-full place-items-center rounded-[32px] border-2 border-dashed border-royal"
            >
              <div className="rounded-full bg-royal px-6 py-3 font-serif text-2xl text-white shadow-2xl">{t.dropzone.dropAnywhere}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{paywallOpen && <Paywall key="paywall" />}</AnimatePresence>
      <AnimatePresence>
        {done && (
          <DoneOverlay
            key="done"
            fileName={done.name}
            rasterized={done.rasterized}
            onAgain={() => downloadBytes(done.data, done.name)}
            onClose={() => setDone(null)}
            onNew={() => {
              setDone(null);
              setDoc(null);
            }}
          />
        )}
      </AnimatePresence>
      <CheckoutReturn />
      <Toast />
    </MotionConfig>
  );
}
