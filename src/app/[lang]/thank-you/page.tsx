import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { ThankYouPage } from "@/components/ThankYouPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/thank-you">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDictionary(lang).meta.thankYouTitle,
    robots: { index: false, follow: false },
    // Minden nyelven ugyanazon a címen él (lásd proxy.ts).
    alternates: { canonical: "/thank-you" },
  };
}

export default function ThankYou() {
  return <ThankYouPage />;
}
