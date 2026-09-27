import { readDelta, subscribe, transport } from "@/lib/store";

export const dynamic = "force-dynamic";

// Server-Sent Events helyi (memóriás) módban: a gép azonnal értesül a telefon állapotáról.
// Vercelen (Redis) a kliens helyette a GET /api/session/[id] lekérdezést használja.
export async function GET(req: Request, ctx: RouteContext<"/api/session/[id]/events">) {
  const { id } = await ctx.params;
  if (transport !== "sse") return Response.json({ error: "use_poll" }, { status: 409 });
  const first = await readDelta(id);
  if (!first || first === "expired") return Response.json({ error: "expired" }, { status: 404 });

  const enc = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let have = first.sigCount;
      let version = first.version;
      let busy = false;
      let again = false;

      const write = (chunk: string) => {
        try {
          controller.enqueue(enc.encode(chunk));
        } catch {
          cleanup();
        }
      };
      const send = (data: unknown) => write(`event: state\ndata: ${JSON.stringify(data)}\n\n`);

      // Egyszerre egy olvasás; ha közben újabb változás jön, utána még egyszer olvasunk.
      const push = async () => {
        if (busy) {
          again = true;
          return;
        }
        busy = true;
        try {
          const delta = await readDelta(id, version, have);
          if (delta === "expired") return cleanup();
          if (delta) {
            version = delta.version;
            have = delta.sigCount;
            send(delta);
          }
        } finally {
          busy = false;
          if (again) {
            again = false;
            push();
          }
        }
      };

      write("retry: 2000\n\n");
      send(first);
      const unsubscribe = subscribe(id, push);
      const heartbeat = setInterval(() => write(": ping\n\n"), 15_000);

      cleanup = () => {
        clearInterval(heartbeat);
        unsubscribe();
        try {
          controller.close();
        } catch {}
      };
      req.signal.addEventListener("abort", () => cleanup());
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "X-Accel-Buffering": "no",
    },
  });
}
