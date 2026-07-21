"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { TimelineVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { useReportContent } from "@/components/providers/ReportContentProvider";
import type { EvidenceRecord } from "@/types/evidence";

export function TimelinePreview({ evidenceRecord }: { evidenceRecord: EvidenceRecord }) {
  const report = useReportContent();
  const steps = report.timeline.map((point) => ({
    eyebrow: point.year,
    title: point.title,
    body: <p>{point.description}</p>,
  }));
  return (
    <>
      <ScrollyChapter
        title="Historical origin"
        visualTitle="Narrative timeline preview"
        source="Source: Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces (2026)"
        caption="Dates and event descriptions are drawn from the source report. Screenshots and account-level detail remain pending editorial and legal review."
        steps={steps}
        renderVisual={(active) => <TimelineVisual step={active} />}
      />
      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-12">
        <EvidenceViewer record={evidenceRecord} />
      </div>
    </>
  );
}
