import { createSession, transport } from "@/lib/store";
import { phoneBaseUrls } from "@/lib/network";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { fileName?: unknown };
  const fileName = typeof body.fileName === "string" && body.fileName.trim() ? body.fileName.trim() : "dokumentum.pdf";
  const session = await createSession(fileName);
  const { primary, alternatives } = phoneBaseUrls(req);
  return Response.json({
    session,
    transport,
    phoneUrl: `${primary}/s/${session.id}`,
    alternatives: alternatives.map((a) => ({ label: a.label, url: `${a.url}/s/${session.id}` })),
  });
}
