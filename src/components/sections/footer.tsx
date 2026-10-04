import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { site } from "@/config/site";

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.968 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const columns = [
  {
    heading: "Product",
    links: [
      { label: "The idea", href: "/#idea" },
      { label: "Features", href: "/#features" },
      { label: "Widgets", href: "/#widgets" },
      { label: "How it works", href: "/#how" },
      { label: "FAQ", href: "/#faq" },
      { label: "Download", href: "/#download" },
    ],
  },
  {
    heading: "Learn",
    links: [{ label: "Blog", href: "/blog" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Refund policy", href: "/refund" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07]">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-chalk-muted">
              A living calendar for your home screen. See your time, and spend
              it on what matters.
            </p>
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-1 text-sm text-chalk-faint transition-colors hover:text-chalk"
            >
              A product by {site.parent}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 md:col-span-6 md:col-start-7 md:gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-chalk-muted transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-chalk-faint">
            © {new Date().getFullYear()} {site.parent}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-chalk-faint transition-colors hover:text-chalk"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-chalk-faint transition-colors hover:text-chalk"
            >
              <XGlyph className="h-[15px] w-[15px]" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-chalk-faint transition-colors hover:text-chalk"
            >
              <Linkedin className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
