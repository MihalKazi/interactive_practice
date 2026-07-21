"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { EditorialStatus } from "@/components/report/EditorialStatus";
import { report } from "@/data/report";
import { formatPercentage, generateIdentityGrid, TOTAL_PROFILES } from "@/lib/report-data";
import type { IdentityType, ProfileGridCell } from "@/types/report";

const identityMarks: Record<IdentityType, string> = {
  "fake-or-pseudonymous": "diagonal",
  "apparently-real": "solid",
  undetermined: "dot",
};

function classForType(type: IdentityType) {
  return {
    "fake-or-pseudonymous": "bg-[var(--identity-inauthentic)]",
    "apparently-real": "bg-[var(--identity-apparent)]",
    undetermined: "bg-[var(--identity-undetermined)]",
  }[type];
}

export function ProfileIdentityGrid() {
  const cells = useMemo(() => generateIdentityGrid(report.identityCategories), []);
  const [filter, setFilter] = useState<IdentityType | "all">("all");
  const [selected, setSelected] = useState<ProfileGridCell>(cells[0]);
  const reduceMotion = useReducedMotion();
  const selectedCategory = report.identityCategories.find((item) => item.id === selected.identityType)!;
  const emphasized = filter === "all" ? TOTAL_PROFILES : report.identityCategories.find((item) => item.id === filter)?.value ?? 0;

  return (
    <section aria-labelledby="identity-grid-title" className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr]">
        <div>
          <p className="eyebrow text-[var(--accent)]">61 aggregate cells</p>
          <h3 id="identity-grid-title" className="mt-3 text-3xl font-semibold">Profile identity grid</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Each cell represents one analysed profile in an aggregate classification. Display labels are synthetic identifiers, not public account identities. Ordering is created only for visual representation and does not reproduce original dataset order.
          </p>

          <div role="group" aria-label="Emphasize identity classification" className="mt-6 flex flex-wrap gap-2">
            <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")} className="dataset-toggle">All - 61</button>
            {report.identityCategories.map((category) => (
              <button key={category.id} type="button" aria-pressed={filter === category.id} onClick={() => setFilter(category.id)} className="dataset-toggle">
                {category.shortLabel} - {category.value}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-[var(--muted)]">
            Showing emphasis for {emphasized} of {TOTAL_PROFILES} profiles.
          </p>

          <div className="mt-6 grid grid-cols-7 gap-2 sm:grid-cols-10 md:grid-cols-12" data-profile-grid>
            {cells.map((cell, index) => {
              const active = filter === "all" || filter === cell.identityType;
              const isSelected = selected.id === cell.id;
              const category = report.identityCategories.find((item) => item.id === cell.identityType)!;
              return (
                <motion.button
                  key={cell.id}
                  type="button"
                  data-profile-cell
                  aria-pressed={isSelected}
                  aria-label={`${cell.displayLabel}. ${category.label}. Synthetic display identifier.`}
                  onClick={() => setSelected(cell)}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: active ? 1 : 0.32, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion ? 0 : Math.min(index * 0.006, 0.18) }}
                  className={`profile-cell ${classForType(cell.identityType)} ${identityMarks[cell.identityType]} ${isSelected ? "selected" : ""}`}
                >
                  <span className="sr-only">{cell.displayLabel}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <motion.article
            aria-live="polite"
            className="border border-[var(--border)] bg-[var(--surface-elevated)] p-5"
            initial={false}
            animate={reduceMotion ? {} : { opacity: 1 }}
          >
            <EditorialStatus status="Methodology clarification required" />
            <h4 className="mt-4 text-2xl font-semibold">{selected.displayLabel}</h4>
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
              {report.identityCategories.map((category) => (
                <li key={category.id} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className={`mt-1 size-5 border border-[var(--foreground)] ${classForType(category.id)} ${identityMarks[category.id]}`} aria-hidden="true" />
                  <span>
                    <span className="block font-semibold">{category.label} - {category.value} ({formatPercentage(category.value)})</span>
                    <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{category.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[var(--border)] p-5">
            <EditorialStatus status="Methodology clarification required" />
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              Identity classifications reflect the research team&apos;s assessment of publicly observable profile information. The interactive report does not independently verify the legal identity of account operators.
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Detailed classification criteria require researcher confirmation before publication.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
