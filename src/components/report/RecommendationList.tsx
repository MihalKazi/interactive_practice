import type { Recommendation } from "@/types/report";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {recommendations.map((item, index) => (
        <article key={item.audience} className="grid gap-4 py-6 md:grid-cols-[12rem_10rem_1fr]">
          <h3 className="text-xl font-semibold">{item.audience}</h3>
          <p className="font-mono text-sm text-[var(--accent)]">Priority {index + 1}</p>
          <div>
            <p className="font-semibold">{item.action}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
