"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { CheckoutElementsProvider, ExpressCheckoutElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import { loadStripe, type Appearance, type Stripe, type StripeConstructorOptions, type StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { Lock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { Spinner } from "@/components/account/LoginForm";

const stripes = new Map<Locale, Promise<Stripe | null>>();

function stripeFor(locale: Locale) {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  let promise = stripes.get(locale);
  if (!promise) {
    // developerTools: teszt-kulcsoknál a Stripe.js a „stripe >” segédjelvényt minden oldal sarkába kitenné.
    promise = loadStripe(key, { locale: locale as StripeConstructorOptions["locale"], developerTools: { assistant: { enabled: false } } });
    stripes.set(locale, promise);
  }
  return promise;
}

export const stripeConfigured = () => Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

/** A Stripe iframe-jei nem látják a CSS-változóinkat, ezért a színeket átadjuk. */
function appearance(): Appearance {
  const css = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    theme: "stripe",
    variables: {
      colorPrimary: token("--color-royal", "#2b36e8"),
      colorBackground: token("--color-sheet", "#fffdf8"),
      colorText: token("--color-ink", "#11131c"),
      colorDanger: token("--color-seal", "#b93a26"),
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
      borderRadius: "12px",
    },
  };
}

export interface Prices {
  today: string;
  monthly: string | null;
}


/** Elég a formai ellenőrzés — a szerver és a Stripe úgyis újra megnézi. */
export const looksLikeEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

interface CheckoutProps {
  consent: boolean;
  onConsentMissing: () => void;
  /** A szülő mezőjéből; a kártyás fizetés ezzel megy. */
  email: string;
  onEmailMissing: () => void;
  /** Fizetés előtt: false, ha ezzel a címmel nem kell fizetni (már előfizető), vagy hiba volt. */
  checkEmail: (email: string) => Promise<boolean>;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
}

/**
 * Egy Checkout Session fizetési módjai: expressz gombok (Apple Pay, Google Pay,
 * PayPal, Link) és az eleve kinyitott kártyaűrlap. A `consent` nélkül egyik sem használható.
 */
export function StripeCheckout({ clientSecret, ...props }: CheckoutProps & { clientSecret: string }) {
  const { lang } = useI18n();
  const stripe = useMemo(() => stripeFor(lang), [lang]);
  const options = useMemo(() => ({ clientSecret, elementsOptions: { appearance: appearance() } }), [clientSecret]);
  return (
    <CheckoutElementsProvider stripe={stripe} options={options}>
      <PaymentMethods {...props} />
    </CheckoutElementsProvider>
  );
}

function PaymentMethods({ consent, onConsentMissing, email, onEmailMissing, checkEmail, onPaid, renderPrices }: CheckoutProps) {
  const state = useCheckoutElements();
  const { lang, t } = useI18n();
  const text = t.paywall;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // A beírt címet a Stripe is megkapja, így a Link-mentés mezője kitöltve jelenik meg.
  const checkout = state.type === "success" ? state.checkout : null;
  useEffect(() => {
    const address = email.trim();
    if (!checkout || !looksLikeEmail(address)) return;
    const timer = setTimeout(() => {
      void checkout.updateEmail(address).then((result) => result.type === "error" && console.warn("[checkout] updateEmail:", result.error.message));
    }, 700);
    return () => clearTimeout(timer);
  }, [checkout, email]);

  if (state.type === "loading") {
    return (
      <p className="flex items-center gap-2 py-6 text-[14px] text-ink-3">
        <Spinner /> {text.loading}
      </p>
    );
  }
  if (state.type === "error" || !checkout) return <p className="py-4 text-[14px] text-seal">{state.type === "error" ? state.error.message : null}</p>;

  // A Stripe saját szövegei egyes nyelveken „2,99 EUR” alakúak; az összegeket az oldal többi részével egyformán formázzuk.
  const money = (minor: number) =>
    new Intl.NumberFormat(lang, { style: "currency", currency: checkout.currency.toUpperCase(), currencyDisplay: "narrowSymbol" }).format(
      minor / checkout.minorUnitsAmountDivisor,
    );
  const prices: Prices = {
    today: money(checkout.total.total.minorUnitsAmount),
    monthly: checkout.recurring ? money(checkout.recurring.dueNext.total.minorUnitsAmount) : null,
  };

  const finish = async (confirmation: Parameters<typeof checkout.confirm>[0]) => {
    const result = await checkout.confirm({ redirect: "if_required", ...confirmation });
    if (result.type === "error") {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    onPaid(result.session.id);
  };

  const payByCard = async () => {
    if (!consent) return onConsentMissing();
    const address = email.trim();
    if (!looksLikeEmail(address)) return onEmailMissing();
    setBusy(true);
    setError(null);
    if (!(await checkEmail(address))) return setBusy(false);
    await finish({ email: address });
  };

  const payExpress = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    // Az expressz fizetésnél a címet a pénztárca adja.
    const address = event.billingDetails?.email ?? email.trim();
    setBusy(true);
    setError(null);
    if (looksLikeEmail(address) && !(await checkEmail(address))) {
      event.paymentFailed({ reason: "fail" });
      return setBusy(false);
    }
    await finish({ expressCheckoutConfirmEvent: event });
  };

  return (
    <div className="space-y-3">
      {renderPrices(prices)}

      <div className="relative">
        {/* Az expressz gombokat nem lehet feltartóztatni, ezért a hozzájárulásig le vannak tiltva. */}
        <div className={`space-y-3 transition-opacity ${consent ? "" : "pointer-events-none opacity-45"}`} aria-disabled={!consent}>
          <ExpressCheckoutElement
            options={{
              buttonHeight: 48,
              buttonTheme: undefined,
              paymentMethods: undefined,
              buttonType: { applePay: "plain", googlePay: "plain", paypal: "paypal" },
              layout: { maxColumns: 1, maxRows: 6, overflow: "never" },
              paymentMethodOrder: ["apple_pay", "google_pay", "paypal", "link"],
            }}
            onConfirm={(event) => void payExpress(event)}
          />
          <div className="space-y-3 rounded-2xl border border-ink/10 bg-sheet p-4">
            <PaymentElement options={{ layout: "tabs" }} />
            <button className="btn btn-royal h-12 w-full text-[15px]" disabled={busy} onClick={() => void payByCard()}>
              {busy ? <Spinner light /> : <Lock className="size-4" />}
              {fmt(text.pay, { amount: prices.today })}
            </button>
          </div>
        </div>
        {!consent && <button type="button" aria-label={text.consentNeeded} className="absolute inset-0 cursor-not-allowed" onClick={onConsentMissing} />}
      </div>

      {busy && !error && (
        <p className="flex items-center gap-2 text-[14px] text-ink-3">
          <Spinner /> {text.processing}
        </p>
      )}
      {error && <p className="text-[14px] text-seal">{error}</p>}
    </div>
  );
}
