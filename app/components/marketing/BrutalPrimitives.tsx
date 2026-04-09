import Link from "next/link";
import type { HTMLAttributes, ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type PrimitiveProps = {
  className?: string;
  children: ReactNode;
};

type SectionFrameProps = PrimitiveProps & HTMLAttributes<HTMLElement>;

export function SectionFrame({ className, children, ...props }: SectionFrameProps) {
  return (
    <section className={cx("brutal-frame", className)} {...props}>
      {children}
    </section>
  );
}

type BrutalCardProps = PrimitiveProps & {
  tone?: "base" | "muted" | "hero" | "ink";
} & HTMLAttributes<HTMLElement>;

export function BrutalCard({ className, children, tone = "base", ...props }: BrutalCardProps) {
  return (
    <article
      className={cx(
        "brutal-card",
        tone === "muted" && "brutal-card-muted",
        tone === "hero" && "brutal-card-hero",
        tone === "ink" && "brutal-card-ink",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  );
}

export function Kicker({ className, children }: PrimitiveProps) {
  return <p className={cx("brutal-kicker", className)}>{children}</p>;
}

type ButtonLikeProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
};

function ActionButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: ButtonLikeProps) {
  const variantClass =
    variant === "secondary"
      ? "brutal-btn-secondary"
      : variant === "ghost"
        ? "brutal-btn-ghost"
        : variant === "accent"
          ? "brutal-btn-accent"
          : "brutal-btn-primary";

  const sizeClass =
    size === "sm" ? "brutal-btn-sm" : size === "lg" ? "brutal-btn-lg" : "brutal-btn-md";

  return (
    <Link className={cx("focus-ring brutal-btn", variantClass, sizeClass, className)} href={href}>
      {children}
    </Link>
  );
}

export function PrimaryButton(props: ButtonLikeProps) {
  return <ActionButton {...props} variant={props.variant ?? "primary"} />;
}

export function SecondaryButton(props: ButtonLikeProps) {
  return <ActionButton {...props} variant={props.variant ?? "secondary"} />;
}

export function BadgePill({ className, children }: PrimitiveProps) {
  return <span className={cx("brutal-pill", className)}>{children}</span>;
}

type StatBlockProps = {
  label: string;
  value: string;
  className?: string;
};

export function StatBlock({ label, value, className }: StatBlockProps) {
  return (
    <div className={cx("brutal-stat", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-2)]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black tracking-tight text-[var(--ink-1)]">{value}</p>
    </div>
  );
}
