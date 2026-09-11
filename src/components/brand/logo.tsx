import { cn } from "@/lib/utils";

/**
 * Dotly logomark — a grid of dots with a single amber "today" dot.
 * Echoes the app's memento-mori dot-grid motif.
 */
export function LogoMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  const cols = 4;
  const rows = 4;
  const gap = 8;
  const pad = 4;
  const r = 2.4;
  // Highlight the 3rd dot on the 2nd row as "today"
  const activeIndex = 1 * cols + 2;

  const dots = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col;
      const cx = pad + col * gap;
      const cy = pad + row * gap;
      const active = i === activeIndex;
      dots.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={active ? r + 0.9 : r}
          fill={active ? "#ffc107" : "currentColor"}
          opacity={active ? 1 : i < activeIndex ? 0.9 : 0.32}
        />
      );
    }
  }

  const dim = pad * 2 + (cols - 1) * gap;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${dim} ${dim}`}
      className={cn("text-chalk", className)}
      role="img"
      aria-label="Dotly logo"
    >
      {dots}
    </svg>
  );
}

export function Logo({
  className,
  markSize = 26,
}: {
  className?: string;
  markSize?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      <span className="text-[17px] font-semibold tracking-tight text-chalk">
        Dotly
      </span>
    </span>
  );
}
