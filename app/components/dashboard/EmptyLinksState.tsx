type EmptyLinksStateProps = {
  onCreateClick: () => void;
};

export function EmptyLinksState({ onCreateClick }: EmptyLinksStateProps) {
  return (
    <div className="border-2 border-dashed border-[var(--stroke)] bg-[#f9f8f2] p-8 text-center">
      <div
        aria-hidden
        className="mx-auto mb-4 h-16 w-16 border-2 border-[var(--stroke)] bg-[var(--bg-hero)]"
      />
      <h3 className="text-xl font-bold tracking-tight">No links yet</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        Create your first short link and start tracking clicks from this dashboard.
      </p>
      <button
        type="button"
        onClick={onCreateClick}
        className="brutal-btn brutal-btn-sm brutal-btn-primary focus-ring hover-lift mt-5"
      >
        Create your first link
      </button>
    </div>
  );
}
