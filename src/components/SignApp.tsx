"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useApp } from "@/lib/app-store";
import { fileKind, LoadError, loadDocument } from "@/lib/load-document";
import { Landing } from "./Landing";
import { Workspace } from "./Workspace";
import type { LoadState } from "./Dropzone";

export function SignApp() {
  const doc = useApp((s) => s.doc);
  const setDoc = useApp((s) => s.setDoc);
  const [state, setState] = useState<LoadState>({ phase: "idle" });
  const [dragging, setDragging] = useState(false);

  const open = useCallback(
    async (file: File) => {
      const kind = fileKind(file);
      setState({ phase: "loading", label: kind === "word" ? "Word-fájl átalakítása…" : "Dokumentum megnyitása…" });
      try {
        const loaded = await loadDocument(file);
        setDoc(loaded);
        setState({ phase: "idle" });
        window.scrollTo({ top: 0 });
      } catch (err) {
        console.error(err);
        setState({
          phase: "error",
          message: err instanceof LoadError ? err.message : "Valami elromlott a dokumentum megnyitásakor. Próbáld újra.",
        });
      }
    },
    [setDoc],
  );

  const openSample = useCallback(async () => {
    const res = await fetch("/minta-szerzodes.pdf");
    const blob = await res.blob();
    open(new File([blob], "minta-szerzodes.pdf", { type: "application/pdf" }));
  }, [open]);

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
              <div className="rounded-full bg-royal px-6 py-3 font-serif text-2xl text-white shadow-2xl">Engedd el a fájlt</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
