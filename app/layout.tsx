import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/app/components/analytics/PostHogProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://urlsy.cc"),
  title: {
    default: "urlsy.cc | URL Shortener for Branded Links and Analytics",
    template: "%s | urlsy.cc",
  },
  description:
    "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
  alternates: {
    canonical: "https://urlsy.cc",
  },
  openGraph: {
    title: "urlsy.cc | URL Shortener for Branded Links and Analytics",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
    url: "https://urlsy.cc",
    siteName: "urlsy.cc",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "urlsy.cc — Shorten, Share, Track",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "urlsy.cc | URL Shortener for Branded Links and Analytics",
    description:
      "Shorten URLs, create branded short links, track clicks, and manage QR code campaigns with urlsy.cc.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PostHogProvider>
          {children}
          <SpeedInsights />
        </PostHogProvider>
      </body>
    </html>
  );
}
