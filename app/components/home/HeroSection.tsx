import Image from "next/image";
import { HeroShortenForm } from "@/app/components/home/HeroShortenForm";
import {
  Kicker,
} from "@/app/components/marketing/BrutalPrimitives";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title">
      <div className="px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="relative mx-auto max-w-[920px]">
          <div className="motion-fade-up text-center">
            <div className="relative mx-auto inline-block px-5 py-3 sm:px-8 sm:py-4">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 -z-10 h-[calc(100%-0.4rem)] w-[min(760px,100%)] -translate-x-1/2 rotate-[-1.4deg] bg-[var(--bg-hero)]"
              />
              <h1
                id="hero-title"
                className="relative mx-auto max-w-[760px] text-[clamp(2.25rem,6.4vw,5.6rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
              >
                Make your links
                <br />
                <span className="relative inline-block">
                  unstoppable.
                </span>
              </h1>

              <Image
                src="/star.svg"
                alt=""
                aria-hidden="true"
                width={96}
                height={96}
                className="pointer-events-none absolute -right-10 top-[78%] hidden h-20 w-20 rotate-[12deg] opacity-95 lg:block"
              />
            </div>
            <Kicker className="mt-5 text-[0.73rem] tracking-[0.2em] text-black/75">
              Dynamic URL transformation
            </Kicker>
          </div>

          <div className="mx-auto mt-9 max-w-[860px]">
            <HeroShortenForm />
          </div>
        </div>
      </div>
    </section>
  );
}
