"use client";

import { motion } from "motion/react";
import { FileUp, Fingerprint, Layers, Lock, PenLine, QrCode, ScanLine, Sparkles, UserX } from "lucide-react";
import { Logo } from "./Logo";
import { HeroVisual } from "./HeroVisual";
import { Dropzone, type LoadState } from "./Dropzone";

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
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
      <div className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]" />

        <header className="relative z-10 mx-auto flex max-w-[1240px] items-center justify-between px-4 py-5 sm:px-8">
          <Logo />
          <nav className="flex items-center gap-1 text-[14px] text-ink-2">
            <a href="#hogyan" className="hidden rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 hover:text-ink sm:block">
              Hogyan működik
            </a>
            <a href="#adatvedelem" className="hidden rounded-full px-3.5 py-2 transition-colors hover:bg-ink/5 hover:text-ink sm:block">
              Adatvédelem
            </a>
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-sheet/70 px-3 py-1.5 text-[12.5px] font-medium">
              <Sparkles className="size-3.5 text-royal" /> Ingyenes · regisztráció nélkül
            </span>
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
              <QrCode className="size-3.5" /> PDF · Word · QR-kód
            </motion.div>
            <h1 className="mt-6 font-serif text-[clamp(2.9rem,6.6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]">
              <Line delay={0.05}>Írd alá</Line>
              <Line delay={0.15}>a telefonoddal,</Line>
              <Line delay={0.25}>
                <span className="relative inline-block italic text-royal">
                  ne a nyomtatóval.
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
              Töltsd fel a dokumentumot, olvasd be a QR-kódot, és írd alá az ujjaddal. Az aláírás pár másodperc múlva
              már a PDF-ben van — pontosan ott, ahová húzod.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.55 }}
              className="mt-9 max-w-[34rem]"
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
      <section id="hogyan" className="scroll-mt-8 border-t border-ink/10 bg-paper-2/50">
        <div className="mx-auto max-w-[1240px] px-4 py-20 sm:px-8 lg:py-28">
          <Reveal>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-ink-3">Hogyan működik</div>
            <h2 className="mt-3 max-w-2xl font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
              Három lépés, <span className="italic">nulla nyomtató.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FileUp,
                title: "Töltsd fel",
                text: "Húzd be a PDF-et vagy a Word-fájlt. A Word-dokumentumot automatikusan PDF-fé alakítjuk.",
              },
              {
                icon: ScanLine,
                title: "Olvasd be a QR-kódot",
                text: "Irányítsd rá a telefon kameráját. Nem kell alkalmazást telepíteni, és be sem kell jelentkezni.",
              },
              {
                icon: PenLine,
                title: "Írd alá, húzd a helyére",
                text: "Az ujjaddal aláírsz, az aláírás élőben megjelenik a gépen. Húzd bármelyik oldalra, és töltsd le.",
              },
            ].map((s, i) => (
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

      {/* Adatvédelem */}
      <section id="adatvedelem" className="scroll-mt-8 bg-ink text-sheet">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-28">
          <Reveal>
            <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-sheet/50">Adatvédelem</div>
            <h2 className="mt-3 font-serif text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
              A dokumentumod <span className="italic text-[#8e97ff]">a te gépeden marad.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-sheet/65">
              A PDF-et a böngésződ nyitja meg és írja alá — nem töltjük fel sehová. A telefonról csak az aláírás vonalai
              érkeznek meg, és egy óra múlva azok is törlődnek a szerverről.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Lock, title: "Helyben feldolgozva", text: "A PDF a böngészőben készül el. Word-fájlnál csak az átalakítás idejére kerül a szerverre." },
              { icon: Fingerprint, title: "Vektoros aláírás", text: "Az aláírás vonalként kerül a PDF-be, így bármekkora nagyításban éles marad." },
              { icon: Layers, title: "Több oldal, több aláírás", text: "Tedd ugyanazt az aláírást több helyre, vagy egy kattintással minden oldalra." },
              { icon: UserX, title: "Nincs fiók, nincs előfizetés", text: "Nem kérünk e-mail-címet, és nem kell semmit telepíteni." },
            ].map((f, i) => (
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
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 border-t border-white/10 px-4 py-8 text-[12.5px] leading-relaxed sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo inverted />
          <p className="max-w-xl sm:text-right">
            A Kézjegy a kézzel rajzolt aláírásod képét helyezi el a dokumentumban (egyszerű elektronikus aláírás). Nem
            minősített elektronikus aláírás, és nem helyettesíti az ügyfélkapus hitelesítést.
          </p>
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
