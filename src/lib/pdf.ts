import type { PDFDocumentProxy } from "pdfjs-dist";
import { AppError } from "./errors";

type PdfJs = typeof import("pdfjs-dist");
let pdfjs: Promise<PdfJs> | null = null;

export function loadPdfJs(): Promise<PdfJs> {
  pdfjs ??= import("pdfjs-dist").then((m) => {
    m.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
    return m;
  });
  return pdfjs;
}

export async function openPdf(bytes: Uint8Array): Promise<PDFDocumentProxy> {
  const lib = await loadPdfJs();
  // A pdf.js átadja a puffert a workernek, ezért másolatot kap — az eredeti a mentéshez kell.
  const task = lib.getDocument({
    data: bytes.slice(),
    cMapUrl: "/pdfjs/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "/pdfjs/standard_fonts/",
    wasmUrl: "/pdfjs/wasm/",
    iccUrl: "/pdfjs/iccs/",
  });
  try {
    return await task.promise;
  } catch (err) {
    const name = (err as { name?: string })?.name;
    if (name === "PasswordException") throw new AppError("pdfPassword");
    if (name === "InvalidPDFException") throw new AppError("pdfInvalid");
    throw new AppError("pdfOpenFailed");
  }
}

export type PageInfo = { width: number; height: number; rotate: number };

export async function readPages(doc: PDFDocumentProxy): Promise<PageInfo[]> {
  const pages: PageInfo[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    pages.push({ width: vp.width, height: vp.height, rotate: ((page.rotate % 360) + 360) % 360 });
  }
  return pages;
}
