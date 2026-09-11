"use client";

import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { site } from "@/config/site";
import { Check } from "lucide-react";

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

const bullets = ["Free to start", "No account needed", "Works offline"];

export function Download() {
  return (
    <section id="download" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <Reveal>
            <p className="label-eyebrow">Available on</p>
            <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight tracking-tighter text-chalk md:text-[2.6rem]">
              Get Dotly for Android.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk-muted">
              Free to download. Set your date, pick your view, and let your
              wallpaper do the rest.
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-chalk-muted">
                  <Check className="h-4 w-4 text-amber" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button
                as="a"
                href={site.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                className="pl-6 pr-7"
              >
                <GooglePlayGlyph className="h-6 w-6" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-normal opacity-75">Get it on</span>
                  <span className="text-base font-semibold">Google Play</span>
                </span>
              </Button>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
              iOS · coming later
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center">
            <div className="w-[240px]">
              <PhoneMockup variant="wallpaper" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
