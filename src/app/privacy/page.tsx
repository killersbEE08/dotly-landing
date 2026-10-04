import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for the ${site.name} Android app by ${site.parent}. Your data stays on your device — no account, no tracking.`,
  path: "/privacy",
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-chalk">{title}</h2>
      {children}
    </div>
  );
}

const Email = () => (
  <a href={`mailto:${site.email}`} className="text-amber hover:underline">
    {site.email}
  </a>
);

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
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-chalk-faint">
        Effective date · 3 October 2026
      </p>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-chalk-muted">
        <p className="text-chalk">
          This Privacy Policy explains how the {site.name} Android app
          (&quot;{site.name}&quot;, &quot;the app&quot;) collects, uses, shares
          and protects information. {site.name} is developed and published by{" "}
          {site.developer} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), the
          developer of record on Google Play and the party responsible for your
          data under this policy. By downloading or using the app you agree to
          this policy.
        </p>

        <Section title="1. Developer and contact">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-chalk">Developer:</span> {site.developer}
            </li>
            <li>
              <span className="text-chalk">App:</span> {site.name} (Android)
            </li>
            <li>
              <span className="text-chalk">Contact email:</span> <Email />
            </li>
          </ul>
          <p className="mt-2">
            For any privacy question or request, email us at <Email /> and we
            will respond within 30 days.
          </p>
        </Section>

        <Section title="2. Summary">
          <p>
            {site.name} is built to run on your device. The personal content you
            create — your birth date, events, names and display preferences — is
            stored only on your device and is never sent to us or to any server
            we control. The only data that leaves your device is handled by
            Google&apos;s advertising and billing services, as described below,
            so the free version can show ads and so purchases can be processed.
            We do not sell your personal information.
          </p>
        </Section>

        <Section title="3. Data stored on your device">
          <p>
            The birth date, events, names and display preferences you enter are
            stored locally on your device only. {site.name} has no account
            system and no servers of its own; we never receive, upload, store or
            sell this information. If you uninstall the app or clear its storage,
            this data is permanently removed from your device.
          </p>
        </Section>

        <Section title="4. Data collected by third-party services">
          <p className="mb-2">
            {site.name} integrates the following Google services, which collect
            and process data under their own privacy policies. We do not control
            and do not receive the raw data these services collect:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-chalk">
                Google AdMob (ads in the free version)
              </span>{" "}
              — may collect the Android advertising ID, IP address, approximate
              (coarse) location, device and diagnostic information, and ad
              interaction data in order to serve, measure and personalize ads
              and to detect fraud and abuse.
            </li>
            <li>
              <span className="text-chalk">
                Google Play Billing (Dotly Pro purchases)
              </span>{" "}
              — processes payments for Dotly Pro. We receive only a purchase
              token used to unlock Pro features; we never see or store your
              name, card number or payment details.
            </li>
          </ul>
          <p className="mt-2">
            For details, see{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              how Google uses data from apps that use its services
            </a>
            .
          </p>
        </Section>

        <Section title="5. Data types, in Google Play terms">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-chalk">Collected by us:</span> none. We
              collect no personal data on our own servers.
            </li>
            <li>
              <span className="text-chalk">Collected / shared via Google:</span>{" "}
              Device or other IDs (advertising ID), approximate location, app
              activity (ad interactions) and diagnostics — collected and shared
              by Google AdMob for advertising; purchase history (purchase token)
              via Google Play Billing.
            </li>
            <li>
              <span className="text-chalk">Encryption in transit:</span> yes —
              all network traffic uses HTTPS.
            </li>
            <li>
              <span className="text-chalk">Data deletion:</span> you can delete
              on-device data at any time (see section 9).
            </li>
          </ul>
        </Section>

        <Section title="6. How information is used">
          <p>
            On-device data is used only to draw your calendar, wallpaper,
            widgets and reminders on your device. Data processed by the Google
            services above is used by Google to show and measure ads
            (free version) and to process Dotly Pro purchases. We do not use
            your data for any other purpose.
          </p>
        </Section>

        <Section title="7. Sharing">
          <p>
            We do not sell your personal information and we do not share it for
            cross-context behavioral advertising beyond the Google advertising
            service described above. Data is only processed by the Google
            services listed in sections 4 and 5. We may disclose information if
            required to do so by law.
          </p>
        </Section>

        <Section title="8. Permissions">
          <ul className="list-disc space-y-2 pl-5">
            <li>Set wallpaper — to apply the {site.name} live wallpaper.</li>
            <li>
              Notifications — for optional daily progress reminders (you can
              turn these off at any time).
            </li>
            <li>
              Internet / network state — to load ads and verify purchases.
            </li>
          </ul>
        </Section>

        <Section title="9. Data retention and deletion">
          <p>
            Because we store nothing ourselves, there is no account to delete.
            On-device data stays until you remove it. You can erase all of it at
            any time by clearing the app&apos;s storage (Android Settings › Apps
            › {site.name} › Storage › Clear data) or by uninstalling the app.
            For data held by Google, use Google&apos;s own privacy tools or
            email us at <Email /> and we will help.
          </p>
        </Section>

        <Section title="10. Advertising and your choices">
          <p>
            You can reset your advertising ID or opt out of personalized ads in
            Android Settings › Google › Ads. Purchasing {site.name} Pro removes
            ads and the associated advertising data collection.
          </p>
        </Section>

        <Section title="11. Security">
          <p>
            Your personal content never leaves your device through us.
            Communication with Google services uses encrypted connections
            (HTTPS). No method of transmission or storage is ever completely
            secure, but we design {site.name} to minimize the data at risk by
            keeping your content on your device.
          </p>
        </Section>

        <Section title="12. Children's privacy">
          <p>
            {site.name} is not directed at children under 13, is not a
            &quot;Designed for Families&quot; app, and we do not knowingly
            collect personal information from children. If you believe a child
            has provided personal information, contact us at <Email /> and we
            will address it.
          </p>
        </Section>

        <Section title="13. International users">
          <p>
            {site.name} can be used worldwide. Where data is processed by Google
            services, Google may transfer and process it in countries other than
            your own under its own safeguards and privacy policy.
          </p>
        </Section>

        <Section title="14. Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will be
            posted on this page with a new effective date. Continued use of the
            app after an update means you accept the revised policy.
          </p>
        </Section>

        <Section title="15. Contact">
          <p>
            {site.developer} — <Email /> ·{" "}
            <a href={site.parentUrl} className="text-amber hover:underline">
              {site.parentUrl.replace("https://", "")}
            </a>
          </p>
        </Section>
      </div>
    </main>
  );
}
