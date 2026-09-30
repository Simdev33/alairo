"use client";

import { useState, type FormEvent } from "react";
import { KeyRound, Mail } from "lucide-react";
import { useI18n } from "@/i18n/client";
import { fmt } from "@/i18n/format";
import { errorText, requestLoginCode, verifyLoginCode, type AccountState } from "@/lib/account";

export const fieldClass =
  "h-12 w-full rounded-xl border border-ink/15 bg-sheet px-4 text-[15px] text-ink outline-none transition-shadow placeholder:text-ink-4 focus:border-royal focus:shadow-[0_0_0_3px_rgb(43_54_232/0.15)]";

export const Spinner = ({ light = false }: { light?: boolean }) => (
  <span className={`size-4 animate-spin rounded-full border-2 ${light ? "border-white/40 border-t-white" : "border-ink/20 border-t-ink"}`} />
);

/**
 * Jelszó nélküli belépés: e-mail → 6 jegyű kód. `codeSent` esetén rögtön a
 * kódlépéssel indul (a hívó már kért kódot, pl. a fizetésnél).
 */
export function LoginForm({
  initialEmail = "",
  codeSent = false,
  onSuccess,
  className = "",
}: {
  initialEmail?: string;
  codeSent?: boolean;
  onSuccess?: (account: AccountState) => void;
  className?: string;
}) {
  const { lang, t } = useI18n();
  const text = t.auth;
  const [step, setStep] = useState<"email" | "code">(codeSent ? "code" : "email");
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (failure) {
      setError(errorText(failure, t));
    } finally {
      setBusy(false);
    }
  };

  const send = (event?: FormEvent) => {
    event?.preventDefault();
    void run(async () => {
      await requestLoginCode(email.trim(), lang);
      setCode("");
      setStep("code");
    });
  };

  const verify = (event: FormEvent) => {
    event.preventDefault();
    void run(async () => onSuccess?.(await verifyLoginCode(code, lang)));
  };

  if (step === "email") {
    return (
      <form onSubmit={send} className={`space-y-3 ${className}`}>
        <p className="text-[14px] leading-relaxed text-ink-2">{text.intro}</p>
        <label className="block space-y-1.5">
          <span className="text-[13px] font-medium text-ink-2">{text.email}</span>
          <input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} />
        </label>
        {error && <p className="text-[13.5px] text-seal">{error}</p>}
        <button type="submit" className="btn btn-primary h-12 w-full text-[15px]" disabled={busy || !email.trim()}>
          {busy ? <Spinner light /> : <Mail className="size-4" />}
          {text.sendCode}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={verify} className={`space-y-3 ${className}`}>
      <p className="text-[14px] leading-relaxed text-ink-2">{fmt(text.sent, { email: email.trim() })}</p>
      <label className="block space-y-1.5">
        <span className="text-[13px] font-medium text-ink-2">{text.code}</span>
        <input
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]*"
          maxLength={7}
          autoFocus
          required
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/[^\d ]/g, ""))}
          className={`${fieldClass} text-center font-mono text-xl tracking-[0.4em]`}
        />
      </label>
      {error && <p className="text-[13.5px] text-seal">{error}</p>}
      <button type="submit" className="btn btn-primary h-12 w-full text-[15px]" disabled={busy || code.replace(/\D/g, "").length !== 6}>
        {busy ? <Spinner light /> : <KeyRound className="size-4" />}
        {text.verify}
      </button>
      <div className="flex flex-wrap justify-between gap-2 text-[13.5px]">
        <button type="button" className="text-royal hover:underline disabled:opacity-50" onClick={() => send()} disabled={busy}>
          {text.resend}
        </button>
        <button type="button" className="text-ink-3 hover:text-ink" onClick={() => setStep("email")} disabled={busy}>
          {text.otherEmail}
        </button>
      </div>
    </form>
  );
}
