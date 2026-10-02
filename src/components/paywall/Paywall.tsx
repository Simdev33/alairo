"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { Check, CircleCheck, FileText, Lock, ShieldCheck, X } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { api, ApiError, errorText, loadAccount, requestLoginCode, useAccount } from "@/lib/account";
import { useApp } from "@/lib/app-store";
import { clearPending, type SignedResult } from "@/lib/pending";
import { formatMoney, PLAN } from "@/lib/plan";
import { openPdf } from "@/lib/pdf";
import { downloadBytes } from "@/lib/sign-pdf";
import { LinkText } from "@/components/LinkText";
import { LoginForm, fieldClass, Spinner } from "@/components/account/LoginForm";
import { StripeCheckout, stripeConfigured, type Prices } from "./StripeCheckout";

/** Fizetés után: bezárjuk az ablakot, letöltjük a fájlt, és megmutatjuk a „Kész” ablakot. */
export function releaseResult(result: SignedResult) {
  const { setPaywall, setDone } = useApp.getState();
  setPaywall(null);
  void clearPending();
  downloadBytes(result.data, result.name);
  setDone(result);
}

/**
 * Sikeres fizetés után: letöltjük a fájlt, és a köszönőoldalra lépünk (a Google Ads ott méri a konverziót).
 * Kliensoldali navigáció, így a tároló — és vele az aláírt fájl az „újra letöltéshez” — megmarad.
 */
export function completePurchase(result: SignedResult | null, navigate: (href: string) => void, lang: Locale) {
  const { setPaywall, setPurchased } = useApp.getState();
  setPaywall(null);
  void clearPending();
  if (result) downloadBytes(result.data, result.name);
  setPurchased(result);
  // Minden nyelven ugyanaz a cím; a nyelvet a süti viszi át (a proxy ez alapján szolgálja ki).
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
  navigate("/thank-you");
}

/** Előfizetés nélkül ez jelenik meg a letöltés helyett. */
export default function Paywall() {
  const paywall = useApp((s) => s.paywall);
  if (!paywall) return null;
  return <PaywallScreen key={paywall.expiresAt} />;
}

function PaywallScreen() {
  const { t } = useI18n();
  const paywall = useApp((s) => s.paywall)!;
  const setPaywall = useApp((s) => s.setPaywall);
  const close = () => {
    setPaywall(null);
    void clearPending();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal
      aria-label={t.paywall.label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-paper"
    >
      <Countdown expiresAt={paywall.expiresAt} onExpired={close} onClose={close} />
      <div className="mx-auto grid max-w-[1140px] gap-10 px-4 pb-20 pt-8 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-12">
        <section className="min-w-0">
          <h1 className="flex items-center gap-3 font-serif text-[2.2rem] leading-tight text-mint sm:text-[2.6rem]">
            <CircleCheck className="size-8 shrink-0" />
            {t.paywall.ready}
          </h1>
          <PreviewCard result={paywall.result} />
        </section>
        <section className="min-w-0">
          <PaymentPanel />
        </section>
      </div>
    </motion.div>
  );
}

function Countdown({ expiresAt, onExpired, onClose }: { expiresAt: number; onExpired: () => void; onClose: () => void }) {
  const { t } = useI18n();
  const notify = useApp((s) => s.notify);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const left = Math.max(0, expiresAt - now);
  const fired = useRef(false);
  useEffect(() => {
    if (left > 0 || fired.current) return;
    fired.current = true;
    notify(t.paywall.expired, "error");
    onExpired();
  }, [left, onExpired, notify, t.paywall.expired]);
  const minutes = Math.floor(left / 60_000);
  const seconds = Math.floor((left % 60_000) / 1000);
  return (
    <div className="sticky top-0 z-10 border-b border-mint/20 bg-mint-soft/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1140px] items-center gap-3 px-4 py-2.5 sm:px-8">
        <p className="flex flex-1 flex-wrap items-center justify-center gap-2 text-center text-[13.5px] text-mint">
          <ShieldCheck className="size-4 shrink-0" />
          {t.paywall.expires}
          <span className="rounded-md bg-mint/15 px-2 py-0.5 font-mono font-semibold tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
        </p>
        <button onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full text-mint hover:bg-mint/10" aria-label={t.common.close}>
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
}

/** Az aláírt PDF első oldala — hogy lásd, mit töltesz le. */
function PreviewCard({ result }: { result: SignedResult }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let revoked = false;
    let objectUrl: string | null = null;
    (async () => {
      const pdf = await openPdf(result.data);
      try {
        const page = await pdf.getPage(pdf.numPages);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: (560 * Math.min(window.devicePixelRatio || 1, 2)) / base.width });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvas, viewport, background: "#ffffff" }).promise;
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.88));
        if (blob) objectUrl = URL.createObjectURL(blob);
      } finally {
        void pdf.loadingTask.destroy();
      }
      if (revoked && objectUrl) URL.revokeObjectURL(objectUrl);
      else setUrl(objectUrl);
    })().catch((error) => console.warn("[paywall] preview failed", error));
    return () => {
      revoked = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [result]);

  return (
    <div className="mt-8">
      <div className="card relative rounded-[26px] p-6 sm:p-10">
        <span className="absolute left-4 top-4 rounded-md bg-seal px-2 py-1 text-[11px] font-bold tracking-wide text-white">PDF</span>
        <div className="mx-auto flex aspect-[4/3] max-w-sm items-center justify-center">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element -- helyi blob-előnézet
            <img
              src={url}
              alt=""
              className="max-h-full max-w-full rounded-[3px] bg-white object-contain shadow-[0_0_0_1px_rgb(17_19_28/0.08),0_18px_40px_-18px_rgb(17_19_28/0.45)]"
            />
          ) : (
            <div className="skeleton grid size-full place-items-center rounded-xl">
              <FileText className="size-8 text-ink-4" />
            </div>
          )}
        </div>
        <p className="mt-5 truncate text-center text-[14px] font-medium text-ink-2" title={result.name}>
          {result.name}
        </p>
      </div>
    </div>
  );
}

type Step = { kind: "pay" } | { kind: "login"; email: string; codeSent: boolean; note?: string };

function PaymentPanel() {
  const { lang, t } = useI18n();
  const text = t.paywall;
  const paywall = useApp((s) => s.paywall)!;
  const notify = useApp((s) => s.notify);
  const accountEmail = useAccount((s) => s.email);
  const router = useRouter();
  const [step, setStep] = useState<Step>({ kind: "pay" });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState(accountEmail ?? "");
  const [emailWarning, setEmailWarning] = useState(false);
  const [consent, setConsent] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  const [error, setError] = useState<string | null>(paywall.error ?? null);
  const emailRef = useRef<HTMLInputElement>(null);
  const requested = useRef(false);

  const days = PLAN.trialDays;
  const staticPrices: Prices = { today: formatMoney(PLAN.trialFeeCents, lang), monthly: formatMoney(PLAN.monthlyCents, lang) };

  // A fizetés rögtön látszik: a Checkout Session az ablakkal együtt jön létre (StrictMode alatt is csak egyszer).
  useEffect(() => {
    if (requested.current || !stripeConfigured()) return;
    requested.current = true;
    api<{ clientSecret: string }>("/api/checkout", { body: { locale: lang, returnPath: window.location.pathname } })
      .then((session) => setClientSecret(session.clientSecret))
      .catch((failure) => setError(errorText(failure, t)));
  }, [lang, t]);

  const checkEmail = async (address: string) => {
    setError(null);
    try {
      await api("/api/checkout/email", { body: { email: address, locale: lang } });
      return true;
    } catch (failure) {
      if (failure instanceof ApiError && failure.code === "alreadySubscribed") {
        // Ezzel a címmel már fizet: fizetés helyett belép.
        await requestLoginCode(address, lang).catch(() => undefined);
        setStep({ kind: "login", email: address, codeSent: true, note: errorText(failure, t) });
      } else {
        setError(errorText(failure, t));
      }
      return false;
    }
  };

  const emailMissing = () => {
    setEmailWarning(true);
    emailRef.current?.focus();
  };

  const unlocked = async () => {
    const account = await loadAccount().catch(() => null);
    if (account?.access?.active) {
      notify(text.success, "success");
      releaseResult(paywall.result);
    }
  };

  const paid = async (sessionId: string) => {
    try {
      await api("/api/checkout/complete", { body: { sessionId, locale: lang } });
      const account = await loadAccount().catch(() => null);
      if (account?.access?.active) completePurchase(paywall.result, router.push, lang);
    } catch (failure) {
      setError(errorText(failure, t));
    }
  };

  const priceRow = (prices: Prices) => (
    <div className="flex items-baseline justify-between gap-4 border-y border-ink/10 py-5">
      <span className="font-semibold">{fmt(text.priceLabel, { days })}</span>
      <span className="font-serif text-[2.4rem] leading-none tabular-nums">{prices.today}</span>
    </div>
  );

  const header = (prices: Prices) => (
    <>
      {priceRow(prices)}
      <label className="block space-y-1.5 pt-3">
        <span className="text-[13px] font-medium text-ink-2">{text.email}</span>
        <input
          ref={emailRef}
          type="email"
          autoComplete="email"
          placeholder={text.emailPlaceholder}
          value={email}
          aria-invalid={emailWarning}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailWarning(false);
          }}
          className={`${fieldClass} ${emailWarning ? "!border-seal/60" : ""}`}
        />
        {emailWarning ? (
          <span className="block text-[12px] text-seal">{t.server.invalidEmail}</span>
        ) : (
          <span className="block text-[12px] text-ink-3">{text.emailHint}</span>
        )}
      </label>
      <label
        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 text-[14px] leading-relaxed ${
          consentWarning && !consent ? "border-seal/40 bg-seal/[0.06]" : "border-ink/10 bg-sheet"
        }`}
      >
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setConsentWarning(false);
          }}
          className="mt-1 size-4 shrink-0 accent-[var(--color-royal)]"
        />
        <span>
          <LinkText text={text.consent} newTab />
        </span>
      </label>
      {consentWarning && !consent && <p className="text-[14px] text-seal">{text.consentNeeded}</p>}
      <p className="pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">{text.methods}</p>
    </>
  );

  const renewal = fmt(text.renewal, { days, next: days + 1, monthly: staticPrices.monthly ?? "" });

  return (
    <div>
      <h2 className="font-serif text-[2.6rem] leading-none tracking-[-0.01em] sm:text-[3rem]">{text.title}</h2>
      <p className="mt-6 text-[14px] font-semibold text-ink">{fmt(text.includes, { days })}</p>
      <ul className="mt-3 space-y-2.5">
        {text.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-ink-2">
            <Check className="mt-0.5 size-4 shrink-0 text-mint" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {!stripeConfigured() ? (
          <>
            {priceRow(staticPrices)}
            <p className="mt-6 rounded-2xl bg-seal/10 p-4 text-[14px] text-seal">{text.notConfigured}</p>
          </>
        ) : (
          <>
            {/* Belépés közben is csatolva marad, hogy a „Vissza a fizetéshez” ugyanazt a pénztárat mutassa. */}
            <div hidden={step.kind !== "pay"}>
              {clientSecret ? (
                <StripeCheckout
                  clientSecret={clientSecret}
                  consent={consent}
                  onConsentMissing={() => setConsentWarning(true)}
                  email={email}
                  onEmailMissing={emailMissing}
                  checkEmail={checkEmail}
                  onPaid={(sessionId) => void paid(sessionId)}
                  renderPrices={header}
                />
              ) : (
                <>
                  {priceRow(staticPrices)}
                  {!error && (
                    <p className="flex items-center gap-2 py-6 text-[14px] text-ink-3">
                      <Spinner /> {text.loading}
                    </p>
                  )}
                </>
              )}
              <p className="mt-4 text-center text-[14px] text-ink-3">
                {text.haveAccount}{" "}
                <button type="button" className="font-medium text-royal hover:underline" onClick={() => setStep({ kind: "login", email: email.trim(), codeSent: false })}>
                  {text.login}
                </button>
              </p>
            </div>

            {step.kind === "login" && (
              <>
                {priceRow(staticPrices)}
                <div className="mt-6 space-y-3">
                  {step.note && <p className="rounded-2xl bg-royal-soft p-3.5 text-[14px] text-royal">{step.note}</p>}
                  <LoginForm initialEmail={step.email} codeSent={step.codeSent} onSuccess={() => void unlocked()} />
                  <button type="button" className="text-[14px] font-medium text-royal hover:underline" onClick={() => setStep({ kind: "pay" })}>
                    {text.backToPay}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {error && <p className="mt-4 text-[14px] text-seal">{error}</p>}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <Lock className="size-3.5" /> {text.ssl}
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" /> {text.stripe}
        </span>
        <span className="flex items-center gap-1.5">
          <Check className="size-3.5" /> {text.cancelAnytime}
        </span>
      </div>
      <p className="mt-5 rounded-2xl border border-ink/10 bg-sheet p-4 text-[12.5px] leading-relaxed text-ink-3">
        <LinkText text={renewal} newTab />
      </p>
    </div>
  );
}
