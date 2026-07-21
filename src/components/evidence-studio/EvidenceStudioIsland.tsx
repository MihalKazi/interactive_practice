"use client";

import dynamic from "next/dynamic";
import type { EvidenceReviewState } from "@/types/evidence-review";

type ManifestItem = {
  extractionId: string;
  proposedFigureId: string;
  width: number | null;
  height: number | null;
  hashPrefix: string;
};

const EvidenceStudioClient = dynamic(
  () => import("./EvidenceStudio").then((module) => module.EvidenceStudio),
  {
    ssr: false,
    loading: () => (
      <div className="studio-shell studio-loading">
        <div className="studio-banner">LOCAL WEBSITE EVIDENCE EDITOR. Nothing publishes from here. Do not screenshot private originals.</div>
        <div className="studio-image-status">Loading local editor...</div>
      </div>
    ),
  },
);

export function EvidenceStudioIsland(props: {
  manifest: ManifestItem[];
  initialItems: EvidenceReviewState[];
  initialActiveId?: string;
  initialMode?: "redaction" | "public" | "original";
  summary?: boolean;
}) {
  return <EvidenceStudioClient {...props} />;
}
