"use client";

import { Reveal } from "@/components/ui/reveal";
import { PhoneShell, WallpaperScreen, WidgetsScreen } from "@/components/product/phone-mockup";
import { LifeGrid } from "@/components/product/life-grid";
import { RingWidget } from "@/components/product/widgets";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-chalk/80">
      <span className="font-mono tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-3.5 rounded-[3px] border border-chalk/50" />
        <span className="inline-block h-2.5 w-5 rounded-[3px] bg-chalk/50" />
      </div>
    </div>
  );
}

/** Customize screen */
function CustomizeScreen() {
  const swatches = ["#ffc107", "#f4f4f2", "#34d399", "#60a5fa", "#f472b6"];
  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-ink-800 to-black">
      <StatusBar />
      <div className="flex-1 px-5 pt-6">
        <p className="text-lg font-semibold tracking-tight text-chalk">Customize</p>
        <p className="mt-1 text-xs text-chalk-faint">Make the grid yours</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-ink-900/70 p-4">
          <LifeGrid cols={16} rows={8} filledRatio={0.4} gap={3} dotSize={3} animate={false} />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          Accent
        </p>
        <div className="mt-3 flex gap-3">
          {swatches.map((c, i) => (
            <span
              key={c}
              className="h-8 w-8 rounded-full"
              style={{
                backgroundColor: c,
                boxShadow: i === 0 ? "0 0 0 2px #08080a, 0 0 0 4px #ffc107" : undefined,
              }}
            />
          ))}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-chalk-faint">
          Grid unit
        </p>
        <div className="mt-3 flex gap-2">
          {["Weeks", "Days", "Months"].map((t, i) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1.5 text-xs ${
                i === 0
                  ? "bg-amber text-ink"
                  : "border border-white/12 text-chalk-muted"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

/** Focused single-widget screen */
function RingScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-ink-900 to-black px-6">
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-chalk-faint">
          Life · progress
        </p>
        <div className="scale-125">
          <RingWidget value={41} label="Life lived" />
        </div>
        <p className="max-w-[220px] text-center text-[13px] leading-relaxed text-chalk/80">
          You are here. Roughly 2,400 weeks remain.
        </p>
      </div>
      <div className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/25" />
    </div>
  );
}

const screens: { label: string; node: React.ReactNode }[] = [
  { label: "Live wallpaper", node: <WallpaperScreen /> },
  { label: "Home-screen widgets", node: <WidgetsScreen /> },
  { label: "Customize", node: <CustomizeScreen /> },
  { label: "Progress", node: <RingScreen /> },
];

export function Screenshots() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="label-eyebrow">Screenshots</p>
          <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
            Designed down to the last dot.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:mt-20 md:gap-8 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))]">
          {screens.map((s, i) => (
            <figure
              key={i}
              className="group relative w-[230px] shrink-0 snap-center sm:w-[250px]"
            >
              <div className="transition-transform duration-500 ease-premium group-hover:-translate-y-2">
                <PhoneShell>{s.node}</PhoneShell>
              </div>
              <figcaption className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
                {s.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
