// Az oldal és az üzemeltető adatai — az ÁSZF és az adatvédelmi tájékoztató innen veszi őket.

export const site = {
  name: "DoneSignIn",
  domain: "donesignin.com",

  operator: {
    name: "TourCierge s. r. o.",
    address: "Karpatské námestie 10A, 831 06 Bratislava – mestská časť Rača, Slovenská republika",
    /** Még nincs megadva — üresen a jogi oldalakon „kitöltendő” jelölés látszik. */
    email: "",
    taxId: "DIČ 2122693199",
    registration: "IČO 57383898 · Obchodný register Mestského súdu Bratislava III, oddiel Sro, vložka č. 194953/B",
  },

  /** Tárhelyszolgáltató (adatfeldolgozó) */
  hosting: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  /** Adatbázis-szolgáltató (adatfeldolgozó) */
  storage: "Upstash, Inc., USA",
  /** Az Upstash-adatbázis régiója */
  storageRegion: "Frankfurt (EU)",

  /** Az ÁSZF és az adatvédelmi tájékoztató hatálybalépése (ÉÉÉÉ-HH-NN) */
  effectiveDate: "2026-09-30",
};

/** Az élő oldal címe — linkek, Stripe-visszatérés, nyelvi alternatívák. */
export function siteOrigin() {
  const fixed = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.PUBLIC_BASE_URL;
  if (fixed) return fixed.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production") return `https://${site.domain}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3238";
}
