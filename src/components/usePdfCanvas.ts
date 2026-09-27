"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Egyszerre legfeljebb két oldal renderelődik, hogy a hosszú dokumentum se fagyassza le a lapot.
const MAX_PARALLEL = 2;
let running = 0;
const waiting: (() => void)[] = [];

async function slot<T>(job: () => Promise<T>): Promise<T> {
  if (running >= MAX_PARALLEL) await new Promise<void>((r) => waiting.push(r));
  running++;
  try {
    return await job();
  } finally {
    running--;
    waiting.shift()?.();
  }
}

/**
 * Egy PDF-oldalt rajzol a vászonra, amint a látótér közelébe ér.
 * Csak akkor rajzol újra, ha nagyobb felbontás kell, mint amit már elkészített.
 */
export function usePdfCanvas(pdf: PDFDocumentProxy, index: number, cssWidth: number, rootMargin = "1200px") {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const renderedPx = useRef(0);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    // A görgethető szülőhöz mérünk, így a rootMargin tényleg előre renderel.
    const root = el.closest<HTMLElement>("[data-scroll-root]");
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { root, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!visible || cssWidth <= 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const targetPx = Math.round(cssWidth * dpr);
    if (targetPx <= renderedPx.current) return;

    let cancelled = false;
    let cancelTask = () => {};
    slot(async () => {
      if (cancelled) return;
      const page = await pdf.getPage(index + 1);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: targetPx / base.width });
      const off = document.createElement("canvas");
      off.width = Math.floor(viewport.width);
      off.height = Math.floor(viewport.height);
      const task = page.render({ canvas: off, viewport, background: "#ffffff" });
      cancelTask = () => task.cancel();
      await task.promise;
      const canvas = canvasRef.current;
      if (cancelled || !canvas) return;
      canvas.width = off.width;
      canvas.height = off.height;
      canvas.getContext("2d")!.drawImage(off, 0, 0);
      renderedPx.current = targetPx;
      setReady(true);
    }).catch(() => undefined);

    return () => {
      cancelled = true;
      cancelTask();
    };
  }, [pdf, index, cssWidth, visible]);

  return { canvasRef, holderRef, ready };
}
