"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, UserRound, UserRoundSearch, UserRoundX, X } from "lucide-react";
import { LinkPreviewCard } from "@/components/ui/LinkPreviewCard";
import { CountValue } from "@/components/report/StatGrid";
import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import { useReportContent } from "@/components/providers/ReportContentProvider";
import { generateIdentityGrid, TOTAL_PROFILES } from "@/lib/report-data";
import { profileRecords } from "@/data/profile-records";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const expandedIndex = expandedId ? cells.findIndex((c) => c.id === expandedId) : -1;
  const expandedCell = expandedIndex >= 0 ? cells[expandedIndex] : null;
  const expandedCategory = expandedCell ? report.identityCategories.find((c) => c.id === expandedCell.identityType)! : null;
  const expandedRecord = expandedCell ? profileRecords[expandedCell.position - 1] : null;

  const openCell = (cell: ProfileGridCell) => {
    setSelected(cell);
    setExpandedId(cell.id);
  };
  const closeExpanded = () => setExpandedId(null);
  const stepExpanded = (dir: 1 | -1) => {
    if (expandedIndex < 0) return;
    const next = cells[(expandedIndex + dir + cells.length) % cells.length];
    setSelected(next);
    setExpandedId(next.id);
  };

  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
      if (e.key === "ArrowRight") stepExpanded(1);
      if (e.key === "ArrowLeft") stepExpanded(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedId, expandedIndex]);

  const steps = [
    {
      title: "73 profiles, aggregate classification",
      body: <p>Every cell below represents one analysed profile. Grid position is for visual representation only — click a cell to see its account name and source links.</p>,
    },
    ...report.identityCategories.map((category) => ({
      title: category.label,
      body: (
        <div>
          <p>{category.description}</p>
          <p className="mt-3 font-mono text-3xl text-[var(--foreground)]">
            <CountValue value={String(category.value)} /> of <CountValue value={String(TOTAL_PROFILES)} />
          </p>
        </div>
      ),
    })),
  ];

  const emphasisType = (active: number): IdentityType | "all" =>
    active === 0 ? "all" : report.identityCategories[active - 1].id;

  const renderVisual = (active: number, _stepProgress?: number, instanceKey?: string) => {
    const scope = instanceKey ?? "desktop";
    const emphasis = emphasisType(active);
    return (
      <div>
        <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10" data-profile-grid>
          {cells.map((cell, i) => {
            const active_ = emphasis === "all" || emphasis === cell.identityType;
            const isSelected = selected.id === cell.id;
            const isExpanded = expandedId === cell.id;
            const category = report.identityCategories.find((item) => item.id === cell.identityType)!;
            const Icon = identityIcons[cell.identityType];
            const shouldAttract =
              !reduceMotion &&
              (emphasis === "fake-or-pseudonymous" || emphasis === "apparently-real") &&
              emphasis === cell.identityType;
            return (
              <motion.button
                key={cell.id}
                type="button"
                data-profile-cell
                layoutId={`profile-avatar-${scope}-${cell.id}`}
                aria-pressed={isSelected}
                aria-label={`${cell.displayLabel}. ${category.label}. Click for account name and links.`}
                onClick={() => openCell(cell)}
                animate={{ opacity: expandedId ? (isExpanded ? 0 : 0.18) : active_ ? 1 : 0.22 }}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                className={`profile-cell flex w-full items-center justify-center ${classForType(cell.identityType)} ${identityMarks[cell.identityType]} ${isSelected ? "selected" : ""}`}
              >
                <motion.span
                  className="profile-cell-flip"
                  animate={{ rotateY: shouldAttract ? 360 : 0 }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { rotateY: 180, y: -2, transition: { type: "spring", stiffness: 260, damping: 20 } }
                  }
                  transition={
                    shouldAttract
                      ? { duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: i * 0.015 }
                      : { duration: 0 }
                  }
                >
                  <span className="profile-cell-face profile-cell-face-front">
                    <Icon className="size-6 text-[var(--foreground)]" aria-hidden="true" />
                  </span>
                  <span className="profile-cell-face profile-cell-face-back">
                    <Eye className="size-6 text-[var(--foreground)]" aria-hidden="true" />
                  </span>
                </motion.span>
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

        {typeof document !== "undefined"
          ? createPortal(
              <AnimatePresence>
                {expandedCell && expandedCategory ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                      className="absolute inset-0 bg-black/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={closeExpanded}
                    />
                    <motion.div
                      layoutId={`profile-avatar-${scope}-${expandedCell.id}`}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-left shadow-2xl"
                    >
                      <button
                        type="button"
                        onClick={closeExpanded}
                        aria-label="Close"
                        className="absolute right-3 top-3 text-[var(--muted)] transition hover:text-[var(--foreground)]"
                      >
                        <X className="size-5" aria-hidden="true" />
                      </button>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.25 }}
                      >
                        <span
                          className={`flex size-12 items-center justify-center border border-[var(--foreground)] ${classForType(expandedCell.identityType)} ${identityMarks[expandedCell.identityType]}`}
                          aria-hidden="true"
                        >
                          {(() => {
                            const ExpandedIcon = identityIcons[expandedCell.identityType];
                            return <ExpandedIcon className="size-6 text-[var(--foreground)]" aria-hidden="true" />;
                          })()}
                        </span>
                        <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                          {expandedCell.displayLabel} · {expandedCategory.shortLabel}
                        </p>
                        <h4 className="mt-1 text-xl font-semibold">{expandedRecord?.name ?? "No display name recorded"}</h4>
                        {expandedRecord?.classification ? (
                          <span className="mt-2 inline-block border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {expandedRecord.classification}
                          </span>
                        ) : null}
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{expandedCategory.description}</p>
                        <div className="mt-4 flex flex-col gap-1.5 text-sm">
                          {expandedRecord?.postLink ? (
                            <a href={expandedRecord.postLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]">
                              View post ↗
                            </a>
                          ) : null}
                          {expandedRecord?.archiveLink ? (
                            <a href={expandedRecord.archiveLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]">
                              View archived source ↗
                            </a>
                          ) : null}
                          {expandedRecord?.profileLink ? (
                            <a href={expandedRecord.profileLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]">
                              View account ↗
                            </a>
                          ) : null}
                        </div>
                        {expandedRecord?.archiveLink ? <LinkPreviewCard key={expandedRecord.archiveLink} url={expandedRecord.archiveLink} /> : null}
                      </motion.div>

                      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                        <button
                          type="button"
                          onClick={() => stepExpanded(-1)}
                          className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)] transition hover:text-[var(--accent)]"
                        >
                          <ChevronLeft className="size-4" aria-hidden="true" /> Prev
                        </button>
                        <span className="font-mono text-xs text-[var(--muted)]">
                          {expandedCell.position} of {TOTAL_PROFILES}
                        </span>
                        <button
                          type="button"
                          onClick={() => stepExpanded(1)}
                          className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)] transition hover:text-[var(--accent)]"
                        >
                          Next <ChevronRight className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ) : null}
              </AnimatePresence>,
              document.body,
            )
          : null}
      </div>
    );
  };

  return (
    <section aria-labelledby="identity-grid-title" className="mt-12 border-t border-[var(--border)] pt-10">
      <p id="identity-grid-title" className="sr-only">Profile identity grid</p>
      <ScrollyChapter
        id="identity-grid"
        title="Profile identity grid"
        visualTitle="73 aggregate cells"
        source="Aggregate classification; verified account records"
        caption="Markers are neutral aggregate placeholders. Click any cell to inspect its classification, account name, and source links below."
        steps={steps}
        renderVisual={renderVisual}
        mobileStatic
        mobileStaticStep={0}
      />

    </section>
  );
}
