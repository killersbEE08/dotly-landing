import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Shared Open Graph image — the statically generated card at /opengraph-image.
 * Referenced explicitly because a page that defines its own `openGraph`
 * object does not inherit the file-convention image from the root layout.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

interface PageMetaInput {
  /** Page title (omit for the site default from the layout template). */
  title?: string;
  description: string;
  /** Absolute path from the site root, e.g. "/" or "/blog/slug". */
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  published?: string;
  modified?: string;
}

/**
 * Build correct, non-conflicting metadata for a page: a self-referential
 * canonical, matching og:url, and an explicit social image. Relative
 * canonicals resolve against `metadataBase` (set in the root layout).
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  published,
  modified,
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`,
      description,
      images: [ogImage],
      ...(type === "article"
        ? {
            publishedTime: published,
            modifiedTime: modified,
            authors: [site.parent],
            tags: keywords,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? `${site.name} — ${site.tagline}`,
      description,
      images: [ogImage.url],
    },
  };
}
