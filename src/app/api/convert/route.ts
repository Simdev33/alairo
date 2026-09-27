import { ConvertError, serverConverterAvailable, toPdf } from "@/lib/convert";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const MAX_BYTES = 25 * 1024 * 1024;
const EXTENSIONS = new Set(["doc", "docx", "odt", "rtf"]);

/** Megmondja a kliensnek, hogy itt a szerver alakít-e, vagy a böngészőnek kell. */
export async function GET() {
  return Response.json({ available: await serverConverterAvailable() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!(await serverConverterAvailable())) return Response.json({ error: "unavailable" }, { status: 501 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Nem érkezett fájl." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "A fájl legfeljebb 25 MB lehet." }, { status: 413 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!EXTENSIONS.has(ext)) return Response.json({ error: "Csak Word-dokumentumot tudunk átalakítani." }, { status: 415 });

  try {
    const pdf = await toPdf(Buffer.from(await file.arrayBuffer()), ext);
    return new Response(new Uint8Array(pdf), {
      headers: { "Content-Type": "application/pdf", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof ConvertError ? err.message : "Váratlan hiba történt az átalakítás közben.";
    if (!(err instanceof ConvertError)) console.error("[convert]", err);
    return Response.json({ error: message }, { status: 422 });
  }
}
