"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/client";
import { api, errorText, loadAccount } from "@/lib/account";
import { useApp } from "@/lib/app-store";
import { loadPending } from "@/lib/pending";
import { releaseResult } from "./Paywall";

/**
 * Visszatérés egy olyan fizetési módtól, amely elhagyta az oldalt (pl. PayPal):
 * belépés a lezárt Checkout Session-nel, majd az ezen az eszközön tárolt aláírt PDF átadása.
 */
export function CheckoutReturn() {
  const { lang, t } = useI18n();

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("checkout_session_id");
    if (!sessionId) return;
    url.searchParams.delete("checkout_session_id");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);

    const { notify, setPaywall } = useApp.getState();
    void (async () => {
      notify(t.paywall.returning);
      const pending = await loadPending();
      try {
        await api("/api/checkout/complete", { body: { sessionId, locale: lang } });
        const account = await loadAccount();
        if (!account.access?.active) throw new Error("no access");
        notify(t.paywall.success, "success");
        if (pending) releaseResult(pending);
      } catch (error) {
        const message = errorText(error, t);
        if (pending) setPaywall({ result: pending, expiresAt: pending.expiresAt, error: message });
        else notify(message, "error");
      }
    })();
    // Oldalbetöltésenként egyszer fut.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
