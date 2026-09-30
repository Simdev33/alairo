"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/client";

/** Szöveg [látható rész](terms|privacy|account) belső linkekkel, a látogató nyelvén. */
export function LinkText({ text, className, newTab = false }: { text: string; className?: string; newTab?: boolean }) {
  const { lang } = useI18n();
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\((terms|privacy|account)\)/g)) {
    out.push(text.slice(last, m.index));
    out.push(
      <Link
        key={out.length}
        href={localePath(lang, `/${m[2]}`)}
        target={newTab ? "_blank" : undefined}
        className={className ?? "font-medium text-royal underline decoration-royal/30 underline-offset-2 hover:decoration-royal"}
      >
        {m[1]}
      </Link>,
    );
    last = m.index! + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}
