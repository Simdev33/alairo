import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getLegal } from "@/i18n";
import { site } from "@/config/site";
import { LegalPage, plainText } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const doc = getLegal(lang).privacy;
  return {
    title: `${doc.title} · ${site.name}`,
    description: plainText(doc.intro),
    alternates: { canonical: `/${lang}/privacy`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])) },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage lang={lang} kind="privacy" />;
}
