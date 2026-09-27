import { randomBytes } from "node:crypto";
import { kv } from "./kv";
import type { LivePreview, SessionDelta, SessionMeta, Signature, Transport } from "./types";

// Telefonos munkamenetek. A dokumentum sosem kerül ide, csak a telefonon rajzolt aláírás.
// Helyben memóriában, Vercelen Upstash Redisben — a kulcsok egy óra után maguktól törlődnek.

export const SESSION_TTL_MS = 60 * 60 * 1000;
export const MAX_SIGNATURES = 20;

const K = {
  meta: (id: string) => `kz:m:${id}`,
  connected: (id: string) => `kz:c:${id}`,
  preview: (id: string) => `kz:p:${id}`,
  sigs: (id: string) => `kz:g:${id}`,
  version: (id: string) => `kz:v:${id}`,
};

export const transport: Transport = kv.kind === "memory" ? "sse" : "poll";

// Helyi (memóriás) módban az SSE-kapcsolatok innen kapnak jelzést a változásról.
type Listener = () => void;
const g = globalThis as unknown as { __kezjegyListeners?: Map<string, Set<Listener>> };
const listeners = (g.__kezjegyListeners ??= new Map());

export function subscribe(id: string, fn: Listener) {
  const set = listeners.get(id) ?? new Set<Listener>();
  set.add(fn);
  listeners.set(id, set);
  return () => {
    set.delete(fn);
    if (!set.size) listeners.delete(id);
  };
}

function changed(id: string) {
  for (const fn of listeners.get(id) ?? []) fn();
}

const ttl = (meta: SessionMeta) => Math.max(1000, meta.expiresAt - Date.now());

export async function createSession(fileName: string): Promise<SessionMeta> {
  const meta: SessionMeta = {
    id: randomBytes(12).toString("base64url"),
    fileName: fileName.slice(0, 160),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  await kv.pipeline([
    ["SET", K.meta(meta.id), JSON.stringify(meta), "PX", SESSION_TTL_MS],
    ["SET", K.version(meta.id), 1, "PX", SESSION_TTL_MS],
  ]);
  return meta;
}

export async function getMeta(id: string): Promise<SessionMeta | null> {
  if (!/^[\w-]{8,40}$/.test(id)) return null;
  const [raw] = await kv.pipeline([["GET", K.meta(id)]]);
  return typeof raw === "string" ? (JSON.parse(raw) as SessionMeta) : null;
}

/**
 * Az állapot a `since` verzió óta — `null`, ha nem változott.
 * `have`: ennyi aláírást ismer már a kliens, csak az utána jövőket küldjük.
 */
export async function readDelta(id: string, since = 0, have = 0): Promise<SessionDelta | "expired" | null> {
  const [v] = await kv.pipeline([["GET", K.version(id)]]);
  if (v === null || v === undefined) return "expired";
  const version = Number(v);
  if (since && version === since) return null;

  const [meta, connected, preview, sigs] = await kv.pipeline([
    ["GET", K.meta(id)],
    ["GET", K.connected(id)],
    ["GET", K.preview(id)],
    ["LRANGE", K.sigs(id), 0, -1],
  ]);
  if (typeof meta !== "string") return "expired";
  const all = (sigs as string[]).map((s) => JSON.parse(s) as Signature);
  const p = typeof preview === "string" ? (JSON.parse(preview) as LivePreview) : null;
  return {
    ...(JSON.parse(meta) as SessionMeta),
    version,
    phoneConnected: connected === "1",
    drawing: p !== null,
    preview: p,
    sigCount: all.length,
    signatures: have <= all.length ? all.slice(have) : all,
  };
}

export async function markConnected(meta: SessionMeta) {
  await kv.pipeline([
    ["SET", K.connected(meta.id), 1, "PX", ttl(meta)],
    ["INCR", K.version(meta.id)],
  ]);
  changed(meta.id);
}

export async function setPreview(meta: SessionMeta, preview: LivePreview | null) {
  await kv.pipeline([
    preview ? ["SET", K.preview(meta.id), JSON.stringify(preview), "PX", ttl(meta)] : ["DEL", K.preview(meta.id)],
    ["SET", K.connected(meta.id), 1, "PX", ttl(meta)],
    ["INCR", K.version(meta.id)],
  ]);
  changed(meta.id);
}

export async function addSignature(
  meta: SessionMeta,
  sig: Omit<Signature, "id" | "createdAt">,
): Promise<Signature | "full"> {
  const full: Signature = { ...sig, id: randomBytes(6).toString("base64url"), createdAt: Date.now() };
  const [len] = await kv.pipeline([["RPUSH", K.sigs(meta.id), JSON.stringify(full)]]);
  if (Number(len) > MAX_SIGNATURES) {
    await kv.pipeline([["RPOP", K.sigs(meta.id)]]);
    return "full";
  }
  await kv.pipeline([
    ["PEXPIRE", K.sigs(meta.id), ttl(meta)],
    ["DEL", K.preview(meta.id)],
    ["SET", K.connected(meta.id), 1, "PX", ttl(meta)],
    ["INCR", K.version(meta.id)],
  ]);
  changed(meta.id);
  return full;
}
