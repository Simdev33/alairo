import type { Signature } from "@/lib/types";

export function SignatureSvg({
  sig,
  className,
  color,
}: {
  sig: Pick<Signature, "d" | "width" | "height" | "color">;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${sig.width} ${sig.height}`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <path d={sig.d} fill={color ?? sig.color} />
    </svg>
  );
}
