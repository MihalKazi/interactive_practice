import { EvidenceStudioIsland } from "@/components/evidence-studio/EvidenceStudioIsland";
import { readExtractionManifest, readReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

export default async function EvidenceStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; item?: string; mode?: string }>;
}) {
  const manifest = await readExtractionManifest();
  const bundle = await readReviewBundle();
  const params = await searchParams;
  const studioManifest = manifest.images.map((item, index) => ({
    extractionId: item.extractionId,
    proposedFigureId: item.probableFigureId === "UNMATCHED" ? `FIG-${String(index + 1).padStart(3, "0")}` : item.probableFigureId,
    width: item.width,
    height: item.height,
    hashPrefix: item.sha256.slice(0, 12),
  }));
  const initialMode = params.mode === "original" || params.mode === "public" ? params.mode : "redaction";
  const initialActiveId = /^IMG-\d{3}$/.test(params.item ?? "") ? params.item : undefined;
  return <EvidenceStudioIsland manifest={studioManifest} initialItems={bundle.items} initialActiveId={initialActiveId} initialMode={initialMode} summary={params.view === "summary"} />;
}
