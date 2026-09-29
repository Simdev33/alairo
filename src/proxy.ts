import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, locales, pickLocale } from "@/i18n/config";

// Nyelv nélküli címek (pl. / vagy a régi /s/…) → a választott vagy a böngésző nyelvére irányítunk.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : pickLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // API, Next-belső és statikus fájlok (bármi, amiben pont van) kimaradnak.
  matcher: ["/((?!api|_next|pdfjs|samples|.*\\..*).*)"],
};
