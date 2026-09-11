import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles your data — the short version: it stays on your device.`,
};

export default function PrivacyPage() {
  return (
    <main className="container-x max-w-prose py-24 md:py-32">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 text-sm text-chalk-muted transition-colors hover:text-chalk"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <div className="mt-10">
        <Logo />
      </div>

      <h1 className="mt-10 text-4xl font-semibold tracking-tighter text-chalk">
        Privacy
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-chalk-faint">
        Last updated · September 2026
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-chalk-muted">
        <p className="text-chalk">
          Dotly is built to stay out of your business. Your birthday, events,
          and preferences are stored locally on your device and are never sent
          to us or anyone else.
        </p>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">What we collect</h2>
          <p>
            Nothing that identifies you. Dotly works without an account and
            functions fully offline. We don&apos;t track your usage or sell any
            data.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Advertising</h2>
          <p>
            The free version may show ads through Google AdMob, which may
            process limited device data to serve them. Unlocking Dotly Pro
            removes all ads. See Google&apos;s policies for how AdMob handles
            data.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Contact</h2>
          <p>
            Questions? Reach {site.parent} at{" "}
            <a href={site.parentUrl} className="text-amber hover:underline">
              {site.parentUrl.replace("https://", "")}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
