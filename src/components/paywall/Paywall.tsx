"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
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

type Step = { kind: "email" } | { kind: "pay"; clientSecret: string; email: string } | { kind: "login"; email: string; codeSent: boolean; note?: string };

function PaymentPanel() {
  const { lang, t } = useI18n();
  const text = t.paywall;
  const paywall = useApp((s) => s.paywall)!;
  const notify = useApp((s) => s.notify);
  const accountEmail = useAccount((s) => s.email);
  const [step, setStep] = useState<Step>({ kind: "email" });
  const [email, setEmail] = useState(accountEmail ?? "");
  const [consent, setConsent] = useState(false);
  const [consentWarning, setConsentWarning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(paywall.error ?? null);

  const days = PLAN.trialDays;
  const staticPrices: Prices = { today: formatMoney(PLAN.trialFeeCents, lang), monthly: formatMoney(PLAN.monthlyCents, lang) };

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { clientSecret } = await api<{ clientSecret: string }>("/api/checkout", {
        body: { email: email.trim(), locale: lang, returnPath: window.location.pathname },
      });
      setStep({ kind: "pay", clientSecret, email: email.trim() });
    } catch (failure) {
      if (failure instanceof ApiError && failure.code === "alreadySubscribed") {
        // Ezzel a címmel már fizet: fizetés helyett belép.
        await requestLoginCode(email.trim(), lang).catch(() => undefined);
        setStep({ kind: "login", email: email.trim(), codeSent: true, note: errorText(failure, t) });
      } else {
        setError(errorText(failure, t));
      }
    } finally {
      setBusy(false);
    }
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
      await unlocked();
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
        {step.kind !== "pay" && priceRow(staticPrices)}

        {!stripeConfigured() ? (
          <p className="mt-6 rounded-2xl bg-seal/10 p-4 text-[14px] text-seal">{text.notConfigured}</p>
        ) : step.kind === "email" ? (
          <form onSubmit={startCheckout} className="mt-6 space-y-3">
            <label className="block space-y-1.5">
              <span className="text-[13px] font-medium text-ink-2">{text.email}</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder={text.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
              />
              <span className="block text-[12px] text-ink-3">{text.emailHint}</span>
            </label>
            <button type="submit" className="btn btn-royal h-12 w-full text-[15px]" disabled={busy || !email.trim()}>
              {busy && <Spinner light />}
              {text.continue}
            </button>
            <p className="text-center text-[14px] text-ink-3">
              {text.haveAccount}{" "}
              <button type="button" className="font-medium text-royal hover:underline" onClick={() => setStep({ kind: "login", email: email.trim(), codeSent: false })}>
                {text.login}
              </button>
            </p>
          </form>
        ) : step.kind === "pay" ? (
          <div className="space-y-4">
            <StripeCheckout
              clientSecret={step.clientSecret}
              consent={consent}
              onConsentMissing={() => setConsentWarning(true)}
              onPaid={(sessionId) => void paid(sessionId)}
              renderPrices={(prices) => (
                <>
                  {priceRow(prices)}
                  <div className="flex items-center justify-between gap-3 pt-2 text-[14px]">
                    <span className="truncate text-ink-3">{step.email}</span>
                    <button type="button" className="shrink-0 font-medium text-royal hover:underline" onClick={() => setStep({ kind: "email" })}>
                      {text.change}
                    </button>
                  </div>
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
              )}
            />
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {step.note && <p className="rounded-2xl bg-royal-soft p-3.5 text-[14px] text-royal">{step.note}</p>}
            <LoginForm initialEmail={step.email} codeSent={step.codeSent} onSuccess={() => void unlocked()} />
            <button type="button" className="text-[14px] font-medium text-royal hover:underline" onClick={() => setStep({ kind: "email" })}>
              {text.backToPay}
            </button>
          </div>
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
