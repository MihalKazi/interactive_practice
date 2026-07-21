import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceStatusPanel({ record }: { record: EvidenceRecord }) {
  return (
    <aside className="border border-[var(--border)] p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Publication state</p>
        <span
          className={
            record.publicationApproved
              ? "evidence-status-pill evidence-status-pill--live"
              : "evidence-status-pill evidence-status-pill--pending"
          }
        >
          {record.publicationApproved ? "Published" : "Pending"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {record.publicationApproved
          ? "Published by the site admin."
          : "Not yet published."}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        {record.limitations.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </aside>
  );
}
