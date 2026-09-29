"use client";

import { useCallback, useEffect, useState } from "react";
import { useApp } from "@/lib/app-store";
import type { SessionDelta, SessionMeta, Transport } from "@/lib/types";
import { useI18n } from "@/i18n/client";

/**
 * Dokumentum betöltésekor QR-munkamenetet nyit, és követi a telefont.
 * Helyben Server-Sent Events, Vercelen (Redis) rövid lekérdezések — csak akkor jön adat, ha változott valami.
 */
export function usePhoneSession() {
  const doc = useApp((s) => s.doc);
  const setPhone = useApp((s) => s.setPhone);
  const addSignature = useApp((s) => s.addSignature);
  const { lang } = useI18n();
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!doc) return;
    const docName = doc.name;
    let stopped = false;
    let es: EventSource | null = null;
    let pollTimer: ReturnType<typeof setTimeout> | undefined;
    let expiryTimer: ReturnType<typeof setTimeout> | undefined;

    const expire = () => {
      stopped = true;
      es?.close();
      clearTimeout(pollTimer);
      setPhone({ status: "expired", connected: false, drawing: false, preview: null });
    };

    let lastChange = Date.now();
    const apply = (d: SessionDelta) => {
      lastChange = Date.now();
      setPhone({ connected: d.phoneConnected, drawing: d.drawing, preview: d.preview });
      d.signatures.forEach(addSignature);
    };

    const poll = (id: string) => {
      let version = 0;
      let have = 0;
      const tick = async () => {
        if (stopped) return;
        if (!document.hidden) {
          try {
            const res = await fetch(`/api/session/${id}?since=${version}&have=${have}`, { cache: "no-store" });
            if (res.status === 404) return expire();
            if (res.status === 200) {
              const d = (await res.json()) as SessionDelta;
              version = d.version;
              have = d.sigCount;
              apply(d);
            }
          } catch {}
        }
        if (stopped) return;
        // Rajzolás közben sűrűn, utána ritkábban kérdezünk — így a Redis-keret is kitart.
        const { drawing } = useApp.getState().phone;
        const idle = Date.now() - lastChange;
        pollTimer = setTimeout(tick, drawing ? 300 : idle < 20_000 ? 700 : idle < 5 * 60_000 ? 1800 : 4000);
      };
      tick();
    };

    const listen = (id: string) => {
      es = new EventSource(`/api/session/${id}/events`);
      es.addEventListener("state", (e) => apply(JSON.parse((e as MessageEvent).data) as SessionDelta));
    };

    setPhone({ status: "creating", connected: false, drawing: false, preview: null });

    (async () => {
      try {
        const res = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: docName, lang }),
        });
        if (!res.ok) throw new Error();
        const data = (await res.json()) as {
          session: SessionMeta;
          transport: Transport;
          phoneUrl: string;
          alternatives: { label: string; url: string }[];
        };
        if (stopped) return;
        const { session } = data;
        setPhone({
          status: "live",
          id: session.id,
          url: data.phoneUrl,
          alternatives: data.alternatives,
          expiresAt: session.expiresAt,
        });
        expiryTimer = setTimeout(expire, Math.max(0, session.expiresAt - Date.now()));
        if (data.transport === "sse") listen(session.id);
        else poll(session.id);
      } catch {
        if (!stopped) setPhone({ status: "error" });
      }
    })();

    return () => {
      stopped = true;
      clearTimeout(expiryTimer);
      clearTimeout(pollTimer);
      es?.close();
    };
  }, [doc, nonce, setPhone, addSignature, lang]);

  return { renew: useCallback(() => setNonce((n) => n + 1), []) };
}
