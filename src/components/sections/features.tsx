"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { PhoneShell, WallpaperScreen } from "@/components/product/phone-mockup";
import { LifeGrid } from "@/components/product/life-grid";
import {
  RingWidget,
  BigNumberWidget,
  CountdownWidget,
  RelationshipWidget,
} from "@/components/product/widgets";

interface Feature {
  num: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}

function QuotesVisual() {
  const quotes = [
    { q: "The trouble is, you think you have time.", a: "Buddha" },
    { q: "How we spend our days is how we spend our lives.", a: "Annie Dillard" },
    { q: "Very little is needed to make a happy life.", a: "Marcus Aurelius" },
  ];
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {quotes.map((item, i) => (
        <motion.blockquote
          key={i}
          className={cn(
            "rounded-2xl border border-white/[0.08] bg-ink-900/70 p-5",
            i === 0 && "ring-1 ring-amber/25"
          )}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[15px] leading-relaxed text-chalk/90">
            &ldquo;{item.q}&rdquo;
          </p>
          <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-amber/80">
            — {item.a}
          </footer>
        </motion.blockquote>
      ))}
    </div>
  );
}

const features: Feature[] = [
  {
    num: "01",
    title: "Your life, on your wallpaper",
    body: "A live wallpaper that quietly renders your life as a grid of dots — behind your apps, always in view. No notifications, no noise. Just a calm, constant sense of where you are.",
    visual: (
      <div className="w-[240px]">
        <PhoneShell>
          <WallpaperScreen />
        </PhoneShell>
      </div>
    ),
  },
  {
    num: "02",
    title: "Count down to what matters",
    body: "Birthdays, a trip, an anniversary, a deadline — pin the moments ahead and watch the days tick down. The relationship tracker even counts the days you've spent together.",
    visual: (
      <div className="grid w-full max-w-md grid-cols-2 gap-4">
        <CountdownWidget days={42} event="Trip to Kyoto" />
        <RelationshipWidget days={1284} names="A + M" />
        <BigNumberWidget number={14113} caption="days ahead" />
        <RingWidget value={68} label="This year" />
      </div>
    ),
  },
  {
    num: "03",
    title: "A little wisdom, every day",
    body: "A rotating line of Stoic reflection appears with your grid — Seneca, Marcus Aurelius, and others on time and intention. Enough to pause you for a second. Never enough to nag.",
    visual: <QuotesVisual />,
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal
        className={cn("order-2", flip ? "md:order-2" : "md:order-1")}
        y={reduce ? 0 : 20}
      >
        <span className="font-mono text-sm tracking-[0.2em] text-amber">
          {feature.num}
        </span>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-chalk md:text-[2rem]">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-chalk-muted">
          {feature.body}
        </p>
      </Reveal>

      <Reveal
        className={cn(
          "order-1 flex justify-center",
          flip ? "md:order-1" : "md:order-2"
        )}
        delay={0.1}
      >
        <div className="relative flex w-full items-center justify-center rounded-3xl border border-white/[0.06] bg-gradient-to-b from-ink-900/60 to-ink/40 p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 dot-field-tight rounded-3xl opacity-40" aria-hidden />
          <div className="relative">{feature.visual}</div>
        </div>
      </Reveal>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">Features</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            Everything you need to feel your time. Nothing you don&apos;t.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {features.map((f, i) => (
            <FeatureRow key={f.num} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
