"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Cookie } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { CONSENT_OPEN_EVENT, openConsentSettings, readConsent, saveConsent, type Consent } from "@/lib/consent";
import { LinkText } from "./LinkText";

/** A telefonos aláíró oldalon (/s/…, /hu/s/…) nem kérdezünk: ott nincs mérés, és a sáv eltakarná az aláírómezőt. */
const isPhonePage = (pathname: string) => /^(\/[a-z]{2})?\/s\//.test(pathname);

/** Egyszerű süti-sáv: elfogadás és elutasítás egyformán egy kattintás. */
export function CookieBanner() {
  const { t } = useI18n();
  const text = t.cookies;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Csak a böngészőben tudjuk, döntött-e már (a süti a kliensen olvasható).
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && !isPhonePage(pathname) && (
        <motion.div
          role="dialog"
          aria-label={text.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          className="card fixed inset-x-3 bottom-3 z-[65] rounded-[22px] p-5 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[410px]"
        >
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-royal-soft text-royal">
              <Cookie className="size-5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-[1.45rem] leading-none">{text.title}</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
                <LinkText text={text.text} />
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => choose("denied")} className="btn btn-ghost h-10 px-4 text-[13.5px]">
              {text.reject}
            </button>
            <button onClick={() => choose("granted")} className="btn btn-primary h-10 px-4 text-[13.5px]">
              {text.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Lábléc-link: a döntés bármikor megváltoztatható. */
export function CookieSettingsLink({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      {t.cookies.settings}
    </button>
  );
}
