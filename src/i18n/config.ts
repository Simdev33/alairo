// Nyelvi beállítások — a proxy és az alkalmazás is ezt használja, ezért nincs benne nehéz import.

export const locales = ["hu", "en", "de", "fr", "es"] as const;
export type Locale = (typeof locales)[number];

/** Ha a böngésző nyelve egyik támogatott sem, angolul jelenik meg. */
export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  hu: "Magyar",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

export const isLocale = (value: string | undefined | null): value is Locale =>
  !!value && (locales as readonly string[]).includes(value);

/** Accept-Language fejlécből a legjobban illő támogatott nyelv. */
export function pickLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}

/**
 * Egy oldal címe az adott nyelven. Az angol (fő nyelv) előtag nélkül él a gyökérben,
 * a többi nyelv előtaggal: localePath("en", "/terms") → "/terms", localePath("hu", "/terms") → "/hu/terms".
 */
export function localePath(lang: Locale, path = "") {
  const clean = path === "/" ? "" : path;
  return lang === defaultLocale ? clean || "/" : `/${lang}${clean}`;
}

/** Az útvonal nyelvének cseréje (pl. /hu/terms → /terms angolul, /terms → /de/terms németül). */
export function swapLocale(pathname: string, to: Locale) {
  const rest = pathname.replace(/^\/(hu|en|de|fr|es)(?=\/|$)/, "");
  return localePath(to, rest);
}
