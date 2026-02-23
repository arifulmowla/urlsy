import { HomePageShell } from "@/app/components/home/HomePageShell";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "urlsy.cc",
    url: "https://urlsy.cc",
    description:
      "urlsy.cc helps you create short links fast with clean analytics and premium features when you grow.",
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
