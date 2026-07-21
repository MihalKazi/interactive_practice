import Image from "next/image";
import type { EvidenceRecord } from "@/types/evidence";
import { EvidenceOverlay } from "@/components/evidence/EvidenceOverlay";
import { EvidenceReviewPlaceholder } from "@/components/evidence/EvidenceReviewPlaceholder";
import releaseBundle from "../../../private/evidence/release-state.json";
import { canRenderPublicEvidence, getPublicEvidenceUnavailableReason } from "@/lib/evidence-release-validation";
import type { EvidenceReleaseBundle } from "@/types/evidence-release";

export function EvidenceImage({ record, step = 0 }: { record: EvidenceRecord; step?: number }) {
  const release = (releaseBundle as EvidenceReleaseBundle).items.find((item) => item.evidenceId === record.id);
  const renderable = canRenderPublicEvidence(record, release);
  if (!renderable || !release) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
        <EvidenceReviewPlaceholder record={record} reason={getPublicEvidenceUnavailableReason(record, release)} />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
      <Image src={release.publicImagePath} alt={release.approvedAccessibilityDescription} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-contain" loading="lazy" />
      <EvidenceOverlay annotations={record.annotations.filter((annotation) => release.approvedAnnotations.some((approved) => approved.id === annotation.id && approved.approvalStatus === "publication-approved"))} step={step} />
    </div>
  );
}
