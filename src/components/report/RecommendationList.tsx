import type { Recommendation } from "@/types/report";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {recommendations.map((item, index) => (
        <article
          key={item.audience}
          className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4 transition hover:border-[var(--accent)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] font-mono text-xs font-semibold text-[var(--accent)]">
              {index + 1}
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-[0.06em]">{item.audience}</h3>
          </div>
          <p className="mt-3 text-base font-semibold leading-6">{item.action}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
        </article>
      ))}
    </div>
  );
}
