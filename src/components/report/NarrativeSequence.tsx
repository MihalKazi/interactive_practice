"use client";

import { FileSearch, MessageSquareText, Network, Scale } from "lucide-react";
import { ContentWarning } from "@/components/report/ContentWarning";
import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import type { EvidenceRecord } from "@/types/evidence";
import type { NarrativeCategory } from "@/types/report";

const icons = [Network, MessageSquareText, FileSearch, Scale];

const evidenceIdsByCategory: Record<string, string[]> = {
  deployments: ["EV-004"],
  grief: ["EV-001", "EV-002"],
  unrest: ["EV-005"],
  theology: ["EV-006", "EV-003"],
};

export function NarrativeSequence({
  narrativeCategories,
  evidenceRecords,
}: {
  narrativeCategories: NarrativeCategory[];
  evidenceRecords: EvidenceRecord[];
}) {
  const steps = narrativeCategories.map((category, index) => {
    const Icon = icons[index];
    return {
      eyebrow: category.title,
      title: (
        <span className="flex items-center gap-3">
          <Icon className="size-5 text-[var(--data-secondary)]" aria-hidden="true" />
          {category.title}
        </span>
      ),
      body: <p>{category.description}</p>,
    };
  });

  const renderVisual = (active: number) => {
    const category = narrativeCategories[active];
    const ids = evidenceIdsByCategory[category.id] ?? [];
    const records = ids.map((id) => evidenceRecords.find((record) => record.id === id)).filter((record): record is EvidenceRecord => Boolean(record));
    const sensitive = active === 3;
    const visual = (
      <div className="space-y-6">
        {records.map((record) => (
          <EvidenceViewer key={record.id} record={record} step={active} />
        ))}
      </div>
    );
    return sensitive ? (
      <ContentWarning
        title="Sensitive rhetoric category"
        description="This category may reference violent or inciting language. Public excerpts require redaction, context, and review."
        severity="high"
      >
        {visual}
      </ContentWarning>
    ) : (
      visual
    );
  };

  return (
    <ScrollyChapter
      id="narratives"
      title="Four narrative categories"
      visualTitle="Category evidence"
      source="Evidence status shown per category"
      caption="Evidence panel updates with each category. All six evidence figures appear across the four categories."
      steps={steps}
      renderVisual={renderVisual}
    />
  );
}
