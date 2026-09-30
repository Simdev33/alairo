import type { Metadata } from "next";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { AccountPage } from "@/components/account/AccountPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/account">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getDictionary(lang).meta.accountTitle,
    robots: { index: false, follow: false },
    alternates: { canonical: localePath(lang, "/account") },
  };
}

export default function Account() {
  return <AccountPage />;
}
