// Jogi szövegek szerkezete. A bekezdésekben:
//   {site}, {siteUrl}, {operatorName}, {operatorEmail}, {hosting}, {storage}, {storageRegion} — a src/config/site.ts-ből
//   {trial}, {monthly}, {days}, {next} — az előfizetés árai és napjai (src/lib/plan.ts), a nyelv pénzformátumában
//   [látható szöveg](terms|privacy|account) — belső hivatkozás
export type LegalBlock = string | { list: string[] } | { operator: true };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export type LegalTexts = { terms: LegalDoc; privacy: LegalDoc };
