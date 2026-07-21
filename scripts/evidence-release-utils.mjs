import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const requiredEvidenceIds = ["EV-001", "EV-002", "EV-003", "EV-004", "EV-005", "EV-006"];

export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function readReleaseBundle() {
  return readJson("private/evidence/release-state.json");
}

export function readReviewBundle() {
  return readJson("private/evidence/review-state.json");
}

export function publicPathSafe(path) {
  return Boolean(path) && path.startsWith("/evidence/approved/") && !/(\/api\/dev\/|localhost|127\.0\.0\.1|\/private\/|\/source\/|^[a-z]:\\|[a-z]:\\\\)/i.test(path);
}

export function evidenceNumber(id) {
  return id.replace("EV-", "");
}

export function validateReleaseItem(item, allItems = []) {
  const blockers = [];
  const figureId = `FIG-${evidenceNumber(item.evidenceId)}`;
  const duplicate = item.confirmedFigureId ? allItems.filter((other) => other.confirmedFigureId === item.confirmedFigureId) : [];
  if (!item.confirmedFigureId) blockers.push("Figure match pending");
  if (item.confirmedFigureId && item.confirmedFigureId !== figureId) blockers.push("Figure mismatch");
  if (duplicate.length > 1) blockers.push("Duplicate confirmed figure");
  if (!item.reviewConfigurationComplete) blockers.push("Missing reviewer confirmation");
  if (item.privacyStatus === "redaction-required" || item.privacyStatus === "unreviewed") blockers.push("Missing redactions");
  if (!item.approvedCaption) blockers.push("Caption missing");
  if (!item.approvedAccessibilityDescription) blockers.push("Accessibility description missing");
  if (item.editorialStatus !== "approved") blockers.push("Editorial approval missing");
  if (item.privacyStatus !== "approved" && item.privacyStatus !== "redacted") blockers.push("Privacy approval missing");
  if (item.legalStatus === "pending" || item.legalStatus === "legal-review-required") blockers.push("Legal review unresolved");
  if (item.translationStatus === "translation-review-required" || item.translationStatus === "machine-draft") blockers.push("Translation review unresolved");
  if (!item.archiveDecision || item.archiveDecision === "archive-review-required") blockers.push("Archive decision unresolved");
  if (!item.rightOfReplyDecision || item.rightOfReplyDecision === "not-assessed") blockers.push("Right-of-reply unresolved");
  if (figureId === "FIG-006" && !item.contentWarning) blockers.push("Sensitive-content warning missing");
  if (!item.publicDerivativeAvailable) blockers.push("Public derivative missing");
  if (item.publicImagePath && !publicPathSafe(item.publicImagePath)) blockers.push("Unsafe public path");
  if (!item.allowPublication) blockers.push("allowPublication false");
  if (!item.publicationApproved) blockers.push("publicationApproved false");
  if (item.withdrawn) blockers.push("Release withdrawn");
  if (item.publicImagePath && publicPathSafe(item.publicImagePath) && !existsSync(join(process.cwd(), "public", item.publicImagePath.slice(1)))) blockers.push("Public derivative file missing");
  if (figureId === "FIG-006" && !item.sensitiveGateRequired) blockers.push("FIG-006 sensitive gate missing");
  if (figureId === "FIG-006" && item.legalStatus !== "approved") blockers.push("FIG-006 legal approval missing");
  if (figureId === "FIG-006" && item.translationStatus === "translation-review-required") blockers.push("FIG-006 translation approval missing");
  return {
    eligible: blockers.length === 0,
    blockingIssues: blockers,
    warnings: [],
    evidenceId: item.evidenceId,
    figureId,
    derivativeVersion: item.derivativeVersion,
    mappingStatus: item.confirmedFigureId ? `confirmed:${item.confirmedFigureId}` : "pending",
    reviewStatusSummary: blockers.length ? `${blockers.length} blocker(s)` : "eligible",
  };
}

export function releaseResults() {
  const bundle = readReleaseBundle();
  return bundle.items.map((item) => validateReleaseItem(item, bundle.items));
}
