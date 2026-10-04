import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { ArticleBody, getCtaText } from "@/components/blog/article-body";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  formatDate,
  getAllPosts,
  getFaqs,
  getPost,
  getRelatedPosts,
  getToc,
  postPlainText,
  readingTimeMinutes,
} from "@/config/blog";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    keywords: post.tags,
    published: post.published,
    modified: post.updated,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const toc = getToc(post);
  const faqs = getFaqs(post);
  const related = getRelatedPosts(post.slug);
  const cta = getCtaText(post.body);
  const minutes = readingTimeMinutes(post);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    articleBody: postPlainText(post),
    wordCount: postPlainText(post).trim().split(/\s+/).length,
    keywords: post.tags.join(", "),
    datePublished: post.published,
    dateModified: post.updated,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: site.parent,
      url: site.parentUrl,
    },
    publisher: {
      "@type": "Organization",
      name: site.parent,
      url: site.parentUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqJsonLd =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <main className="container-x max-w-content py-24 md:py-32">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-chalk-muted transition-colors hover:text-chalk"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All posts
        </Link>

        <div className="mt-10">
          <Logo />
        </div>

        {/* Breadcrumb trail (visible + crawlable) */}
        <nav aria-label="Breadcrumb" className="mt-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint">
            <li>
              <Link href="/" className="hover:text-chalk">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-chalk">Blog</Link>
            </li>
          </ol>
        </nav>

        <article className="mt-6">
          <header className="max-w-content">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber/80">
              {post.tags.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-chalk-faint">·</span>}
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tightest text-chalk md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-chalk-muted">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint">
              <span>By {site.parent}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.published}>{formatDate(post.published)}</time>
              <span aria-hidden>·</span>
              <span>{minutes} min read</span>
            </div>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            {/* Table of contents */}
            {toc.length > 0 && (
              <aside className="lg:col-span-3 lg:order-last">
                <div className="lg:sticky lg:top-28">
                  <p className="label-eyebrow">On this page</p>
                  <nav aria-label="Table of contents" className="mt-4">
                    <ul className="space-y-2.5 border-l border-white/[0.08]">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-chalk-muted transition-colors hover:border-amber hover:text-chalk"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            {/* Article body */}
            <div className="lg:col-span-8">
              <div className="max-w-prose">
                <ArticleBody blocks={post.body} />

                {cta && (
                  <aside className="mt-14 rounded-2xl border border-amber/20 bg-amber/[0.05] p-7 md:p-9">
                    <p className="label-eyebrow text-amber/80">Try Dotly</p>
                    <p className="mt-4 text-pretty text-lg leading-relaxed text-chalk">
                      {cta}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        as="a"
                        href={site.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                      >
                        Get Dotly on Android
                      </Button>
                      <Button as="a" href="/" variant="secondary" size="lg">
                        Explore Dotly
                      </Button>
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-white/[0.08] pt-12">
            <p className="label-eyebrow">Keep reading</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.08] p-6 transition-colors hover:bg-ink-900/80"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint">
                      {r.tags[0]} · {readingTimeMinutes(r)} min read
                    </span>
                    <h3 className="mt-4 text-balance text-lg font-semibold leading-snug tracking-tight text-chalk group-hover:text-amber">
                      {r.title}
                    </h3>
                    <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-chalk-muted">
                      {r.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-chalk-muted transition-colors group-hover:text-amber">
                      Read
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
