import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceCaption({ record }: { record: EvidenceRecord }) {
  return (
    <figcaption className="border-t border-[var(--border)] p-4 text-sm leading-7 text-[var(--muted)]">
      <strong className="text-[var(--foreground)]">{record.title}.</strong> {record.publicCaption}
      {record.methodologyNote ? <span className="mt-2 block">{record.methodologyNote}</span> : null}
    </figcaption>
  );
}
