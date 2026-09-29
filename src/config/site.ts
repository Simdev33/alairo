// Az oldal és az üzemeltető adatai — az ÁSZF és az adatvédelmi tájékoztató innen veszi őket.
// Élesítés előtt töltsd ki az üzemeltető adatait (a szögletes zárójeles értékek helyére).

export const site = {
  name: "Kézjegy",

  operator: {
    /** Cégnév vagy egyéni vállalkozó neve */
    name: "[Üzemeltető neve]",
    /** Székhely / postacím */
    address: "[Székhely címe]",
    email: "[kapcsolat@példa.hu]",
    /** Adószám — ha nincs (magánszemély), hagyd üresen: "" */
    taxId: "[Adószám]",
    /** Cégjegyzékszám vagy nyilvántartási szám — ha nincs, hagyd üresen: "" */
    registration: "[Cégjegyzékszám / nyilvántartási szám]",
  },

  /** Tárhelyszolgáltató (adatfeldolgozó) */
  hosting: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
  /** Adatbázis-szolgáltató (adatfeldolgozó) */
  storage: "Upstash, Inc., USA",
  /** Az Upstash-adatbázis régiója, amit a Vercelen választottál */
  storageRegion: "Frankfurt (EU)",

  /** Az ÁSZF és az adatvédelmi tájékoztató hatálybalépése (ÉÉÉÉ-HH-NN) */
  effectiveDate: "2026-09-29",
};

/** Az élő oldal címe — a nyelvi alternatívákhoz (hreflang) és a megosztási előnézetekhez. */
export function siteOrigin() {
  const fixed = process.env.PUBLIC_BASE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (fixed) return fixed.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3238";
}
