"use client";

import Link from "next/link";
import { localePath } from "@/i18n/config";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Check,
  CircleUserRound,
  EyeOff,
  FileUp,
  Fingerprint,
  KeyRound,
  Layers,
  Lock,
  PenLine,
  QrCode,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { priceVars } from "@/lib/plan";
import { maybeSignedIn } from "@/lib/account";
import { site } from "@/config/site";
import { Logo } from "./Logo";
import { HeroVisual } from "./HeroVisual";
import { Dropzone, type LoadState } from "./Dropzone";
import { LanguageSwitcher } from "./LanguageSwitcher";

const STEP_ICONS = [FileUp, ScanLine, PenLine];
const FEATURE_ICONS = [Lock, Fingerprint, Layers, KeyRound];
const TRUST_ICONS = [Lock, Timer, EyeOff, ShieldCheck];

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  // A belső padding helyet ad az ékezeteknek a maszkon belül (Ő, Ű, Á).
  return (
    <span className="-mb-[0.12em] -mt-[0.26em] block overflow-hidden pb-[0.12em] pt-[0.26em]">
      <motion.span className="block" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

export function Landing({ state, onFile, onSample }: { state: LoadState; onFile: (f: File) => void; onSample: () => void }) {
  const { lang, t } = useI18n();
  const prices = priceVars(lang);
  // A belépés jelzősütije csak a böngészőben olvasható — a felirat betöltés után vált.
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => setSignedIn(maybeSignedIn()), []);
  return (
    <motion.div id="top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]" />

        <header className="relative z-30 mx-auto flex max-w-[1240px] items-center justify-between px-4 py-5 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-1 text-[14px] text-ink-2">
            <a href="#how" className="hidden rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 hover:text-ink md:block">
              {t.nav.how}
            </a>
            <a href="#pricing" className="hidden rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 hover:text-ink md:block">
              {t.nav.pricing}
            </a>
            <a href="#privacy" className="hidden rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 hover:text-ink lg:block">
              {t.nav.privacy}
            </a>
            <LanguageSwitcher />
            <Link
              href={localePath(lang, "/account")}
              className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/10 bg-sheet/70 px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-ink/25"
            >
              <CircleUserRound className="size-4" />
              <span className="hidden sm:inline">{signedIn ? t.nav.account : t.nav.signIn}</span>
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-20 pt-6 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:pb-28 lg:pt-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium tracking-wide text-sheet"
            >
              <QrCode className="size-3.5" /> {t.hero.eyebrow}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="ml-2 hidden items-center gap-1.5 rounded-full border border-ink/10 bg-sheet/70 px-3 py-1.5 text-[12px] font-medium sm:inline-flex"
            >
              <Sparkles className="size-3.5 text-royal" /> {t.nav.badge}
            </motion.span>
            <h1 className="mt-6 font-serif text-[clamp(2.9rem,6.6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]">
              <Line delay={0.05}>{t.hero.line1}</Line>
              <Line delay={0.15}>{t.hero.line2}</Line>
              <Line delay={0.25}>
                <span className="relative inline-block italic text-royal">
                  {t.hero.line3}
                  <motion.svg
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.1em] left-0 h-[0.22em] w-full overflow-visible"
                    aria-hidden
                  >
                    <motion.path
                      d="M4 14 C 70 4, 160 4, 296 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: "easeInOut", delay: 1 }}
                    />
                  </motion.svg>
                </span>
              </Line>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.45 }}
              className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-ink-2"
            >
              {t.hero.lead}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="mt-6 grid max-w-[34rem] grid-cols-2 gap-x-6 gap-y-3"
            >
              {t.hero.trust.map((label, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <li key={label} className="flex items-center gap-2.5 text-[13.5px] font-medium leading-snug text-ink-2">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-mint-soft text-mint">
                      <Icon className="size-3.5" strokeWidth={2.4} />
                    </span>
                    {label}
                  </li>
                );
              })}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="mt-8 max-w-[34rem]"
            >
              <Dropzone state={state} onFile={onFile} onSample={onSample} />
            </motion.div>
          </div>
          <div className="relative lg:pl-4">
            <HeroVisual />
          </div>
        </section>
      </div>

      {/* Hogyan működik */}
      <section id="how" className="scroll-mt-8 border-t border-ink/10 bg-paper-2/50">
        <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-3">{t.steps.eyebrow}</div>
            <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
              {t.steps.titleA} <span className="italic">{t.steps.titleB}</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.steps.items.map((s, i) => ({ ...s, icon: STEP_ICONS[i] })).map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="card group relative h-full overflow-hidden rounded-[24px] p-7">
                  <div className="absolute right-6 top-2 font-serif text-[6.5rem] leading-none text-ink/[0.06] transition-transform duration-700 group-hover:-translate-y-1">
                    {i + 1}
                  </div>
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-ink text-sheet shadow-[0_12px_24px_-12px_rgb(17_19_28/0.7)] transition-transform duration-500 group-hover:-rotate-6">
                    <s.icon className="size-[22px]" />
                  </span>
                  <h3 className="relative mt-7 font-serif text-[1.9rem] leading-tight">{s.title}</h3>
                  <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Árazás */}
      <section id="pricing" className="scroll-mt-8 border-t border-ink/10">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-20 lg:py-28">
          <Reveal>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-3">{t.pricing.eyebrow}</div>
            <h2 className="mt-3 max-w-xl font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
              {t.pricing.titleA} <span className="italic text-royal">{t.pricing.titleB}</span>
            </h2>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-ink-2">{fmt(t.pricing.lead, prices)}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[1.5deg] rounded-[28px] bg-royal/15" />
              <div className="card relative rounded-[28px] p-7 sm:p-9">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-ink px-3 py-1 text-[12px] font-medium tracking-wide text-sheet">{t.pricing.plan}</span>
                  <span className="text-[12.5px] text-ink-3">{fmt(t.pricing.then, prices)}</span>
                </div>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif text-[4.2rem] leading-none tracking-[-0.02em]">{prices.trial}</span>
                  <span className="text-[14px] text-ink-3">{fmt(t.pricing.today, prices)}</span>
                </div>
                <ul className="mt-7 space-y-3 border-t border-ink/10 pt-6">
                  {t.pricing.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-ink-2">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint-soft text-mint">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#top" className="btn btn-royal mt-8 h-12 w-full text-[15px]">
                  <PenLine className="size-4" /> {t.pricing.cta}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Adatvédelem */}
      <section id="privacy" className="scroll-mt-8 bg-ink text-sheet">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-28">
          <Reveal>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-sheet/50">{t.privacySection.eyebrow}</div>
            <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
              {t.privacySection.titleA} <span className="italic text-[#8e97ff]">{t.privacySection.titleB}</span>
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-sheet/65">{t.privacySection.text}</p>
            <Link
              href={localePath(lang, "/privacy")}
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#8e97ff] underline decoration-[#8e97ff]/30 underline-offset-4 hover:decoration-[#8e97ff]"
            >
              {t.nav.privacyPolicy} →
            </Link>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.privacySection.items.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] })).map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08}>
                <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.07]">
                  <f.icon className="size-5 text-[#8e97ff]" />
                  <h3 className="mt-4 text-[16px] font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-sheet/60">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink text-sheet/50">
        <div className="mx-auto max-w-[1240px] border-t border-white/10 px-4 py-10 text-[12.5px] leading-relaxed sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Logo inverted />
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]">
              <Link href={localePath(lang, "/terms")} className="transition-colors hover:text-sheet">
                {t.nav.terms}
              </Link>
              <Link href={localePath(lang, "/privacy")} className="transition-colors hover:text-sheet">
                {t.nav.privacyPolicy}
              </Link>
              <LanguageSwitcher tone="dark" placement="up" />
            </nav>
          </div>
          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between sm:gap-10">
            <p className="max-w-2xl">{t.footer.disclaimer}</p>
            <p className="shrink-0">
              © {new Date().getFullYear()} {site.name}. {fmt(t.footer.operatedBy, { name: site.operator.name.replace(/\.$/, "") })} {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
