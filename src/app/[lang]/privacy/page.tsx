import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, locales } from "@/i18n/config";
import { getLegal } from "@/i18n";
import { site } from "@/config/site";
import { LegalPage, plainText } from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const doc = getLegal(lang).privacy;
  return {
    title: `${doc.title} · ${site.name}`,
    description: plainText(doc.intro, lang),
    alternates: {
      canonical: localePath(lang, "/privacy"),
      languages: { ...Object.fromEntries(locales.map((l) => [l, localePath(l, "/privacy")])), "x-default": "/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <LegalPage lang={lang} kind="privacy" />;
}
