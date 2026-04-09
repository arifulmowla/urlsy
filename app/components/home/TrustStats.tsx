const stats = [
  { label: "Links shortened", value: "10K+" },
  { label: "Monthly clicks", value: "67K+" },
  { label: "System uptime", value: "99.9%" },
];

export function TrustStats() {
  return (
    <section
      id="about"
      aria-label="Stats"
      className="-mx-4 border-y-4 border-[var(--stroke)] bg-black px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="mx-auto grid max-w-[1216px] gap-8 md:grid-cols-3 md:gap-12">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-[clamp(3rem,6vw,6rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
              {item.value}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.4em] text-[#84f976]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
