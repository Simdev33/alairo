"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALE_COOKIE, localeNames, locales, swapLocale, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/client";

export function LanguageSwitcher({ tone = "light", placement = "down" }: { tone?: "light" | "dark"; placement?: "down" | "up" }) {
  const { lang, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const choose = (l: Locale) => {
    setOpen(false);
    if (l === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    router.push(swapLocale(pathname, l) + window.location.hash);
  };

  const dark = tone === "dark";

  return (
    <div ref={box} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.language}
        className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors ${
          dark ? "text-sheet/70 hover:bg-white/10 hover:text-sheet" : "text-ink-2 hover:bg-ink/5 hover:text-ink"
        }`}
      >
        <Globe className="size-4" />
        <span className="uppercase">{lang}</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.common.language}
            initial={{ opacity: 0, y: placement === "up" ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "up" ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className={`card absolute right-0 z-50 w-44 rounded-2xl p-1.5 text-ink ${
              placement === "up" ? "bottom-[calc(100%+6px)] origin-bottom-right" : "top-[calc(100%+6px)] origin-top-right"
            }`}
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  role="option"
                  aria-selected={l === lang}
                  lang={l}
                  onClick={() => choose(l)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[14px] transition-colors ${
                    l === lang ? "bg-royal-soft text-royal" : "hover:bg-ink/5"
                  }`}
                >
                  <span>{localeNames[l]}</span>
                  {l === lang ? <Check className="size-4" /> : <span className="font-mono text-[11px] uppercase text-ink-4">{l}</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
