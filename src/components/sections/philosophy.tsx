"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

export function Philosophy() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-40">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,193,7,0.12), transparent)" }}
        aria-hidden
      />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="label-eyebrow justify-center">Design philosophy</p>
          <h2 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-chalk md:text-6xl">
            Less counting down.
            <br />
            <span className="text-chalk-muted">More living up.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-chalk-muted">
            We built Dotly around a single belief: you don&apos;t need another
            app demanding your attention. You need one that gives it back. So we
            stripped away everything loud and kept only what earns its place on
            your screen — a quiet grid, an honest number, a moment of pause.
          </p>
        </Reveal>

        <motion.div
          className="mx-auto mt-14 flex max-w-xs justify-center gap-2"
          aria-hidden
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: i === 4 ? "#ffc107" : "rgba(244,244,242,0.16)",
                boxShadow: i === 4 ? "0 0 10px rgba(255,193,7,0.8)" : undefined,
              }}
              variants={{
                hidden: { opacity: 0, scale: reduce ? 1 : 0.3 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
