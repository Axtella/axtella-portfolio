import type { Metadata } from "next";

interface SeoInput {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
}

const SITE_NAME = "Axtella";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://axtella.com";
const DEFAULT_DESCRIPTION = "Axtella Global - Technology & Infrastructure Solutions";

export function generateSeoMetadata(
  pageTitle: string,
  seo?: SeoInput | null
): Metadata {
  const title = seo?.metaTitle || `${pageTitle} | ${SITE_NAME}`;
  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  const ogImage = seo?.ogImage || "/logo1.png";

  return {
    title,
    description,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [{ url: ogImage }],
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [ogImage],
    },
    alternates: seo?.canonicalUrl
      ? { canonical: seo.canonicalUrl }
      : undefined,
    robots: seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  image?: string;
  publishedAt?: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image || "",
    datePublished: article.publishedAt || "",
    author: {
      "@type": "Person",
      name: article.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo1.png` },
    },
    url: article.url,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo1.png`,
    description: DEFAULT_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
    },
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
