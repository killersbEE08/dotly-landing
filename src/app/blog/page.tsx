import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Footer } from "@/components/sections/footer";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  blogMeta,
  formatDate,
  getAllPosts,
  readingTimeMinutes,
} from "@/config/blog";

const url = `${site.url}${blogMeta.path}`;

export const metadata: Metadata = pageMetadata({
  title: blogMeta.title,
  description: blogMeta.description,
  path: blogMeta.path,
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: blogMeta.title,
    description: blogMeta.description,
    url,
    publisher: {
      "@type": "Organization",
      name: site.parent,
      url: site.parentUrl,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.published,
      dateModified: p.updated,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="container-x max-w-content py-24 md:py-32">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-chalk-muted transition-colors hover:text-chalk"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <div className="mt-10">
          <Logo />
        </div>

        <header className="mt-10 max-w-2xl">
          <p className="label-eyebrow">The Journal</p>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tightest text-chalk md:text-5xl">
            {blogMeta.title}
          </h1>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-chalk-muted">
            {blogMeta.description}
          </p>
        </header>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="bg-ink">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-ink-900/80"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint">
                  <span>{post.tags[0]}</span>
                  <span aria-hidden>·</span>
                  <span>{readingTimeMinutes(post)} min read</span>
                </div>

                <h2 className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight text-chalk group-hover:text-amber">
                  {post.title}
                </h2>

                <p className="mt-3 flex-1 text-pretty text-[15px] leading-relaxed text-chalk-muted">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <time
                    dateTime={post.published}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint"
                  >
                    {formatDate(post.published)}
                  </time>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-chalk-muted transition-colors group-hover:text-amber">
                    Read
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
