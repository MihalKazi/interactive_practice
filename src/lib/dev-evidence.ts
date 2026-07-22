import "server-only";

import { getJSON, setJSON, appendHistory } from "@/lib/kv-store";
import type { EvidenceReviewBundle, EvidenceReviewState, ReviewRegion } from "@/types/evidence-review";

const MANIFEST_KEY = "extraction-manifest";
const REVIEW_STATE_KEY = "review-state";
export const PUBLICATION_CONFIG_KEY = "publication-config";
export const LOCAL_PUBLICATIONS_KEY = "local-publications";
export const LAST_EXPORT_KEY = "last-export";

type ExtractionRecord = {
  extractionId: string;
  originalFilename?: string;
  extractedFilename: string;
  mimeType: string;
  width: number | null;
  height: number | null;
  sizeBytes?: number;
  sha256: string;
  probableFigureId: string;
  matchingConfidence: string;
  matchingNotes?: string;
  extractedAt?: string;
};

type ExtractionManifest = { imageCount: number; images: ExtractionRecord[] };

const expected: Record<string, { page: string; content: string; caption: string }> = {
  "FIG-001": {
    page: "3",
    content: "A social-media repost connected to a public condolence message, containing anti-military framing.",
    caption: "Screenshot of a repost connected to a condolence message, described in the report as anti-military framing.",
  },
  "FIG-002": {
    page: "4",
    content: "A collage of comments where repeated extremist terminology is highlighted.",
    caption: "Collage of a comment section with repeated terminology highlighted.",
  },
  "FIG-003": {
    page: "6",
    content: "A historical document or webpage screenshot connected to the 2015 ideological-origin section.",
    caption: "Screenshot of the 2015 source discussed in the historical-origin section.",
  },
  "FIG-004": {
    page: "8-9",
    content: "A social-media visual framing a Bangladesh Navy deployment to South Sudan.",
    caption: "Screenshot of deployment-related framing discussed in the report.",
  },
  "FIG-005": {
    page: "10",
    content: "A screenshot showing repeated hashtag or caption use connected to a domestic incident.",
    caption: "Screenshot showing repeated hashtag or caption pattern connected to a domestic incident.",
  },
  "FIG-006": {
    page: "11",
    content: "A Bengali-language post containing rhetoric analysed as justification for violence against security personnel.",
    caption: "Sensitive Bengali-language post analysed as incitement; public display requires warning, redaction, and review.",
  },
};

export async function readExtractionManifest(): Promise<ExtractionManifest> {
  const manifest = await getJSON<ExtractionManifest>(MANIFEST_KEY);
  return manifest ?? { imageCount: 0, images: [] };
}

export async function writeExtractionManifest(manifest: ExtractionManifest) {
  await setJSON(MANIFEST_KEY, manifest);
}

function defaultState(record: ExtractionRecord, index: number): EvidenceReviewState {
  const fig = `FIG-${String(index + 1).padStart(3, "0")}`;
  const info = expected[fig] ?? expected["FIG-001"];
  return {
    extractionId: record.extractionId,
    proposedFigureId: fig,
    confirmedFigureId: "",
    sourceDocumentPage: info.page,
    expectedCaption: info.caption,
    expectedContent: info.content,
    matchDecision: "pending",
    matchConfidence: "low",
    matchNotes: "",
    reviewerInitials: "",
    reviewedAt: "",
    captionDecision: "not-started",
    privacyDecision: "redaction-required",
    legalDecision: fig === "FIG-006" ? "legal-review-required" : "pending",
    translationDecision: fig === "FIG-006" ? "translation-review-required" : "translation-review-required",
    archiveDecision: "archive-review-required",
    rightOfReplyDecision: "not-assessed",
    verificationDecision: "source-document-only",
    editorialDecision: "pending",
    redactionDecision: "redaction-review-required",
    publicationRecommendation: fig === "FIG-006" ? "hold-for-review" : "hold-for-review",
    redactionRegions: [],
    highlightRegions: [],
    annotationRegions: [],
    cropRegion: null,
    internalCaption: "",
    publicCaptionDraft: "",
    accessibilityDescription: "",
    analyticalSummary: "",
    limitationsNote: "",
    originalLanguageExcerpt: "",
    englishTranslationExcerpt: "",
    dateConfidence: "unknown",
    eventDate: "",
    captureDate: "",
    previewGenerated: false,
    unresolvedIssues: [],
    revision: 0,
    updatedAt: new Date().toISOString(),
  };
}

export async function readReviewBundle(): Promise<EvidenceReviewBundle> {
  const existing = await getJSON<EvidenceReviewBundle>(REVIEW_STATE_KEY);
  if (existing) return existing;
  const manifest = await readExtractionManifest();
  const bundle: EvidenceReviewBundle = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items: manifest.images.map(defaultState),
  };
  await writeReviewBundle(bundle, "system", "initialise", []);
  return bundle;
}

export async function writeReviewBundle(bundle: EvidenceReviewBundle, reviewerInitials: string, action: string, changedFields: string[]) {
  const previous = await getJSON<EvidenceReviewBundle>(REVIEW_STATE_KEY);
  const next = { ...bundle, updatedAt: new Date().toISOString() };
  await setJSON(REVIEW_STATE_KEY, next);
  await appendHistory({
    evidence_id: "review-state",
    extraction_id: "",
    reviewer_initials: reviewerInitials || "system",
    action,
    changed_fields: changedFields,
    previous_value_summary: previous ? "backup captured in history" : "no prior state",
    new_value_summary: "review-state updated",
  });
}

export async function originalKeyForExtraction(extractionId: string): Promise<{ key: string; mimeType: string } | null> {
  if (!/^IMG-\d{3}$/.test(extractionId)) return null;
  const manifest = await readExtractionManifest();
  const record = manifest.images.find((item) => item.extractionId === extractionId);
  if (!record) return null;
  return { key: `originals/${record.extractedFilename}`, mimeType: record.mimeType };
}

export function clampRegion(region: ReviewRegion): ReviewRegion | null {
  const n = (value: unknown) => (Number.isFinite(Number(value)) ? Number(value) : 0);
  const x = Math.max(0, Math.min(100, n(region.x)));
  const y = Math.max(0, Math.min(100, n(region.y)));
  const width = Math.max(0, Math.min(100 - x, n(region.width)));
  const height = Math.max(0, Math.min(100 - y, n(region.height)));
  if (width <= 0.25 || height <= 0.25) return null;
  return {
    id: String(region.id || `region-${Date.now()}`),
    type: region.type,
    x,
    y,
    width,
    height,
    label: String(region.label || ""),
    privateNote: String(region.privateNote || ""),
    step: Math.max(0, Math.min(20, Math.round(n(region.step)))),
    mobileOrder: Math.max(0, Math.min(100, Math.round(n(region.mobileOrder)))),
    visibleInPreview: Boolean(region.visibleInPreview),
  };
}
