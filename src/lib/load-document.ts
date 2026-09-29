"use client";

import { openPdf, readPages } from "./pdf";
import { AppError, type ErrorCode } from "./errors";
import type { LoadedDoc } from "./app-store";

export const ACCEPT = ".pdf,.doc,.docx,.odt,.rtf,application/pdf";
const WORD = new Set(["doc", "docx", "odt", "rtf"]);
const MAX_BYTES = 50 * 1024 * 1024;

export function fileKind(file: File): "pdf" | "word" | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf" || file.type === "application/pdf") return "pdf";
  if (WORD.has(ext)) return "word";
  return null;
}

export async function loadDocument(file: File): Promise<LoadedDoc> {
  const kind = fileKind(file);
  if (!kind) throw new AppError("unknownType");
  if (file.size > MAX_BYTES) throw new AppError("tooLarge");

  let bytes: Uint8Array;
  let convertedFrom: string | null = null;

  if (kind === "pdf") {
    bytes = new Uint8Array(await file.arrayBuffer());
  } else {
    const ext = file.name.split(".").pop()!.toLowerCase();
    bytes = (await serverCanConvert()) ? await convertOnServer(file) : await convertInBrowser(file, ext);
    convertedFrom = ext;
  }

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
  if (!res) throw new AppError("serverUnreachable");
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    const known: ErrorCode[] = ["wordPassword", "tooLarge", "unknownType"];
    throw new AppError(known.find((c) => c === data?.error) ?? "convertFailed");
  }
  return new Uint8Array(await res.arrayBuffer());
}

async function convertInBrowser(file: File, ext: string) {
  if (ext !== "docx") {
    throw new AppError("legacyFormat", { ext });
  }
  try {
    const { docxToPdfInBrowser } = await import("./docx-to-pdf");
    return await docxToPdfInBrowser(file);
  } catch (err) {
    console.error(err);
    throw new AppError("wordOpenFailed");
  }
}

export function formatBytes(n: number, lang: string) {
  const num = (v: number, digits: number) => new Intl.NumberFormat(lang, { maximumFractionDigits: digits }).format(v);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${num(n / 1024, 0)} kB`;
  return `${num(n / 1024 / 1024, 1)} MB`;
}
