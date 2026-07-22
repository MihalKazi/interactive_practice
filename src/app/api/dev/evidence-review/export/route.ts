import { NextRequest, NextResponse } from "next/server";
import { readReviewBundle, writeReviewBundle, PUBLICATION_CONFIG_KEY, LAST_EXPORT_KEY } from "@/lib/dev-evidence";
import { getJSON, setJSON } from "@/lib/kv-store";

export const dynamic = "force-dynamic";

type PublicationConfig = { items: unknown[] };

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const bundle = await readReviewBundle();
  await writeReviewBundle(bundle, String(body.reviewerInitials || "studio"), "export", ["publication-config"]);
  const existing = (await getJSON<PublicationConfig>(PUBLICATION_CONFIG_KEY)) ?? { items: [] };
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
  await setJSON(PUBLICATION_CONFIG_KEY, existing);
  await setJSON(LAST_EXPORT_KEY, { exportedAt: new Date().toISOString(), itemCount: bundle.items.length });
  return NextResponse.json({ ok: true, itemCount: bundle.items.length });
}
