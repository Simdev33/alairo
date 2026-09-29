import { getStroke } from "perfect-freehand";

// Tollvonások → kitöltendő SVG-útvonal. Ugyanez rajzol a telefonon, a gépen és a PDF-be is.

export type InkPoint = [x: number, y: number, pressure: number];
export type InkStroke = { points: InkPoint[]; size: number; pen: boolean };

// Az azonosítók egyben a szótár `ink` kulcsai (a feliratok onnan jönnek).
export const INK_COLORS = [
  { id: "black", value: "#15171e" },
  { id: "blue", value: "#1f3fae" },
] as const;

export const INK_WIDTHS = [
  { id: "thin", factor: 0.72 },
  { id: "medium", factor: 1 },
  { id: "bold", factor: 1.4 },
] as const;

export function outline(stroke: InkStroke, last = true): number[][] {
  return getStroke(stroke.points, {
    size: stroke.size,
    thinning: stroke.pen ? 0.55 : 0.5,
    smoothing: 0.6,
    streamline: 0.45,
    simulatePressure: !stroke.pen,
    start: { taper: 0, cap: true },
    end: { taper: stroke.size * 2.4, cap: true },
    last,
  });
}

const r = (n: number) => {
  const v = Math.round(n * 10) / 10;
  return Object.is(v, -0) ? "0" : String(v);
};
const mid = (a: number[], b: number[], dx: number, dy: number) => `${r((a[0] + b[0]) / 2 + dx)} ${r((a[1] + b[1]) / 2 + dy)}`;

/** Zárt, simított sokszög egy körvonalból (csak M / Q / Z parancsokkal, hogy a pdf-lib is értse). */
export function polygonToPath(pts: number[][], dx = 0, dy = 0): string {
  const n = pts.length;
  if (n < 3) return "";
  let d = `M ${mid(pts[0], pts[1], dx, dy)}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    d += ` Q ${r(p[0] + dx)} ${r(p[1] + dy)} ${mid(p, pts[(i + 1) % n], dx, dy)}`;
  }
  return d + " Z";
}

export function strokesToPath(strokes: InkStroke[], dx = 0, dy = 0, liveLast = false): string {
  return strokes
    .map((s, i) => polygonToPath(outline(s, !(liveLast && i === strokes.length - 1)), dx, dy))
    .filter(Boolean)
    .join(" ");
}

/** A vonásokat a befoglaló téglalapjukra vágja, kis ráhagyással. */
export function cropStrokes(strokes: InkStroke[]): { d: string; width: number; height: number } | null {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const outlines = strokes.map((s) => outline(s));
  for (const o of outlines)
    for (const [x, y] of o) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  if (!Number.isFinite(minX)) return null;
  const pad = 4;
  const d = outlines
    .map((o) => polygonToPath(o, pad - minX, pad - minY))
    .filter(Boolean)
    .join(" ");
  return { d, width: Math.ceil(maxX - minX + pad * 2), height: Math.ceil(maxY - minY + pad * 2) };
}
