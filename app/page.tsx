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
  },
  twitter: {
    title: "URL Shortener for Branded Links, QR Codes & Analytics | urlsy.cc",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageShell />
    </>
  );
}
