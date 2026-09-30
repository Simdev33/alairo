import "server-only";
import type { Locale } from "./config";
import { hu } from "./dictionaries/hu";
import { en, type Dictionary } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { fr } from "./dictionaries/fr";
import { es } from "./dictionaries/es";
import { legal as legalHu } from "@/legal/hu";
import { legal as legalEn } from "@/legal/en";
import { legal as legalDe } from "@/legal/de";
import { legal as legalFr } from "@/legal/fr";
import { legal as legalEs } from "@/legal/es";
import type { LegalTexts } from "@/legal/types";

const dictionaries: Record<Locale, Dictionary> = { hu, en, de, fr, es };
const legalTexts: Record<Locale, LegalTexts> = { hu: legalHu, en: legalEn, de: legalDe, fr: legalFr, es: legalEs };

export const getDictionary = (lang: Locale) => dictionaries[lang];
export const getLegal = (lang: Locale) => legalTexts[lang];
