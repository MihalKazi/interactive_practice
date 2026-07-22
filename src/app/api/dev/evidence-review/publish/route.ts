import { extname } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { readExtractionManifest, readReviewBundle, writeReviewBundle, LOCAL_PUBLICATIONS_KEY } from "@/lib/dev-evidence";
import { getPrivateOriginal, putPublicApproved } from "@/lib/blob-store";
import { getJSON, setJSON } from "@/lib/kv-store";

export const dynamic = "force-dynamic";

type LocalPublication = {
  extractionId: string;
  figureId: string;
  publicImagePath: string;
  publishedAt: string;
};

function publicExt(filename: string, mimeType: string) {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/webp") return ".webp";
  const ext = extname(filename).toLowerCase();
  return [".png", ".jpg", ".jpeg", ".webp"].includes(ext) ? ext : ".png";
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const extractionId = String(body.extractionId || "");
  if (!/^IMG-\d{3}$/.test(extractionId)) return NextResponse.json({ ok: false, error: "Choose an item first." }, { status: 400 });

  const bundle = await readReviewBundle();
  const item = bundle.items.find((entry) => entry.extractionId === extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Item not found in review state." }, { status: 404 });
  if (item.proposedFigureId === "FIG-006") {
    return NextResponse.json({ ok: false, error: "FIG-006 cannot be one-click published. It needs deliberate sensitive review." }, { status: 400 });
  }

  const manifestItem = (await readExtractionManifest()).images.find((entry) => entry.extractionId === extractionId);
  if (!manifestItem) return NextResponse.json({ ok: false, error: "Item not found in extraction manifest." }, { status: 404 });

  const original = await getPrivateOriginal(`originals/${manifestItem.extractedFilename}`);
  if (!original) return NextResponse.json({ ok: false, error: "Private original file is missing." }, { status: 404 });

  const figureNumber = item.proposedFigureId.replace("FIG-", "");
  const ext = publicExt(manifestItem.extractedFilename, manifestItem.mimeType);
  const outputFilename = `evidence-${figureNumber}-public${ext}`;
  const publicImagePath = await putPublicApproved(outputFilename, original.bytes, manifestItem.mimeType);

  item.publicationRecommendation = "suitable-for-publication-review";
  item.captionDecision = item.captionDecision === "not-started" ? "draft" : item.captionDecision;
  item.redactionDecision = "applied";
  item.updatedAt = new Date().toISOString();
  item.revision += 1;
  await writeReviewBundle(bundle, String(body.reviewerInitials || item.reviewerInitials || "studio"), "publish", ["publicImagePath", "publicationRecommendation"]);

  const publications = ((await getJSON<LocalPublication[]>(LOCAL_PUBLICATIONS_KEY)) ?? []).filter((entry) => entry.figureId !== item.proposedFigureId);
  publications.push({ extractionId, figureId: item.proposedFigureId, publicImagePath, publishedAt: new Date().toISOString() });
  await setJSON(LOCAL_PUBLICATIONS_KEY, publications);

  return NextResponse.json({ ok: true, publicImagePath });
}
