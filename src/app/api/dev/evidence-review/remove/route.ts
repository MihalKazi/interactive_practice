import { basename } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { readExtractionManifest, writeExtractionManifest, readReviewBundle, writeReviewBundle } from "@/lib/dev-evidence";
import { movePrivateOriginal } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const extractionId = String(body.extractionId || "");
  if (!/^IMG-\d{3}$/.test(extractionId)) return NextResponse.json({ ok: false, error: "Invalid item." }, { status: 400 });

  const manifest = await readExtractionManifest();
  const item = manifest.images.find((entry) => entry.extractionId === extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Item not found." }, { status: 404 });

  try {
    await movePrivateOriginal(`originals/${basename(item.extractedFilename)}`, `removed/${Date.now()}-${basename(item.extractedFilename)}`);
  } catch {
    // Original may already be missing; proceed with manifest/review-state cleanup regardless.
  }

  manifest.images = manifest.images.filter((entry) => entry.extractionId !== extractionId);
  manifest.imageCount = manifest.images.length;
  await writeExtractionManifest(manifest);

  const bundle = await readReviewBundle();
  bundle.items = bundle.items.filter((entry) => entry.extractionId !== extractionId);
  await writeReviewBundle(bundle, String(body.reviewerInitials || "studio"), "remove", ["manifest", "review-state"]);
  return NextResponse.json({ ok: true });
}
