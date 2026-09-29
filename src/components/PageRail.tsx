"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useApp } from "@/lib/app-store";
import type { PageInfo } from "@/lib/pdf";
import { usePdfCanvas } from "./usePdfCanvas";
import { useI18n } from "@/i18n/client";

const THUMB = 104;

export function PageRail({ onJump }: { onJump: (index: number) => void }) {
  const doc = useApp((s) => s.doc);
  const placements = useApp((s) => s.placements);
  const { t } = useI18n();
  if (!doc || doc.pages.length < 2) return null;
  return (
    <nav
      data-scroll-root
      aria-label={t.workspace.pagesNav}
      className="hidden w-[148px] shrink-0 overflow-y-auto border-r border-white/5 bg-[#151823] px-5 py-6 xl:block"
    >
      <ol className="space-y-5">
        {doc.pages.map((info, i) => (
          <li key={i}>
            <Thumb pdf={doc.pdf} index={i} info={info} count={placements.filter((p) => p.page === i).length} onClick={() => onJump(i)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Thumb({
  pdf,
  index,
  info,
  count,
  onClick,
}: {
  pdf: PDFDocumentProxy;
  index: number;
  info: PageInfo;
  count: number;
  onClick: () => void;
}) {
  const { canvasRef, holderRef, ready } = usePdfCanvas(pdf, index, THUMB, "300px");
  return (
    <button onClick={onClick} className="group block w-full text-center">
      <div
        ref={holderRef}
        className="relative mx-auto overflow-hidden rounded-[3px] bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_8px_20px_-8px_rgb(0_0_0/0.6)] transition group-hover:shadow-[0_0_0_2px_rgb(111_121_255/0.8),0_8px_20px_-8px_rgb(0_0_0/0.6)]"
        style={{ width: THUMB, height: (THUMB * info.height) / info.width }}
      >
        <canvas ref={canvasRef} className="size-full" />
        {!ready && <div className="skeleton absolute inset-0" />}
        {count > 0 && (
          <span className="absolute bottom-1 right-1 grid h-5 min-w-5 place-items-center rounded-full bg-royal px-1 text-[10.5px] font-semibold text-white shadow">
            {count}
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[10.5px] text-white/40 group-hover:text-white/70">{index + 1}</div>
    </button>
  );
}
