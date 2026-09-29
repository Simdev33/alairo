import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLegal } from "@/i18n";
import { fmt } from "@/i18n/format";
import { site } from "@/config/site";
import type { LegalBlock } from "@/legal/types";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type LegalKind = "terms" | "privacy";

const values = (): Record<string, string> => ({
  site: site.name,
  operatorName: site.operator.name,
  operatorEmail: site.operator.email,
  hosting: site.hosting,
  storage: site.storage,
  storageRegion: site.storageRegion,
});

/** A jogi szöveg egy bekezdése: helyőrzők, [szöveg](terms|privacy) linkek, kattintható e-mail-cím. */
function Inline({ text, lang }: { text: string; lang: Locale }) {
  const v = values();
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(/\[([^\]]+)\]\((terms|privacy)\)|\{(\w+)\}/g)) {
    out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <Link key={out.length} href={`/${lang}/${m[2]}`} className="font-medium text-royal underline decoration-royal/30 underline-offset-4 hover:decoration-royal">
          {m[1]}
        </Link>,
      );
    } else if (m[3] === "operatorEmail") {
      out.push(
        <a key={out.length} href={`mailto:${site.operator.email}`} className="font-medium text-royal underline decoration-royal/30 underline-offset-4">
          {site.operator.email}
        </a>,
      );
    } else {
      out.push(v[m[3]] ?? m[0]);
    }
    last = m.index! + m[0].length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

export function plainText(text: string) {
  const v = values();
  return text.replace(/\[([^\]]+)\]\((?:terms|privacy)\)/g, "$1").replace(/\{(\w+)\}/g, (m, k: string) => v[k] ?? m);
}

function Block({ block, lang }: { block: LegalBlock; lang: Locale }) {
  const t = getDictionary(lang);
  if (typeof block === "string") {
    return (
      <p>
        <Inline text={block} lang={lang} />
      </p>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-2 pl-1">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-royal/70" />
            <span>
              <Inline text={item} lang={lang} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  const labels = t.legal.operatorLabels;
  const rows = (
    [
      [labels.name, site.operator.name],
      [labels.address, site.operator.address],
      [labels.email, site.operator.email],
      [labels.taxId, site.operator.taxId],
      [labels.registration, site.operator.registration],
      [labels.hosting, site.hosting],
    ] as const
  ).filter(([, value]) => value);
  return (
    <dl className="grid gap-x-6 gap-y-2.5 rounded-2xl border border-ink/10 bg-paper/60 px-5 py-4 text-[15px] sm:grid-cols-[auto_1fr]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-[12px] font-medium uppercase tracking-[0.12em] text-ink-3 sm:pt-[3px]">{label}</dt>
          <dd className="text-ink">
            {value === site.operator.email ? (
              <a href={`mailto:${value}`} className="text-royal underline decoration-royal/30 underline-offset-4">
                {value}
              </a>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LegalPage({ lang, kind }: { lang: Locale; kind: LegalKind }) {
  const t = getDictionary(lang);
  const doc = getLegal(lang)[kind];
  const effective = new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date(`${site.effectiveDate}T12:00:00`));
  const other: LegalKind = kind === "terms" ? "privacy" : "terms";

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1140px] items-center justify-between gap-4 px-4 sm:px-8">
          <Link href={`/${lang}`} aria-label={t.legal.backHome}>
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${lang}`}
              className="hidden rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink sm:block"
            >
              ← {t.legal.backHome}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-ink/10">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_0%,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-[1140px] px-4 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16">
          <nav className="flex flex-wrap gap-2" aria-label={t.legal.alsoSee}>
            {(["terms", "privacy"] as const).map((k) => (
              <Link
                key={k}
                href={`/${lang}/${k}`}
                aria-current={k === kind ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  k === kind ? "bg-ink text-sheet" : "border border-ink/10 bg-sheet/70 text-ink-2 hover:text-ink"
                }`}
              >
                {getLegal(lang)[k].title}
              </Link>
            ))}
          </nav>
          <h1 className="mt-7 max-w-3xl font-serif text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] tracking-[-0.015em]">{doc.title}</h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">{fmt(t.legal.effective, { date: effective })}</p>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-2">
            <Inline text={doc.intro} lang={lang} />
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1140px] gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24" aria-label={t.legal.contents}>
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">{t.legal.contents}</div>
            <ol className="mt-4 space-y-1.5 border-l border-ink/10">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex gap-2.5 border-l border-transparent py-0.5 pl-4 text-[13.5px] leading-snug text-ink-3 transition-colors hover:border-royal hover:text-ink"
                  >
                    <span className="w-4 shrink-0 font-mono text-[11px] leading-[1.6] text-ink-4">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="card max-w-3xl rounded-[26px] px-6 py-8 sm:px-10 sm:py-12">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-ink/[0.07] pb-8 pt-8 first:pt-0 last:border-0 last:pb-0">
              <h2 className="flex items-baseline gap-3 font-serif text-[1.75rem] leading-tight">
                <span className="font-mono text-[13px] text-royal">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-[15.5px] leading-[1.75] text-ink-2">
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} lang={lang} />
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>

      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-[1140px] flex-col gap-3 px-4 py-8 text-[12.5px] text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </span>
          <Link href={`/${lang}/${other}`} className="underline decoration-ink/20 underline-offset-4 hover:text-ink">
            {getLegal(lang)[other].title} →
          </Link>
        </div>
      </footer>
    </div>
  );
}
