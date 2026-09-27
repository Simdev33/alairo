"use client";

// .docx → PDF a böngészőben, ha a szerveren nincs Word-átalakító (pl. Vercelen).
// A docx-preview oldalanként HTML-be rendereli a dokumentumot (a Word által mentett oldaltöréseket is követve),
// ezeket képpé alakítjuk, és egy-egy PDF-oldalra tesszük. A szöveg így nem lesz kijelölhető, de az aláíráshoz ez elég.

const PX_TO_PT = 0.75;
const RENDER_SCALE = 2;

// A docx-preview tartalék nélkül írja ki a betűcsaládot (pl. „Aptos”), így ha a gépen nincs meg,
// a böngésző Times New Romant tenne helyette. Hasonló jellegű tartalékot fűzünk mindegyik mögé.
const GENERIC = /(^|,)\s*(serif|sans-serif|monospace|cursive|fantasy|system-ui)\s*$/i;
const SERIFISH = /times|cambria|georgia|garamond|antiqua|palatino|minion|constantia|serif|bookman|century/i;
const MONO = /courier|consolas|mono/i;

function withFallback(value: string) {
  const v = value.trim().replace(/\s*!important$/, "");
  if (!v || GENERIC.test(v) || v.startsWith("var(")) return value;
  const fallback = MONO.test(v)
    ? "Consolas, 'Courier New', monospace"
    : SERIFISH.test(v)
      ? "Cambria, Georgia, 'Times New Roman', serif"
      : "Calibri, Carlito, 'Segoe UI', Arial, sans-serif";
  return `${v}, ${fallback}`;
}

function addFontFallbacks(root: HTMLElement) {
  for (const style of Array.from(root.querySelectorAll("style"))) {
    style.textContent = (style.textContent ?? "")
      .replace(/(font-family\s*:\s*)([^;{}]+)/gi, (_, p: string, v: string) => p + withFallback(v))
      .replace(/(--docx-\w+-font\s*:\s*)([^;{}]+)/g, (_, p: string, v: string) => p + withFallback(v));
  }
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("[style*='font-family']"))) {
    el.style.fontFamily = withFallback(el.style.fontFamily);
  }
}

const toBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("canvas"))), "image/jpeg", 0.9));

export async function docxToPdfInBrowser(file: Blob): Promise<Uint8Array> {
  const [{ renderAsync }, { toCanvas }, { PDFDocument }] = await Promise.all([
    import("docx-preview"),
    import("html-to-image"),
    import("pdf-lib"),
  ]);

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;left:-100000px;top:0;pointer-events:none;background:#fff;";
  document.body.appendChild(host);

  try {
    await renderAsync(file, host, host, {
      inWrapper: false,
      breakPages: true,
      ignoreLastRenderedPageBreak: false,
      useBase64URL: true,
      renderHeaders: true,
      renderFooters: true,
      experimental: true,
    });
    addFontFallbacks(host);
    await document.fonts.ready;

    const sections = Array.from(host.querySelectorAll<HTMLElement>("section.docx"));
    if (!sections.length) throw new Error("Üres dokumentum");

    const pdf = await PDFDocument.create();
    for (const section of sections) {
      section.style.background = "#fff";
      const width = section.offsetWidth;
      const pageHeight = parseFloat(getComputedStyle(section).minHeight) || (width * 297) / 210;
      const canvas = await toCanvas(section, {
        pixelRatio: RENDER_SCALE,
        backgroundColor: "#ffffff",
        skipFonts: true,
        width,
        height: section.offsetHeight,
      });
      const k = canvas.width / width;

      // Ha a tartalom túlnyúlik egy oldalon (nincs mentett oldaltörés), oldalmagasságonként szeleteljük.
      const pages = Math.max(1, Math.ceil((section.offsetHeight - 4) / pageHeight));
      for (let i = 0; i < pages; i++) {
        const slice = document.createElement("canvas");
        slice.width = canvas.width;
        slice.height = Math.round(pageHeight * k);
        const ctx = slice.getContext("2d")!;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, -Math.round(i * pageHeight * k));
        const img = await pdf.embedJpg(new Uint8Array(await (await toBlob(slice)).arrayBuffer()));
        const page = pdf.addPage([width * PX_TO_PT, pageHeight * PX_TO_PT]);
        page.drawImage(img, { x: 0, y: 0, width: width * PX_TO_PT, height: pageHeight * PX_TO_PT });
      }
    }
    return await pdf.save();
  } finally {
    host.remove();
  }
}
