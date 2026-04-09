import {
  Kicker,
  PrimaryButton,
  SecondaryButton,
} from "@/app/components/marketing/BrutalPrimitives";

export function FooterCta() {
  return (
    <section className="relative overflow-hidden border-4 border-[var(--stroke)] bg-[#84f976] px-5 py-16 shadow-[4px_4px_0_0_#111] sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Kicker className="text-[var(--ink-2)]">Ready to launch</Kicker>
        <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
          Ready to shorten{" "}
          <br />
          your digital{" "}
          <br />
          footprint?
        </h2>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <PrimaryButton href="/login" size="lg">
          Get started free
        </PrimaryButton>
        <SecondaryButton href="#pricing" size="lg">
          View pricing
        </SecondaryButton>
      </div>

      <div className="mt-6 text-center text-sm font-medium text-[var(--ink-2)]">
        No credit card needed to start.
      </div>
    </section>
  );
}
