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
        source="Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces (2026)"
        steps={steps}
        renderVisual={(active) => <TimelineVisual step={active} />}
        mobileStatic
      />
      <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8 lg:px-12">
        <p className="text-xs text-[var(--muted)]">
          Source: Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces (2026). Dates
          and event descriptions are drawn from the source report. Screenshots and account-level detail remain
          pending editorial and legal review.
        </p>
      </div>
    </>
  );
}
