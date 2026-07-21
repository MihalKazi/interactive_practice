import "server-only";

import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, appendFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import type { NextRequest } from "next/server";
import type { EvidenceReviewBundle, EvidenceReviewState, ReviewRegion } from "@/types/evidence-review";

export const PRIVATE_EVIDENCE_DIR = resolve(process.cwd(), "private", "evidence");
export const REVIEW_STATE_PATH = join(PRIVATE_EVIDENCE_DIR, "review-state.json");
export const PUBLICATION_CONFIG_PATH = join(PRIVATE_EVIDENCE_DIR, "publication-config.json");
export const HISTORY_PATH = join(PRIVATE_EVIDENCE_DIR, "review-history.jsonl");

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

export function isLocalDevelopmentRequest(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") return false;
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1";
}

export function readExtractionManifest() {
  const path = join(PRIVATE_EVIDENCE_DIR, "extraction-manifest.json");
  if (!existsSync(path)) return { imageCount: 0, images: [] as ExtractionRecord[] };
  return JSON.parse(readFileSync(path, "utf8")) as { imageCount: number; images: ExtractionRecord[] };
}

function isoStamp() {
  return new Date().toISOString().replace(/[:.]/g, "").replace("T", "T").replace("Z", "Z");
}

function backup(path: string, prefix: string) {
  if (!existsSync(path)) return;
  const backupDir = join(PRIVATE_EVIDENCE_DIR, "backups");
  mkdirSync(backupDir, { recursive: true });
  copyFileSync(path, join(backupDir, `${prefix}-${isoStamp()}.json`));
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

export function readReviewBundle(): EvidenceReviewBundle {
  if (existsSync(REVIEW_STATE_PATH)) return JSON.parse(readFileSync(REVIEW_STATE_PATH, "utf8")) as EvidenceReviewBundle;
  const manifest = readExtractionManifest();
  const bundle: EvidenceReviewBundle = {
    version: 1,
    updatedAt: new Date().toISOString(),
    items: manifest.images.map(defaultState),
  };
  writeReviewBundle(bundle, "system", "initialise", []);
  return bundle;
}

export function writeReviewBundle(bundle: EvidenceReviewBundle, reviewerInitials: string, action: string, changedFields: string[]) {
  mkdirSync(PRIVATE_EVIDENCE_DIR, { recursive: true });
  backup(REVIEW_STATE_PATH, "review-state");
  const next = { ...bundle, updatedAt: new Date().toISOString() };
  writeFileSync(REVIEW_STATE_PATH, JSON.stringify(next, null, 2));
  appendFileSync(
    HISTORY_PATH,
    JSON.stringify({
      timestamp: new Date().toISOString(),
      evidenceId: "review-state",
      extractionId: "",
      reviewerInitials: reviewerInitials || "system",
      action,
      changedFields,
      previousValueSummary: "backup created when available",
      newValueSummary: "private review-state updated",
    }) + "\n",
  );
}

export function originalPathForExtraction(extractionId: string) {
  if (!/^IMG-\d{3}$/.test(extractionId)) return null;
  const record = readExtractionManifest().images.find((item) => item.extractionId === extractionId);
  if (!record) return null;
  const originalDir = resolve(PRIVATE_EVIDENCE_DIR, "originals");
  const resolved = resolve(originalDir, basename(record.extractedFilename));
  if (!resolved.startsWith(originalDir)) return null;
  return { path: resolved, mimeType: record.mimeType };
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
