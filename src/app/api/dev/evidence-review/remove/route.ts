import { existsSync, mkdirSync, renameSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isLocalDevelopmentRequest, PRIVATE_EVIDENCE_DIR, readReviewBundle, readExtractionManifest, writeReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const body = await request.json();
  const extractionId = String(body.extractionId || "");
  if (!/^IMG-\d{3}$/.test(extractionId)) return NextResponse.json({ ok: false, error: "Invalid item." }, { status: 400 });

  const manifestPath = join(PRIVATE_EVIDENCE_DIR, "extraction-manifest.json");
  const manifest = readExtractionManifest();
  const item = manifest.images.find((entry) => entry.extractionId === extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Item not found." }, { status: 404 });

  const originalsDir = join(PRIVATE_EVIDENCE_DIR, "originals");
  const removedDir = join(PRIVATE_EVIDENCE_DIR, "removed");
  mkdirSync(removedDir, { recursive: true });
  const source = join(originalsDir, basename(item.extractedFilename));
  if (existsSync(source)) renameSync(source, join(removedDir, `${Date.now()}-${basename(item.extractedFilename)}`));

  manifest.images = manifest.images.filter((entry) => entry.extractionId !== extractionId);
  manifest.imageCount = manifest.images.length;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  const bundle = readReviewBundle();
  bundle.items = bundle.items.filter((entry) => entry.extractionId !== extractionId);
  writeReviewBundle(bundle, String(body.reviewerInitials || "studio"), "remove", ["manifest", "review-state"]);
  return NextResponse.json({ ok: true });
}
