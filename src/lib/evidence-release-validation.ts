import type { EvidenceRecord } from "@/types/evidence";
import type { EvidenceReleaseRecord, ReleaseEligibilityResult } from "@/types/evidence-release";
import type { EvidenceReviewState } from "@/types/evidence-review";

const approvedPrefix = "/evidence/approved/";
const unsafePath = /(\/api\/dev\/|localhost|127\.0\.0\.1|\/private\/|\/source\/|^[a-z]:\\|[a-z]:\\\\)/i;

function words(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function resolveConfirmedEvidenceMapping(reviewItems: EvidenceReviewState[], releaseItems: EvidenceReleaseRecord[]) {
  return reviewItems
    .filter((item) => item.matchDecision === "confirmed" && item.confirmedFigureId)
    .map((item) => ({
      extractionId: item.extractionId,
      evidenceId: releaseItems.find((release) => release.extractionId === item.extractionId)?.evidenceId ?? "",
      proposedFigureId: item.proposedFigureId,
      confirmedFigureId: item.confirmedFigureId,
    }));
}

export function getEvidenceByFigureId(records: EvidenceRecord[], figureId: string) {
  return records.find((record) => `FIG-${String(record.figureNumber).padStart(3, "0")}` === figureId);
}

export function getExtractionByConfirmedFigure(reviewItems: EvidenceReviewState[], figureId: string) {
  return reviewItems.find((item) => item.matchDecision === "confirmed" && item.confirmedFigureId === figureId);
}

export function validateEvidenceMappingUniqueness(reviewItems: EvidenceReviewState[]) {
  const seen = new Map<string, string>();
  const duplicates: string[] = [];
  for (const item of reviewItems) {
    if (item.matchDecision !== "confirmed" || !item.confirmedFigureId) continue;
    const previous = seen.get(item.confirmedFigureId);
    if (previous && previous !== item.extractionId) duplicates.push(item.confirmedFigureId);
    seen.set(item.confirmedFigureId, item.extractionId);
  }
  return { valid: duplicates.length === 0, duplicates };
}

export function publicEvidencePathIsSafe(path: string) {
  return Boolean(path) && path.startsWith(approvedPrefix) && !unsafePath.test(path);
}

export function canRenderPublicEvidence(record: EvidenceRecord, releaseRecord?: EvidenceReleaseRecord) {
  if (!releaseRecord) return false;
  if (!record.publicationApproved || !releaseRecord.publicationApproved) return false;
  if (!releaseRecord.allowPublication) return false;
  if (releaseRecord.withdrawn || releaseRecord.publicStatus === "withdrawn") return false;
  if (!releaseRecord.confirmedFigureId || releaseRecord.confirmedFigureId !== releaseRecord.figureId) return false;
  if (releaseRecord.figureId !== `FIG-${String(record.figureNumber).padStart(3, "0")}`) return false;
  if (!releaseRecord.extractionId || releaseRecord.proposedFigureId !== releaseRecord.figureId) return false;
  if (!releaseRecord.reviewConfigurationComplete) return false;
  if (!releaseRecord.approvedCaption || !releaseRecord.approvedAccessibilityDescription) return false;
  if (releaseRecord.editorialStatus !== "approved") return false;
  if (!(releaseRecord.legalStatus === "approved" || releaseRecord.legalStatus === "pending")) return false;
  if (!(releaseRecord.translationStatus === "not-required" || releaseRecord.translationStatus === "independently-reviewed" || releaseRecord.translationStatus === "researcher-reviewed")) return false;
  if (!releaseRecord.archiveDecision || !releaseRecord.rightOfReplyDecision) return false;
  if (releaseRecord.privacyStatus !== "approved" && releaseRecord.privacyStatus !== "redacted") return false;
  if (!releaseRecord.publicDerivativeAvailable || !releaseRecord.publicImagePath) return false;
  if (!publicEvidencePathIsSafe(releaseRecord.publicImagePath)) return false;
  if (releaseRecord.derivativeVersion !== releaseRecord.publicAssetVersion) return false;
  if (releaseRecord.sensitiveGateRequired && (!releaseRecord.contentWarning || releaseRecord.legalStatus !== "approved")) return false;
  return true;
}

export function getPublicEvidenceUnavailableReason(record: EvidenceRecord, releaseRecord?: EvidenceReleaseRecord) {
  if (releaseRecord?.withdrawn) return "Evidence has been withdrawn or is under review.";
  if (!releaseRecord) return "Evidence image withheld pending figure matching, redaction, editorial, privacy, legal, translation, and publication review.";
  const result = validateReleaseEligibility(record, releaseRecord);
  return result.blockingIssues[0] ?? "Evidence image withheld pending figure matching, redaction, editorial, privacy, legal, translation, and publication review.";
}

export function validateReleaseEligibility(record: EvidenceRecord, releaseRecord: EvidenceReleaseRecord, allReleaseRecords: EvidenceReleaseRecord[] = [releaseRecord]): ReleaseEligibilityResult {
  const blockingIssues: string[] = [];
  const warnings: string[] = [];
  const figureId = `FIG-${String(record.figureNumber).padStart(3, "0")}`;
  const duplicateFigure = allReleaseRecords.filter((item) => item.confirmedFigureId && item.confirmedFigureId === releaseRecord.confirmedFigureId);

  if (!releaseRecord.confirmedFigureId) blockingIssues.push("Figure match pending");
  if (releaseRecord.confirmedFigureId && releaseRecord.confirmedFigureId !== figureId) blockingIssues.push("Figure mismatch");
  if (duplicateFigure.length > 1) blockingIssues.push("Duplicate confirmed figure");
  if (!releaseRecord.reviewConfigurationComplete) blockingIssues.push("Missing reviewer confirmation");
  if (releaseRecord.privacyStatus === "redaction-required" || releaseRecord.privacyStatus === "unreviewed") blockingIssues.push("Missing redactions");
  if (!releaseRecord.approvedCaption) blockingIssues.push("Caption missing");
  if (!releaseRecord.approvedAccessibilityDescription) blockingIssues.push("Accessibility description missing");
  if (releaseRecord.editorialStatus !== "approved") blockingIssues.push("Editorial approval missing");
  if (releaseRecord.privacyStatus !== "approved" && releaseRecord.privacyStatus !== "redacted") blockingIssues.push("Privacy approval missing");
  if (releaseRecord.legalStatus === "pending" || releaseRecord.legalStatus === "legal-review-required") blockingIssues.push("Legal review unresolved");
  if (releaseRecord.translationStatus === "translation-review-required" || releaseRecord.translationStatus === "machine-draft") blockingIssues.push("Translation review unresolved");
  if (!releaseRecord.archiveDecision || releaseRecord.archiveDecision === "archive-review-required") blockingIssues.push("Archive decision unresolved");
  if (!releaseRecord.rightOfReplyDecision || releaseRecord.rightOfReplyDecision === "not-assessed") blockingIssues.push("Right-of-reply unresolved");
  if (record.contentWarning && !releaseRecord.contentWarning) blockingIssues.push("Sensitive-content warning missing");
  if (words(releaseRecord.approvedExcerptOriginal) > (figureId === "FIG-006" ? 15 : 30) || words(releaseRecord.approvedExcerptTranslation) > (figureId === "FIG-006" ? 15 : 30)) blockingIssues.push("Public excerpt exceeds limit");
  if (!releaseRecord.publicDerivativeAvailable) blockingIssues.push("Public derivative missing");
  if (releaseRecord.publicImagePath && !publicEvidencePathIsSafe(releaseRecord.publicImagePath)) blockingIssues.push("Unsafe public path");
  if (!releaseRecord.allowPublication) blockingIssues.push("allowPublication false");
  if (!releaseRecord.publicationApproved || !record.publicationApproved) blockingIssues.push("publicationApproved false");
  if (releaseRecord.withdrawn) blockingIssues.push("Release withdrawn");
  if (figureId === "FIG-006" && !releaseRecord.sensitiveGateRequired) blockingIssues.push("FIG-006 sensitive gate missing");
  if (figureId === "FIG-006" && releaseRecord.legalStatus !== "approved") blockingIssues.push("FIG-006 legal approval missing");
  if (figureId === "FIG-006" && releaseRecord.translationStatus === "translation-review-required") blockingIssues.push("FIG-006 translation approval missing");
  if (releaseRecord.approvedAnnotations.some((annotation) => annotation.approvalStatus !== "publication-approved")) warnings.push("Unapproved annotations excluded from public rendering");

  return {
    eligible: blockingIssues.length === 0,
    blockingIssues,
    warnings,
    evidenceId: record.id,
    figureId,
    derivativeVersion: releaseRecord.derivativeVersion,
    mappingStatus: releaseRecord.confirmedFigureId ? `confirmed:${releaseRecord.confirmedFigureId}` : "pending",
    reviewStatusSummary: blockingIssues.length === 0 ? "eligible" : `${blockingIssues.length} blocker(s)`,
  };
}
