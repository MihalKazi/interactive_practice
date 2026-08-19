"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Recommendation } from "@/types/report";

const RESPONDS_TO: { href: string; label: string }[] = [
  { href: "#triggering-event", label: "See what this responds to — the triggering-event pattern →" },
  { href: "#origins", label: "See what this responds to — the origin timeline →" },
  { href: "#dataset", label: "See what this responds to — the dataset breakdown →" },
];

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const expanded = expandedIndex !== null ? recommendations[expandedIndex] : null;
  const link = expandedIndex !== null ? RESPONDS_TO[expandedIndex] : undefined;

  return (
    <>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {recommendations.map((item, index) => (
          <motion.button
            key={item.audience}
            type="button"
            layoutId={`recommendation-pin-${item.audience}`}
            onClick={() => setExpandedIndex(index)}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-left transition hover:border-[var(--accent)]"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] font-mono text-xs font-semibold text-[var(--accent)]">
                {index + 1}
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-[0.06em]">{item.audience}</h3>
            </div>
            <p className="mt-3 text-base font-semibold leading-6">{item.action}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">Read more →</p>
          </motion.button>
        ))}
      </div>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {expanded && expandedIndex !== null ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div
                    className="absolute inset-0 bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setExpandedIndex(null)}
                  />
                  <motion.div
                    layoutId={`recommendation-pin-${expanded.audience}`}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-left shadow-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(null)}
                      aria-label="Close"
                      className="absolute right-3 top-3 text-[var(--muted)] transition hover:text-[var(--foreground)]"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] font-mono text-xs font-semibold text-[var(--accent)]">
                        {expandedIndex + 1}
                      </span>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                        {expanded.audience}
                      </p>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{expanded.action}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{expanded.detail}</p>

                    {link ? (
                      <a
                        href={link.href}
                        onClick={() => setExpandedIndex(null)}
                        className="mt-5 block border-t border-[var(--border)] pt-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : null}
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
