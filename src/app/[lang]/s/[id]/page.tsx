import type { Metadata, Viewport } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { getMeta } from "@/lib/store";
import { PhoneSigner } from "@/components/PhoneSigner";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[lang]/s/[id]">): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: isLocale(lang) ? getDictionary(lang).meta.phoneTitle : undefined,
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#f3efe6",
};

export default async function PhonePage({ params }: PageProps<"/[lang]/s/[id]">) {
  const { id } = await params;
  const meta = await getMeta(id);
  return <PhoneSigner id={id} fileName={meta?.fileName ?? null} />;
}
