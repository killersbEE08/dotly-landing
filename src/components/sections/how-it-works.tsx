"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { CalendarDays, Grid2x2, Sparkles } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: CalendarDays,
    title: "Set your date",
    body: "Enter your birthday once. Dotly maps your life into weeks and figures out exactly where today falls on the grid.",
  },
  {
    num: "02",
    icon: Grid2x2,
    title: "Choose your view",
    body: "Pick a live wallpaper, add home-screen widgets, or both. Tune the grid density, colors, and what each dot represents.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Live with it",
    body: "Every unlock, there it is — a quiet, honest picture of your time. No streaks to break, no guilt. Just perspective.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 dot-field opacity-30" aria-hidden />
      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">See it in action</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            Set it up in under a minute.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] md:mt-20 md:grid-cols-3">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="group relative h-full bg-ink-900/90 p-8 transition-colors duration-300 hover:bg-ink-800 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tracking-[0.2em] text-amber">
                    {s.num}
                  </span>
                  <s.icon className="h-5 w-5 text-chalk-faint transition-colors duration-300 group-hover:text-amber" />
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-chalk">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-chalk-muted">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
