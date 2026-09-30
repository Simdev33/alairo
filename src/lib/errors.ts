import type { Dictionary } from "@/i18n/dictionaries/en";

/** A felhasználónak szóló hibák kódja — a szöveg a szótár `errors` részéből jön, az aktuális nyelven. */
export type ErrorCode = keyof Dictionary["errors"];

export class AppError extends Error {
  constructor(
    readonly code: ErrorCode,
    readonly vars: Record<string, string> = {},
  ) {
    super(code);
  }
}
