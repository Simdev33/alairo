"use client";

/**
 * A látogató fiókja, ahogy a böngésző látja: ki van belépve, és letölthet-e.
 * A döntést a szerver hozza (/api/account); ez csak a felületnek tárolja.
 */
import { create } from "zustand";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

export interface AccessInfo {
  active: boolean;
  status: string;
  trialEnd: number | null;
  periodEnd: number | null;
  cancelAtPeriodEnd: boolean;
}

export interface AccountState {
  loaded: boolean;
  signedIn: boolean;
  email: string | null;
  access: AccessInfo | null;
  /** A szerveren be van állítva a Stripe. */
  billing: boolean;
}

export const useAccount = create<AccountState>()(() => ({ loaded: false, signedIn: false, email: null, access: null, billing: true }));

type ServerCode = keyof Dictionary["server"];

export class ApiError extends Error {
  constructor(
    readonly code: ServerCode,
    readonly status: number,
  ) {
    super(code);
  }
}

/** A szerver hibakódja a látogató nyelvén. */
export const errorText = (error: unknown, t: Dictionary) =>
  error instanceof ApiError ? (t.server[error.code] ?? t.common.unexpected) : t.common.unexpected;

export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const response = await fetch(path, {
    method: init?.method ?? (init?.body ? "POST" : "GET"),
    headers: init?.body ? { "Content-Type": "application/json" } : undefined,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const data = (await response.json().catch(() => ({}))) as T & { code?: ServerCode };
  if (!response.ok) throw new ApiError(data.code ?? "unexpected", response.status);
  return data;
}

/** A nem httpOnly jelzősüti szerint lehet-e, hogy valaki be van lépve. */
export const maybeSignedIn = () => typeof document !== "undefined" && document.cookie.split("; ").some((cookie) => cookie.startsWith("ds_signed_in="));

export async function loadAccount(): Promise<AccountState> {
  const data = await api<Omit<AccountState, "loaded">>("/api/account");
  const state: AccountState = {
    loaded: true,
    signedIn: data.signedIn,
    email: data.email ?? null,
    access: data.access ?? null,
    billing: data.billing,
  };
  useAccount.setState(state);
  return state;
}

export async function signOut() {
  await api("/api/account", { method: "DELETE" });
  useAccount.setState({ loaded: true, signedIn: false, email: null, access: null });
}

export const requestLoginCode = (email: string, locale: Locale) => api<{ sent: boolean }>("/api/auth/request", { body: { email, locale } });

export async function verifyLoginCode(code: string, locale: Locale) {
  await api("/api/auth/verify", { body: { code, locale } });
  return loadAccount();
}

export async function openBillingPortal(locale: Locale, returnPath: string) {
  const { url } = await api<{ url: string }>("/api/account/portal", { body: { locale, returnPath } });
  window.location.assign(url);
}
