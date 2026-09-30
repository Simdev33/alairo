export function LogoMark({ className = "size-8", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="16" fill={inverted ? "var(--color-sheet)" : "currentColor"} />
      <path
        d="M13 40c4-9 8-18 11-17 3 1-3 15-2 17 1 2 6-10 10-9 3 1-2 9 1 9s6-8 9-7c2 1-1 6 2 6 2 0 4-3 7-4"
        fill="none"
        stroke={inverted ? "var(--color-ink)" : "var(--color-sheet)"}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 49h36" stroke="var(--color-royal)" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ compact = false, inverted = false }: { compact?: boolean; inverted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${inverted ? "text-sheet" : "text-ink"}`}>
      <LogoMark className="size-8 shrink-0" inverted={inverted} />
      {!compact && (
        <span className="font-serif text-[1.65rem] leading-none tracking-[-0.01em]">
          DoneSign<span className={inverted ? "text-[#8e97ff]" : "text-royal"}>In</span>
        </span>
      )}
    </span>
  );
}
