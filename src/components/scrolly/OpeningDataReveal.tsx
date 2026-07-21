"use client";

import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { MarkerField } from "@/components/scrolly/ScrollyVisuals";

const steps = [
  {
    title: "A bounded public sample",
    body: <p>The investigation examined 61 highly active public profiles and pages.</p>,
  },
  {
    title: "Identity tactics appear early",
    body: <p>Researchers classified 42 profiles as using fake identities or pseudonyms.</p>,
  },
  {
    title: "Follower data was incomplete",
    body: <p>Follower information was publicly visible for 38 accounts. This visual is proportional and aggregate; it does not reproduce a verified row-level dataset.</p>,
  },
  {
    title: "Aggregate visibility, not exposure",
    body: <p>Their combined visible follower count exceeded 815,000.</p>,
  },
];

export function OpeningDataReveal() {
  return (
    <ScrollyChapter
      id="overview"
      title="Opening dataset reveal"
      visualTitle="The 61-profile sample"
      source="Source: aggregate report totals"
      caption="Markers are neutral aggregate placeholders. They do not contain account names, photographs, URLs, or verified relationships."
      steps={steps}
      renderVisual={(active) => <MarkerField step={active} />}
    />
  );
}
