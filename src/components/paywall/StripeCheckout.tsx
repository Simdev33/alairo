"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CheckoutElementsProvider, ExpressCheckoutElement, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import { loadStripe, type Appearance, type Stripe, type StripeConstructorOptions } from "@stripe/stripe-js";
import { CreditCard, Lock } from "lucide-react";
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

/**
 * Egy Checkout Session fizetési módjai: expressz gombok (Apple Pay, Google Pay,
 * PayPal, Link) és a kártyaűrlap egy gomb mögött. A `consent` nélkül egyik sem használható.
 */
export function StripeCheckout({
  clientSecret,
  consent,
  onConsentMissing,
  onPaid,
  renderPrices,
}: {
  clientSecret: string;
  consent: boolean;
  onConsentMissing: () => void;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
}) {
  const { lang } = useI18n();
  const stripe = useMemo(() => stripeFor(lang), [lang]);
  const options = useMemo(() => ({ clientSecret, elementsOptions: { appearance: appearance() } }), [clientSecret]);
  return (
    <CheckoutElementsProvider stripe={stripe} options={options}>
      <PaymentMethods consent={consent} onConsentMissing={onConsentMissing} onPaid={onPaid} renderPrices={renderPrices} />
    </CheckoutElementsProvider>
  );
}

function PaymentMethods({
  consent,
  onConsentMissing,
  onPaid,
  renderPrices,
}: {
  consent: boolean;
  onConsentMissing: () => void;
  onPaid: (sessionId: string) => void;
  renderPrices: (prices: Prices) => ReactNode;
}) {
  const state = useCheckoutElements();
  const { lang, t } = useI18n();
  const text = t.paywall;
  const [cardOpen, setCardOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (state.type === "loading") {
    return (
      <p className="flex items-center gap-2 py-6 text-[14px] text-ink-3">
        <Spinner /> {text.loading}
      </p>
    );
  }
  if (state.type === "error") return <p className="py-4 text-[14px] text-seal">{state.error.message}</p>;

  const { checkout } = state;
  // A Stripe saját szövegei egyes nyelveken „2,99 EUR” alakúak; az összegeket az oldal többi részével egyformán formázzuk.
  const money = (minor: number) =>
    new Intl.NumberFormat(lang, { style: "currency", currency: checkout.currency.toUpperCase(), currencyDisplay: "narrowSymbol" }).format(
      minor / checkout.minorUnitsAmountDivisor,
    );
  const prices: Prices = {
    today: money(checkout.total.total.minorUnitsAmount),
    monthly: checkout.recurring ? money(checkout.recurring.dueNext.total.minorUnitsAmount) : null,
  };

  const confirm = async (extra: Parameters<typeof checkout.confirm>[0] = {}) => {
    if (!consent) {
      onConsentMissing();
      return;
    }
    setBusy(true);
    setError(null);
    const result = await checkout.confirm({ redirect: "if_required", ...extra });
    if (result.type === "error") {
      setError(result.error.message);
      setBusy(false);
      return;
    }
    onPaid(result.session.id);
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
            onConfirm={(event) => void confirm({ expressCheckoutConfirmEvent: event })}
          />
          {cardOpen ? (
            <div className="space-y-3 rounded-2xl border border-ink/10 bg-sheet p-4">
              <PaymentElement options={{ layout: "tabs" }} />
              <button className="btn btn-royal h-12 w-full text-[15px]" disabled={busy} onClick={() => void confirm()}>
                {busy ? <Spinner light /> : <Lock className="size-4" />}
                {fmt(text.pay, { amount: prices.today })}
              </button>
            </div>
          ) : (
            <button className="btn btn-primary h-12 w-full text-[15px]" onClick={() => setCardOpen(true)}>
              <CreditCard className="size-4" />
              {text.card}
            </button>
          )}
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
