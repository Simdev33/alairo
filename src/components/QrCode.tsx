"use client";

import { useMemo } from "react";
import QRCode from "qrcode";

/**
 * Saját rajzolású QR-kód: lekerekített modulok, egyedi keresőminták, középen tollhegy.
 * A modulok a középpontból kifelé „nyílnak ki”, amikor új kód születik.
 */
export function QrCode({ value, className, label }: { value: string; className?: string; label?: string }) {
  const qr = useMemo(() => {
    const code = QRCode.create(value, { errorCorrectionLevel: "Q" });
    const size = code.modules.size;
    const dark = (r: number, c: number) => code.modules.get(r, c) === 1;
    const inFinder = (r: number, c: number) =>
      (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
    // 7-es verziótól középen igazítóminta van — oda nem teszünk jelvényt.
    const badge = size >= 45 ? 0 : Math.max(5, Math.round(size * 0.2) | 1);
    const b0 = (size - badge) / 2;
    const inBadge = (r: number, c: number) => r >= b0 && r < b0 + badge && c >= b0 && c < b0 + badge;
    const cells: { r: number; c: number; dist: number }[] = [];
    const mid = (size - 1) / 2;
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++)
        if (dark(r, c) && !inFinder(r, c) && !inBadge(r, c))
          cells.push({ r, c, dist: Math.hypot(r - mid, c - mid) / mid });
    return { size, cells, badge, b0 };
  }, [value]);

  const quiet = 2;
  const vb = qr.size + quiet * 2;
  const finders = [
    [0, 0],
    [0, qr.size - 7],
    [qr.size - 7, 0],
  ];

  return (
    <svg viewBox={`${-quiet} ${-quiet} ${vb} ${vb}`} className={className} role="img" aria-label={label}>
      <rect x={-quiet} y={-quiet} width={vb} height={vb} rx={2.4} fill="#fffdf8" />
      <g key={value} fill="#11131c">
        {qr.cells.map(({ r, c, dist }) => (
          <rect
            key={`${r}-${c}`}
            x={c + 0.07}
            y={r + 0.07}
            width={0.86}
            height={0.86}
            rx={0.3}
            className="qr-cell"
            style={{ animationDelay: `${Math.round(dist * 380)}ms` }}
          />
        ))}
        {finders.map(([r, c]) => (
          <g key={`${r}-${c}`} className="qr-cell" style={{ animationDelay: "420ms" }}>
            <path
              fillRule="evenodd"
              d={`M${c + 2.2} ${r}h2.6a2.2 2.2 0 0 1 2.2 2.2v2.6a2.2 2.2 0 0 1 -2.2 2.2h-2.6a2.2 2.2 0 0 1 -2.2 -2.2v-2.6a2.2 2.2 0 0 1 2.2 -2.2z
                 M${c + 2.4} ${r + 1}h2.2a1.4 1.4 0 0 1 1.4 1.4v2.2a1.4 1.4 0 0 1 -1.4 1.4h-2.2a1.4 1.4 0 0 1 -1.4 -1.4v-2.2a1.4 1.4 0 0 1 1.4 -1.4z`}
            />
            <rect x={c + 2} y={r + 2} width={3} height={3} rx={0.9} fill="#2b36e8" />
          </g>
        ))}
        {qr.badge > 0 && <g className="qr-cell" style={{ animationDelay: "520ms" }}>
          <rect x={qr.b0 + 0.35} y={qr.b0 + 0.35} width={qr.badge - 0.7} height={qr.badge - 0.7} rx={1.4} fill="#11131c" />
          <path
            transform={`translate(${qr.b0 + qr.badge / 2} ${qr.b0 + qr.badge / 2}) scale(${qr.badge / 14})`}
            d="M-4.2 2.4c1.3-2.8 2.6-5.5 3.6-5.2 1 .3-1 4.6-.6 5.2.4.6 2-3 3.2-2.7.9.3-.6 2.7.3 2.7.7 0 1.2-.8 2-1.2"
            fill="none"
            stroke="#fffdf8"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            transform={`translate(${qr.b0 + qr.badge / 2} ${qr.b0 + qr.badge / 2}) scale(${qr.badge / 14})`}
            d="M-4 4.6h8.4"
            stroke="#6f79ff"
            strokeWidth={1.25}
            strokeLinecap="round"
          />
        </g>}
      </g>
      <style>{`
        .qr-cell { transform-box: fill-box; transform-origin: center; animation: qr-in .55s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes qr-in { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .qr-cell { animation: none } }
      `}</style>
    </svg>
  );
}
