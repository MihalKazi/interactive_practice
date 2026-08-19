"use client";

import { useState } from "react";
import Image from "next/image";
import { EvidenceAnnotation } from "@/components/evidence/EvidenceAnnotation";
import { EvidenceCaption } from "@/components/evidence/EvidenceCaption";
import { EvidenceContentWarning } from "@/components/evidence/EvidenceContentWarning";
import { EvidenceImage, isEvidenceRenderable } from "@/components/evidence/EvidenceImage";
import { EvidenceLightbox } from "@/components/evidence/EvidenceLightbox";
import { EvidenceMetadata } from "@/components/evidence/EvidenceMetadata";
import { EvidenceStatusPanel } from "@/components/evidence/EvidenceStatusPanel";
import type { EvidenceRecord } from "@/types/evidence";

const GATED_IMAGE_PATHS: Record<string, string> = {
  "EV-006": "/evidence/source/ev-006-incitement-post.png",
};

function ViewerBody({ record, step = 0 }: { record: EvidenceRecord; step?: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const visibleAnnotations = record.annotations
    .filter((annotation) => annotation.visibleByDefault || annotation.step <= step)
    .slice()
    .sort((a, b) => a.mobileOrder - b.mobileOrder);

  const renderable = isEvidenceRenderable(record);
  const gatedImage = GATED_IMAGE_PATHS[record.id];

  return (
    <figure className="evidence-frame">
      <header className="border-b border-[var(--border)] p-4">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{record.id} / Figure {String(record.figureNumber).padStart(3, "0")}</p>
        <h3 className="mt-1 text-xl font-semibold">{record.title}</h3>
      </header>

      {renderable ? (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View ${record.title} enlarged`}
          className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-[var(--background)]"
        >
          <Image src={record.publicImagePath!} alt={record.publicCaption} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-contain" loading="lazy" />
        </button>
      ) : gatedImage && record.contentWarning ? (
        <div className="p-4">
          <EvidenceContentWarning warning={record.contentWarning}>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--background)]">
              <Image src={gatedImage} alt={record.summary} fill sizes="(max-width: 768px) 100vw, 70vw" className="object-contain" loading="lazy" />
            </div>
          </EvidenceContentWarning>
        </div>
      ) : (
        <EvidenceImage record={record} />
      )}

      <EvidenceCaption record={record} />
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_18rem]">
        <div>
          <EvidenceMetadata record={record} />
          <ol className="mt-4">
            {visibleAnnotations.map((annotation) => (
              <EvidenceAnnotation key={annotation.id} annotation={annotation} />
            ))}
          </ol>
        </div>
        <EvidenceStatusPanel record={record} />
      </div>

      {renderable && lightboxOpen ? (
        <EvidenceLightbox record={record} onClose={() => setLightboxOpen(false)} />
      ) : null}
    </figure>
  );
}

export function EvidenceViewer({ record, step = 0 }: { record: EvidenceRecord; step?: number }) {
  return <ViewerBody record={record} step={step} />;
}
