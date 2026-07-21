import { FileSearch, MessageSquareText, Network, Scale } from "lucide-react";
import { ContentWarning } from "@/components/report/ContentWarning";
import { NarrativeVisual } from "@/components/scrolly/ScrollyVisuals";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { getEvidenceRecords } from "@/lib/evidence-store";
import type { NarrativeCategory } from "@/types/report";

const icons = [Network, MessageSquareText, FileSearch, Scale];
const narrativeEvidenceIndexes = [0, 1, 2, 3];

export function NarrativeSequence({ narrativeCategories }: { narrativeCategories: NarrativeCategory[] }) {
  const evidenceRecords = getEvidenceRecords();
  return (
    <div className="mt-12 space-y-12">
      {narrativeCategories.map((category, index) => {
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
            </div>
            <div className="space-y-3 text-sm">
              <NarrativeVisual index={index} />
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
