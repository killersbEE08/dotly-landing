"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { faqs } from "@/config/faqs";

function Item({
  faq,
  open,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-medium tracking-tight text-chalk">
          {faq.q}
        </span>
        <span
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/12 transition-colors duration-300",
            open ? "bg-amber text-ink" : "text-chalk-muted"
          )}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Plus className="h-4 w-4" />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 text-[15px] leading-relaxed text-chalk-muted">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="label-eyebrow">FAQ</p>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
                Good questions,
                <br />
                <span className="text-chalk-muted">short answers.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.1}>
              <div>
                {faqs.map((faq, i) => (
                  <Item
                    key={faq.q}
                    faq={faq}
                    open={open === i}
                    onToggle={() => setOpen(open === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
