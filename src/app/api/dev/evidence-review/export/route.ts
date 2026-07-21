import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { isLocalDevelopmentRequest, PRIVATE_EVIDENCE_DIR, PUBLICATION_CONFIG_PATH, readReviewBundle, writeReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isLocalDevelopmentRequest(request)) return new NextResponse("Not found", { status: 404 });
  const body = await request.json().catch(() => ({}));
  const bundle = readReviewBundle();
  writeReviewBundle(bundle, String(body.reviewerInitials || "studio"), "export", ["publication-config"]);
  const existing = JSON.parse(readFileSync(PUBLICATION_CONFIG_PATH, "utf8"));
  existing.items = bundle.items.map((item) => ({
    evidenceId: item.proposedFigureId.replace("FIG", "EV"),
    sourceFilename: "",
    outputFilename: `evidence-${item.proposedFigureId.replace("FIG-", "")}-public.webp`,
    resize: null,
    crop: item.cropRegion,
    blurRegions: item.redactionRegions.filter((region) => region.type === "blur"),
    pixelateRegions: item.redactionRegions.filter((region) => region.type === "pixelate"),
    solidRedactionRegions: item.redactionRegions.filter((region) => region.type === "solid-redaction"),
    highlightRegions: item.highlightRegions,
    annotationRegions: item.annotationRegions,
    outputFormat: "webp",
    outputQuality: 82,
    allowPublication: false,
  }));
  mkdirSync(PRIVATE_EVIDENCE_DIR, { recursive: true });
  writeFileSync(PUBLICATION_CONFIG_PATH, JSON.stringify(existing, null, 2));
  writeFileSync(join(PRIVATE_EVIDENCE_DIR, "last-export.json"), JSON.stringify({ exportedAt: new Date().toISOString(), itemCount: bundle.items.length }, null, 2));
  return NextResponse.json({ ok: true, itemCount: bundle.items.length });
}
