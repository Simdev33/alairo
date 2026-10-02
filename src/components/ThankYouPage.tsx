"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CircleUserRound, Download, FilePlus2, PencilLine } from "lucide-react";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { fmt, rich } from "@/i18n/format";
import { useApp } from "@/lib/app-store";
import { PLAN } from "@/lib/plan";
import { downloadBytes } from "@/lib/sign-pdf";
import { LinkText } from "./LinkText";
import { Logo } from "./Logo";
import { Seal } from "./DoneOverlay";

/**
 * Köszönőoldal sikeres fizetés után (`/thank-you`) — a Google Ads ennek a címnek a betöltését méri konverzióként.
 * A fizetés után ide navigálunk; az aláírt fájl a tárolóból jön (közvetlen megnyitáskor nincs, akkor csak a köszönet látszik).
 */
export function ThankYouPage() {
  const { lang, t } = useI18n();
  const text = t.thankYou;
  const purchased = useApp((s) => s.purchased);
  const hasDoc = useApp((s) => s.doc !== null);
  const setDoc = useApp((s) => s.setDoc);
  const home = localePath(lang, "/");

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-5 sm:px-8">
        <Link href={home} aria-label={t.common.home}>
          <Logo />
        </Link>
        <Link
          href={localePath(lang, "/account")}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/10 bg-sheet/70 px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-ink/25"
        >
          <CircleUserRound className="size-4" />
          <span className="hidden sm:inline">{text.account}</span>
        </Link>
      </header>

      <main className="grid place-items-center px-4 pb-20 pt-24 sm:pt-28">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          className="card relative w-[min(500px,100%)] rounded-[28px] px-7 pb-8 pt-24 text-center"
        >
          <div className="absolute left-1/2 top-0 size-40 -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="absolute inset-4 rounded-full bg-seal/30"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.9], opacity: [0.7, 0] }}
              transition={{ delay: 0.42, duration: 0.9, ease: "easeOut" }}
            />
            <motion.div
              className="size-full"
              initial={{ scale: 2.2, rotate: -28, opacity: 0 }}
              animate={{ scale: 1, rotate: -9, opacity: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 420, damping: 18, mass: 0.9 }}
            >
              <Seal text={t.done.seal} />
            </motion.div>
          </div>

          <h1 className="font-serif text-[2.8rem] leading-none">{text.title}</h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-2">{fmt(text.lead, { days: PLAN.trialDays })}</p>

          {purchased ? (
            <>
              <p className="mt-4 rounded-2xl bg-mint-soft px-4 py-3 text-[14px] leading-relaxed text-mint">
                {rich(t.done.downloaded, { name: <span className="break-all font-semibold">{purchased.name}</span> })}
              </p>
              {purchased.rasterized && (
                <p className="mt-2 rounded-xl bg-paper-2 px-3 py-2 text-[12.5px] leading-snug text-ink-3">{t.done.rasterized}</p>
              )}
            </>
          ) : (
            <p className="mt-4 rounded-2xl bg-mint-soft px-4 py-3 text-[14px] leading-relaxed text-mint">{text.noFile}</p>
          )}

          <div className={`mt-7 grid gap-2 ${hasDoc ? "sm:grid-cols-2" : ""}`}>
            {hasDoc && (
              <Link href={home} className="btn btn-ghost h-11 px-4 text-sm">
                <PencilLine className="size-4" /> {text.back}
              </Link>
            )}
            <Link href={home} onClick={() => setDoc(null)} className="btn btn-primary h-11 px-4 text-sm">
              <FilePlus2 className="size-4" /> {text.next}
            </Link>
          </div>
          {purchased && (
            <button
              onClick={() => downloadBytes(purchased.data, purchased.name)}
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
            >
              <Download className="size-3.5" /> {t.done.again}
            </button>
          )}
          <p className="mt-6 border-t border-ink/10 pt-5 text-[13px] leading-relaxed text-ink-3">
            <LinkText text={text.cancel} />
          </p>
        </motion.div>
      </main>
    </div>
  );
}
