import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// Word-dokumentum → PDF. Sorrend: LibreOffice (bárhol fut), majd Windowson a telepített Microsoft Word.

export class ConvertError extends Error {}

const run = (file: string, args: string[], timeout: number) =>
  new Promise<void>((resolve, reject) => {
    execFile(file, args, { timeout, windowsHide: true, maxBuffer: 4 * 1024 * 1024 }, (err, _out, stderr) => {
      if (err) reject(new ConvertError(stderr?.toString().trim() || err.message));
      else resolve();
    });
  });

function findSoffice(): string | null {
  const env = process.env.SOFFICE_PATH;
  if (env && existsSync(env)) return env;
  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\LibreOffice\\program\\soffice.exe",
          "C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe",
        ]
      : process.platform === "darwin"
        ? ["/Applications/LibreOffice.app/Contents/MacOS/soffice"]
        : ["/usr/bin/soffice", "/usr/bin/libreoffice", "/usr/local/bin/soffice", "/snap/bin/libreoffice"];
  return candidates.find((c) => existsSync(c)) ?? null;
}

let wordAvailable: boolean | null = null;
async function hasWord(): Promise<boolean> {
  if (process.platform !== "win32") return false;
  if (wordAvailable !== null) return wordAvailable;
  try {
    await run("reg", ["query", "HKCR\\Word.Application\\CurVer"], 8000);
    wordAvailable = true;
  } catch {
    wordAvailable = false;
  }
  return wordAvailable;
}

// A Word COM-példányokat egyesével futtatjuk, hogy ne induljon egyszerre több.
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(job: () => Promise<T>): Promise<T> {
  const next = queue.then(job, job);
  queue = next.catch(() => undefined);
  return next;
}

const WORD_SCRIPT = `
param([string]$In, [string]$Out)
$ErrorActionPreference = 'Stop'
$word = New-Object -ComObject Word.Application
try {
  $word.Visible = $false
  $word.DisplayAlerts = 0
  # A kamu jelszó miatt a védett fájl hibát dob, nem párbeszédablakot nyit.
  $doc = $word.Documents.Open($In, $false, $true, $false, '__nincs_jelszo__')
  try { $doc.ExportAsFixedFormat($Out, 17) } finally { $doc.Close(0) }
} finally {
  $word.Quit()
  [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($word)
}
`;

async function viaWord(input: string, output: string) {
  const script = path.join(path.dirname(input), "convert.ps1");
  await writeFile(script, "﻿" + WORD_SCRIPT, "utf8");
  await run(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", script, "-In", input, "-Out", output],
    90_000,
  );
}

/** Van-e a szerveren Word-átalakító? Vercelen nincs — ott a böngésző alakítja át a .docx-et. */
export async function serverConverterAvailable(): Promise<boolean> {
  if (process.env.DISABLE_SERVER_CONVERT === "1") return false;
  return findSoffice() !== null || (await hasWord());
}

export async function toPdf(bytes: Buffer, ext: string): Promise<Buffer> {
  if (!(await serverConverterAvailable())) throw new ConvertError("Ezen a szerveren nincs Word-átalakító.");
  const soffice = findSoffice();
  const word = !soffice && (await hasWord());
  if (!soffice && !word) {
    throw new ConvertError(
      "A Word-fájlok átalakításához LibreOffice vagy Microsoft Word kell a szerveren. PDF-et bármikor feltölthetsz.",
    );
  }

  return serial(async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "kezjegy-"));
    const input = path.join(dir, `dokumentum.${ext}`);
    const output = path.join(dir, "dokumentum.pdf");
    try {
      await writeFile(input, bytes);
      if (soffice) {
        await run(
          soffice,
          [`-env:UserInstallation=file:///${dir.replace(/\\/g, "/")}/profile`, "--headless", "--convert-to", "pdf", "--outdir", dir, input],
          90_000,
        );
      } else {
        await viaWord(input, output);
      }
      if (!existsSync(output)) throw new ConvertError("Az átalakítás nem hozott létre PDF-et.");
      return await readFile(output);
    } catch (err) {
      if (err instanceof ConvertError && /jelsz|password/i.test(err.message)) {
        throw new ConvertError("Ez a dokumentum jelszóval védett, így nem tudjuk megnyitni.");
      }
      throw err instanceof ConvertError ? new ConvertError("Nem sikerült PDF-fé alakítani a dokumentumot.") : err;
    } finally {
      await rm(dir, { recursive: true, force: true }).catch(() => undefined);
    }
  });
}
