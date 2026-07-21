import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceMetadata({ record }: { record: EvidenceRecord }) {
  const rows = [
    ["Source type", record.sourceType],
    ["Page", record.sourceDocumentPage],
    ["Language", record.language],
  ];
  return (
    <dl className="grid gap-3 border-y border-[var(--border)] py-4 text-sm sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-[var(--muted)]">{label}</dt>
          <dd className="font-mono text-xs">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
