import { existsSync, readFileSync } from "node:fs";

const bundle = existsSync("private/evidence/review-state.json")
  ? JSON.parse(readFileSync("private/evidence/review-state.json", "utf8"))
  : { items: [] };

for (const item of bundle.items) {
  const regionCount = (item.redactionRegions?.length ?? 0) + (item.highlightRegions?.length ?? 0) + (item.annotationRegions?.length ?? 0) + (item.cropRegion ? 1 : 0);
  const blockers = [
    item.matchDecision !== "confirmed" && "match pending",
    !item.publicCaptionDraft && "caption missing",
    item.privacyDecision === "redaction-required" && "redaction required",
    item.legalDecision === "legal-review-required" && "legal review",
    item.translationDecision === "translation-review-required" && "translation review",
    "publication disabled",
  ].filter(Boolean);
  console.log(`${item.extractionId} ${item.proposedFigureId} match=${item.matchDecision} confidence=${item.matchConfidence} regions=${regionCount} blockers=${blockers.length} [${blockers.join(", ")}]`);
}
