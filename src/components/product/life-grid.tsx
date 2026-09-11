"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * LifeGrid — the signature memento-mori dot grid.
 * `filled` dots represent time already lived; the first "empty" dot is
 * highlighted amber as "today"; remaining dots are the time ahead.
 */
export function LifeGrid({
  cols = 18,
  rows = 26,
  filledRatio = 0.41,
  gap = 3,
  dotSize = 2,
  animate = true,
  className,
}: {
  cols?: number;
  rows?: number;
  filledRatio?: number;
  gap?: number;
  dotSize?: number;
  animate?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const total = cols * rows;
  const filled = Math.floor(total * filledRatio);

  return (
    <div
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
      aria-hidden
    >
      {Array.from({ length: total }).map((_, i) => {
        const isPast = i < filled;
        const isToday = i === filled;
        return (
          <motion.span
            key={i}
            className={
              isToday && !reduce ? "rounded-full animate-pulse-dot" : "rounded-full"
            }
            style={{
              width: dotSize + (isToday ? 1 : 0),
              height: dotSize + (isToday ? 1 : 0),
              backgroundColor: isToday
                ? "#ffc107"
                : isPast
                  ? "rgba(244,244,242,0.82)"
                  : "rgba(244,244,242,0.14)",
              boxShadow: isToday ? "0 0 8px 1px rgba(255,193,7,0.7)" : undefined,
            }}
            initial={animate && !reduce ? { opacity: 0, scale: 0.4 } : false}
            whileInView={animate && !reduce ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : Math.min(i * 0.0015, 0.9),
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        );
      })}
    </div>
  );
}
