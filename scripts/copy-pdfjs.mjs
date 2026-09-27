// A pdf.js workerét és segédfájljait (cmaps, betűk, wasm) a public/pdfjs mappába másolja,
// hogy a böngésző statikus fájlként érje el őket. A predev/prebuild futtatja.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules", "pdfjs-dist");
const dest = join(root, "public", "pdfjs");

const version = JSON.parse(readFileSync(join(src, "package.json"), "utf8")).version;
const stamp = join(dest, ".version");
if (existsSync(stamp) && readFileSync(stamp, "utf8") === version) process.exit(0);

mkdirSync(dest, { recursive: true });
cpSync(join(src, "build", "pdf.worker.min.mjs"), join(dest, "pdf.worker.min.mjs"));
for (const dir of ["cmaps", "standard_fonts", "wasm", "iccs"]) {
  if (existsSync(join(src, dir))) cpSync(join(src, dir), join(dest, dir), { recursive: true });
}
writeFileSync(stamp, version);
console.log(`pdf.js ${version} → public/pdfjs`);
