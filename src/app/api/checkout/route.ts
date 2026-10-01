import { fail, json, localeOf, readBody, returnUrl } from "@/lib/server/api";
import { APP, BillingError, PLAN, prices, stripe } from "@/lib/server/billing";
import { clientIp, limited } from "@/lib/server/rate-limit";

export const dynamic = "force-dynamic";

/**
 * Checkout Session a saját fizetési oldalhoz (ui_mode "elements"):
 * ma 2,99 € 7 napra, utána 9,90 €/hó. A fizetési ablak megnyitásakor jön létre,
 * ügyfél nélkül — az e-mail-címet a fizetés gombja adja át, az ügyfelet a Stripe hozza létre.
 */
export async function POST(request: Request) {
  const body = await readBody(request);
  const locale = localeOf(body.locale);
  if (limited(`checkout:${clientIp(request)}`, 20, 15 * 60_000)) return fail("rateLimited", 429);

  try {
    const { trial, monthly } = await prices();

    // A Stripe a {CHECKOUT_SESSION_ID} szó szerinti alakját cseréli ki, ezért nem szabad URL-kódolni.
    const back = returnUrl(request, body.returnPath);
    back.searchParams.delete("checkout_session_id");
    const separator = back.search ? "&" : "?";

    const session = await stripe().checkout.sessions.create({
      ui_mode: "elements",
      mode: "subscription",
      line_items: [
        { price: monthly, quantity: 1 },
        { price: trial, quantity: 1 },
      ],
      subscription_data: { trial_period_days: PLAN.trialDays, metadata: { app: APP } },
      billing_address_collection: "auto",
      // Az aláírt fájl is csak egy óráig marad meg a gépen.
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
      return_url: `${back.toString()}${separator}checkout_session_id={CHECKOUT_SESSION_ID}`,
      metadata: { app: APP, locale },
    });
    return json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("[checkout]", error);
    return fail(error instanceof BillingError && error.code === "notConfigured" ? "billingUnavailable" : "checkoutFailed", 503);
  }
}
