import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isLocalDevelopmentRequest, PRIVATE_EVIDENCE_DIR, readReviewBundle, readExtractionManifest, writeReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

function mimeToExt(type: string) {
  if (type === "image/png") return ".png";
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/webp") return ".webp";
  return "";
}

export async function POST(request: NextRequest) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const form = await request.formData();
  const file = form.get("file");
  const expectedFigureId = String(form.get("figureId") || "");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "Choose an image file." }, { status: 400 });
  const ext = mimeToExt(file.type) || extname(file.name).toLowerCase();
  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return NextResponse.json({ ok: false, error: "Use PNG, JPG, or WebP." }, { status: 400 });

  const manifestPath = join(PRIVATE_EVIDENCE_DIR, "extraction-manifest.json");
  const manifest = readExtractionManifest();
  const nextNumber = manifest.images.length + 1;
  const extractionId = `IMG-${String(nextNumber).padStart(3, "0")}`;
  const safeFigureId = /^FIG-\d{3}$/.test(expectedFigureId) ? expectedFigureId : `FIG-${String(nextNumber).padStart(3, "0")}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  const extractedFilename = `${String(nextNumber).padStart(3, "0")}-uploaded${ext}`;
  const originalsDir = join(PRIVATE_EVIDENCE_DIR, "originals");
  mkdirSync(originalsDir, { recursive: true });
  writeFileSync(join(originalsDir, extractedFilename), bytes);

  manifest.images.push({
    extractionId,
    originalFilename: basename(file.name).replace(/[^\w.-]/g, "_"),
    extractedFilename,
    mimeType: file.type || "application/octet-stream",
    width: null,
    height: null,
    sizeBytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    probableFigureId: safeFigureId,
    matchingConfidence: "MATCH_REVIEW_REQUIRED",
    matchingNotes: "Uploaded through local evidence studio. Manual figure match required.",
    extractedAt: new Date().toISOString(),
  });
  manifest.imageCount = manifest.images.length;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const bundle = readReviewBundle();
  bundle.items.push({
    extractionId,
    proposedFigureId: safeFigureId,
    confirmedFigureId: "",
    sourceDocumentPage: "Uploaded locally",
    expectedCaption: "Uploaded local evidence item. Match and caption require review.",
    expectedContent: "Uploaded evidence item for possible website use.",
    matchDecision: "pending",
    matchConfidence: "low",
    matchNotes: "",
    reviewerInitials: "",
    reviewedAt: "",
    captionDecision: "not-started",
    privacyDecision: "redaction-required",
    legalDecision: safeFigureId === "FIG-006" ? "legal-review-required" : "pending",
    translationDecision: safeFigureId === "FIG-006" ? "translation-review-required" : "translation-review-required",
    archiveDecision: "archive-review-required",
    rightOfReplyDecision: "not-assessed",
    verificationDecision: "source-document-only",
    editorialDecision: "pending",
    redactionDecision: "redaction-review-required",
    publicationRecommendation: "hold-for-review",
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
  });
  writeReviewBundle(bundle, "studio", "upload", ["manifest", "review-state"]);
  return NextResponse.json({ ok: true, extractionId });
}
