import type { Metadata } from "next";
import { HomePageShell } from "@/app/components/home/HomePageShell";

export const metadata: Metadata = {
  title: {
    absolute: "URL Shortener for Branded Links, QR Codes & Analytics | urlsy.cc",
  },
  description:
    "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "URL Shortener for Branded Links, QR Codes & Analytics | urlsy.cc",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
    url: "https://urlsy.cc",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "urlsy.cc homepage preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Shortener for Branded Links, QR Codes & Analytics | urlsy.cc",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
    images: ["/og.png"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "urlsy.cc",
    url: "https://urlsy.cc",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
    publisher: {
      "@type": "Organization",
      name: "urlsy.cc",
      url: "https://urlsy.cc",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://urlsy.cc/blog?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "urlsy.cc",
    url: "https://urlsy.cc",
    logo: "https://urlsy.cc/og.png",
    sameAs: ["https://x.com/urlsycc"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePageShell />
    </>
  );
}
