import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, locales, pickLocale } from "@/i18n/config";

// Az angol a fő nyelv, előtag nélkül a gyökérben él (belül az /en/… oldalakat szolgáljuk ki).
// - /en és /en/… → átirányítás az előtag nélküli címre;
// - /hu, /de, /fr, /es → változatlanul;
// - a főoldalt (/) az első látogatáskor a böngésző nyelvére irányítjuk, ha az nem angol
//   (a nyelvválasztó sütije ezt felülírja);
// - minden más előtag nélküli cím angolul jelenik meg.
// - a köszönőoldal minden nyelven a /thank-you címen él (a Google Ads egyetlen URL-t figyel):
//   a nyelvet a süti (vagy a böngésző nyelve) adja, a /hu/thank-you stb. ide irányít.
const THANK_YOU = "/thank-you";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === THANK_YOU) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const lang = isLocale(saved) ? saved : pickLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${THANK_YOU}`;
    return NextResponse.rewrite(url);
  }
  const prefixed = locales.find((l) => pathname === `/${l}${THANK_YOU}`);
  if (prefixed) {
    const url = request.nextUrl.clone();
    url.pathname = THANK_YOU;
    const response = NextResponse.redirect(url, 308);
    response.cookies.set(LOCALE_COOKIE, prefixed, { path: "/", maxAge: 31536000, sameSite: "lax" });
    return response;
  }

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  if (pathname === "/") {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    const wanted = isLocale(saved) ? saved : pickLocale(request.headers.get("accept-language"));
    if (wanted !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${wanted}`;
      return NextResponse.redirect(url);
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // API, Next-belső és statikus fájlok (bármi, amiben pont van) kimaradnak.
  matcher: ["/((?!api|_next|pdfjs|samples|.*\\..*).*)"],
};
