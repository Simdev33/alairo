import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getLegal } from "@/i18n";
import { site } from "@/config/site";
import { LegalPage, plainText } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const doc = getLegal(lang).terms;
  return {
    title: `${doc.title} · ${site.name}`,
    description: plainText(doc.intro),
    alternates: { canonical: `/${lang}/terms`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/terms`])) },
  };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage lang={lang} kind="terms" />;
}
