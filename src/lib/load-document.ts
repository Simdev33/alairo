"use client";

import { openPdf, PdfOpenError, readPages } from "./pdf";
import type { LoadedDoc } from "./app-store";

export const ACCEPT = ".pdf,.doc,.docx,.odt,.rtf,application/pdf";
const WORD = new Set(["doc", "docx", "odt", "rtf"]);
const MAX_BYTES = 50 * 1024 * 1024;

export class LoadError extends Error {}

export function fileKind(file: File): "pdf" | "word" | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf" || file.type === "application/pdf") return "pdf";
  if (WORD.has(ext)) return "word";
  return null;
}

export async function loadDocument(file: File): Promise<LoadedDoc> {
  const kind = fileKind(file);
  if (!kind) throw new LoadError("Ezt a fájltípust nem ismerjük. PDF-et vagy Word-dokumentumot (.doc, .docx) tölts fel.");
  if (file.size > MAX_BYTES) throw new LoadError("A fájl túl nagy — legfeljebb 50 MB lehet.");

  let bytes: Uint8Array;
  let convertedFrom: string | null = null;

  if (kind === "pdf") {
    bytes = new Uint8Array(await file.arrayBuffer());
  } else {
    const ext = file.name.split(".").pop()!.toLowerCase();
    bytes = (await serverCanConvert()) ? await convertOnServer(file) : await convertInBrowser(file, ext);
    convertedFrom = ext;
  }

  try {
    const pdf = await openPdf(bytes);
    const pages = await readPages(pdf);
    return {
      name: convertedFrom ? file.name.replace(/\.[^.]+$/, ".pdf") : file.name,
      size: bytes.byteLength,
      convertedFrom,
      bytes,
      pdf,
      pages,
    };
  } catch (err) {
    if (err instanceof PdfOpenError) throw new LoadError(err.message);
    throw err;
  }
}

let serverCheck: Promise<boolean> | null = null;
function serverCanConvert() {
  serverCheck ??= fetch("/api/convert")
    .then((r) => r.json() as Promise<{ available?: boolean }>)
    .then((d) => d.available === true)
    .catch(() => false);
  return serverCheck;
}

async function convertOnServer(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/convert", { method: "POST", body: form }).catch(() => null);
  if (!res) throw new LoadError("Nem érjük el a szervert az átalakításhoz.");
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new LoadError(data?.error ?? "Nem sikerült PDF-fé alakítani a dokumentumot.");
  }
  return new Uint8Array(await res.arrayBuffer());
}

async function convertInBrowser(file: File, ext: string) {
  if (ext !== "docx") {
    throw new LoadError(`A .${ext} formátumot itt nem tudjuk megnyitni. Mentsd el a Wordben .docx-ként vagy PDF-ként, és próbáld újra.`);
  }
  try {
    const { docxToPdfInBrowser } = await import("./docx-to-pdf");
    return await docxToPdfInBrowser(file);
  } catch (err) {
    console.error(err);
    throw new LoadError("Nem sikerült megnyitni a Word-dokumentumot. Mentsd el PDF-ként, és azt töltsd fel.");
  }
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} kB`;
  return `${(n / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}
