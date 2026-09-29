"use client";

import { motion } from "motion/react";
import { Check, ScanLine } from "lucide-react";
import { useI18n } from "@/i18n/client";

// Kézzel rajzolt aláírás középvonala (vonalrajzoló animációhoz)
const SIG_MAIN =
  "M22 74 C30 52 40 30 50 20 C56 14 60 20 54 32 C46 48 36 62 30 78 C28 84 34 82 38 74 C44 62 52 52 60 50 C66 49 64 58 58 62 C66 58 72 70 80 68 C88 66 92 52 98 52 C104 52 100 66 106 66 C114 66 118 50 126 50 C134 50 128 66 136 66 C146 66 150 46 160 46 C170 46 162 66 172 66 C184 66 190 40 204 38 C214 37 206 60 214 62 C224 64 236 44 250 40";
const SIG_SWOOSH = "M44 90 C96 82 170 80 268 72";

const LOOP = 7.5;
const loop = (times: number[]) => ({ duration: LOOP, times, repeat: Infinity, ease: "easeInOut" as const });

function Signature({ color, times, width = 4 }: { color: string; times: number[]; width?: number }) {
  // times: [rejtett, rajz kezdete, rajz vége, eltűnés kezdete, vége]
  return (
    <svg viewBox="0 0 290 110" className="size-full overflow-visible">
      {[SIG_MAIN, SIG_SWOOSH].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={i ? width * 0.8 : width}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: i ? [0, 0, 0, 1, 1, 1] : [0, 0, 1, 1, 1, 1],
            opacity: [0, 1, 1, 1, 1, 0],
          }}
          transition={loop(
            i
              ? [times[0], times[1], times[2] - 0.06, times[2], times[3], times[4]]
              : [times[0], times[1], times[2] - 0.06, times[2], times[3], times[4]],
          )}
        />
      ))}
    </svg>
  );
}

function Bars({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-[7px]">
      {widths.map((w, i) => (
        <div key={i} className="h-[5px] rounded-full bg-ink/[0.09]" style={{ width: w }} />
      ))}
    </div>
  );
}

export function HeroVisual() {
  const { t } = useI18n();
  const h = t.heroVisual;
  return (
    <div className="relative mx-auto aspect-[1/0.95] w-full max-w-[560px] select-none" aria-hidden>
      {/* háttérfény */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgb(43_54_232/0.22),transparent_65%)] blur-2xl" />

      {/* Dokumentum */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -7 }}
        animate={{ opacity: 1, y: 0, rotate: -4 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="absolute left-0 top-[3%] w-[62%]"
      >
        {/* alatta lévő lapok a mélységért */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[3deg] rounded-[10px] bg-paper-3/70" />
        <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.5deg] rounded-[10px] bg-paper-2 shadow-sm" />
        <div className="card relative aspect-[1/1.32] rounded-[10px] px-[9%] pb-[8%] pt-[10%]">
          <div className="max-w-[68%] text-[clamp(7px,1.1vw,9px)] font-semibold uppercase tracking-[0.22em] text-ink-3">{h.docType}</div>
          <div className="mt-3 font-serif text-[clamp(15px,2.4vw,22px)] leading-none text-ink">{h.docTitle}</div>
          <div className="mt-[9%]">
            <Bars widths={["100%", "94%", "98%", "62%"]} />
          </div>
          <div className="mt-[7%]">
            <Bars widths={["96%", "100%", "88%", "92%", "45%"]} />
          </div>
          <div className="mt-[7%]">
            <Bars widths={["100%", "70%"]} />
          </div>

          <div className="absolute inset-x-[9%] bottom-[8%] grid grid-cols-2 gap-[10%]">
            <div>
              <div className="h-[34px]" />
              <div className="h-px bg-ink/25" />
              <div className="mt-1.5 text-[clamp(6px,1vw,8.5px)] uppercase tracking-[0.16em] text-ink-3">{h.partyA}</div>
            </div>
            <div className="relative">
              <div className="absolute -top-[18px] left-[-6%] h-[62px] w-[118%]">
                <Signature color="#2b36e8" times={[0, 0.6, 0.8, 0.93, 1]} width={5} />
              </div>
              <div className="h-[34px]" />
              <div className="h-px bg-ink/25" />
              <div className="mt-1.5 text-[clamp(6px,1vw,8.5px)] uppercase tracking-[0.16em] text-ink-3">{h.partyB}</div>
            </div>
          </div>

          {/* Aláírva bélyeg */}
          <motion.div
            className="absolute -right-[4%] -top-[2.5%] flex rotate-[4deg] items-center gap-1 rounded-full bg-mint px-2 py-1 text-[clamp(7px,1vw,9.5px)] font-semibold uppercase tracking-wider text-white shadow-[0_6px_14px_-4px_rgb(20_138_92/0.6)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 0, 1.15, 1, 1, 0.8], opacity: [0, 0, 1, 1, 1, 0] }}
            transition={loop([0, 0.8, 0.84, 0.87, 0.93, 1])}
          >
            <Check className="size-3" strokeWidth={3} /> {h.signed}
          </motion.div>
        </div>
      </motion.div>

      {/* QR-kártya */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          scale: { delay: 0.5, type: "spring", bounce: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute left-[47%] top-0 z-10 w-[22%]"
      >
        <div className="card rounded-2xl p-2.5">
          <MiniQr />
          <div className="mt-2 flex items-center justify-center gap-1 text-[clamp(8px,1.1vw,11px)] font-medium text-ink-2">
            <ScanLine className="size-3" /> {h.scan}
          </div>
        </div>
      </motion.div>

      {/* Telefon */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 14 }}
        animate={{ opacity: 1, y: 0, rotate: 7 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute bottom-[2%] right-[1%] w-[33%]"
      >
        <div className="rounded-[clamp(22px,4vw,36px)] bg-ink p-[4.5%] shadow-[0_40px_60px_-25px_rgb(17_19_28/0.7),inset_0_0_0_1.5px_rgb(255_255_255/0.08)]">
          <div className="relative aspect-[9/18.5] overflow-hidden rounded-[clamp(16px,3.2vw,28px)] bg-sheet">
            <div className="absolute left-1/2 top-[3%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
            <div className="absolute inset-x-[10%] top-[12%] text-center">
              <div className="text-[clamp(5px,0.8vw,7.5px)] font-semibold uppercase tracking-[0.18em] text-ink-3">{h.signFor}</div>
              <div className="mt-0.5 truncate text-[clamp(7px,1.1vw,10px)] font-medium text-ink">{h.fileName}</div>
            </div>
            <div className="absolute inset-x-[6%] top-[30%] h-[36%] rounded-xl bg-paper/60">
              <div className="absolute inset-x-[4%] top-[8%] h-[70%]">
                <Signature color="#15171e" times={[0, 0.08, 0.4, 0.93, 1]} width={6} />
              </div>
              <div className="absolute inset-x-[10%] bottom-[22%] h-px bg-[repeating-linear-gradient(90deg,var(--color-ink-4)_0_4px,transparent_4px_7px)]" />
            </div>
            <motion.div
              className="absolute inset-x-[10%] bottom-[8%] flex h-[8%] items-center justify-center rounded-full bg-royal text-[clamp(6px,1vw,9.5px)] font-semibold text-white"
              animate={{ scale: [1, 1, 0.9, 1, 1], backgroundColor: ["#2b36e8", "#2b36e8", "#1e27c4", "#148a5c", "#2b36e8"] }}
              transition={loop([0, 0.42, 0.45, 0.5, 0.95])}
            >
              {h.send}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Az aláírás útja a telefonról a dokumentumba */}
      <motion.span
        className="absolute z-10 -ml-1.5 -mt-1.5 size-3 rounded-full bg-royal shadow-[0_0_0_6px_rgb(43_54_232/0.16),0_0_18px_4px_rgb(43_54_232/0.35)]"
        initial={{ opacity: 0, left: "82%", top: "88%" }}
        animate={{
          left: ["82%", "82%", "72%", "58%", "47%", "47%"],
          top: ["88%", "88%", "66%", "64%", "80%", "80%"],
          opacity: [0, 1, 1, 1, 1, 0],
          scale: [0.6, 1, 1, 1, 0.6, 0],
        }}
        transition={loop([0, 0.47, 0.51, 0.55, 0.59, 0.62])}
      />
    </div>
  );
}

function MiniQr() {
  // Dekoratív, nem valós QR — csak a hero illusztrációhoz
  const n = 13;
  const cells: [number, number][] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const finder = (r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4);
      if (!finder && rnd() > 0.52) cells.push([r, c]);
    }
  const F = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x + 0.15} y={y + 0.15} width={3.7} height={3.7} rx={1.1} fill="none" stroke="#11131c" strokeWidth={0.75} />
      <rect x={x + 1.1} y={y + 1.1} width={1.8} height={1.8} rx={0.5} fill="#2b36e8" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="aspect-square w-full">
      {cells.map(([r, c]) => (
        <rect key={`${r}-${c}`} x={c + 0.1} y={r + 0.1} width={0.8} height={0.8} rx={0.28} fill="#11131c" />
      ))}
      <F x={0} y={0} />
      <F x={n - 4} y={0} />
      <F x={0} y={n - 4} />
    </svg>
  );
}
