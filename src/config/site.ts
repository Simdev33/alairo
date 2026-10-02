// Az oldal és az üzemeltető adatai — az ÁSZF és az adatvédelmi tájékoztató innen veszi őket.

export const site = {
  name: "DoneSignIn",
  domain: "donesignin.com",

  operator: {
    name: "TourCierge s. r. o.",
    address: "Karpatské námestie 10A, 831 06 Bratislava – mestská časť Rača, Slovenská republika",
    /** Kapcsolattartási cím – minden TourCierge-oldalon ugyanez. */
    email: "help@testmyabilities.com",
    taxId: "DIČ 2122693199",
    registration: "IČO 57383898 · Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 194953/B",
  },

  /** Tárhelyszolgáltató (adatfeldolgozó) */
  hosting: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  /** Adatbázis-szolgáltató (adatfeldolgozó) */
  storage: "Upstash, Inc., USA",
  /** Az Upstash-adatbázis régiója */
  storageRegion: "Frankfurt (EU)",

  /** Google-címkék (Ads konverziómérés + Analytics) — csak a süti-sávban adott hozzájárulás után töltődnek be. */
  googleAdsId: "AW-18490051746",
  googleAnalyticsId: "G-107P6K7GKB",

  /** Az ÁSZF és az adatvédelmi tájékoztató hatálybalépése (ÉÉÉÉ-HH-NN) */
  effectiveDate: "2026-10-02",
};

/** Az élő oldal címe — linkek, Stripe-visszatérés, nyelvi alternatívák. */
export function siteOrigin() {
  const fixed = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.PUBLIC_BASE_URL;
  if (fixed) return fixed.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return `https://${site.domain}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3238";
}
