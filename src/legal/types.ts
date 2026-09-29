// Jogi szövegek szerkezete. A bekezdésekben:
//   {operatorName}, {operatorEmail}, {site}, {hosting}, {storage}, {storageRegion} — a src/config/site.ts-ből
//   [látható szöveg](terms) / [látható szöveg](privacy) — belső hivatkozás a másik jogi oldalra
export type LegalBlock = string | { list: string[] } | { operator: true };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export type LegalTexts = { terms: LegalDoc; privacy: LegalDoc };
