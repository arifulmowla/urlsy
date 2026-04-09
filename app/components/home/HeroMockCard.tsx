type HeroMockCardProps = {
  compact?: boolean;
  hideReach?: boolean;
  className?: string;
};

const mockLinks = [
  { label: "youtube.com/@tumbercook", clicks: "14.2k" },
  { label: "shop.urlsy.cc/new-drop", clicks: "9.7k" },
  { label: "newsletter.urlsy.cc/win", clicks: "5.1k" },
];

export function HeroMockCard({ compact = false, hideReach = false, className = "" }: HeroMockCardProps) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[760px] ${compact ? "" : "px-1 pt-14"} ${className}`.trim()}
    >
      <div
        className={`relative border-4 border-[var(--stroke)] bg-[#f4f4f2] ${
          compact ? "p-3 sm:p-4" : "p-5 sm:p-6"
        } ${compact ? "shadow-none" : "shadow-[6px_6px_0_0_#111]"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Creator page
            </p>
            <h3
              className={`mt-1 font-black leading-none ${
                compact ? "text-[clamp(1.2rem,2.4vw,1.6rem)]" : "text-[clamp(1.6rem,3.8vw,2.25rem)]"
              }`}
            >
              Tumber Cook
            </h3>
          </div>
          <div
            className={`rounded-full border-2 border-[var(--stroke)] bg-[#84f976] font-bold uppercase tracking-[0.11em] ${
              compact ? "px-3 py-1 text-[10px]" : "px-4 py-1 text-xs sm:text-sm"
            }`}
          >
            Pro
          </div>
        </div>

        <div className={`${compact ? "mt-3 space-y-2" : "mt-5 space-y-3"}`}>
          {mockLinks.slice(0, compact ? 2 : 3).map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between border-2 border-black/25 bg-white ${
                compact ? "px-3 py-2.5" : "px-4 py-3"
              }`}
            >
              <p className={`truncate font-bold ${compact ? "text-sm sm:text-base" : "text-base sm:text-xl"}`}>
                {item.label}
              </p>
              <span
                className={`ml-4 font-black text-[#006e0d] ${
                  compact ? "text-[1rem] sm:text-[1.15rem]" : "text-[1.35rem] sm:text-[1.75rem]"
                }`}
              >
                {item.clicks}
              </span>
            </div>
          ))}
        </div>
      </div>

      {!hideReach && !compact ? (
        <div className="absolute left-4 top-0 border-4 border-[var(--stroke)] bg-white px-4 py-3 shadow-[4px_4px_0_0_#111] sm:left-5 sm:px-5 sm:py-4">
          <p className="text-base font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Reach
          </p>
          <p className="mt-1 text-[2.25rem] font-black leading-none sm:text-[3rem]">234k</p>
          <p className="text-base font-semibold text-[var(--text-muted)]">Last 7 days</p>
        </div>
      ) : null}
    </div>
  );
}
