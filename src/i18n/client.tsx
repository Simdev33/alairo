"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/hu";

type I18n = { lang: Locale; t: Dictionary };

const I18nContext = createContext<I18n | null>(null);

/** A gyökér-layout adja át az aktuális nyelv szótárát — a kliensre csak ez az egy nyelv kerül. */
export function I18nProvider({ lang, dict, children }: { lang: Locale; dict: Dictionary; children: ReactNode }) {
  const value = useMemo(() => ({ lang, t: dict }), [lang, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n: hiányzik az I18nProvider");
  return value;
}
