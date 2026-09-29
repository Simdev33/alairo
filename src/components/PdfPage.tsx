"use client";

import { useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { placementHeight, useApp } from "@/lib/app-store";
import type { PageInfo } from "@/lib/pdf";
import { PlacementBox } from "./PlacementBox";
import { SignatureSvg } from "./SignatureSvg";
import { usePdfCanvas } from "./usePdfCanvas";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";

export const DEFAULT_WIDTH = (page: PageInfo) => (page.width > page.height ? 0.2 : 0.27);

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export function PdfPage({
  pdf,
  index,
  info,
  width,
  total,
}: {
  pdf: PDFDocumentProxy;
  index: number;
  info: PageInfo;
  width: number;
  total: number;
}) {
  const height = (width * info.height) / info.width;
  const { canvasRef, holderRef, ready } = usePdfCanvas(pdf, index, width);
  const placements = useApp((s) => s.placements);
  const signatures = useApp((s) => s.signatures);
  const armedSig = useApp((s) => s.signatures.find((x) => x.id === s.armedSigId) ?? null);
  const place = useApp((s) => s.place);
  const select = useApp((s) => s.select);
  const { t } = useI18n();
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null);

  const mine = placements.filter((p) => p.page === index);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!armedSig) {
      if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === "CANVAS") select(null);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const w = DEFAULT_WIDTH(info);
    const h = placementHeight({ w }, armedSig, info);
    place({
      sigId: armedSig.id,
      page: index,
      w,
      x: clamp((e.clientX - r.left) / r.width - w / 2, 0, 1 - w),
      y: clamp((e.clientY - r.top) / r.height - h / 2, 0, 1 - h),
    });
    setGhost(null);
  };

  const ghostW = DEFAULT_WIDTH(info);
  const ghostH = armedSig ? placementHeight({ w: ghostW }, armedSig, info) : 0;

  return (
    <div className="flex flex-col items-center">
      <div
        ref={holderRef}
        data-page-index={index}
        onClick={onClick}
        onPointerMove={(e) => {
          if (!armedSig) return;
          const r = e.currentTarget.getBoundingClientRect();
          setGhost({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
        }}
        onPointerLeave={() => setGhost(null)}
        className={`relative select-none rounded-[3px] bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.25),0_2px_4px_rgb(0_0_0/0.2),0_30px_60px_-20px_rgb(0_0_0/0.65)] ${
          armedSig ? "cursor-copy" : ""
        }`}
        style={{ width, height }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 size-full rounded-[3px]" aria-label={fmt(t.workspace.pageLabel, { n: index + 1 })} />
        {!ready && <div className="skeleton absolute inset-0 rounded-[3px]" />}

        {mine.map((pl) => {
          const sig = signatures.find((s) => s.id === pl.sigId);
          return sig ? <PlacementBox key={pl.id} pl={pl} sig={sig} page={info} /> : null;
        })}

        {armedSig && ghost && (
          <div
            className="pointer-events-none absolute rounded-md bg-royal/[0.07] outline-[1.5px] outline-royal/60 outline-dashed"
            style={{
              left: `${clamp(ghost.x - ghostW / 2, 0, 1 - ghostW) * 100}%`,
              top: `${clamp(ghost.y - ghostH / 2, 0, 1 - ghostH) * 100}%`,
              width: `${ghostW * 100}%`,
              height: `${ghostH * 100}%`,
            }}
          >
            <SignatureSvg sig={armedSig} className="size-full opacity-60" />
          </div>
        )}
      </div>
      <div className="mt-3 font-mono text-[11px] tracking-wider text-white/35">
        {index + 1} / {total}
      </div>
    </div>
  );
}
