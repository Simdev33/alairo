"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Copy, PenLine, QrCode as QrIcon, RefreshCw, Smartphone, Wifi } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { QrCode } from "./QrCode";

type Step = "scan" | "connected" | "drawing";

export function PhonePanel({ onRenew }: { onRenew: () => void }) {
  const phone = useApp((s) => s.phone);
  const setPhone = useApp((s) => s.setPhone);
  const [forceQr, setForceQr] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showHosts, setShowHosts] = useState(false);

  const step: Step = phone.drawing ? "drawing" : phone.connected ? "connected" : "scan";
  const showQr = step === "scan" || forceQr;

  const copy = async () => {
    if (!phone.url) return;
    await navigator.clipboard?.writeText(phone.url).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="card overflow-hidden rounded-[22px]">
      <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">Aláírás telefonnal</div>
          <h2 className="mt-0.5 font-serif text-[1.6rem] leading-tight">
            {step === "scan" ? "Olvasd be a kódot" : step === "drawing" ? "Most írod alá…" : "Telefon kapcsolódva"}
          </h2>
        </div>
        <StatusDot step={step} live={phone.status === "live"} />
      </header>

      <div className="px-5">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2/60">
          <AnimatePresence mode="wait" initial={false}>
            {phone.status === "creating" || phone.status === "idle" ? (
              <motion.div key="load" exit={{ opacity: 0 }} className="skeleton absolute inset-4 rounded-xl" />
            ) : phone.status === "expired" || phone.status === "error" ? (
              <motion.div
                key="expired"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
              >
                <p className="text-sm text-ink-2">
                  {phone.status === "expired" ? "A QR-kód lejárt." : "Nem sikerült QR-kódot készíteni."}
                </p>
                <button onClick={onRenew} className="btn btn-primary h-10 px-4 text-sm">
                  <RefreshCw className="size-4" /> Új kód
                </button>
              </motion.div>
            ) : showQr && phone.url ? (
              <motion.div
                key={`qr-${phone.url}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-4"
              >
                <div className="relative size-full rounded-xl bg-sheet p-2 shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                  <QrCode value={phone.url} className="size-full" />
                  <ScanLine />
                  <Brackets />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mirror"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center p-5"
              >
                <Mirror />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4">
        {showQr ? (
          <ol className="space-y-2 text-[13.5px] leading-snug text-ink-2">
            <Li n={1}>Nyisd meg a telefon kameráját, és irányítsd a kódra.</Li>
            <Li n={2}>Koppints a megjelenő linkre, és írd alá az ujjaddal.</Li>
            <Li n={3}>Az aláírás pár másodperc múlva itt jelenik meg.</Li>
          </ol>
        ) : (
          <p className="text-[13.5px] leading-snug text-ink-2">
            {step === "drawing"
              ? "Élőben látod, ahogy a telefonon rajzolsz. Ha kész, nyomd meg a küldés gombot."
              : "Írd alá a telefonon, és nyomd meg az „Aláírás elküldése” gombot."}
          </p>
        )}

        {phone.status === "live" && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {!showQr ? (
              <button onClick={() => setForceQr(true)} className="btn btn-ghost h-9 px-3.5 text-[13px]">
                <QrIcon className="size-4" /> QR-kód újra
              </button>
            ) : (
              phone.connected && (
                <button onClick={() => setForceQr(false)} className="btn btn-ghost h-9 px-3.5 text-[13px]">
                  <Smartphone className="size-4" /> Élő nézet
                </button>
              )
            )}
            <button onClick={copy} className="btn btn-ghost h-9 px-3.5 text-[13px]">
              {copied ? <Check className="size-4 text-mint" /> : <Copy className="size-4" />}
              {copied ? "Másolva" : "Link másolása"}
            </button>
          </div>
        )}

        {phone.status === "live" && phone.alternatives.length > 1 && (
          <div className="mt-3">
            <button
              onClick={() => setShowHosts((v) => !v)}
              className="flex items-center gap-1.5 text-[12.5px] text-ink-3 transition-colors hover:text-ink"
            >
              <Wifi className="size-3.5" /> Nem nyílik meg a telefonon?
              <ChevronDown className={`size-3.5 transition-transform ${showHosts ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {showHosts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-2 text-[12.5px] leading-snug text-ink-3">
                    A telefon és a gép legyen ugyanazon a Wi-Fi-n. Ha több hálózati kártyád van, próbálj másik címet:
                  </p>
                  <div className="mt-2 space-y-1">
                    {phone.alternatives.map((a) => (
                      <button
                        key={a.url}
                        onClick={() => setPhone({ url: a.url })}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-mono text-[11.5px] transition-colors ${
                          a.url === phone.url ? "bg-royal-soft text-royal" : "text-ink-2 hover:bg-ink/5"
                        }`}
                      >
                        <span className="truncate">{a.label}</span>
                        {a.url === phone.url && <Check className="size-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function Li({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-ink text-[11px] font-semibold text-sheet">{n}</span>
      <span>{children}</span>
    </li>
  );
}

function StatusDot({ step, live }: { step: Step; live: boolean }) {
  const color = step === "scan" ? "bg-royal" : "bg-mint";
  return (
    <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-paper-2">
      {live && <span className={`absolute inset-3 rounded-full ${color} animate-pulse-ring`} />}
      {step === "drawing" ? (
        <motion.span animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 0.8, repeat: Infinity }}>
          <PenLine className="size-[18px] text-mint" />
        </motion.span>
      ) : (
        <span className={`relative size-2.5 rounded-full ${color}`} />
      )}
    </span>
  );
}

function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-3 h-12 bg-linear-to-b from-transparent via-royal/15 to-transparent"
      initial={{ top: "0%" }}
      animate={{ top: ["2%", "82%", "2%"] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Brackets() {
  const c = "absolute size-6 border-royal";
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-2">
      <span className={`${c} left-0 top-0 rounded-tl-xl border-l-[3px] border-t-[3px]`} />
      <span className={`${c} right-0 top-0 rounded-tr-xl border-r-[3px] border-t-[3px]`} />
      <span className={`${c} bottom-0 left-0 rounded-bl-xl border-b-[3px] border-l-[3px]`} />
      <span className={`${c} bottom-0 right-0 rounded-br-xl border-b-[3px] border-r-[3px]`} />
    </div>
  );
}

/** A telefon képernyőjének élő tükre rajzolás közben. */
function Mirror() {
  const preview = useApp((s) => s.phone.preview);
  const drawing = useApp((s) => s.phone.drawing);
  const landscape = preview ? preview.width > preview.height : true;
  return (
    <motion.div
      layout
      className={`relative rounded-[28px] bg-ink p-2 shadow-[0_24px_50px_-20px_rgb(17_19_28/0.6)] ${
        landscape ? "aspect-[16/9] w-full" : "aspect-[9/16] h-full"
      }`}
    >
      <div className="relative size-full overflow-hidden rounded-[21px] bg-sheet">
        <div className="absolute inset-x-[8%] top-[70%] h-px bg-[repeating-linear-gradient(90deg,var(--color-ink-4)_0_5px,transparent_5px_9px)] opacity-60" />
        {preview ? (
          <svg viewBox={`0 0 ${preview.width} ${preview.height}`} className="absolute inset-0 size-full">
            <path d={preview.d} fill={preview.color} />
          </svg>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 text-ink-3">
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <PenLine className="size-6" />
              </motion.div>
              <span className="text-xs">Várjuk az aláírást…</span>
            </div>
          </div>
        )}
        {drawing && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            <span className="size-1.5 animate-pulse rounded-full bg-white" /> élő
          </span>
        )}
      </div>
    </motion.div>
  );
}
