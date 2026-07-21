import { FileSearch, MessageSquareText, Network, Scale } from "lucide-react";
import { ContentWarning } from "@/components/report/ContentWarning";
import { EditorialStatus } from "@/components/report/EditorialStatus";
import { NarrativeVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { evidenceRecords } from "@/data/evidence";
import { report } from "@/data/report";

const icons = [Network, MessageSquareText, FileSearch, Scale];
const narrativeEvidenceIndexes = [3, 0, 4, 5];

export function NarrativeSequence() {
  return (
    <div className="mt-12 space-y-12">
      {report.narrativeCategories.map((category, index) => {
        const Icon = icons[index];
        const body = (
          <article className="narrative-chapter grid gap-8 border-y border-[var(--border)] py-10 lg:grid-cols-[6rem_1fr_0.9fr] lg:items-start">
            <div className="flex items-center gap-4 md:block">
              <p className="font-serif text-5xl text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
              <Icon className="size-6 text-[var(--data-secondary)] md:mt-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{category.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{category.description}</p>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                This chapter prepares a progressive evidence sequence without adding unverified facts, account identities, or relationship claims.
              </p>
              <p className="mt-5 border-t border-[var(--border)] pt-4 text-sm font-semibold">End-of-chapter summary: evidence and interpretation remain separated until approved materials are attached.</p>
            </div>
            <div className="space-y-3 text-sm">
              <NarrativeVisual index={index} />
              <p><span className="text-[var(--muted)]">Evidence count:</span><br /> Pending review</p>
              <EditorialStatus status={index === 3 ? "Legal review required" : "Editorial review required"} />
            </div>
            {typeof narrativeEvidenceIndexes[index] === "number" ? (
              <div className="lg:col-span-3">
                <EvidenceViewer record={evidenceRecords[narrativeEvidenceIndexes[index]]} />
              </div>
            ) : null}
          </article>
        );
        return index === 3 ? (
          <div key={category.id}>
            <ContentWarning
              title="Sensitive rhetoric category"
              description="This category may reference violent or inciting language. Public excerpts require redaction, context, and review."
              severity="high"
            >
              {body}
            </ContentWarning>
          </div>
        ) : (
          <div key={category.id}>{body}</div>
        );
      })}
    </div>
  );
}
