/**
 * Az egyetlen csomag: 7 nap teljes hozzáférés 2,99 €-ért, utána 9,90 €/hó
 * (7 napos próbaidős előfizetés, az első számlán egyszeri díjjal).
 * A fizetési oldal a Stripe által jelzett összegeket mutatja; ezek a többi
 * szöveghez (árazás, fiók, jogi oldalak) és az árak létrehozásához kellenek.
 */
export const PLAN = { trialDays: 7, trialFeeCents: 299, monthlyCents: 990, currency: "EUR" } as const;

export const formatMoney = (cents: number, locale: string) =>
  new Intl.NumberFormat(locale, { style: "currency", currency: PLAN.currency, currencyDisplay: "narrowSymbol" }).format(cents / 100);

/** Szótár-helyőrzők: {trial}, {monthly}, {days}, {next}. */
export const priceVars = (locale: string) => ({
  trial: formatMoney(PLAN.trialFeeCents, locale),
  monthly: formatMoney(PLAN.monthlyCents, locale),
  days: PLAN.trialDays,
  next: PLAN.trialDays + 1,
});
