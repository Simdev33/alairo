// Parancsalapú kulcs-érték tár: Upstash Redis (Vercelen), vagy memóriában futó utánzata helyben.
// A munkamenet-logika csak ezt a néhány Redis-parancsot használja: SET (PX), GET, DEL, INCR, RPUSH, RPOP, LRANGE, PEXPIRE.

export type Cmd = (string | number)[];
export interface KV {
  kind: "memory" | "redis";
  pipeline(cmds: Cmd[]): Promise<unknown[]>;
}

type Entry = { v: string | string[]; exp: number };

class MemoryKV implements KV {
  kind = "memory" as const;
  private data = new Map<string, Entry>();

  private live(key: string): Entry | undefined {
    const e = this.data.get(key);
    if (e && e.exp && e.exp < Date.now()) {
      this.data.delete(key);
      return undefined;
    }
    return e;
  }

  private exec([name, ...args]: Cmd): unknown {
    const key = String(args[0]);
    switch (String(name).toUpperCase()) {
      case "SET": {
        const px = String(args[2] ?? "").toUpperCase() === "PX" ? Number(args[3]) : 0;
        this.data.set(key, { v: String(args[1]), exp: px ? Date.now() + px : 0 });
        return "OK";
      }
      case "GET": {
        const e = this.live(key);
        return typeof e?.v === "string" ? e.v : null;
      }
      case "DEL":
        return args.reduce<number>((n, k) => n + (this.data.delete(String(k)) ? 1 : 0), 0);
      case "INCR": {
        const e = this.live(key);
        const next = (e ? Number(e.v) : 0) + 1;
        this.data.set(key, { v: String(next), exp: e?.exp ?? 0 });
        return next;
      }
      case "RPUSH": {
        const e = this.live(key);
        const list = Array.isArray(e?.v) ? e.v : [];
        list.push(...args.slice(1).map(String));
        this.data.set(key, { v: list, exp: e?.exp ?? 0 });
        return list.length;
      }
      case "RPOP": {
        const e = this.live(key);
        return Array.isArray(e?.v) ? (e.v.pop() ?? null) : null;
      }
      case "LRANGE": {
        const e = this.live(key);
        if (!Array.isArray(e?.v)) return [];
        const len = e.v.length;
        const norm = (i: number) => (i < 0 ? len + i : i);
        return e.v.slice(Math.max(0, norm(Number(args[1]))), norm(Number(args[2])) + 1);
      }
      case "PEXPIRE": {
        const e = this.live(key);
        if (!e) return 0;
        e.exp = Date.now() + Number(args[1]);
        return 1;
      }
      default:
        throw new Error(`MemoryKV: ismeretlen parancs ${name}`);
    }
  }

  async pipeline(cmds: Cmd[]) {
    // Időnként kisöpörjük a lejárt kulcsokat
    if (Math.random() < 0.02) for (const k of this.data.keys()) this.live(k);
    return cmds.map((c) => this.exec(c));
  }
}

class UpstashKV implements KV {
  kind = "redis" as const;
  constructor(
    private url: string,
    private token: string,
  ) {}

  async pipeline(cmds: Cmd[]) {
    const res = await fetch(`${this.url.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds.map((c) => c.map(String))),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Upstash ${res.status}: ${await res.text()}`);
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    return out.map((r) => {
      if (r.error) throw new Error(`Upstash: ${r.error}`);
      return r.result;
    });
  }
}

const g = globalThis as unknown as { __kezjegyKV?: KV };

/**
 * Az Upstash konzol UPSTASH_REDIS_REST_* néven, a Vercel-integráció <ELŐTAG>_REST_API_* néven adja
 * (az előtag a bekötéskor választható, pl. KV vagy STORAGE) — bármelyiket elfogadjuk.
 */
function findUpstash(): { url: string; token: string } | null {
  const env = process.env;
  if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
    return { url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN };
  }
  const prefixes = Object.keys(env)
    .map((k) => k.match(/^(.*)_REST_API_URL$/)?.[1])
    .filter((p): p is string => !!p && !!env[`${p}_REST_API_TOKEN`])
    .sort((a, b) => (a === "KV" ? -1 : b === "KV" ? 1 : 0));
  const p = prefixes[0];
  return p ? { url: env[`${p}_REST_API_URL`]!, token: env[`${p}_REST_API_TOKEN`]! } : null;
}

function create(): KV {
  const upstash = findUpstash();
  if (upstash) return new UpstashKV(upstash.url, upstash.token);
  if (process.env.VERCEL) {
    console.warn(
      "[kézjegy] Vercelen fut Redis nélkül — a telefonos munkamenetek nem lesznek megbízhatók. Kösd be az Upstash Redist.",
    );
  }
  return new MemoryKV();
}

export const kv: KV = (g.__kezjegyKV ??= create());
