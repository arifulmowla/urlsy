import { Kicker } from "@/app/components/marketing/BrutalPrimitives";

const steps = [
  {
    id: "01",
    title: "Paste URL",
    detail:
      "Drop your long link into urlsy and we normalize and validate it instantly.",
  },
  {
    id: "02",
    title: "Customize",
    detail:
      "Pick your alias or let urlsy generate a short high-efficiency slug automatically.",
  },
  {
    id: "03",
    title: "Deploy",
    detail:
      "Share across social, email, print, and ads, then monitor performance in one place.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-transparent px-4 py-10 sm:px-8"
      aria-labelledby="how-title"
    >
      <div className="text-center">
        <Kicker>How it works</Kicker>
        <h2 id="how-title" className="mt-2 text-4xl font-black uppercase tracking-[-0.03em] sm:text-5xl">
          The process
        </h2>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <article
            key={step.id}
            className={`border-4 border-[var(--stroke)] p-6 shadow-[4px_4px_0_0_#111] ${
              step.id === "02"
                ? "bg-[#84f976] text-black"
                : step.id === "03"
                  ? "bg-black text-white"
                  : "bg-[#f4f4f2] text-black"
            }`}
          >
            <div
              className={`inline-flex h-16 w-16 items-center justify-center border-4 text-3xl font-black leading-none ${
                index === 0
                  ? "-rotate-[3deg] border-[var(--bg-hero)] bg-black text-[var(--bg-hero)]"
                  : index === 1
                    ? "rotate-[4deg] border-[var(--stroke)] bg-black text-white"
                    : "-rotate-[2deg] border-white bg-[var(--bg-hero)] text-black"
              }`}
            >
              {String(Number(step.id))}
            </div>
            <h3 className="mt-5 text-4xl font-black uppercase leading-none tracking-[-0.03em]">{step.title}</h3>
            <p className={`mt-4 text-base leading-relaxed ${step.id === "03" ? "text-white/82" : "text-[var(--text-muted)]"}`}>
              {step.detail}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
