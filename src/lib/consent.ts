/**
 * Süti-hozzájárulás (hirdetésmérés). A döntés egy olvasható sütiben él 6 hónapig, utána újra kérdezünk.
 * A Google tag (`GoogleTag.tsx`) erre figyel: csak „granted” esetén töltődik be.
 */
export type Consent = "granted" | "denied";

const COOKIE = "ds_consent";
const MAX_AGE = 180 * 24 * 60 * 60;

/** Új döntés (detail: Consent). */
export const CONSENT_EVENT = "ds:consent";
/** A „Süti-beállítások” link újra megnyitja a sávot. */
export const CONSENT_OPEN_EVENT = "ds:consent-open";

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  return value === "granted" || value === "denied" ? value : null;
}

export function saveConsent(value: Consent) {
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

export const openConsentSettings = () => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
