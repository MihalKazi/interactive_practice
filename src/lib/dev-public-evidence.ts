import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { evidenceRecords } from "@/data/evidence";
import { PRIVATE_EVIDENCE_DIR, readReviewBundle } from "@/lib/dev-evidence";
import type { EvidenceRecord, PublicEvidenceAnnotation } from "@/types/evidence";

type LocalPublication = {
  extractionId: string;
  figureId: string;
  publicImagePath: string;
  publishedAt: string;
};

const titles: Record<string, string> = {
  "FIG-001": "Condolence repost with hostile framing",
  "FIG-002": "Comment collage with repeated terminology",
  "FIG-003": "Historical-origin source screenshot",
  "FIG-004": "Bangladesh Navy deployment framing",
  "FIG-005": "Repeated hashtag or caption pattern",
  "FIG-006": "Sensitive rhetoric analysed as incitement",
};

function localPublications() {
  const path = join(PRIVATE_EVIDENCE_DIR, "local-publications.json");
  if (!existsSync(path)) return [] as LocalPublication[];
  return JSON.parse(readFileSync(path, "utf8")) as LocalPublication[];
}

function figureNumber(figureId: string) {
  const number = Number(figureId.replace("FIG-", ""));
  return number >= 1 && number <= 6 ? (number as EvidenceRecord["figureNumber"]) : 1;
}

function annotations(item: ReturnType<typeof readReviewBundle>["items"][number]) {
  const regions = [...item.highlightRegions, ...item.annotationRegions];
  return regions.map((region, index) => ({
    id: `${item.extractionId}-${region.id}`,
    label: region.label || region.type,
    description: region.privateNote || item.analyticalSummary || "Local website note.",
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    annotationType: region.type === "highlight" ? "context" : "verification-note",
    step: region.step,
    mobileOrder: region.mobileOrder || index + 1,
    editorialStatus: "reviewed",
    visibleByDefault: region.visibleInPreview,
  })) satisfies PublicEvidenceAnnotation[];
}

export function evidenceRecordsForCurrentEnvironment() {
  if (process.env.NODE_ENV !== "development") return evidenceRecords;

  const bundle = readReviewBundle();
  const published = localPublications();
  if (published.length === 0) return evidenceRecords;

  const next = [...evidenceRecords];
  for (const publication of published) {
    const item = bundle.items.find((entry) => entry.extractionId === publication.extractionId);
    if (!item) continue;
    const slot = figureNumber(publication.figureId);
    const base = next.find((record) => record.figureNumber === slot) ?? evidenceRecords[slot - 1];
    next[slot - 1] = {
      ...base,
      id: `EV-${String(slot).padStart(3, "0")}`,
      figureNumber: slot,
      title: titles[publication.figureId] ?? base.title,
      sourceDocumentPage: item.sourceDocumentPage,
      publicImagePath: publication.publicImagePath,
      originalImageAvailable: true,
      publicDerivativeAvailable: true,
      capturedDate: item.captureDate || undefined,
      eventDate: item.eventDate || undefined,
      summary: item.analyticalSummary || item.expectedContent,
      publicCaption: item.publicCaptionDraft || item.expectedCaption,
      verificationStatus: item.verificationDecision,
      editorialStatus: item.editorialDecision === "pending" ? "reviewed" : item.editorialDecision,
      legalStatus: item.legalDecision === "legal-review-required" ? "pending" : item.legalDecision,
      privacyStatus: item.privacyDecision === "redaction-required" ? "redacted" : item.privacyDecision,
      translationStatus: item.translationDecision,
      redactionStatus: "applied",
      archiveStatus: item.archiveDecision,
      annotations: annotations(item),
      methodologyNote: "Published from the local evidence editor for development preview.",
      limitations: item.limitationsNote ? [item.limitationsNote] : base.limitations,
      publicationApproved: true,
    };
  }
  return next;
}
