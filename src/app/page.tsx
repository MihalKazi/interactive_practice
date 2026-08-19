import { FileText } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DatasetPreview } from "@/components/report/DatasetPreview";
import { EditorialSection } from "@/components/report/EditorialSection";
import { EvidenceSequence } from "@/components/evidence/EvidenceSequence";
import { HeroSection } from "@/components/report/HeroSection";
import { IntroSequence } from "@/components/report/IntroSequence";
import { MethodologySection } from "@/components/report/MethodologySection";
import { NarrativeEscalation } from "@/components/report/NarrativeEscalation";
import { RecommendationList } from "@/components/report/RecommendationList";
import { SectionHeading } from "@/components/report/SectionHeading";
import { StatGrid } from "@/components/report/StatGrid";
import { TimelinePreview } from "@/components/report/TimelinePreview";
import { ChapterTransition } from "@/components/scrolly/ChapterTransition";
import { TriggeringEventScrolly } from "@/components/scrolly/TriggeringEventScrolly";
import { Divider } from "@/components/ui/Divider";
import { getReportContent } from "@/lib/report-content-store";

export default async function Home() {
  const report = await getReportContent();
  return (
    <>
      <IntroSequence />
      <SiteHeader />
      <main id="main" className="flex-1">
        <HeroSection />

        <ChapterTransition number="01" label="Triggering event" statement="A condolence post becomes a contested public space." dark />
        <TriggeringEventScrolly />

        <ChapterTransition
          number="02"
          label="Inside the full dataset"
          statement="36 of 73 profiles run on fake or pseudonymous identities."
        />

        <EditorialSection id="dataset">
          <SectionHeading eyebrow="Inside the dataset" title="73 profiles, classified" />
          <DatasetPreview />
        </EditorialSection>

        <EditorialSection id="key-findings" className="py-10 sm:py-14">
          <SectionHeading
            eyebrow="What you just saw, by the numbers"
            title="The scale behind the story"
            description="Aggregate figures from the dataset used throughout this investigation."
          />
          <StatGrid stats={report.openingStatistics} />
        </EditorialSection>

        <ChapterTransition
          number="03"
          label="Historical origin"
          statement="One fatwa from 2015. Still the script for every narrative that follows."
        />

        <TimelinePreview />

        <ChapterTransition
          number="04"
          label="Five narrative categories"
          statement="One playbook, five escalating moves — each one built to lead into the next."
          dark
        />

        <NarrativeEscalation narrativeCategories={report.narrativeCategories} />

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
          <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Recommendations</h3>
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
              <MethodologySection />
            </div>
          </details>

          <div id="evidence-standards" className="mt-16 scroll-mt-28 border-t border-[var(--border)] pt-6">
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
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {report.credits.map((credit) => (
              <div key={credit.role}>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">{credit.role}</dt>
                <dd className="mt-1 text-sm font-medium text-[var(--foreground)]">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </EditorialSection>
      </main>
      <SiteFooter />
    </>
  );
}
