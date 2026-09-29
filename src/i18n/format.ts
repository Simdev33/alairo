import { Fragment, createElement, type ReactNode } from "react";

/** {név} helyőrzők kitöltése. */
export function fmt(str: string, vars: Record<string, string | number>) {
  return str.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Többes szám a nyelv szabályai szerint ({ one, other } pár, {n} helyőrzővel). */
export function plural(lang: string, forms: { one: string; other: string }, n: number) {
  const form = new Intl.PluralRules(lang).select(n) === "one" ? forms.one : forms.other;
  return fmt(form, { n });
}

/** Mint az fmt, de a helyőrzők helyére React-elemek is kerülhetnek (pl. linkek, kiemelés). */
export function rich(str: string, parts: Record<string, ReactNode>): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of str.matchAll(/\{(\w+)\}/g)) {
    if (!(m[1] in parts)) continue;
    out.push(str.slice(last, m.index));
    out.push(createElement(Fragment, { key: out.length }, parts[m[1]]));
    last = m.index! + m[0].length;
  }
  out.push(str.slice(last));
  return out;
}
