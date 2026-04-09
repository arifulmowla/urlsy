import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPageShell } from "@/app/components/home/PublicPageShell";
import {
  BulletGrid,
  LinkCardGrid,
  SignupPanel,
  TextSection,
} from "@/app/components/marketing/MarketingBlocks";
import { useCasePageBySlug, useCasePages } from "@/lib/marketing-content";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return useCasePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = useCasePageBySlug[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/use-cases/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://urlsy.cc/use-cases/${page.slug}`,
      type: "article",
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const page = useCasePageBySlug[slug];

  if (!page) {
    notFound();
  }

  const structuredData: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.description,
      url: `https://urlsy.cc/use-cases/${page.slug}`,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      author: {
        "@type": "Person",
        name: page.authorName,
      },
      publisher: {
        "@type": "Organization",
        name: "urlsy.cc",
        url: "https://urlsy.cc",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://urlsy.cc" },
        { "@type": "ListItem", position: 2, name: "Use Cases", item: "https://urlsy.cc/use-cases" },
        { "@type": "ListItem", position: 3, name: page.h1, item: `https://urlsy.cc/use-cases/${page.slug}` },
      ],
    },
  ];

  if (page.faq?.length) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return (
    <PublicPageShell kicker={page.kicker} subtitle={page.heroSubtitle} title={page.heroTitle}>
      {structuredData.map((item, index) => (
        <script
          key={`use-case-schema-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}

      <div className="space-y-6">
        <TextSection title={page.h1}>
          <p>{page.summary}</p>
        </TextSection>

        <BulletGrid items={page.audienceFit} title="Best audience fit" />
        <BulletGrid items={page.implementationNotes} title="Implementation notes" />
        <LinkCardGrid links={page.relatedLinks} title="Related next steps" />
        <SignupPanel
          body="Launch measurable links, build campaign clarity, and keep analytics tied to one repeatable workflow."
          title="Start a tracked workflow with urlsy.cc"
        />
      </div>
    </PublicPageShell>
  );
}
