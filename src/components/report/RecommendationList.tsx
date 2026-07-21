import { EditorialStatus } from "@/components/report/EditorialStatus";

const recommendations = ["Social platforms", "Research community", "Newsrooms", "Civil society", "State communicators"];

export function RecommendationList() {
  return (
    <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {recommendations.map((audience, index) => (
        <article key={audience} className="grid gap-4 py-6 md:grid-cols-[12rem_10rem_1fr_14rem]">
          <h3 className="text-xl font-semibold">{audience}</h3>
          <p className="font-mono text-sm text-[var(--accent)]">Priority {index + 1}</p>
          <div>
            <p className="font-semibold">Action statement pending editorial approval.</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              Longer explanation placeholder. Final language should come from reviewed recommendations in the source report.
            </p>
          </div>
          <EditorialStatus status="Editorial review required" />
        </article>
      ))}
    </div>
  );
}
