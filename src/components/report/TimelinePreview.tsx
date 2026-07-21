"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { TimelineVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { evidenceRecords } from "@/data/evidence";
import { report } from "@/data/report";
import type { EditorialStatus as EditorialStatusType } from "@/types/report";

export function TimelinePreview() {
  const steps = report.timeline.map((point, index) => ({
    eyebrow: point.year,
    title: point.title,
    body: <p>{point.description} The full incident timeline will be added after editorial fact-checking.</p>,
    status: (index === 0 ? "Documented finding" : index === 1 ? "Analysis" : "Evidence pending") as EditorialStatusType,
  }));
  return (
    <>
      <ScrollyChapter
        title="Historical origin"
        visualTitle="Narrative timeline preview"
        source="Report time anchors; full timeline pending"
        caption="Active periods expand while other anchors remain visible. This is not the final incident timeline."
        steps={steps}
        renderVisual={(active) => <TimelineVisual step={active} />}
      />
      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
        <EvidenceViewer record={evidenceRecords[2]} />
      </div>
    </>
  );
}
