import { degrees, EncryptedPDFError, PDFDocument, rgb } from "pdf-lib";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type { Signature } from "./types";

export type Placement = {
  id: string;
  sigId: string;
  /** 0-tól számozott oldal */
  page: number;
  /** A megjelenített oldal szélességéhez/magasságához viszonyított bal felső sarok és szélesség (0–1). */
  x: number;
  y: number;
  w: number;
};

const hex = (c: string) => {
  const n = parseInt(c.slice(1), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

/**
 * Az aláírásokat vektorosan rajzolja az eredeti PDF-be — a szöveg kijelölhető marad.
 * Ha a PDF titkosított (a pdf-lib nem tudja újraírni), az oldalakat képként menti.
 */
export async function buildSignedPdf(
  bytes: Uint8Array,
  doc: PDFDocumentProxy,
  placements: Placement[],
  signatures: Signature[],
): Promise<{ data: Uint8Array; rasterized: boolean }> {
  const sigs = new Map(signatures.map((s) => [s.id, s]));
  let pdf: PDFDocument;
  try {
    pdf = await PDFDocument.load(bytes, { updateMetadata: false });
  } catch (err) {
    if (err instanceof EncryptedPDFError) return { data: await rasterize(doc, placements, sigs), rasterized: true };
    throw err;
  }

  const pages = pdf.getPages();
  for (const pl of placements) {
    const sig = sigs.get(pl.sigId);
    const libPage = pages[pl.page];
    if (!sig || !libPage) continue;
    const page = await doc.getPage(pl.page + 1);
    const vp = page.getViewport({ scale: 1 });
    const [x, y] = vp.convertToPdfPoint(pl.x * vp.width, pl.y * vp.height);
    libPage.drawSvgPath(sig.d, {
      x,
      y,
      scale: (pl.w * vp.width) / sig.width,
      rotate: degrees(((page.rotate % 360) + 360) % 360),
      color: hex(sig.color),
    });
  }
  pdf.setModificationDate(new Date());
  return { data: await pdf.save(), rasterized: false };
}

async function rasterize(doc: PDFDocumentProxy, placements: Placement[], sigs: Map<string, Signature>) {
  const out = await PDFDocument.create();
  const RENDER_SCALE = 2.5;
  for (let i = 0; i < doc.numPages; i++) {
    const page = await doc.getPage(i + 1);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: RENDER_SCALE });
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(vp.width);
    canvas.height = Math.ceil(vp.height);
    await page.render({ canvas, viewport: vp, background: "#ffffff" }).promise;
    const jpg = await new Promise<Blob>((res, rej) =>
      canvas.toBlob((b) => (b ? res(b) : rej(new Error("canvas"))), "image/jpeg", 0.92),
    );
    const img = await out.embedJpg(new Uint8Array(await jpg.arrayBuffer()));
    const p = out.addPage([base.width, base.height]);
    p.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });
    for (const pl of placements.filter((pl) => pl.page === i)) {
      const sig = sigs.get(pl.sigId);
      if (!sig) continue;
      p.drawSvgPath(sig.d, {
        x: pl.x * base.width,
        y: base.height - pl.y * base.height,
        scale: (pl.w * base.width) / sig.width,
        color: hex(sig.color),
      });
    }
  }
  return out.save();
}

export function downloadBytes(data: Uint8Array, fileName: string) {
  const blob = new Blob([data as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function signedFileName(original: string) {
  const base = original.replace(/\.[^.]+$/, "") || "dokumentum";
  return `${base}-alairt.pdf`;
}
