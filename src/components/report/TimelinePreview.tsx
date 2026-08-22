"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { TimelineVisual } from "@/components/scrolly/ScrollyVisuals";
import { useReportContent } from "@/components/providers/ReportContentProvider";

export function TimelinePreview() {
  const report = useReportContent();
  const steps = report.timeline.map((point) => ({
    eyebrow: point.year,
    title: point.title,
    body: <p>{point.description}</p>,
  }));

  return (
    <>
      <ScrollyChapter
        id="origins"
        title="Historical origin"
        visualTitle="Narrative timeline preview"
        source=""
        steps={steps}
        renderVisual={(active) => <TimelineVisual step={active} />}
        mobileStatic
      />
    </>
  );
}
