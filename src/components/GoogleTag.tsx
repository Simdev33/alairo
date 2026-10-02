"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const ID = site.googleAdsId;
const GRANTED = { ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "denied" };
const DENIED = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

/**
 * Google Ads címke (gtag.js) Consent Mode v2-vel, „alap” módban: a címke csak az „Elfogadom” után töltődik be,
 * előtte semmi nem megy a Google-hoz. Visszavonáskor a hozzájárulás „denied”-re vált.
 * Az oldalváltás kliensoldali (pl. fizetés → /thank-you), ezért minden útvonalváltáskor page_view-t küldünk.
 */
export function GoogleTag() {
  const pathname = usePathname();
  const [granted, setGranted] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    setGranted(readConsent() === "granted");
    const onChange = (event: Event) => {
      const value = (event as CustomEvent<Consent>).detail;
      window.gtag?.("consent", "update", value === "granted" ? GRANTED : DENIED);
      if (value === "granted") setGranted(true);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Az első oldalmegtekintést a `config` küldi; a későbbi (kliensoldali) váltásokat mi.
  useEffect(() => {
    if (!granted) return;
    if (lastPath.current !== null && lastPath.current !== pathname) {
      window.gtag?.("event", "page_view", { send_to: ID, page_location: window.location.href, page_path: pathname });
    }
    lastPath.current = pathname;
  }, [granted, pathname]);

  if (!granted) return null;
  return (
    <>
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify(DENIED)});
gtag('consent', 'update', ${JSON.stringify(GRANTED)});
gtag('js', new Date());
gtag('config', '${ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
    </>
  );
}
