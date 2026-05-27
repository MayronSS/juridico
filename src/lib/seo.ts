import type { Metadata } from "next";
import {
  defaultWebsiteSettings,
  type WebsiteSettings,
} from "@/lib/site-settings-schema";

function getSettings(settings?: WebsiteSettings) {
  return settings || defaultWebsiteSettings;
}

function absoluteUrl(pathOrUrl: string, siteUrl: string) {
  if (!pathOrUrl) return siteUrl;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getDefaultMetadata(settings?: WebsiteSettings): Metadata {
  const siteSettings = getSettings(settings);
  const siteUrl = siteSettings.site_url || "http://localhost:3000";
  const siteName = siteSettings.office_name;
  const description = siteSettings.default_meta_description;
  const title = siteSettings.default_meta_title;
  const ogImage = absoluteUrl(siteSettings.default_og_image, siteUrl);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: siteSettings.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean),
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: siteUrl,
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function createPageMetadata(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  settings?: WebsiteSettings;
}): Metadata {
  const { title, description, path, image, noIndex } = options;
  const settings = getSettings(options.settings);
  const siteUrl = settings.site_url || "http://localhost:3000";
  const siteName = settings.office_name;
  const url = path ? absoluteUrl(path, siteUrl) : siteUrl;
  const ogImage = absoluteUrl(image || settings.default_og_image, siteUrl);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function getLegalServiceSchema(settings?: WebsiteSettings) {
  const siteSettings = getSettings(settings);

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteSettings.office_name,
    description: siteSettings.short_description,
    url: siteSettings.site_url,
    telephone: siteSettings.phone,
    email: siteSettings.contact_email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address,
      addressLocality: siteSettings.city,
      addressRegion: siteSettings.state,
      postalCode: siteSettings.zip_code,
      addressCountry: "BR",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
  };
}

export function getArticleSchema(options: {
  title: string;
  description: string;
  slug: string;
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  settings?: WebsiteSettings;
}) {
  const settings = getSettings(options.settings);
  const siteUrl = settings.site_url || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: `${siteUrl}/blog/${options.slug}`,
    author: {
      "@type": "Person",
      name: options.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: settings.office_name,
      url: siteUrl,
    },
    datePublished: options.publishedAt,
    dateModified: options.updatedAt || options.publishedAt,
    image: absoluteUrl(options.image || settings.default_og_image, siteUrl),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${options.slug}`,
    },
  };
}
