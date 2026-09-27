"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Copy, Layers, Trash2 } from "lucide-react";
import { placementHeight, useApp } from "@/lib/app-store";
import type { PageInfo } from "@/lib/pdf";
import type { Placement } from "@/lib/sign-pdf";
import type { Signature } from "@/lib/types";

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export function PlacementBox({ pl, sig, page }: { pl: Placement; sig: Signature; page: PageInfo }) {
  const selected = useApp((s) => s.selectedId === pl.id);
  const select = useApp((s) => s.select);
  const update = useApp((s) => s.updatePlacement);
  const remove = useApp((s) => s.removePlacement);
  const place = useApp((s) => s.place);
  const pages = useApp((s) => s.doc?.pages.length ?? 0);
  const notify = useApp((s) => s.notify);
  const drag = useRef<{ id: number; sx: number; sy: number; x: number; y: number; w: number; W: number; H: number; mode: "move" | "resize" } | null>(null);

  const h = placementHeight(pl, sig, page);

  const start = (e: React.PointerEvent, mode: "move" | "resize") => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    const pageEl = (e.currentTarget as HTMLElement).closest("[data-page-index]") as HTMLElement;
    const r = pageEl.getBoundingClientRect();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x: pl.x, y: pl.y, w: pl.w, W: r.width, H: r.height, mode };
    select(pl.id);
  };

  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = (e.clientX - d.sx) / d.W;
    const dy = (e.clientY - d.sy) / d.H;
    if (d.mode === "move") {
      update(pl.id, { x: clamp(d.x + dx, 0, 1 - pl.w), y: clamp(d.y + dy, 0, 1 - h) });
    } else {
      const ratio = (page.width * (sig.height / sig.width)) / page.height; // magasság / szélesség arány oldalegységben
      const maxW = Math.min(1 - d.x, (1 - d.y) / ratio);
      update(pl.id, { w: clamp(d.w + dx, 0.05, maxW) });
    }
  };

  const end = (e: React.PointerEvent) => {
    if (drag.current?.id === e.pointerId) drag.current = null;
  };

  const toAllPages = () => {
    for (let i = 0; i < pages; i++) {
      if (i === pl.page) continue;
      place({ sigId: pl.sigId, page: i, x: pl.x, y: pl.y, w: pl.w });
    }
    select(pl.id);
    notify(`Az aláírás minden oldalra felkerült (${pages} oldal).`, "success");
  };

  const duplicate = () => {
    const x = clamp(pl.x + 0.03, 0, 1 - pl.w);
    const y = clamp(pl.y + 0.03, 0, 1 - h);
    place({ sigId: pl.sigId, page: pl.page, x, y, w: pl.w });
  };

  const toolbarBelow = pl.y < 0.07;
  // A lap széléhez közel ne lógjon ki az eszköztár
  const cx = pl.x + pl.w / 2;
  const align = cx > 0.64 ? "right-0" : cx < 0.36 ? "left-0" : "left-1/2 -translate-x-1/2";

  return (
    <div
      className="group absolute touch-none"
      style={{ left: `${pl.x * 100}%`, top: `${pl.y * 100}%`, width: `${pl.w * 100}%`, height: `${h * 100}%`, zIndex: selected ? 20 : 10 }}
    >
      <div
        onPointerDown={(e) => start(e, "move")}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        className={`absolute -inset-[5px] cursor-grab rounded-lg transition-colors active:cursor-grabbing ${
          selected
            ? "bg-royal/[0.06] outline-[1.5px] outline-royal outline-dashed"
            : "outline-[1.5px] outline-transparent outline-dashed hover:bg-royal/[0.04] hover:outline-royal/40"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Elhelyezett aláírás — húzd a mozgatáshoz"
        onFocus={() => select(pl.id)}
      />
      <motion.svg
        viewBox={`0 0 ${sig.width} ${sig.height}`}
        className="pointer-events-none absolute inset-0 size-full"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      >
        <path d={sig.d} fill={sig.color} />
      </motion.svg>

      {selected && (
        <>
          <span
            onPointerDown={(e) => start(e, "resize")}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            className="absolute -bottom-[11px] -right-[11px] grid size-[18px] cursor-nwse-resize place-items-center rounded-full border-2 border-white bg-royal shadow-md"
            aria-label="Átméretezés"
          />
          <motion.div
            initial={{ opacity: 0, y: toolbarBelow ? -4 : 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`absolute ${align} flex items-center gap-0.5 rounded-full bg-ink p-1 text-sheet shadow-xl ${
              toolbarBelow ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
            }`}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <ToolButton label="Másolat" onClick={duplicate}>
              <Copy className="size-3.5" />
            </ToolButton>
            {pages > 1 && (
              <ToolButton label="Minden oldalra" onClick={toAllPages} wide>
                <Layers className="size-3.5" /> <span className="hidden text-xs sm:inline">Minden oldalra</span>
              </ToolButton>
            )}
            <span className="mx-0.5 h-4 w-px bg-white/15" />
            <ToolButton label="Törlés" onClick={() => remove(pl.id)} danger>
              <Trash2 className="size-3.5" />
            </ToolButton>
          </motion.div>
        </>
      )}
    </div>
  );
}

function ToolButton({
  children,
  label,
  onClick,
  wide,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  wide?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full transition-colors ${
        wide ? "w-8 sm:w-auto sm:px-3" : "w-8"
      } ${danger ? "hover:bg-seal hover:text-white" : "hover:bg-white/12"}`}
    >
      {children}
    </button>
  );
}
