import { NextRequest, NextResponse } from "next/server";
import { readReviewBundle, writeReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

const allowed = [
  "extractionId",
  "reviewerInitials",
  "captionDecision",
  "privacyDecision",
  "legalDecision",
  "translationDecision",
  "archiveDecision",
  "rightOfReplyDecision",
  "verificationDecision",
  "editorialDecision",
  "redactionDecision",
  "publicationRecommendation",
  "internalCaption",
  "publicCaptionDraft",
  "accessibilityDescription",
  "analyticalSummary",
  "limitationsNote",
  "originalLanguageExcerpt",
  "englishTranslationExcerpt",
  "dateConfidence",
  "eventDate",
  "captureDate",
  "unresolvedIssues",
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (Object.keys(body).some((key) => !allowed.includes(key))) return NextResponse.json({ ok: false, error: "Unknown field" }, { status: 400 });
  const text = JSON.stringify(body);
  if (/https?:\/\/|[a-z]:\\|\/private/i.test(text)) return NextResponse.json({ ok: false, error: "Unsafe URL or path" }, { status: 400 });
  const bundle = await readReviewBundle();
  const item = bundle.items.find((entry) => entry.extractionId === body.extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Unknown extraction ID" }, { status: 404 });
  for (const key of allowed) {
    if (key !== "extractionId" && key in body) {
      // Controlled endpoint rejects unknown keys above; assign remaining review metadata fields.
      (item as unknown as Record<string, unknown>)[key] = body[key];
    }
  }
  item.revision += 1;
  item.updatedAt = new Date().toISOString();
  await writeReviewBundle(bundle, String(body.reviewerInitials || item.reviewerInitials), "metadata", Object.keys(body));
  return NextResponse.json({ ok: true, revision: item.revision });
}
