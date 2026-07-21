import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import {
  isLocalDevelopmentRequest,
  PRIVATE_EVIDENCE_DIR,
  readExtractionManifest,
  readReviewBundle,
  writeReviewBundle,
} from "@/lib/dev-evidence";

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

function readLocalPublications(path: string) {
  if (!existsSync(path)) return [] as LocalPublication[];
  return JSON.parse(readFileSync(path, "utf8")) as LocalPublication[];
}

export async function POST(request: NextRequest) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const body = await request.json();
  const extractionId = String(body.extractionId || "");
  if (!/^IMG-\d{3}$/.test(extractionId)) return NextResponse.json({ ok: false, error: "Choose an item first." }, { status: 400 });

  const bundle = readReviewBundle();
  const item = bundle.items.find((entry) => entry.extractionId === extractionId);
  if (!item) return NextResponse.json({ ok: false, error: "Item not found in review state." }, { status: 404 });
  if (item.proposedFigureId === "FIG-006") {
    return NextResponse.json({ ok: false, error: "FIG-006 cannot be one-click published. It needs deliberate sensitive review." }, { status: 400 });
  }

  const manifestItem = readExtractionManifest().images.find((entry) => entry.extractionId === extractionId);
  if (!manifestItem) return NextResponse.json({ ok: false, error: "Item not found in extraction manifest." }, { status: 404 });

  const originalsDir = join(PRIVATE_EVIDENCE_DIR, "originals");
  const source = join(originalsDir, basename(manifestItem.extractedFilename));
  if (!existsSync(source)) return NextResponse.json({ ok: false, error: "Private original file is missing." }, { status: 404 });

  const figureNumber = item.proposedFigureId.replace("FIG-", "");
  const ext = publicExt(manifestItem.extractedFilename, manifestItem.mimeType);
  const outputFilename = `evidence-${figureNumber}-public${ext}`;
  const publicDir = join(process.cwd(), "public", "evidence", "approved");
  mkdirSync(publicDir, { recursive: true });
  copyFileSync(source, join(publicDir, outputFilename));

  item.publicationRecommendation = "suitable-for-publication-review";
  item.captionDecision = item.captionDecision === "not-started" ? "draft" : item.captionDecision;
  item.redactionDecision = "applied";
  item.updatedAt = new Date().toISOString();
  item.revision += 1;
  writeReviewBundle(bundle, String(body.reviewerInitials || item.reviewerInitials || "studio"), "publish-local", [
    "publicImagePath",
    "publicationRecommendation",
  ]);

  const publicationsPath = join(PRIVATE_EVIDENCE_DIR, "local-publications.json");
  const publications = readLocalPublications(publicationsPath).filter((entry) => entry.figureId !== item.proposedFigureId);
  const publicImagePath = `/evidence/approved/${outputFilename}`;
  publications.push({ extractionId, figureId: item.proposedFigureId, publicImagePath, publishedAt: new Date().toISOString() });
  writeFileSync(publicationsPath, JSON.stringify(publications, null, 2));

  return NextResponse.json({ ok: true, publicImagePath });
}
