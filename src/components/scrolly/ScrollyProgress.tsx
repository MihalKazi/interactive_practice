export function ScrollyProgress({
  count,
  active,
  title,
}: {
  count: number;
  active: number;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3" aria-hidden="true">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{title}</span>
      <div className="flex gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-8 ${index <= active ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`}
          />
        ))}
      </div>
    </div>
  );
}
