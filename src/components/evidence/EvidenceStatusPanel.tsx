import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceStatusPanel({ record }: { record: EvidenceRecord }) {
  return (
    <aside className="border border-[var(--border)] p-4">
      <p className="font-semibold">Publication state</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {record.publicationApproved
          ? "Approved public derivative configured."
          : "Public derivative pending review. Original image remains private."}
      </p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        {record.limitations.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </aside>
  );
}
