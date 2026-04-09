import Link from "next/link";
import Image from "next/image";
import { Kicker } from "@/app/components/marketing/BrutalPrimitives";
import { HeroMockCard } from "@/app/components/home/HeroMockCard";

type FeatureTone = "base" | "green" | "ink";
type FeatureMedia = "none" | "analytics" | "qr";

type FeatureItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  articleHref: string;
  articleLabel?: string;
  articleDescription?: string;
  tone: FeatureTone;
  media: FeatureMedia;
  layoutClassName: string;
  minHeightClassName: string;
};

const featureItems: FeatureItem[] = [
  {
    id: "01",
    title: "Fast redirect engine",
    description: "Launch high-speed short links and route traffic with low-latency redirects.",
    href: "/features/branded-links",
    articleHref: "/blog/fast-redirect-engine-for-campaigns",
    articleDescription: "Learn how redirect speed and reliability impact campaign outcomes.",
    tone: "base",
    media: "none",
    layoutClassName: "md:col-span-2 xl:col-span-2",
    minHeightClassName: "min-h-[220px] sm:min-h-[240px] xl:min-h-[276px]",
  },
  {
    id: "02",
    title: "Custom aliases",
    description: "Build your brand authority with memorable, readable short links.",
    href: "/features/link-analytics",
    articleHref: "/blog/how-branded-links-improve-trust",
    articleDescription: "See how branded aliases increase trust and click confidence.",
    tone: "green",
    media: "none",
    layoutClassName: "md:col-span-2 xl:col-span-1",
    minHeightClassName: "min-h-[220px] sm:min-h-[240px] xl:min-h-[276px]",
  },
  {
    id: "03",
    title: "Enterprise API",
    description: "Connect shortening into your own stack with a clean API workflow.",
    href: "/features/qr-codes",
    articleHref: "/blog/enterprise-link-api-for-marketing-teams",
    articleDescription: "Explore API-first workflows for large-scale link operations.",
    tone: "ink",
    media: "none",
    layoutClassName: "md:col-span-1 xl:col-span-1",
    minHeightClassName: "min-h-[200px] sm:min-h-[220px] xl:min-h-[264px]",
  },
  {
    id: "04",
    title: "Pro analytics",
    description: "Track device, referrer, region, and campaign performance from one dashboard.",
    href: "/features/custom-domains",
    articleHref: "/blog/how-to-track-campaign-links",
    articleDescription: "Build a clean campaign analytics process across channels.",
    tone: "base",
    media: "analytics",
    layoutClassName: "md:col-span-1 xl:col-span-2",
    minHeightClassName: "min-h-[200px] sm:min-h-[220px] xl:min-h-[264px]",
  },
  {
    id: "05",
    title: "Dynamic QR codes",
    description: "Every shortened link can power measurable QR campaigns across channels.",
    href: "/features/qr-codes",
    articleHref: "/blog/how-to-track-qr-code-scans",
    articleDescription: "Learn the most practical setup for tracking QR campaign performance.",
    tone: "green",
    media: "qr",
    layoutClassName: "md:col-span-2 xl:col-span-3",
    minHeightClassName: "min-h-[180px] sm:min-h-[200px] xl:min-h-[206px]",
  },
];

const delayClassByIndex = ["", "motion-delay-1", "motion-delay-2", "motion-delay-3"];

export function FeatureGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="px-0 py-6 sm:py-8">
      <div className="motion-fade-up motion-delay-1">
        <Kicker className="text-[0.66rem] tracking-[0.22em] text-black/65">Capabilities</Kicker>
        <h2
          id="features-title"
          className="mt-2 text-3xl font-black uppercase tracking-[-0.035em] sm:text-4xl xl:text-5xl"
        >
          Structural features
        </h2>
        <div className="mt-3 h-[8px] w-20 bg-black" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-9 sm:gap-5 md:grid-cols-2 xl:mt-10 xl:grid-cols-3 xl:gap-6">
        {featureItems.map((item, index) => {
          const articleLabel = item.articleLabel ?? "Read article";
          return (
          <article
            key={item.id}
            className={`focus-ring hover-lift relative flex flex-col border-4 border-[var(--stroke)] p-5 shadow-[4px_4px_0_0_#111] motion-fade-up sm:p-6 xl:p-7 ${delayClassByIndex[Math.min(
              index + 1,
              3,
            )]} ${item.layoutClassName} ${item.minHeightClassName} ${
              item.tone === "green"
                ? "bg-[var(--bg-hero)] text-black"
                : item.tone === "ink"
                  ? "bg-black text-white"
                  : "bg-[#f4f4f2] text-black"
            } ${
              item.media === "qr"
                ? "sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                : item.media === "analytics"
                  ? "xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] xl:items-center xl:gap-6"
                  : ""
            }`}
          >
            <Link
              href={item.href}
              aria-label={`${item.title} feature`}
              className="absolute inset-0 z-0"
            />
            <div
              className={`relative z-10 pointer-events-none ${
                item.media === "qr"
                  ? "min-w-0 sm:flex-1"
                  : item.media === "analytics"
                    ? "min-w-0"
                    : ""
              }`}
            >
              <p
                className={`text-[clamp(3.1rem,8vw,5.3rem)] font-black leading-[0.82] tracking-[-0.055em] ${
                  item.tone === "ink" ? "text-white/20" : "text-black/15"
                }`}
              >
                {item.id}
              </p>
              <h3 className="mt-2 text-[clamp(1.75rem,4.2vw,2.15rem)] font-black uppercase leading-[0.92] tracking-[-0.03em]">
                {item.title}
              </h3>
              <p
                className={`mt-3 max-w-[58ch] text-[0.98rem] leading-[1.38] ${
                  item.tone === "ink" ? "text-white/80" : "text-black/72"
                }`}
              >
                {item.description}
              </p>
              <div className="mt-5">
                <Link
                  href={item.articleHref}
                  title={item.articleDescription}
                  aria-label={`${articleLabel}: ${item.title}`}
                  className={`focus-ring pointer-events-auto inline-flex items-center border-2 px-3 py-2 text-[0.66rem] font-black uppercase tracking-[0.12em] transition hover:translate-y-[-1px] ${
                    item.tone === "ink"
                      ? "border-white/75 bg-transparent text-white hover:bg-white/10"
                      : "border-[var(--stroke)] bg-white/90 text-black hover:bg-white"
                  }`}
                >
                  {articleLabel}
                </Link>
              </div>
            </div>

            {item.media === "analytics" ? (
              <div className="relative z-10 mt-6 w-full xl:mt-0">
                <HeroMockCard compact className="max-w-none px-0 py-0" />
              </div>
            ) : null}

            {item.media === "qr" ? (
              <div className="relative z-10 mt-4 self-start border-4 border-[var(--stroke)] bg-[#77ef69] p-2 shadow-[4px_4px_0_0_#111] sm:mt-0 sm:self-center">
                <div className="border-2 border-black bg-white p-2">
                  <Image
                    src="/QR_code.svg"
                    alt="Dynamic QR code example"
                    width={104}
                    height={104}
                    className="h-[96px] w-[96px] object-contain sm:h-[104px] sm:w-[104px]"
                  />
                </div>
              </div>
            ) : null}
          </article>
        )})}
      </div>
    </section>
  );
}
