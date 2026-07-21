import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceReviewPlaceholder({ record, reason }: { record: EvidenceRecord; reason?: string }) {
  return (
    <div className="evidence-placeholder" role="img" aria-label={`${record.id} evidence image withheld pending review`}>
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{record.id} / Figure {String(record.figureNumber).padStart(3, "0")}</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Source-document page: {record.sourceDocumentPage}</p>
      <p className="mt-4 text-xl font-semibold">{record.title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{record.summary}</p>
      <p className="mt-4 text-sm text-[var(--muted)]">Status: {record.editorialStatus}</p>
      <p className="mt-3 text-sm font-semibold">{reason ?? "Evidence image withheld pending figure matching, redaction, editorial, privacy, legal, translation, and publication review."}</p>
    </div>
  );
}
