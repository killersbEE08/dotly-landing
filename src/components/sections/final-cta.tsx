"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { LifeGrid } from "@/components/product/life-grid";
import { site } from "@/config/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.15]" aria-hidden>
        <div className="w-[900px] max-w-none vignette">
          <LifeGrid cols={40} rows={16} filledRatio={0.42} gap={5} dotSize={4} animate={false} />
        </div>
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-chalk md:text-6xl">
            Make today count.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-chalk-muted">
            You have this week. Start seeing it.
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              as="a"
              href={site.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
            >
              Get Dotly
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-chalk-faint">
            {site.attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
