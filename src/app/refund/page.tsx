import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How refunds work for ${site.name} and Dotly Pro purchases made through Google Play.`,
};

export default function RefundPage() {
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
        Refund Policy
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-chalk-faint">
        Last updated · September 2026
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-chalk-muted">
        <p className="text-chalk">
          Dotly is free to download. Any paid purchase — Dotly Pro, whether a
          one-time unlock or a subscription — is processed by Google Play, so
          refunds are handled under Google Play&apos;s policies.
        </p>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">
            One-time purchases (Dotly Pro)
          </h2>
          <p>
            Google Play offers self-service refunds within 48 hours of a
            purchase directly from your account. After that window, you can
            still request a refund from Google, and we&apos;re happy to support
            reasonable requests — reach out and we&apos;ll help.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Subscriptions</h2>
          <p>
            You can cancel a Dotly Pro subscription anytime from Google Play.
            Cancelling stops future renewals and keeps Pro active until the end
            of the current billing period. Partial-period refunds are at
            Google&apos;s discretion under its subscription policy.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">
            How to request a refund
          </h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>
              Open the{" "}
              <a
                href="https://play.google.com/store/account/orderhistory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber hover:underline"
              >
                Google Play order history
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              .
            </li>
            <li>Select the Dotly purchase you want refunded.</li>
            <li>Choose “Request a refund” or “Report a problem” and follow the steps.</li>
          </ol>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-chalk">Still stuck?</h2>
          <p>
            If Google can&apos;t resolve it or something went wrong on our end,
            email {site.developer} and we&apos;ll make it right:{" "}
            <a href={`mailto:${site.email}`} className="text-amber hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>

        <p className="text-sm text-chalk-faint">
          This policy doesn&apos;t limit any statutory refund rights you may have
          under your local consumer law.
        </p>
      </div>
    </main>
  );
}
