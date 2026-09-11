"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { LifeGrid } from "./life-grid";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const cardBase =
  "relative overflow-hidden rounded-[22px] border border-white/10 bg-ink-800/80 p-4 backdrop-blur-sm";

/** Circular progress ring widget */
export function RingWidget({
  value = 68,
  label = "This year",
  className,
}: {
  value?: number;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className={cn(cardBase, "flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#ffc107"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: reduce ? offset : c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: "drop-shadow(0 0 6px rgba(255,193,7,0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-semibold tabular-nums text-chalk">
            <AnimatedCounter to={value} format={false} suffix="%" />
          </span>
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
        {label}
      </span>
    </div>
  );
}

/** Big number widget — days remaining */
export function BigNumberWidget({
  number = 14113,
  caption = "days ahead",
  className,
}: {
  number?: number;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn(cardBase, "flex flex-col justify-between", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
        Life · days
      </span>
      <div className="mt-2">
        <div className="text-4xl font-semibold tracking-tight text-amber tabular-nums">
          <AnimatedCounter to={number} />
        </div>
        <div className="mt-1 text-sm text-chalk-muted">{caption}</div>
      </div>
    </div>
  );
}

/** Dot grid widget */
export function DotsWidget({ className }: { className?: string }) {
  return (
    <div className={cn(cardBase, className)}>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          The year
        </span>
        <span className="font-mono text-[10px] text-amber">Wk 32</span>
      </div>
      <LifeGrid cols={13} rows={4} filledRatio={0.6} gap={4} dotSize={5} />
    </div>
  );
}

/** Event countdown widget */
export function CountdownWidget({
  days = 42,
  event = "Trip to Kyoto",
  className,
}: {
  days?: number;
  event?: string;
  className?: string;
}) {
  return (
    <div className={cn(cardBase, "flex flex-col justify-between", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
        Countdown
      </span>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight text-chalk tabular-nums">
          <AnimatedCounter to={days} format={false} />
        </span>
        <span className="text-sm text-chalk-muted">days</span>
      </div>
      <div className="mt-1 truncate text-sm text-chalk-muted">{event}</div>
    </div>
  );
}

/** Compact progress bar widget */
export function ProgressWidget({
  value = 61,
  label = "2026",
  className,
}: {
  value?: number;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn(cardBase, "flex flex-col justify-center gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          {label} · progress
        </span>
        <span className="font-mono text-xs text-amber tabular-nums">
          <AnimatedCounter to={value} format={false} suffix="%" />
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full bg-amber"
          initial={{ width: reduce ? `${value}%` : 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ boxShadow: "0 0 12px rgba(255,193,7,0.6)" }}
        />
      </div>
    </div>
  );
}

/** Wide progress bar (4x2) with tick segments */
export function WideProgressWidget({
  value = 41,
  label = "Life",
  className,
}: {
  value?: number;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const segments = 40;
  const active = Math.round((value / 100) * segments);
  return (
    <div className={cn(cardBase, "flex flex-col justify-center gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          {label} · lived
        </span>
        <span className="font-mono text-xs text-amber tabular-nums">
          <AnimatedCounter to={value} format={false} suffix="%" />
        </span>
      </div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.span
            key={i}
            className="h-6 flex-1 rounded-[2px]"
            style={{
              backgroundColor: i < active ? "#ffc107" : "rgba(255,255,255,0.09)",
            }}
            initial={reduce ? false : { opacity: 0, scaleY: 0.3 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: reduce ? 0 : Math.min(i * 0.02, 0.8),
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Relationship tracker widget — days together */
export function RelationshipWidget({
  days = 1284,
  names = "A + M",
  className,
}: {
  days?: number;
  names?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn(cardBase, "flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          Together
        </span>
        <motion.span
          animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-3.5 w-3.5 fill-amber text-amber" />
        </motion.span>
      </div>
      <div className="mt-2">
        <div className="text-4xl font-semibold tracking-tight text-chalk tabular-nums">
          <AnimatedCounter to={days} />
        </div>
        <div className="mt-1 flex items-center justify-between text-sm text-chalk-muted">
          <span>days</span>
          <span className="font-mono text-xs text-amber">{names}</span>
        </div>
      </div>
    </div>
  );
}
