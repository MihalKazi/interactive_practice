"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UserRound, UserRoundSearch, UserRoundX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CountValue } from "@/components/report/StatGrid";
import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { useReportContent } from "@/components/providers/ReportContentProvider";
import { formatPercentage, generateIdentityGrid, TOTAL_PROFILES } from "@/lib/report-data";
import type { IdentityType, ProfileGridCell } from "@/types/report";

const identityMarks: Record<IdentityType, string> = {
  "fake-or-pseudonymous": "diagonal",
  "apparently-real": "solid",
  undetermined: "dot",
};

const identityIcons: Record<IdentityType, typeof UserRound> = {
  "fake-or-pseudonymous": UserRoundX,
  "apparently-real": UserRound,
  undetermined: UserRoundSearch,
};

function classForType(type: IdentityType) {
  return {
    "fake-or-pseudonymous": "bg-[var(--identity-inauthentic)]",
    "apparently-real": "bg-[var(--identity-apparent)]",
    undetermined: "bg-[var(--identity-undetermined)]",
  }[type];
}

export function ProfileIdentityGrid() {
  const report = useReportContent();
  const cells = useMemo(() => generateIdentityGrid(report.identityCategories), [report.identityCategories]);
  const [selected, setSelected] = useState<ProfileGridCell>(cells[0]);
  const reduceMotion = useReducedMotion();
  const selectedCategory = report.identityCategories.find((item) => item.id === selected.identityType)!;

  const steps = [
    {
      title: "61 profiles, aggregate classification",
      body: <p>Every cell below represents one analysed profile. Display labels are synthetic identifiers, not public account identities — ordering is for visual representation only.</p>,
    },
    ...report.identityCategories.map((category) => ({
      title: category.label,
      body: (
        <div>
          <p>{category.description}</p>
          <p className="mt-3 font-mono text-3xl text-[var(--foreground)]">
            <CountValue value={String(category.value)} /> of <CountValue value={String(TOTAL_PROFILES)} /> / {formatPercentage(category.value)}
          </p>
        </div>
      ),
    })),
  ];

  const emphasisType = (active: number): IdentityType | "all" =>
    active === 0 ? "all" : report.identityCategories[active - 1].id;

  const renderVisual = (active: number) => {
    const emphasis = emphasisType(active);
    return (
      <div>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10" data-profile-grid>
          {cells.map((cell, index) => {
            const active_ = emphasis === "all" || emphasis === cell.identityType;
            const isSelected = selected.id === cell.id;
            const category = report.identityCategories.find((item) => item.id === cell.identityType)!;
            const Icon = identityIcons[cell.identityType];
            return (
              <motion.button
                key={cell.id}
                type="button"
                data-profile-cell
                aria-pressed={isSelected}
                aria-label={`${cell.displayLabel}. ${category.label}. Synthetic display identifier.`}
                onClick={() => setSelected(cell)}
                animate={{ opacity: active_ ? 1 : 0.22 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className={`profile-cell flex items-center justify-center ${classForType(cell.identityType)} ${identityMarks[cell.identityType]} ${isSelected ? "selected" : ""}`}
              >
                <Icon className="size-6 text-[var(--foreground)]" aria-hidden="true" />
                <span className="sr-only">{cell.displayLabel}</span>
              </motion.button>
            );
          })}
        </div>
        <p aria-live="polite" className="mt-4 text-sm text-[var(--muted)]">
          {emphasis === "all"
            ? `Showing all ${TOTAL_PROFILES} profiles.`
            : `Highlighting ${report.identityCategories.find((c) => c.id === emphasis)?.value} of ${TOTAL_PROFILES} profiles classified as ${report.identityCategories.find((c) => c.id === emphasis)?.shortLabel.toLowerCase()}.`}
        </p>
      </div>
    );
  };

  return (
    <section aria-labelledby="identity-grid-title" className="mt-12 border-t border-[var(--border)] pt-10">
      <p id="identity-grid-title" className="sr-only">Profile identity grid</p>
      <ScrollyChapter
        id="identity-grid"
        title="Profile identity grid"
        visualTitle="61 aggregate cells"
        source="Aggregate classification; synthetic identifiers"
        caption="Markers are neutral aggregate placeholders. Click any cell to inspect its classification below."
        steps={steps}
        renderVisual={renderVisual}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
        <motion.article
          aria-live="polite"
          className="border border-[var(--border)] bg-[var(--surface-elevated)] p-5"
          initial={false}
          animate={reduceMotion ? {} : { opacity: 1 }}
        >
          <h4 className="text-2xl font-semibold">{selected.displayLabel}</h4>
          <p className="mt-3 text-sm"><strong>Classification:</strong> {selectedCategory.label}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{selectedCategory.description}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            This cell represents one profile within the aggregate classification. It is not linked to a publicly identified account in this interactive edition.
          </p>
          <div className="mt-5"><Button href="#methodology" variant="secondary">Methodology</Button></div>
        </motion.article>

        <div className="border-y border-[var(--border)] py-5">
          <h4 className="font-semibold">Legend</h4>
          <ul className="mt-4 space-y-4">
            {report.identityCategories.map((category) => {
              const Icon = identityIcons[category.id];
              return (
              <li key={category.id} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className={`mt-1 flex size-5 items-center justify-center border border-[var(--foreground)] ${classForType(category.id)} ${identityMarks[category.id]}`} aria-hidden="true">
                  <Icon className="size-3 text-[var(--foreground)]" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">
                    {category.label} - <CountValue value={String(category.value)} /> ({formatPercentage(category.value)})
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{category.description}</span>
                </span>
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
