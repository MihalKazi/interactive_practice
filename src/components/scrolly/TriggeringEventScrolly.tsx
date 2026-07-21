"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { TriggeringVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { evidenceRecords } from "@/data/evidence";

const steps = [
  {
    eyebrow: "Stage 1 - National event",
    title: "A public tragedy enters the record",
    body: <p>The source report describes hostile responses following the deaths of six Bangladeshi UN peacekeepers in Abyei, Sudan. Date and supporting evidence require editorial approval before publication.</p>,
    status: "Evidence pending" as const,
  },
  {
    eyebrow: "Stage 2 - Mourning space",
    title: "Public condolence becomes a shared arena",
    body: <p>The visual uses an abstract official-post reconstruction, not a real platform interface, account name, or screenshot.</p>,
    status: "Editorial review required" as const,
  },
  {
    eyebrow: "Stage 3 - Narrative intrusion",
    title: "Hostile markers enter the comment space",
    body: <p>Warning-marked blocks represent reviewed term categories only. Full violent rhetoric is not reproduced here.</p>,
    status: "Legal review required" as const,
  },
  {
    eyebrow: "Stage 4 - Measured observation",
    title: "A specific post, not all public reaction",
    body: <p>The report states that 97 comments were examined and at least 28 explicitly used the specified term. This remains under editorial-review status until supporting evidence is approved.</p>,
    status: "Methodology clarification required" as const,
  },
];

export function TriggeringEventScrolly() {
  return (
    <>
      <ScrollyChapter
        id="triggering-event"
        dark
        title="Triggering event"
        visualTitle="How public mourning was reframed"
        source="Diagrammatic reconstruction; evidence pending"
        caption="This sequence does not show real account identities, real screenshots, or full harmful excerpts."
        steps={steps}
        renderVisual={(active) => <TriggeringVisual step={active} />}
      />
      <section className="dark-chapter px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <EvidenceViewer record={evidenceRecords[0]} step={3} />
          <EvidenceViewer record={evidenceRecords[1]} step={3} />
        </div>
      </section>
    </>
  );
}
