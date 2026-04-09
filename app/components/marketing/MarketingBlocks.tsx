import Link from "next/link";
import type { MarketingLink } from "@/lib/marketing-content";
import {
  BrutalCard,
  Kicker,
  PrimaryButton,
  SecondaryButton,
} from "@/app/components/marketing/BrutalPrimitives";

export function TextSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <BrutalCard tone="muted">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-black/80 sm:text-base">
        {children}
      </div>
    </BrutalCard>
  );
}

export function BulletGrid({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <BrutalCard>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={item}
            className={`flex items-start gap-3 bg-[var(--surface-2)] p-4 motion-fade-up ${
              index < 3 ? `motion-delay-${index + 1}` : ""
            }`}
          >
            <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 bg-black" />
            <p className="text-sm leading-7 text-black/90 sm:text-base">{item}</p>
          </li>
        ))}
      </ul>
    </BrutalCard>
  );
}

export function LinkCardGrid({
  title,
  links,
}: {
  title: string;
  links: MarketingLink[];
}) {
  return (
    <BrutalCard>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <PrimaryButton href="/login">Start free</PrimaryButton>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {links.map((link, index) => (
          <Link
            key={link.href}
            className={`hover-lift rounded-[var(--radius-sm)] bg-[var(--surface-2)] p-4 motion-fade-up ${
              index < 3 ? `motion-delay-${index + 1}` : ""
            }`}
            href={link.href}
          >
            <h3 className="text-lg font-bold tracking-tight">{link.label}</h3>
            <p className="mt-2 text-sm leading-6 text-black/80">{link.description}</p>
            <span className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4">
              Explore
            </span>
          </Link>
        ))}
      </div>
    </BrutalCard>
  );
}

export function SignupPanel({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <BrutalCard tone="ink" className="rounded-[var(--radius-lg)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <Kicker className="text-white/70">Call to action</Kicker>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--bg-canvas)] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-white/80 sm:text-base">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton className="!bg-white !text-[var(--ink-1)]" href="/login">
            Create free account
          </PrimaryButton>
          <SecondaryButton className="!border-white/60 !bg-transparent !text-white" href="/blog">
            Read the blog
          </SecondaryButton>
        </div>
      </div>
    </BrutalCard>
  );
}
