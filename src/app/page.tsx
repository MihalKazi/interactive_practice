import { FileText } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DatasetPreview } from "@/components/report/DatasetPreview";
import { EditorialSection } from "@/components/report/EditorialSection";
import { EvidenceSequence } from "@/components/evidence/EvidenceSequence";
import { HeroSection } from "@/components/report/HeroSection";
import { MethodologySection } from "@/components/report/MethodologySection";
import { NarrativeSequence } from "@/components/report/NarrativeSequence";
import { RecommendationList } from "@/components/report/RecommendationList";
import { SectionHeading } from "@/components/report/SectionHeading";
import { StatGrid } from "@/components/report/StatGrid";
import { TimelinePreview } from "@/components/report/TimelinePreview";
import { ChapterTransition } from "@/components/scrolly/ChapterTransition";
import { TriggeringEventScrolly } from "@/components/scrolly/TriggeringEventScrolly";
import { Divider } from "@/components/ui/Divider";
import { getReportContent } from "@/lib/report-content-store";
import { getEvidenceRecords } from "@/lib/evidence-store";

export default async function Home() {
  const report = await getReportContent();
  const evidenceRecords = await getEvidenceRecords();
  return (
    <>
      <SiteHeader />
      {process.env.NODE_ENV === "development" ? (
        <a
          href="/admin"
          className="fixed bottom-4 left-4 z-50 border border-[var(--accent)] bg-[var(--surface-elevated)] px-4 py-3 text-sm font-semibold shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Open Admin Panel
        </a>
      ) : null}
      <main id="main" className="flex-1">
        <HeroSection />

        <EditorialSection id="key-findings" className="py-10 sm:py-14">
          <StatGrid stats={report.openingStatistics} />
        </EditorialSection>

        <ChapterTransition number="01" label="Triggering event" statement="A national event becomes a contested public space." dark />
        <TriggeringEventScrolly evidenceRecords={evidenceRecords} />

        <ChapterTransition
          number="02"
          label="Historical origin"
          statement="One fatwa from 2015. Still the script for every narrative that follows."
        />

        <EditorialSection id="origins">
          <SectionHeading
            eyebrow="Historical origin"
            title="Where the 'murtad' narrative began"
            description="A 2015 fatwa, now a shared talking point across otherwise distinct extremist factions."
          />
          <TimelinePreview evidenceRecord={evidenceRecords[2]} />
        </EditorialSection>

        <ChapterTransition
          number="03"
          label="Inside the full dataset"
          statement="42 of 61 profiles run on fake or pseudonymous identities."
        />

        <EditorialSection id="dataset">
          <SectionHeading
            eyebrow="Inside the dataset"
            title="61 profiles, classified"
            description="Aggregate totals only. No account identities, row-level evidence, or relationship claims."
          />
          <DatasetPreview />
        </EditorialSection>

        <ChapterTransition
          number="04"
          label="Four narrative categories"
          statement="Six peacekeepers died. Their condolence posts became the delivery channel."
          dark
        />

        <EditorialSection id="narratives-intro" className="bg-[var(--surface)] pb-0">
          <SectionHeading
            eyebrow="Four narrative categories"
            title="How the same story gets retold"
            description="Each category traced from trigger to talking point, with evidence status shown alongside. Scroll to move through each one."
          />
        </EditorialSection>
        <NarrativeSequence narrativeCategories={report.narrativeCategories} evidenceRecords={evidenceRecords} />

        <ChapterTransition
          number="05"
          label="Where this stands"
          statement="Pattern is not proof. Read the caveats before the conclusions."
        />

        <EditorialSection id="limitations">
          <SectionHeading
            eyebrow="Where this stands"
            title="What this proves, what it doesn't, what's next"
            description="The evidence standards, open caveats, and what should happen next."
          />
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Limitations</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {report.limitations.map((item, index) => (
              <details
                key={item.title}
                className="group border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 transition open:border-[var(--accent)] open:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface-elevated))]"
                open={index < 2}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                  <span className="text-sm font-semibold">{item.title}</span>
                  <span className="shrink-0 text-lg leading-none text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.note}</p>
              </details>
            ))}
          </div>

          <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Recommendations</h3>
          <RecommendationList recommendations={report.recommendations} />

          <details id="methodology" className="mt-16 scroll-mt-28 border-t border-[var(--border)] pt-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span>
                <span className="eyebrow text-[var(--accent)]">Methodology</span>
                <span className="mt-2 block text-lg font-semibold">How this was built — expand for the full process</span>
              </span>
              <span className="text-2xl text-[var(--muted)] group-open:rotate-45">+</span>
            </summary>
            <div className="mt-6">
              <MethodologySection stages={report.methodologyStages} />
            </div>
          </details>

          <div className="mt-16 border-t border-[var(--border)] pt-6">
            <p className="eyebrow text-[var(--accent)]">Evidence standards</p>
            <h3 className="mt-2 text-lg font-semibold">All evidence figures, 001–006</h3>
            <EvidenceSequence />
          </div>
        </EditorialSection>

        <EditorialSection id="about" className="bg-[var(--surface)] py-10">
          <div className="flex items-start gap-4">
            <FileText className="mt-1 size-6 text-[var(--accent)]" aria-hidden="true" />
            <SectionHeading
              eyebrow="About the report"
              title={report.title}
              description={`By ${report.author}, ${report.date}. Interactive adaptation, in development.`}
            />
          </div>
          <Divider />
          <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Public release requires editorial review, legal review, source safety checks, and confirmation that no private notes or identifiable account information are exposed.
          </p>
        </EditorialSection>
      </main>
      <SiteFooter />
    </>
  );
}
