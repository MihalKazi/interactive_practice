import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { EvidenceStudioIsland } from "@/components/evidence-studio/EvidenceStudioIsland";
import { readExtractionManifest, readReviewBundle } from "@/lib/dev-evidence";

export const dynamic = "force-dynamic";

function localHost(hostHeader: string | null) {
  const host = hostHeader?.split(":")[0].toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1";
}

export default async function EvidenceStudioPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; item?: string; mode?: string }>;
}) {
  const headerList = await headers();
  if (process.env.NODE_ENV !== "development" || !localHost(headerList.get("host"))) notFound();
  const manifest = readExtractionManifest();
  const bundle = readReviewBundle();
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
