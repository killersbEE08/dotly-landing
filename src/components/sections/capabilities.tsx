"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Grid2x2,
  Smartphone,
  CircleDot,
  Hash,
  Timer,
  Heart,
  BarChart3,
  AlignJustify,
  Quote,
  Palette,
  ShieldCheck,
  Sparkle,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const caps = [
  { icon: Smartphone, label: "Live wallpaper", note: "Your life grid, behind your apps" },
  { icon: Grid2x2, label: "Dot grid", note: "Weeks, days, or months" },
  { icon: CircleDot, label: "Progress ring", note: "Year & life completion" },
  { icon: Hash, label: "Big number", note: "Days ahead at a glance" },
  { icon: BarChart3, label: "Wide progress", note: "A bar for your home screen" },
  { icon: Timer, label: "Event countdowns", note: "Trips, birthdays, deadlines" },
  { icon: Heart, label: "Relationship tracker", note: "Days spent together" },
  { icon: Quote, label: "Daily Stoic wisdom", note: "A line to pause you" },
  { icon: Palette, label: "Color themes", note: "Match your home screen" },
  { icon: AlignJustify, label: "Custom grid styles", note: "Compact to relaxed" },
  { icon: ShieldCheck, label: "Private & offline", note: "No account, no tracking" },
  { icon: Sparkle, label: "Dotly Pro", note: "No ads, unlimited events" },
];

export function Capabilities() {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">Everything in Dotly</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            One small app. A lot of ways to see your time.
          </h2>
        </Reveal>

        <motion.ul
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        >
          {caps.map((c) => (
            <motion.li
              key={c.label}
              className="group relative bg-ink-900/90 p-5 transition-colors duration-300 hover:bg-ink-800 md:p-6"
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <c.icon className="h-5 w-5 text-amber transition-transform duration-300 group-hover:scale-110" />
              <p className="mt-4 text-[15px] font-medium text-chalk">{c.label}</p>
              <p className="mt-1 text-[13px] leading-snug text-chalk-faint">{c.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
