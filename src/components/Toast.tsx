"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { useApp } from "@/lib/app-store";

/** Rövid értesítések (a store `notify` hívásaiból), a munkafelületen és a kezdőlapon is. */
export function Toast() {
  const toast = useApp((s) => s.toast);
  const onWorkspace = useApp((s) => s.doc !== null);
  const [shown, setShown] = useState<typeof toast>(null);
  useEffect(() => {
    if (!toast) return;
    setShown(toast);
    const t = setTimeout(() => setShown(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const Icon = shown?.tone === "error" ? TriangleAlert : shown?.tone === "success" ? CheckCircle2 : Info;
  return (
    <div className={`pointer-events-none fixed inset-x-0 z-[70] flex justify-center px-4 lg:bottom-6 ${onWorkspace ? "bottom-40" : "bottom-6"}`}>
      <AnimatePresence>
        {shown && (
          <motion.div
            key={shown.id}
            initial={{ y: 20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-3.5 pr-4 text-[13.5px] text-sheet shadow-[0_16px_40px_-12px_rgb(0_0_0/0.5)]"
          >
            <Icon className={`size-4 shrink-0 ${shown.tone === "error" ? "text-[#ff8a75]" : shown.tone === "success" ? "text-[#5fe0a8]" : ""}`} />
            {shown.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
