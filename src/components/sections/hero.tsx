"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo";
import { PhoneShell, WallpaperScreen } from "@/components/product/phone-mockup";
import {
  RingWidget,
  CountdownWidget,
  RelationshipWidget,
} from "@/components/product/widgets";
import { site } from "@/config/site";

const ease = [0.16, 1, 0.3, 1] as const;

function GooglePlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l9.2-9.7L3.6 2.3Z" fill="currentColor" opacity="0.9" />
      <path d="m16.3 8.7-3.5 3.4 3.5 3.4 4-2.3c.7-.4.7-1.4 0-1.8l-4-2.7Z" fill="currentColor" />
      <path d="M3.6 2.3 12.8 12l3.5-3.3L5.2 2.4c-.6-.4-1.2-.4-1.6-.1Z" fill="currentColor" opacity="0.7" />
      <path d="M12.8 12 3.6 21.7c.4.3 1 .3 1.6-.1l11.1-6.3-3.5-3.3Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const step = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay: reduce ? 0 : i * 0.09 },
  });

  const floatAnim = (dist: number) => (reduce ? undefined : { y: [0, -dist, 0] });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 dot-field opacity-50" aria-hidden />
      <motion.div
        className="pointer-events-none absolute right-[-15%] top-[-10%] h-[520px] w-[520px] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,193,7,0.22), transparent)" }}
        animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-28 md:grid-cols-2 md:gap-10 md:pb-24 md:pt-32 lg:gap-8">
        {/* LEFT: copy */}
        <div className="max-w-xl">
          <motion.p {...step(0)} className="label-eyebrow">
            <LogoMark size={14} />
            {site.attribution}
          </motion.p>

          <motion.h1
            {...step(1)}
            className="mt-6 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-tightest text-chalk sm:text-6xl md:text-[4rem] lg:text-[4.4rem]"
          >
            See your life,
            <br />
            <span className="text-amber">one dot</span> at a time.
          </motion.h1>

          <motion.p
            {...step(2)}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-chalk-muted sm:text-lg"
          >
            Dotly turns your wallpaper and home screen into a living calendar —
            the weeks you&apos;ve lived, the ones ahead, and the moments you&apos;re
            counting toward. A quiet nudge to make today count.
          </motion.p>

          <motion.div {...step(3)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              as="a"
              href={site.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              className="w-full pl-6 pr-7 sm:w-auto"
            >
              <GooglePlayGlyph className="h-6 w-6" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[11px] font-normal opacity-75">Get it on</span>
                <span className="text-base font-semibold">Google Play</span>
              </span>
            </Button>
            <Button
              as="a"
              href="#how"
              variant="secondary"
              size="xl"
              className="w-full sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              See how it works
            </Button>
          </motion.div>

          <motion.ul
            {...step(4)}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint"
          >
            {["Free to start", "No account", "Works offline"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT: phone + floating widgets (widgets only on lg to avoid clipping) */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.94, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: reduce ? 0 : 0.35 }}
          className="relative flex justify-center"
        >
          {/* phone wrapper (in normal flow → never clips) */}
          <div className="relative w-[240px] sm:w-[268px] lg:w-[288px]">
            <motion.div
              animate={floatAnim(14)}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <PhoneShell>
                <WallpaperScreen />
              </PhoneShell>
            </motion.div>

            {/* floating ring - top left (lg+) */}
            <motion.div
              className="absolute -left-28 top-8 z-20 hidden w-[136px] lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.7 }}
            >
              <motion.div
                animate={floatAnim(12)}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
              >
                <RingWidget value={68} label="This year" />
              </motion.div>
            </motion.div>

            {/* floating countdown - bottom left (lg+) */}
            <motion.div
              className="absolute -left-32 bottom-40 z-20 hidden w-[152px] lg:block"
              initial={{ opacity: 0, x: -20, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.9 }}
            >
              <motion.div
                animate={floatAnim(10)}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
              >
                <CountdownWidget days={42} event="Kyoto" />
              </motion.div>
            </motion.div>

            {/* floating relationship - top right (lg+) */}
            <motion.div
              className="absolute -right-24 top-24 z-20 hidden w-[152px] lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.85 }}
            >
              <motion.div
                animate={floatAnim(12)}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
              >
                <RelationshipWidget days={1284} names="A + M" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
