"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleUserRound, CreditCard, LogOut, PenLine } from "lucide-react";
import { localePath, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { errorText, loadAccount, openBillingPortal, signOut, useAccount, type AccessInfo } from "@/lib/account";
import { formatMoney, PLAN } from "@/lib/plan";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LoginForm, Spinner } from "./LoginForm";

function statusText(access: AccessInfo | null, lang: Locale, text: Dictionary["account"]) {
  const date = (seconds: number | null) => (seconds ? new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(seconds * 1000)) : "–");
  const monthly = formatMoney(PLAN.monthlyCents, lang);
  if (!access || !["trialing", "active", "past_due"].includes(access.status)) return text.none;
  if (access.status === "past_due") return text.pastDue;
  if (access.cancelAtPeriodEnd) return fmt(text.canceling, { date: date(access.periodEnd) });
  if (access.status === "trialing") return fmt(text.trial, { date: date(access.trialEnd), monthly });
  return fmt(text.active, { date: date(access.periodEnd), monthly });
}

export function AccountPage() {
  const { lang, t } = useI18n();
  const text = t.account;
  const account = useAccount();
  const [busy, setBusy] = useState<"portal" | "logout" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAccount().catch(() => setError(text.error));
  }, [text.error]);

  const act = async (kind: "portal" | "logout") => {
    setBusy(kind);
    setError(null);
    try {
      if (kind === "portal") await openBillingPortal(lang, localePath(lang, "/account"));
      else await signOut();
    } catch (failure) {
      setError(errorText(failure, t));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="min-h-dvh bg-paper">
      <header className="border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-4 px-4 sm:px-8">
          <Link href={localePath(lang)} aria-label={t.legal.backHome}>
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Link href={localePath(lang)} className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink sm:block">
              ← {t.legal.backHome}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-md px-4 pb-24 pt-14 sm:pt-20">
          <span className="grid size-12 place-items-center rounded-2xl bg-ink text-sheet shadow-[0_12px_24px_-12px_rgb(17_19_28/0.7)]">
            <CircleUserRound className="size-6" />
          </span>
          <h1 className="mt-6 font-serif text-[2.8rem] leading-none tracking-[-0.01em]">{account.signedIn ? text.title : t.auth.title}</h1>

          <div className="card mt-8 rounded-[24px] p-6">
            {!account.loaded && !error ? (
              <p className="flex items-center gap-2 text-[14px] text-ink-3">
                <Spinner /> {text.loading}
              </p>
            ) : account.signedIn ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
                  <p className="text-[13px] text-ink-3">{fmt(text.signedInAs, { email: account.email ?? "" })}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">{statusText(account.access, lang, text)}</p>
                </div>
                <div className="space-y-2">
                  <button className="btn btn-royal h-12 w-full text-[15px]" onClick={() => void act("portal")} disabled={busy !== null}>
                    {busy === "portal" ? <Spinner light /> : <CreditCard className="size-4" />}
                    {text.manage}
                  </button>
                  <p className="text-[12.5px] leading-relaxed text-ink-3">{text.manageHint}</p>
                </div>
                <Link href={localePath(lang)} className="btn btn-ghost h-11 w-full text-[14px]">
                  <PenLine className="size-4" /> {text.start}
                </Link>
                <button className="btn h-10 w-full text-[14px] text-ink-3 hover:text-ink" onClick={() => void act("logout")} disabled={busy !== null}>
                  {busy === "logout" ? <Spinner /> : <LogOut className="size-4" />}
                  {text.logout}
                </button>
              </div>
            ) : (
              <LoginForm />
            )}
            {error && <p className="mt-4 text-[14px] text-seal">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
