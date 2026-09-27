"use client";

import { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useReducer, useRef, useState, type Ref } from "react";
import { cropStrokes, polygonToPath, outline, type InkPoint, type InkStroke } from "@/lib/ink";

export type PadSnapshot = { strokes: InkStroke[]; width: number; height: number; live: boolean };

export type SignaturePadHandle = {
  clear: () => void;
  undo: () => void;
  exportCropped: () => { d: string; width: number; height: number } | null;
  livePath: () => string;
};

type Props = {
  color: string;
  widthFactor: number;
  onChange?: (snap: PadSnapshot) => void;
  className?: string;
  hint?: string;
  ref?: Ref<SignaturePadHandle>;
};

const pressureOf = (e: PointerEvent) => (e.pointerType === "pen" ? e.pressure || 0.5 : 0.5);

export function SignaturePad({ color, widthFactor, onChange, className = "", hint = "Írd alá itt", ref }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const strokes = useRef<InkStroke[]>([]);
  const active = useRef<{ id: number; stroke: InkStroke } | null>(null);
  const donePath = useRef("");
  const size = useRef({ w: 0, h: 0 });
  const factor = useRef(widthFactor);
  const frame = useRef(0);
  const [, redraw] = useReducer((x: number) => x + 1, 0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const rebuild = useCallback(() => {
    donePath.current = strokes.current
      .filter((s) => s !== active.current?.stroke)
      .map((s) => polygonToPath(outline(s)))
      .join(" ");
  }, []);

  // A ResizeObserver csak kirajzoláskor fut — ha még nem futott le, mérjünk közvetlenül.
  const measure = useCallback(() => {
    if (!size.current.w && box.current) {
      const r = box.current.getBoundingClientRect();
      size.current = { w: r.width, h: r.height };
    }
    return size.current;
  }, []);

  const notify = useCallback(
    (live: boolean) => {
      const { w, h } = measure();
      onChange?.({ strokes: strokes.current, width: w, height: h, live });
    },
    [onChange, measure],
  );

  // Átméretezéskor (pl. a telefon elforgatásakor) a vonásokat arányosan átskálázzuk.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      const prev = size.current;
      if (prev.w > 0 && prev.h > 0 && strokes.current.length && (w !== prev.w || h !== prev.h)) {
        const k = Math.min(w / prev.w, h / prev.h);
        for (const s of strokes.current) {
          s.size *= k;
          s.points = s.points.map(([x, y, p]) => [x * k, y * k, p] as InkPoint);
        }
        rebuild();
      }
      size.current = { w, h };
      setDims({ w, h });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [rebuild]);

  useEffect(() => {
    const k = widthFactor / factor.current;
    factor.current = widthFactor;
    if (k !== 1 && strokes.current.length) {
      for (const s of strokes.current) s.size *= k;
      rebuild();
      redraw();
      notify(false);
    }
  }, [widthFactor, rebuild, notify]);

  const schedule = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      redraw();
      notify(true);
    });
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const point = (e: PointerEvent): InkPoint => {
    const r = box.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top, pressureOf(e)];
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (active.current) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    try {
      box.current!.setPointerCapture(e.pointerId);
    } catch {}
    const base = Math.min(Math.max(measure().w / 100, 2.8), 5.6);
    const stroke: InkStroke = { points: [point(e.nativeEvent)], size: base * factor.current, pen: e.pointerType === "pen" };
    strokes.current.push(stroke);
    active.current = { id: e.pointerId, stroke };
    schedule();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const a = active.current;
    if (!a || e.pointerId !== a.id) return;
    const events = e.nativeEvent.getCoalescedEvents?.() ?? [];
    for (const ev of events.length ? events : [e.nativeEvent]) a.stroke.points.push(point(ev));
    schedule();
  };

  const end = (e: React.PointerEvent) => {
    const a = active.current;
    if (!a || e.pointerId !== a.id) return;
    active.current = null;
    rebuild();
    redraw();
    notify(false);
  };

  useImperativeHandle(
    ref,
    () => ({
      clear() {
        strokes.current = [];
        active.current = null;
        donePath.current = "";
        redraw();
        notify(false);
      },
      undo() {
        strokes.current = strokes.current.slice(0, -1);
        active.current = null;
        rebuild();
        redraw();
        notify(false);
      },
      exportCropped: () => cropStrokes(strokes.current),
      livePath: () =>
        [donePath.current, active.current ? polygonToPath(outline(active.current.stroke, false)) : ""].filter(Boolean).join(" "),
    }),
    [notify, rebuild],
  );

  const livePath = active.current ? polygonToPath(outline(active.current.stroke, false)) : "";
  const empty = strokes.current.length === 0;

  return (
    <div
      ref={box}
      className={`touch-none select-none overflow-hidden [-webkit-touch-callout:none] ${className || "relative"}`}
      style={{ cursor: "crosshair" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Aláírásvonal */}
      <div className="pointer-events-none absolute inset-x-[7%] top-[70%]">
        <div className="flex items-end gap-2 pb-1.5 text-ink-4">
          <span className="font-serif text-3xl leading-none">×</span>
        </div>
        <div className="h-px bg-[repeating-linear-gradient(90deg,var(--color-ink-4)_0_6px,transparent_6px_11px)]" />
        <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-4">Aláírás</div>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 top-[34%] text-center transition-all duration-500 ${
          empty ? "opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="font-serif text-[clamp(1.6rem,6vw,2.6rem)] italic text-ink-4/80">{hint}</span>
      </div>

      {dims.w > 0 && (
        <svg width={dims.w} height={dims.h} className="pointer-events-none absolute inset-0">
          <path d={donePath.current} fill={color} />
          {livePath && <path d={livePath} fill={color} />}
        </svg>
      )}
    </div>
  );
}
