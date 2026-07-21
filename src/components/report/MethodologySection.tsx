import { EditorialStatus } from "@/components/report/EditorialStatus";

const stages = [
  "Sample selection",
  "Data collection",
  "Account classification",
  "Narrative coding",
  "Coordination indicators",
  "Follower-count calculation",
  "Translation and review",
  "Ethical handling",
];

export function MethodologySection() {
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {stages.map((stage, index) => (
          <details key={stage} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
              <span className="flex items-center gap-4">
                <span className="font-mono text-sm text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg font-semibold">{stage}</span>
              </span>
              <span className="text-2xl text-[var(--muted)] group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-2xl pl-10 text-sm leading-7 text-[var(--muted)]">
              Requires researcher clarification before publication. This stage will describe documented process only, without inventing sampling thresholds or coordination rules.
            </p>
          </details>
        ))}
      </div>
      <aside className="border-l border-[var(--border)] pl-6">
        <p className="eyebrow text-[var(--muted)]">Methodology rail</p>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Public methodology must explain what was observed, how categories were assigned, and where uncertainty remains.
        </p>
        <EditorialStatus status="Methodology clarification required" className="mt-5" />
      </aside>
    </div>
  );
}
