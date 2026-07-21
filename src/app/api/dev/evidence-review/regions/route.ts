import { NextRequest, NextResponse } from "next/server";
import { clampRegion, isLocalDevelopmentRequest, readReviewBundle, writeReviewBundle } from "@/lib/dev-evidence";
import type { ReviewRegion } from "@/types/evidence-review";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const body = await request.json();
  const allowed = ["extractionId", "redactionRegions", "highlightRegions", "annotationRegions", "cropRegion", "reviewerInitials"];
  if (Object.keys(body).some((key) => !allowed.includes(key))) return NextResponse.json({ ok: false, error: "Unknown field" }, { status: 400 });
  const bundle = readReviewBundle();
  const item = bundle.items.find((entry) => entry.extractionId === body.extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Unknown extraction ID" }, { status: 404 });
  const cleanList = (regions: ReviewRegion[] = []) => {
    const cleaned = regions.map(clampRegion).filter(Boolean) as ReviewRegion[];
    if (cleaned.length !== regions.length) throw new Error("Invalid region");
    return cleaned;
  };
  try {
    item.redactionRegions = cleanList(body.redactionRegions);
    item.highlightRegions = cleanList(body.highlightRegions);
    item.annotationRegions = cleanList(body.annotationRegions);
    item.cropRegion = body.cropRegion ? clampRegion(body.cropRegion) : null;
    if (body.cropRegion && !item.cropRegion) throw new Error("Invalid crop");
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid region data" }, { status: 400 });
  }
  item.revision += 1;
  item.updatedAt = new Date().toISOString();
  writeReviewBundle(bundle, String(body.reviewerInitials || item.reviewerInitials), "regions", ["regions"]);
  return NextResponse.json({ ok: true, revision: item.revision });
}
