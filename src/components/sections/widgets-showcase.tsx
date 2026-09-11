"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import {
  RingWidget,
  BigNumberWidget,
  DotsWidget,
  CountdownWidget,
  WideProgressWidget,
  RelationshipWidget,
} from "@/components/product/widgets";

const items: { name: string; node: React.ReactNode; wide?: boolean }[] = [
  { name: "Progress ring", node: <RingWidget value={68} label="This year" /> },
  { name: "Big number", node: <BigNumberWidget number={14113} caption="days ahead" /> },
  { name: "Event countdown", node: <CountdownWidget days={42} event="Trip to Kyoto" /> },
  { name: "Relationship", node: <RelationshipWidget days={1284} names="A + M" /> },
  { name: "Dot grid", node: <DotsWidget />, wide: true },
  { name: "Wide progress", node: <WideProgressWidget value={41} label="Life" />, wide: true },
];

export function WidgetsShowcase() {
  const reduce = useReducedMotion();
  return (
    <section
      id="widgets"
      className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 dot-field-tight opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,193,7,0.14), transparent)" }}
        aria-hidden
      />

      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">Widgets</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            Six ways to keep time on your home screen.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-chalk-muted">
            Mix and match. Every widget is resizable and themeable, so your home
            screen looks exactly the way you want it to.
          </p>
        </Reveal>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {items.map((item) => (
            <motion.figure
              key={item.name}
              className={item.wide ? "col-span-2" : "col-span-1"}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="transition-transform duration-500 ease-premium hover:-translate-y-1.5">
                {item.node}
              </div>
              <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
                {item.name}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
