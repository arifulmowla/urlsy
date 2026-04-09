import { FeatureGrid } from "@/app/components/home/FeatureGrid";
import { FooterCta } from "@/app/components/home/FooterCta";
import { HowItWorksSection } from "@/app/components/home/HowItWorksSection";
import { PricingSection } from "@/app/components/home/PricingSection";
import { PublicFooter } from "@/app/components/home/PublicFooter";
import { HeroSection } from "@/app/components/home/HeroSection";
import { MainNav } from "@/app/components/home/MainNav";
import { TrustStats } from "@/app/components/home/TrustStats";

export function HomePageShell() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)]">
      <header className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1216px] border-b-4 border-[var(--stroke)] motion-fade-up">
          <MainNav />
        </div>
      </header>

      <main className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1216px] flex-col gap-10 sm:gap-12">
          <HeroSection />
          <TrustStats />
          <FeatureGrid />
          <PricingSection />
          <HowItWorksSection />
        </div>
      </main>

      <footer className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1216px] flex-col gap-8 sm:gap-10 motion-fade-up motion-delay-3">
          <FooterCta />
          <PublicFooter />
        </div>
      </footer>
    </div>
  );
}
