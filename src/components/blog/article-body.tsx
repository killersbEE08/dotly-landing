import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/config/blog";

/**
 * Render a tiny markdown subset found in post `text` fields:
 *   **bold**                 → <strong>
 *   [label](/path | https…)  → <Link> (internal) or <a target=_blank> (external)
 *
 * Pure server component — no client JS, maximally crawlable HTML.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];

    if (token.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (m) {
        const [, label, href] = m;
        const external = /^https?:\/\//.test(href);
        if (external) {
          nodes.push(
            <a
              key={`${keyPrefix}-${i}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber underline-offset-4 hover:underline"
            >
              {label}
            </a>
          );
        } else {
          nodes.push(
            <Link
              key={`${keyPrefix}-${i}`}
              href={href}
              className="font-medium text-amber underline-offset-4 hover:underline"
            >
              {label}
            </Link>
          );
        }
      }
    } else {
      nodes.push(
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-chalk">
          {token.slice(2, -2)}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
    i++;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.type) {
          case "lead":
            return (
              <p
                key={key}
                className="text-pretty text-xl leading-relaxed text-chalk"
              >
                {renderInline(block.text, key)}
              </p>
            );

          case "h2":
            return (
              <h2
                key={key}
                id={block.id}
                className="scroll-mt-28 pt-6 text-2xl font-semibold tracking-tight text-chalk md:text-3xl"
              >
                {renderInline(block.text, key)}
              </h2>
            );

          case "h3":
            return (
              <h3
                key={key}
                className="pt-2 text-xl font-semibold tracking-tight text-chalk"
              >
                {renderInline(block.text, key)}
              </h3>
            );

          case "p":
            return (
              <p
                key={key}
                className="text-pretty text-[17px] leading-relaxed text-chalk-muted"
              >
                {renderInline(block.text, key)}
              </p>
            );

          case "ul":
            return (
              <ul key={key} className="space-y-3 pl-1">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="relative pl-6 text-[17px] leading-relaxed text-chalk-muted"
                  >
                    <span
                      className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-amber"
                      aria-hidden
                    />
                    {renderInline(item, `${key}-${i}`)}
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className="list-decimal space-y-3 pl-6 marker:text-chalk-faint">
                {block.items.map((item, i) => (
                  <li
                    key={i}
                    className="pl-1 text-[17px] leading-relaxed text-chalk-muted"
                  >
                    {renderInline(item, `${key}-${i}`)}
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={key}
                className="my-4 border-l-2 border-amber pl-6"
              >
                <p className="text-pretty text-xl font-medium leading-relaxed text-chalk">
                  {renderInline(block.text, key)}
                </p>
                {block.cite && (
                  <cite className="mt-3 block font-mono text-xs uppercase not-italic tracking-[0.2em] text-chalk-faint">
                    {block.cite}
                  </cite>
                )}
              </blockquote>
            );

          case "callout":
            return (
              <aside
                key={key}
                className="my-4 rounded-2xl border border-amber/20 bg-amber/[0.04] p-6 md:p-7"
              >
                <p className="label-eyebrow text-amber/80">{block.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {block.items.map((item, i) => (
                    <li
                      key={i}
                      className="relative pl-6 text-[15px] leading-relaxed text-chalk-muted"
                    >
                      <span
                        className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-amber"
                        aria-hidden
                      />
                      {renderInline(item, `${key}-${i}`)}
                    </li>
                  ))}
                </ul>
              </aside>
            );

          case "stats":
            return (
              <dl
                key={key}
                className="my-4 grid grid-cols-1 gap-5 rounded-2xl border border-white/[0.08] bg-ink-900/60 p-6 sm:grid-cols-3"
              >
                {block.items.map((s, i) => (
                  <div key={i}>
                    <dt className="text-3xl font-semibold tracking-tight text-amber tabular-nums">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-sm text-chalk-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            );

          case "steps":
            return (
              <ol key={key} className="my-4 space-y-5">
                {block.items.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/30 bg-amber/[0.06] font-mono text-sm font-medium text-amber tabular-nums">
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-semibold text-chalk">{s.title}</p>
                      <p className="mt-1 text-[17px] leading-relaxed text-chalk-muted">
                        {renderInline(s.text, `${key}-${i}`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );

          case "faq":
            return (
              <div key={key} className="my-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                {block.items.map((f, i) => (
                  <div key={i} className="py-5">
                    <h3 className="text-lg font-semibold text-chalk">{f.q}</h3>
                    <p className="mt-2 text-[17px] leading-relaxed text-chalk-muted">
                      {renderInline(f.a, `${key}-${i}`)}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "cta":
            return null; // CTA is rendered by the page shell, after the body.

          default:
            return null;
        }
      })}
    </div>
  );
}

/** The pull-out CTA text, if the post defines one. */
export function getCtaText(blocks: Block[]): string | null {
  const cta = blocks.find((b) => b.type === "cta");
  return cta && cta.type === "cta" ? cta.text : null;
}
