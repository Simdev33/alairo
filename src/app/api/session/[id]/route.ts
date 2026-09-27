import { addSignature, getMeta, markConnected, readDelta, setPreview } from "@/lib/store";

export const dynamic = "force-dynamic";

const MAX_PATH = 400_000;
const COLOR = /^#[0-9a-f]{6}$/i;
// Csak számok, szóköz, vessző, pont, mínusz és az általunk használt M/Q/L/Z parancsok.
const PATH = /^[MQLZ0-9 ,.\-]+$/;

type Body =
  | { type: "hello" }
  | { type: "preview"; d?: string; width?: number; height?: number; color?: string }
  | { type: "clear" }
  | { type: "signature"; d?: string; width?: number; height?: number; color?: string };

function validShape(b: { d?: unknown; width?: unknown; height?: unknown; color?: unknown }) {
  return (
    typeof b.d === "string" &&
    b.d.length > 0 &&
    b.d.length <= MAX_PATH &&
    PATH.test(b.d) &&
    typeof b.width === "number" &&
    typeof b.height === "number" &&
    b.width > 0 &&
    b.height > 0 &&
    b.width < 10_000 &&
    b.height < 10_000 &&
    typeof b.color === "string" &&
    COLOR.test(b.color)
  );
}

const noStore = { "Cache-Control": "no-store" };

/** A gép lekérdezése (Vercelen ez helyettesíti az SSE-t): csak akkor küld adatot, ha változott valami. */
export async function GET(req: Request, ctx: RouteContext<"/api/session/[id]">) {
  const { id } = await ctx.params;
  const url = new URL(req.url);
  const since = Number(url.searchParams.get("since")) || 0;
  const have = Number(url.searchParams.get("have")) || 0;
  const delta = await readDelta(id, since, have);
  if (delta === "expired") return Response.json({ error: "expired" }, { status: 404, headers: noStore });
  if (delta === null) return new Response(null, { status: 204, headers: noStore });
  return Response.json(delta, { headers: noStore });
}

export async function POST(req: Request, ctx: RouteContext<"/api/session/[id]">) {
  const { id } = await ctx.params;
  const meta = await getMeta(id);
  if (!meta) return Response.json({ error: "expired" }, { status: 404 });

  const body = (await req.json().catch(() => null)) as Body | null;
  if (!body || typeof body !== "object") return Response.json({ error: "bad_request" }, { status: 400 });

  switch (body.type) {
    case "hello":
      await markConnected(meta);
      return Response.json({ ok: true, fileName: meta.fileName });
    case "clear":
      await setPreview(meta, null);
      return Response.json({ ok: true });
    case "preview":
      if (!validShape(body)) return Response.json({ error: "bad_request" }, { status: 400 });
      await setPreview(meta, { d: body.d!, width: body.width!, height: body.height!, color: body.color!, at: Date.now() });
      return Response.json({ ok: true });
    case "signature": {
      if (!validShape(body)) return Response.json({ error: "bad_request" }, { status: 400 });
      const sig = await addSignature(meta, {
        d: body.d!,
        width: body.width!,
        height: body.height!,
        color: body.color!,
        source: "phone",
      });
      if (sig === "full") return Response.json({ error: "full" }, { status: 429 });
      return Response.json({ ok: true, id: sig.id });
    }
    default:
      return Response.json({ error: "bad_request" }, { status: 400 });
  }
}
