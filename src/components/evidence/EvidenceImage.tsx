import type { EvidenceRecord } from "@/types/evidence";
import { EvidenceReviewPlaceholder } from "@/components/evidence/EvidenceReviewPlaceholder";

export function isEvidenceRenderable(record: EvidenceRecord) {
  return record.publicationApproved && record.publicDerivativeAvailable && Boolean(record.publicImagePath);
}

export function EvidenceImage({ record }: { record: EvidenceRecord }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
      <EvidenceReviewPlaceholder record={record} />
    </div>
  );
}
