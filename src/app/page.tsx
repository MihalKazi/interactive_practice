import { FileText } from "lucide-react";
import { EvidenceSequence } from "@/components/evidence/EvidenceSequence";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DatasetPreview } from "@/components/report/DatasetPreview";
import { EditorialSection } from "@/components/report/EditorialSection";
import { EditorialStatus } from "@/components/report/EditorialStatus";
import { HeroSection } from "@/components/report/HeroSection";
import { MethodologySection } from "@/components/report/MethodologySection";
import { NarrativeSequence } from "@/components/report/NarrativeSequence";
import { RecommendationList } from "@/components/report/RecommendationList";
import { SectionHeading } from "@/components/report/SectionHeading";
import { SourceNote } from "@/components/report/SourceNote";
import { StatGrid } from "@/components/report/StatGrid";
import { TimelinePreview } from "@/components/report/TimelinePreview";
import { ChapterTransition } from "@/components/scrolly/ChapterTransition";
import { OpeningDataReveal } from "@/components/scrolly/OpeningDataReveal";
import { TriggeringEventScrolly } from "@/components/scrolly/TriggeringEventScrolly";
import { Divider } from "@/components/ui/Divider";
import { report } from "@/data/report";

const limitations = [
  {
    title: "Sample limitations",
    note: "61 profiles is a bounded sample, not a census of the network.",
  },
  {
    title: "Deleted or unavailable content",
    note: "Removed posts and comments cannot be independently re-verified.",
  },
  {
    title: "Follower overlap",
    note: "Aggregate follower totals may double-count shared audiences.",
  },
  {
    title: "Ideological-classification uncertainty",
    note: "Category assignment reflects researcher judgment, not confirmed affiliation.",
  },
  {
    title: "Coordination versus similarity",
    note: "Recurring language shows pattern, not proof of joint operation.",
  },
  {
    title: "Translation limitations",
    note: "Bengali-to-English rendering can shift tone and emphasis.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      {process.env.NODE_ENV === "development" ? (
        <a
          href="/dev/evidence-studio"
          className="fixed bottom-4 right-4 z-50 border border-[var(--accent)] bg-[var(--surface-elevated)] px-4 py-3 text-sm font-semibold shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Open Website Evidence Editor
        </a>
      ) : null}
      <main id="main" className="flex-1">
        <HeroSection />

        <OpeningDataReveal />

        <EditorialSection id="overview-details">
          <StatGrid stats={report.openingStatistics} />
          <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-[var(--accent)]">Chapter 01 / Investigation overview</p>
              <h2 className="headline-lg mt-5 font-serif">A public account network, examined as evidence and context</h2>
              <p className="editorial-copy mt-6">
                This homepage frames the investigation as a sequence: what triggered attention, where the narrative came from, how the dataset was classified, and what evidence standards must be met before publication.
              </p>
              <div className="mt-8">
                <SourceNote>{report.importantDataNote}</SourceNote>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">What this investigation examined</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  {examined.map((item) => (
                    <li key={item} className="border-b border-[var(--border)] pb-3">{item}</li>
                  ))}
                </ul>
              </div>
              <ol className="border-l border-[var(--border)]">
                {examined.map((item, index) => (
                  <li key={item} className="relative pb-5 pl-6">
                    <span className="absolute -left-[13px] flex size-6 items-center justify-center bg-[var(--background)] font-mono text-xs text-[var(--accent)]">
                      {index + 1}
                    </span>
                    <p className="font-semibold">{item}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">Chapter guide placeholder</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </EditorialSection>

        <ChapterTransition number="02" label="Triggering event" statement="A national event becomes a contested public space." dark />
        <TriggeringEventScrolly />

        <EditorialSection id="origins">
          <SectionHeading
            eyebrow="Historical origin"
            title="A static preview of the narrative timeline"
            description="The full interactive timeline remains future work. This preview shows only documented time anchors and evidence-status labels."
          />
          <TimelinePreview />
        </EditorialSection>

        <ChapterTransition number="04" label="Inside the dataset" statement="The data chapter asks what can be shown without overstating what is known." />
        <EditorialSection id="dataset" className="bg-[var(--surface)]">
          <SectionHeading
            eyebrow="Inside the dataset"
            title="Profiles, identity tactics, and classification caveats"
            description="Aggregate visualisations use verified totals while keeping individual account identities, row-level evidence, and relationship claims out of this edition."
          />
          <DatasetPreview />
        </EditorialSection>

        <ChapterTransition number="05" label="Narrative chapters" statement="Four repeated narrative patterns, each treated as a reviewed editorial chapter." />
        <EditorialSection id="narratives">
          <SectionHeading
            eyebrow="Four narrative categories"
            title="An editorial sequence, not four generic cards"
            description="Each category is shown as a future chapter with status labels and placeholders for evidence counts."
          />
          <NarrativeSequence />
        </EditorialSection>

        <EditorialSection id="evidence" className="bg-[var(--surface)]">
          <SectionHeading
            eyebrow="Evidence preview"
            title="Public cards designed for minimal, reviewed evidence"
            description="Public evidence cards contain only the minimum material required to support the investigation."
          />
          <EvidenceSequence />
        </EditorialSection>

        <EditorialSection id="methodology">
          <SectionHeading
            eyebrow="Methodology"
            title="Evidence standards as a central part of the story"
            description="Each stage uses native disclosure controls. Unknown details remain labelled as requiring researcher clarification."
          />
          <MethodologySection />
        </EditorialSection>

        <EditorialSection id="limitations" className="bg-[var(--surface)]">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="Limitations"
                title="Transparency and caution before conclusion"
                description="Limitations are presented as editorial notes so the page does not overclaim what the dataset can prove."
              />
              <p className="mt-8 border-l-2 border-[var(--warning)] pl-4 text-lg leading-8">
                The investigation documents observable patterns within the analysed dataset. It does not claim that every similar account, comment, or user is part of a single coordinated organisation.
              </p>
            </div>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {limitations.map((item) => (
                <article key={item} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="font-semibold">{item}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      This limitation will be paired with the relevant evidence and analysis before publication.
                    </p>
                  </div>
                  <EditorialStatus status="Analysis" />
                </article>
              ))}
            </div>
          </div>
        </EditorialSection>

        <EditorialSection id="recommendations">
          <SectionHeading
            eyebrow="Recommendations"
            title="Reviewable recommendations by audience"
            description="Final actions must come from reviewed report recommendations. This layout prepares the structure without inventing policy detail."
          />
          <RecommendationList />
        </EditorialSection>

        <EditorialSection id="about" className="bg-[var(--surface)]">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 size-6 text-[var(--accent)]" aria-hidden="true" />
            <SectionHeading
              eyebrow="About the report"
              title={report.title}
              description={`Authored by ${report.author} and dated ${report.date}. This interactive edition is an in-development public adaptation of the investigation.`}
            />
          </div>
          <Divider />
          <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Public release requires editorial review, legal review, source safety checks, and verification that private researcher notes or identifiable account information are not exposed.
          </p>
        </EditorialSection>
      </main>
      <SiteFooter />
    </>
  );
}
