import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: `The terms for using ${site.name}, the life-calendar wallpaper app by ${site.parent}.`,
  path: "/terms",
});

export default function TermsPage() {
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
        Terms
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-chalk-faint">
        Last updated · September 2026
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-chalk-muted">
        <p className="text-chalk">
          By using Dotly you agree to these terms. They&apos;re intentionally
          short.
        </p>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Use of the app</h2>
          <p>
            Dotly is provided as-is for personal use. It&apos;s a tool for
            reflection, not medical, financial, or actuarial advice. Any
            estimates it shows are illustrative.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Purchases</h2>
          <p>
            Dotly Pro is available as a one-time purchase or subscription
            through Google Play. Billing, renewals, and refunds are handled by
            Google Play under its terms.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Changes</h2>
          <p>
            We may update these terms as the app evolves. Continued use after an
            update means you accept the revised terms.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Contact</h2>
          <p>
            {site.developer} ·{" "}
            <a href={`mailto:${site.email}`} className="text-amber hover:underline">
              {site.email}
            </a>{" "}
            ·{" "}
            <a href={site.parentUrl} className="text-amber hover:underline">
              {site.parentUrl.replace("https://", "")}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
