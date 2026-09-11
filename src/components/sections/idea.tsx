"use client";

import { Reveal } from "@/components/ui/reveal";
import { LifeGrid } from "@/components/product/life-grid";

export function Idea() {
  return (
    <section id="idea" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label-eyebrow">The idea</p>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
                A life is about
                <br />
                <span className="text-chalk-muted">four thousand weeks.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-10 space-y-6 border-l border-white/10 pl-6">
                {[
                  { n: "~4,000", l: "weeks in a long life" },
                  { n: "~1,560", l: "already spent by age 30" },
                  { n: "1", l: "week you're living right now" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="text-3xl font-semibold tracking-tight text-amber tabular-nums">
                      {s.n}
                    </dt>
                    <dd className="mt-1 text-sm text-chalk-muted">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-lg leading-relaxed text-chalk-muted">
                <p>
                  We measure time in numbers that are too big to feel — years,
                  decades, a whole life. So the days slip by unnoticed, and
                  &ldquo;later&rdquo; quietly becomes &ldquo;never.&rdquo;
                </p>
                <p className="text-chalk">
                  Dotly makes time visible. Every dot is a week. The bright
                  ones are behind you. The rest are yours to spend — and there
                  are fewer than you think.
                </p>
                <p>
                  It&apos;s not about anxiety. It&apos;s about attention. When
                  you can see the whole grid, today stops feeling infinite and
                  starts feeling precious.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <figure className="mt-10 rounded-2xl border border-white/[0.08] bg-ink-900/60 p-6">
                <div className="mx-auto max-w-sm">
                  <LifeGrid cols={26} rows={10} filledRatio={0.42} gap={4} dotSize={4} />
                </div>
                <figcaption className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-chalk/80" />
                    Lived
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-amber shadow-[0_0_8px_rgba(255,193,7,0.7)]" />
                    This week
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-white/15" />
                    Ahead
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
