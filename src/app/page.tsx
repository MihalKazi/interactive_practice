import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { EditorialSection } from "@/components/report/EditorialSection";
import { HeroSection } from "@/components/report/HeroSection";
import { SectionHeading } from "@/components/report/SectionHeading";
import { SourceNote } from "@/components/report/SourceNote";
import { TimelinePreview } from "@/components/report/TimelinePreview";
import { ChapterTransition } from "@/components/scrolly/ChapterTransition";
import { OpeningDataReveal } from "@/components/scrolly/OpeningDataReveal";
import { TriggeringEventScrolly } from "@/components/scrolly/TriggeringEventScrolly";
import { getReportContent } from "@/lib/report-content-store";
import { getEvidenceRecords } from "@/lib/evidence-store";

export default function Home() {
  const report = getReportContent();
  const evidenceRecords = getEvidenceRecords();
  return (
    <>
      <SiteHeader />
      {process.env.NODE_ENV === "development" ? (
        <a
          href="/admin"
          className="fixed bottom-4 right-4 z-50 border border-[var(--accent)] bg-[var(--surface-elevated)] px-4 py-3 text-sm font-semibold shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          Open Admin Panel
        </a>
      ) : null}
      <main id="main" className="flex-1">
        <HeroSection />

        <OpeningDataReveal />

        <EditorialSection id="overview-details" className="py-10">
          <SourceNote>{report.importantDataNote}</SourceNote>
        </EditorialSection>

        <ChapterTransition number="02" label="Triggering event" statement="A national event becomes a contested public space." dark />
        <TriggeringEventScrolly evidenceRecords={evidenceRecords} />

        <EditorialSection id="origins">
          <SectionHeading
            eyebrow="Historical origin"
            title="Where the 'murtad' narrative began"
            description="A 2015 fatwa, now a shared talking point across otherwise distinct extremist factions."
          />
          <TimelinePreview evidenceRecord={evidenceRecords[2]} />
        </EditorialSection>

        <EditorialSection id="report-cta" className="bg-[var(--surface)]">
          <div className="flex flex-col items-start gap-6 border-y border-[var(--border)] py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-[var(--accent)]">Continue reading</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">The full dataset, narrative categories, and methodology</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
                61 profiles broken down, four recurring narratives traced, and every evidence standard and limitation laid out — explorable, not scroll-locked.
              </p>
            </div>
            <a
              href="/report"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
            >
              Read the full report
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </EditorialSection>
      </main>
      <SiteFooter />
    </>
  );
}
