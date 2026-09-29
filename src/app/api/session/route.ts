import { createSession, transport } from "@/lib/store";
import { phoneBaseUrls } from "@/lib/network";
import { defaultLocale, isLocale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { fileName?: unknown; lang?: unknown };
  const fileName = typeof body.fileName === "string" && body.fileName.trim() ? body.fileName.trim() : "dokumentum.pdf";
  const session = await createSession(fileName);
  const { primary, alternatives } = phoneBaseUrls(req);
  // A telefonos oldal ugyanazon a nyelven nyílik meg, mint a gépen.
  const lang = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : defaultLocale;
  return Response.json({
    session,
    transport,
    phoneUrl: `${primary}/${lang}/s/${session.id}`,
    alternatives: alternatives.map((a) => ({ label: a.label, url: `${a.url}/${lang}/s/${session.id}` })),
  });
}
