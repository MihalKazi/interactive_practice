import type { EvidenceReviewBundle, EvidenceReviewState, ReviewRegion } from "@/types/evidence-review";

const allowedRegionTypes = new Set(["solid-redaction", "blur", "pixelate", "highlight", "annotation", "crop"]);
const blockedText = [/https?:\/\//i, /facebook\.com/i, /telegram\./i, /\bx\.com\b/i, /twitter\.com/i, /^[a-z]:\\/i, /\/private/i];

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validRegion(region: ReviewRegion) {
  if (!allowedRegionTypes.has(region.type)) return false;
  return [region.x, region.y, region.width, region.height].every((value) => value >= 0 && value <= 100) && region.x + region.width <= 100 && region.y + region.height <= 100 && region.width > 0 && region.height > 0;
}

function overlaps(a: ReviewRegion, b: ReviewRegion) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

export function reviewBlockers(item: EvidenceReviewState, extractionIds: Set<string>, confirmedFigures: Map<string, string>) {
  const blockers: string[] = [];
  if (!extractionIds.has(item.extractionId)) blockers.push("Extraction ID not found in manifest");
  if (item.matchDecision !== "confirmed") blockers.push("Figure match unconfirmed");
  if (item.matchDecision === "confirmed" && !item.confirmedFigureId) blockers.push("Confirmed figure ID missing");
  if (item.matchDecision === "confirmed" && !item.reviewerInitials.trim()) blockers.push("Reviewer initials missing");
  if (item.matchDecision === "confirmed" && !item.matchNotes.trim()) blockers.push("Match note missing");
  if (item.confirmedFigureId && confirmedFigures.get(item.confirmedFigureId) && confirmedFigures.get(item.confirmedFigureId) !== item.extractionId && item.matchDecision !== "duplicate") {
    blockers.push("Duplicate confirmed figure ID");
  }
  if (!item.publicCaptionDraft.trim()) blockers.push("Public caption missing");
  if (!item.accessibilityDescription.trim()) blockers.push("Accessibility description missing");
  if (item.privacyDecision === "redaction-required" && item.redactionRegions.length === 0) blockers.push("Required redaction regions missing");
  if (item.legalDecision === "legal-review-required") blockers.push("Legal review required");
  if (item.translationDecision === "translation-review-required") blockers.push("Translation review required");
  if (item.archiveDecision === "archive-review-required") blockers.push("Archive status unresolved");
  if (item.rightOfReplyDecision === "not-assessed") blockers.push("Right-of-reply decision unresolved");
  if (item.cropRegion && !validRegion(item.cropRegion)) blockers.push("Invalid crop region");
  for (const region of [...item.redactionRegions, ...item.highlightRegions, ...item.annotationRegions]) {
    if (!validRegion(region)) blockers.push(`Invalid region ${region.id}`);
  }
  if (item.highlightRegions.some((highlight) => item.redactionRegions.some((redaction) => overlaps(highlight, redaction)))) {
    blockers.push("Highlight overlaps redaction region");
  }
  if (blockedText.some((pattern) => pattern.test(item.publicCaptionDraft + item.accessibilityDescription + item.analyticalSummary))) {
    blockers.push("Caption or summary contains prohibited URL/path");
  }
  const sensitive = item.proposedFigureId === "FIG-006" || item.confirmedFigureId === "FIG-006";
  if (words(item.originalLanguageExcerpt) > (sensitive ? 15 : 30)) blockers.push("Original-language excerpt exceeds limit");
  if (words(item.englishTranslationExcerpt) > (sensitive ? 15 : 30)) blockers.push("English translation excerpt exceeds limit");
  if (sensitive && item.legalDecision !== "legal-review-required") blockers.push("FIG-006 legal status changed from required review");
  if (sensitive && item.translationDecision !== "translation-review-required") blockers.push("FIG-006 translation status changed from required review");
  blockers.push("Publication remains intentionally disabled");
  return blockers;
}

export function validateReviewBundle(bundle: EvidenceReviewBundle, extractionIds: string[]) {
  const ids = new Set(extractionIds);
  const confirmed = new Map<string, string>();
  for (const item of bundle.items) {
    if (item.confirmedFigureId && item.matchDecision === "confirmed") confirmed.set(item.confirmedFigureId, item.extractionId);
  }
  return bundle.items.map((item) => ({
    extractionId: item.extractionId,
    proposedFigureId: item.proposedFigureId,
    blockers: reviewBlockers(item, ids, confirmed),
    complete: reviewBlockers(item, ids, confirmed).every((blocker) => blocker === "Publication remains intentionally disabled"),
  }));
}
