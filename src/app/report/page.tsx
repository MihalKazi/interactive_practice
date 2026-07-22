import { FileText } from "lucide-react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DatasetPreview } from "@/components/report/DatasetPreview";
import { EditorialSection } from "@/components/report/EditorialSection";
import { EvidenceSequence } from "@/components/evidence/EvidenceSequence";
import { MethodologySection } from "@/components/report/MethodologySection";
import { NarrativeSequence } from "@/components/report/NarrativeSequence";
import { RecommendationList } from "@/components/report/RecommendationList";
import { SectionHeading } from "@/components/report/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { getReportContent } from "@/lib/report-content-store";
import { getEvidenceRecords } from "@/lib/evidence-store";

export const metadata = {
  title: "Full report — Inside the Network",
  description: "Dataset breakdown, narrative categories, methodology, and recommendations.",
};

export default async function ReportPage() {
  const report = await getReportContent();
  const evidenceRecords = await getEvidenceRecords();
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <EditorialSection id="dataset" className="pt-14">
          <p className="eyebrow text-[var(--accent)]">Full report</p>
          <SectionHeading
            eyebrow="Inside the dataset"
            title="61 profiles, classified"
            description="Aggregate totals only. No account identities, row-level evidence, or relationship claims."
          />
          <DatasetPreview />
        </EditorialSection>

        <EditorialSection id="narratives-intro" className="bg-[var(--surface)] pb-0">
          <SectionHeading
            eyebrow="Four narrative categories"
            title="How the same story gets retold"
            description="Each category traced from trigger to talking point, with evidence status shown alongside. Scroll to move through each one."
          />
        </EditorialSection>
        <NarrativeSequence narrativeCategories={report.narrativeCategories} evidenceRecords={evidenceRecords} />

        <EditorialSection id="limitations">
          <SectionHeading
            eyebrow="Where this stands"
            title="What this proves, what it doesn't, what's next"
            description="Similarity is not coordination. Read the caveats, then the recommendations."
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {report.limitations.map((item) => (
                <details key={item.title} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-xl text-[var(--muted)] group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{item.note}</p>
                </details>
              ))}
            </div>
            <RecommendationList recommendations={report.recommendations} />
          </div>

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
