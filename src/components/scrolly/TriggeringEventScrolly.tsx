"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { TriggeringVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import type { EvidenceRecord } from "@/types/evidence";

const steps = [
  {
    eyebrow: "Stage 1 - National event",
    title: "Six peacekeepers killed in Abyei, Sudan",
    body: <p>On December 13, 2025, a drone strike at the UN peacekeeping base in Abyei, Sudan killed six Bangladeshi peacekeepers and injured nine. State leaders and major political figures issued immediate condolences.</p>,
  },
  {
    eyebrow: "Stage 2 - Mourning space",
    title: "Condolence posts became the target",
    body: <p>Condolence messages from Bangladesh&apos;s Prime Minister and from the Jamaat-e-Islami party page were rapidly hijacked by extremist-linked accounts. The visual here is an abstract reconstruction — not the real platform interface, account name, or screenshot.</p>,
  },
  {
    eyebrow: "Stage 3 - Narrative intrusion",
    title: "The dead were branded 'murtad'",
    body: <p>Comments reframed the fallen soldiers as apostates dying in service of an oppressive (&quot;taghut&quot;) state, denying them any martyrdom status. Full text of the hostile comments is withheld here; only the reviewed term category is shown.</p>,
  },
  {
    eyebrow: "Stage 4 - Measured observation",
    title: "28 of 97 comments, on one post",
    body: <p>The source report states that of 97 comments examined on the Jamaat-e-Islami condolence post, at least 28 explicitly used the term &quot;murtad.&quot; This measurement applies to that one comment thread — not to all public reaction to the strike.</p>,
  },
];

export function TriggeringEventScrolly({ evidenceRecords }: { evidenceRecords: EvidenceRecord[] }) {
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
