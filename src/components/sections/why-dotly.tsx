"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Lock, Feather, WifiOff, Heart } from "lucide-react";

const points = [
  {
    icon: Feather,
    title: "Calm by design",
    body: "No streaks, no scores, no red badges. Dotly informs — it never pressures. Perspective, not another thing to maintain.",
  },
  {
    icon: Lock,
    title: "Private by default",
    body: "Your birthday and events stay on your device. No account, no tracking, no data leaving your phone.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    body: "It's just your time, rendered locally. Dotly runs completely offline — no connection required, ever.",
  },
  {
    icon: Heart,
    title: "Made to be lived with",
    body: "Lightweight on battery, quiet in the background, and tuned to look right on any home screen you throw at it.",
  },
];

export function WhyDotly() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">Why Dotly</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            A wallpaper that respects you.
          </h2>
        </Reveal>

        <Stagger className="mt-16 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
          {points.map((p) => (
            <StaggerItem key={p.title}>
              <div className="flex gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <p.icon className="h-5 w-5 text-amber" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-chalk">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-chalk-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
