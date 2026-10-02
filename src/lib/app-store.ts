"use client";

import { create } from "zustand";
import type { PDFDocumentProxy } from "pdfjs-dist";
import type { PageInfo } from "./pdf";
import type { Placement } from "./sign-pdf";
import type { LivePreview, Signature } from "./types";
import type { SignedResult } from "./pending";

export type LoadedDoc = {
  name: string;
  size: number;
  convertedFrom: string | null;
  bytes: Uint8Array;
  pdf: PDFDocumentProxy;
  pages: PageInfo[];
};

export type PhoneLink = {
  status: "idle" | "creating" | "live" | "expired" | "error";
  id: string | null;
  url: string | null;
  alternatives: { label: string; url: string }[];
  expiresAt: number | null;
  connected: boolean;
  drawing: boolean;
  preview: LivePreview | null;
};

type State = {
  doc: LoadedDoc | null;
  signatures: Signature[];
  placements: Placement[];
  selectedId: string | null;
  /** Kattintásos elhelyezés: melyik aláírás vár arra, hogy egy oldalra kattints. */
  armedSigId: string | null;
  /** Utoljára érkezett aláírás — a tálca ezt kiemeli. */
  freshSigId: string | null;
  phone: PhoneLink;
  /** Törölt aláírások — ha az élő kapcsolat újra elküldi őket, ne jelenjenek meg megint. */
  dismissed: Set<string>;
  toast: { id: number; text: string; tone: "info" | "success" | "error" } | null;
  /** Fizetési ablak: az aláírt PDF előfizetés nélkül ide kerül a letöltés helyett. */
  paywall: { result: SignedResult; expiresAt: number; error?: string } | null;
  /** A letöltött aláírt PDF — ilyenkor a „Kész, aláírva!” ablak látszik. */
  done: SignedResult | null;
  /** Fizetés után a köszönőoldal ezt mutatja (és tölti le újra). */
  purchased: SignedResult | null;

  setDoc: (doc: LoadedDoc | null) => void;
  addSignature: (sig: Signature) => void;
  removeSignature: (id: string) => void;
  place: (p: Omit<Placement, "id">) => string;
  updatePlacement: (id: string, patch: Partial<Placement>) => void;
  removePlacement: (id: string) => void;
  select: (id: string | null) => void;
  arm: (sigId: string | null) => void;
  setPhone: (patch: Partial<PhoneLink>) => void;
  notify: (text: string, tone?: "info" | "success" | "error") => void;
  setPaywall: (paywall: State["paywall"]) => void;
  setDone: (done: SignedResult | null) => void;
  setPurchased: (purchased: SignedResult | null) => void;
};

const emptyPhone: PhoneLink = {
  status: "idle",
  id: null,
  url: null,
  alternatives: [],
  expiresAt: null,
  connected: false,
  drawing: false,
  preview: null,
};

let seq = 0;
export const uid = (p = "id") => `${p}_${Date.now().toString(36)}_${(seq++).toString(36)}`;

export const useApp = create<State>((set) => ({
  doc: null,
  signatures: [],
  placements: [],
  selectedId: null,
  armedSigId: null,
  freshSigId: null,
  phone: emptyPhone,
  dismissed: new Set(),
  toast: null,
  paywall: null,
  done: null,
  purchased: null,

  setDoc: (doc) =>
    set((s) => {
      // A kilépő animáció alatt még rajzolhat — csak utána szabadítjuk fel a workert.
      const old = s.doc?.pdf;
      if (old && old !== doc?.pdf) setTimeout(() => old.loadingTask.destroy(), 1500);
      return {
        doc,
        placements: [],
        selectedId: null,
        armedSigId: null,
        freshSigId: null,
        phone: emptyPhone,
        toast: null,
        // Az aláírások megmaradnak — egy új dokumentumon is felhasználhatók.
      };
    }),
  addSignature: (sig) =>
    set((s) =>
      s.dismissed.has(sig.id) || s.signatures.some((x) => x.id === sig.id)
        ? s
        : { signatures: [...s.signatures, sig], freshSigId: sig.id },
    ),
  removeSignature: (id) =>
    set((s) => ({
      dismissed: new Set(s.dismissed).add(id),
      signatures: s.signatures.filter((x) => x.id !== id),
      placements: s.placements.filter((p) => p.sigId !== id),
      armedSigId: s.armedSigId === id ? null : s.armedSigId,
    })),
  place: (p) => {
    const id = uid("pl");
    set((s) => ({ placements: [...s.placements, { ...p, id }], selectedId: id, armedSigId: null }));
    return id;
  },
  updatePlacement: (id, patch) =>
    set((s) => ({ placements: s.placements.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  removePlacement: (id) =>
    set((s) => ({ placements: s.placements.filter((p) => p.id !== id), selectedId: s.selectedId === id ? null : s.selectedId })),
  select: (selectedId) => set({ selectedId }),
  arm: (armedSigId) => set({ armedSigId, selectedId: null }),
  setPhone: (patch) => set((s) => ({ phone: { ...s.phone, ...patch } })),
  notify: (text, tone = "info") => set({ toast: { id: Date.now(), text, tone } }),
  setPaywall: (paywall) => set({ paywall }),
  setDone: (done) => set({ done }),
  setPurchased: (purchased) => set({ purchased }),
}));

/** Az aláírás magassága az oldal magasságának arányában, adott szélességnél. */
export function placementHeight(p: Pick<Placement, "w">, sig: Pick<Signature, "width" | "height">, page: PageInfo) {
  return (p.w * page.width * (sig.height / sig.width)) / page.height;
}
