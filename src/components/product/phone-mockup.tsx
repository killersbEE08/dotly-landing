"use client";

import { cn } from "@/lib/utils";
import { LifeGrid } from "./life-grid";
import {
  RingWidget,
  BigNumberWidget,
  DotsWidget,
  CountdownWidget,
} from "./widgets";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-chalk/80">
      <span className="font-mono tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-2.5 rounded-[2px] border border-chalk/50" />
        <span className="inline-block h-2.5 w-3.5 rounded-[3px] border border-chalk/50" />
        <span className="inline-block h-2.5 w-5 rounded-[3px] bg-chalk/50" />
      </div>
    </div>
  );
}

/** The phone shell — notch, bezels, screen */
export function PhoneShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full rounded-[2.6rem] border border-white/12 bg-ink-900 p-2 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
        className
      )}
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-24 h-12 w-[3px] rounded-l bg-white/10" />
      <span className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-white/10" />
      <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-white/10" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-black">
        {/* notch */}
        <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-white/10">
          <span className="absolute right-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/15" />
        </div>
        {children}
      </div>
    </div>
  );
}

/** Wallpaper screen — the memento-mori life grid + quote */
export function WallpaperScreen() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-[#141007] via-ink-900 to-black">
      {/* amber ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-60"
        style={{ background: "radial-gradient(120% 80% at 70% 0%, rgba(255,193,7,0.22), transparent)" }}
      />
      <StatusBar />

      <div className="relative flex flex-1 flex-col items-center px-5 pt-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber/70">
          Your life in weeks
        </p>
        <div className="mt-5 w-full max-w-[230px]">
          <LifeGrid cols={16} rows={24} filledRatio={0.4} gap={3} dotSize={3.2} />
        </div>
        <div className="mt-6 flex w-full max-w-[230px] items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
          <span className="text-chalk/70">41% lived</span>
          <span className="text-chalk-faint">2,438 weeks left</span>
        </div>
      </div>

      <div className="relative px-6 pb-12 pt-5">
        <div className="hairline mb-4" />
        <p className="text-pretty text-[13px] leading-relaxed text-chalk/90">
          Begin at once to live, and count each separate day as a separate life.
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber/80">
          — Seneca
        </p>
      </div>

      {/* home indicator */}
      <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

/** Home screen showing widgets */
export function WidgetsScreen() {
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-ink-800 via-ink-900 to-black">
      <StatusBar />
      <div className="flex-1 px-4 pt-8">
        <p className="mb-1 text-center font-mono text-[11px] tracking-[0.2em] text-chalk/70">
          Wednesday, 11
        </p>
        <p className="mb-6 text-center text-2xl font-semibold tracking-tight text-chalk">
          September
        </p>

        <div className="grid grid-cols-2 gap-3">
          <RingWidget value={68} label="This year" />
          <BigNumberWidget number={14113} caption="days ahead" />
          <CountdownWidget days={42} event="Kyoto" />
          <div className="rounded-[22px] border border-white/10 bg-ink-700/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
              Today
            </p>
            <p className="mt-2 text-[13px] leading-snug text-chalk/85">
              You have power over your mind — not outside events.
            </p>
          </div>
        </div>
        <div className="mt-3">
          <DotsWidget />
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

export function PhoneMockup({
  variant = "wallpaper",
  className,
}: {
  variant?: "wallpaper" | "widgets";
  className?: string;
}) {
  return (
    <PhoneShell className={className}>
      {variant === "wallpaper" ? <WallpaperScreen /> : <WidgetsScreen />}
    </PhoneShell>
  );
}
