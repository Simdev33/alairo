import type { Metadata, Viewport } from "next";
import { getMeta } from "@/lib/store";
import { PhoneSigner } from "@/components/PhoneSigner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Aláírás · Kézjegy",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#f3efe6",
};

export default async function PhonePage({ params }: PageProps<"/s/[id]">) {
  const { id } = await params;
  const meta = await getMeta(id);
  return <PhoneSigner id={id} fileName={meta?.fileName ?? null} />;
}
