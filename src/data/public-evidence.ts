import { getReleaseBundle } from "@/lib/release-bundle";
import { evidenceRecords } from "@/data/evidence";
import { canRenderPublicEvidence } from "@/lib/evidence-release-validation";
import type { EvidenceRecord } from "@/types/evidence";

export async function buildPublicEvidenceManifest() {
  const releases = await getReleaseBundle();
  return evidenceRecords.map((record: EvidenceRecord) => {
  const release = releases.items.find((item) => item.evidenceId === record.id);
  const renderable = canRenderPublicEvidence(record, release);
  return {
    evidenceId: record.id,
    figureNumber: record.figureNumber,
    publicTitle: record.title,
    publicCaption: renderable ? release?.approvedCaption ?? "" : "",
    accessibilityDescription: renderable ? release?.approvedAccessibilityDescription ?? "" : "",
    publicImagePath: renderable ? release?.publicImagePath ?? "" : "",
    derivativeVersion: renderable ? release?.derivativeVersion ?? "" : "",
    publicStatus: release?.publicStatus ?? "blocked",
    approvedAnnotations: renderable ? (release?.approvedAnnotations ?? []).filter((annotation) => annotation.approvalStatus === "publication-approved") : [],
    contentWarning: record.contentWarning ?? release?.contentWarning ?? "",
    translationReviewLabel: release?.translationReviewLabel ?? "",
    sourceDocumentPage: record.sourceDocumentPage,
    releaseDate: renderable ? release?.releasedAt ?? "" : "",
    correctionNote: release?.correctionNote ?? "",
    withdrawalState: release?.withdrawn ? "withdrawn" : "",
  };
  });
}
