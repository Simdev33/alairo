/**
 * Legjobb szándékú, példányonkénti kéréskorlát (a serverless példányok nem
 * osztoznak rajta). A kemény korlát máshol van: kódonként 5 próba a Stripe-metaadatban.
 */
const hits = new Map<string, number[]>();

export function limited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [entry, times] of hits) if (!times.some((time) => now - time < windowMs)) hits.delete(entry);
  return false;
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}
