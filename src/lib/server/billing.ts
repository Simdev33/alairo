/**
 * Stripe: árak, ügyfelek és a hozzáférés ellenőrzése. Adatbázis nincs — hogy
 * valaki letölthet-e, azt mindig az előfizetéseiből olvassuk ki.
 *
 * A Stripe-fiókon más oldal (ConvertPDFNow) is osztozik, ezért minden, ami a
 * DoneSignIn-é, `metadata.app = "donesignin"` jelölést kap: saját előfizetés,
 * saját termék és ügyfélportál-beállítás, az ügyfél pedig a fizetés után.
 * Más oldal előfizetése itt nem ad hozzáférést.
 */
import Stripe from "stripe";
import { PLAN } from "@/lib/plan";
import { site, siteOrigin } from "@/config/site";

export { PLAN };

export const APP = "donesignin";
const PRODUCT_ID = "donesignin";
const LOOKUP = { trial: "donesignin_trial_fee_eur_299", monthly: "donesignin_monthly_eur_990" } as const;

export class BillingError extends Error {
  constructor(
    readonly code: "notConfigured" | "failed",
    message: string = code,
  ) {
    super(message);
    this.name = "BillingError";
  }
}

let client: Stripe | null = null;

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new BillingError("notConfigured", "STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key, { appInfo: { name: site.name } });
  return client;
}

export const billingConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

const ours = (object: { metadata?: Stripe.Metadata | null }) => object.metadata?.app === APP;

/* -------------------------------- árak ---------------------------------- */

let pricesPromise: Promise<{ trial: string; monthly: string }> | null = null;

async function ensureProduct() {
  try {
    // A név a fizetési oldalon, a nyugtákon és az ügyfélportálon látszik.
    const product = await stripe().products.retrieve(PRODUCT_ID);
    if (product.name !== site.name) await stripe().products.update(PRODUCT_ID, { name: site.name });
  } catch (error) {
    if ((error as { code?: string }).code !== "resource_missing") throw error;
    await stripe().products.create({
      id: PRODUCT_ID,
      name: site.name,
      description: "Sign documents from your phone — full access",
      metadata: { app: APP },
    });
  }
}

async function loadPrices() {
  const fromEnv = { trial: process.env.STRIPE_PRICE_TRIAL, monthly: process.env.STRIPE_PRICE_MONTHLY };
  if (fromEnv.trial && fromEnv.monthly) return { trial: fromEnv.trial, monthly: fromEnv.monthly };

  const { data } = await stripe().prices.list({ lookup_keys: Object.values(LOOKUP), active: true, limit: 10 });
  const byKey = new Map(data.map((price) => [price.lookup_key, price.id]));
  let trial = fromEnv.trial ?? byKey.get(LOOKUP.trial);
  let monthly = fromEnv.monthly ?? byKey.get(LOOKUP.monthly);
  if (!trial || !monthly) await ensureProduct();
  if (!trial) {
    const price = await stripe().prices.create({
      product: PRODUCT_ID,
      currency: PLAN.currency.toLowerCase(),
      unit_amount: PLAN.trialFeeCents,
      lookup_key: LOOKUP.trial,
      nickname: `${PLAN.trialDays}-day access fee`,
      metadata: { app: APP },
    });
    trial = price.id;
  }
  if (!monthly) {
    const price = await stripe().prices.create({
      product: PRODUCT_ID,
      currency: PLAN.currency.toLowerCase(),
      unit_amount: PLAN.monthlyCents,
      recurring: { interval: "month" },
      lookup_key: LOOKUP.monthly,
      nickname: "Monthly",
      metadata: { app: APP },
    });
    monthly = price.id;
  }
  return { trial, monthly };
}

/** A két ár — első használatkor jön létre a Stripe-ban (vagy a STRIPE_PRICE_* változókból). */
export function prices() {
  pricesPromise ??= loadPrices().catch((error) => {
    pricesPromise = null;
    throw error;
  });
  return pricesPromise;
}

/* ------------------------------ hozzáférés ------------------------------- */

export interface Access {
  /** Most letölthet. */
  active: boolean;
  status: Stripe.Subscription.Status | "none";
  /** Unix másodperc. */
  trialEnd: number | null;
  periodEnd: number | null;
  /** Lemondva, de a periodEnd-ig használható. */
  cancelAtPeriodEnd: boolean;
}

const NO_ACCESS: Access = { active: false, status: "none", trialEnd: null, periodEnd: null, cancelAtPeriodEnd: false };
const ACTIVE = new Set<string>(["trialing", "active"]);
const RANK: Record<string, number> = { trialing: 0, active: 0, past_due: 1, unpaid: 2, incomplete: 3, paused: 4, canceled: 5, incomplete_expired: 6 };

// Rövid gyorsítótár: a fejléc és minden letöltés ugyanarra az ügyfélre kérdez rá.
const cache = new Map<string, { access: Access; until: number }>();

export function forgetAccess(customer: string) {
  cache.delete(customer);
}

export async function accessFor(customer: string): Promise<Access> {
  const cached = cache.get(customer);
  if (cached && cached.until > Date.now()) return cached.access;

  const { data } = await stripe().subscriptions.list({ customer, status: "all", limit: 20 });
  const best = data
    .filter(ours)
    .sort((a, b) => (RANK[a.status] ?? 9) - (RANK[b.status] ?? 9) || b.created - a.created)[0];
  const access: Access = best
    ? {
        active: ACTIVE.has(best.status),
        status: best.status,
        trialEnd: best.status === "trialing" ? best.trial_end : null,
        periodEnd: best.items.data[0]?.current_period_end ?? null,
        cancelAtPeriodEnd: best.cancel_at_period_end || best.cancel_at !== null,
      }
    : NO_ACCESS;
  cache.set(customer, { access, until: Date.now() + 60_000 });
  return access;
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();
export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;

/** A DoneSignIn ügyfelei ezzel az e-mail-címmel — a hozzáféréssel rendelkező (vagy a legújabb) elöl. */
export async function customersFor(email: string) {
  const { data } = await stripe().customers.list({ email: normalizeEmail(email), limit: 20 });
  const candidates = data.filter((customer) => !customer.deleted && (ours(customer) || !customer.metadata?.app));
  const withAccess = await Promise.all(candidates.map(async (customer) => ({ customer, access: await accessFor(customer.id) })));
  // A jelöletlen ügyfelet a Stripe hozza létre fizetéskor; csak akkor a miénk, ha van nálunk előfizetése.
  const mine = withAccess.filter(({ customer, access }) => ours(customer) || access.status !== "none");
  return mine.sort((a, b) => Number(b.access.active) - Number(a.access.active) || b.customer.created - a.customer.created);
}

/** A fizetéskor létrejött ügyfelet utólag megjelöljük, hogy a többi oldal ne számolja a magáénak. */
export async function claimCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer, locale?: string) {
  if (customer.deleted || ours(customer)) return;
  await stripe().customers.update(customer.id, {
    metadata: { app: APP },
    ...(locale && !customer.preferred_locales?.length ? { preferred_locales: [locale] } : {}),
  });
}

/* ------------------------------ ügyfélportál ------------------------------ */

let portalConfig: Promise<string> | null = null;

/** Saját portálbeállítás (lemondás az időszak végén, kártyacsere, számlák) — egyszer jön létre. */
function portalConfiguration() {
  portalConfig ??= (async () => {
    const { data } = await stripe().billingPortal.configurations.list({ active: true, limit: 100 });
    const existing = data.find((configuration) => configuration.metadata?.app === APP);
    if (existing) return existing.id;
    const origin = siteOrigin();
    const created = await stripe().billingPortal.configurations.create({
      metadata: { app: APP },
      business_profile: {
        privacy_policy_url: `${origin}/privacy`,
        terms_of_service_url: `${origin}/terms`,
      },
      features: {
        subscription_cancel: { enabled: true, mode: "at_period_end" },
        payment_method_update: { enabled: true },
        invoice_history: { enabled: true },
        customer_update: { enabled: true, allowed_updates: ["email"] },
      },
    });
    return created.id;
  })().catch((error) => {
    portalConfig = null;
    throw error;
  });
  return portalConfig;
}

export async function portalUrl(customer: string, returnUrl: string, locale: string) {
  const session = await stripe().billingPortal.sessions.create({
    customer,
    return_url: returnUrl,
    configuration: await portalConfiguration(),
    locale: locale as Stripe.BillingPortal.SessionCreateParams.Locale,
  });
  return session.url;
}
