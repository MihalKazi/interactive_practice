"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Pin, X } from "lucide-react";
import { LinkPreviewCard } from "@/components/ui/LinkPreviewCard";
import type { NarrativeCategory } from "@/types/report";

const verbs = ["Delegitimise", "Reframe", "Accuse", "Glorify opposing side", "Justify confrontation"];
const tilts = [-3, 2, -2, 3, -1.5];

const reusedScreenshots: Record<string, { imageSrc: string; imageAlt: string; caption: string }> = {
  "https://megalodon.jp/2026-0814-0400-22/https://www.facebook.com:443/mahfujurshanto/posts/pfbid02x7rLy8gPB1kpFZWE7Q9Ca91gYeDGkUqTwfy69VwYKpRv7HN7onmTWDU61GJreshAl":
    {
      imageSrc: "/evidence/source/dhanmondi-post-2-mahfujur-rahman-shanto.png",
      imageAlt: "Facebook post from Mahfujur Rahman Shanto arguing all army members are 'murtad' on theological grounds",
      caption: "\"Is every member of the army a murtad? Answer: yes, every one.\"",
    },
};

function severityColor(index: number) {
  const pct = (index / (verbs.length - 1)) * 100;
  return `color-mix(in srgb, var(--warning) ${pct}%, var(--accent))`;
}

type Point = { x: number; y: number };

export function NarrativeEscalation({ narrativeCategories }: { narrativeCategories: NarrativeCategory[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [points, setPoints] = useState<Point[]>([]);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const expanded = expandedIndex !== null ? narrativeCategories[expandedIndex] : null;

  const measure = () => {
    const board = boardRef.current;
    if (!board) return;
    const boardRect = board.getBoundingClientRect();
    const next = cardRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - boardRect.left + r.width / 2, y: r.top - boardRect.top + r.height / 2 };
    });
    setPoints(next);
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (boardRef.current) ro.observe(boardRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrativeCategories.length]);

  useEffect(() => {
    const t = setTimeout(measure, 250);
    return () => clearTimeout(t);
  }, []);

  const isUnlocked = (index: number) => index === 0 || visited.has(index - 1);

  const openCard = (index: number) => {
    if (!isUnlocked(index)) return;
    setVisited((prev) => new Set(prev).add(index));
    setExpandedIndex(index);
  };

  return (
    <section aria-labelledby="narratives-title" className="dark-chapter dark-chapter-lined px-5 py-16 sm:px-8 lg:px-12">
      <p id="narratives-title" className="sr-only">Narrative escalation board</p>
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          Click each pin in order — the thread connects as you go.
        </p>
        <div ref={boardRef} className="relative mt-8">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {points.slice(0, -1).map((p, i) => {
              const q = points[i + 1];
              if (!q || (p.x === 0 && p.y === 0)) return null;
              const reachable = visited.has(i + 1) || visited.has(i);
              const midY = (p.y + q.y) / 2 + 24;
              const d = `M ${p.x} ${p.y} Q ${(p.x + q.x) / 2} ${midY} ${q.x} ${q.y}`;
              return (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth={1.5}
                  strokeOpacity={0.8}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={reachable ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </svg>

          <div className="relative flex flex-wrap justify-center gap-8 py-6">
            {narrativeCategories.map((category, index) => {
              const color = severityColor(index);
              const isVisited = visited.has(index);
              const unlocked = isUnlocked(index);
              return (
                <motion.button
                  key={category.id}
                  type="button"
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  layoutId={`narrative-pin-${category.id}`}
                  onClick={() => openCard(index)}
                  disabled={!unlocked}
                  aria-disabled={!unlocked}
                  initial={{ rotate: tilts[index], opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={unlocked ? { rotate: 0, scale: 1.04, y: -4 } : undefined}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={`relative w-72 border p-6 text-left shadow-lg ${unlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
                  style={{
                    borderColor: `color-mix(in srgb, ${color} 45%, var(--border))`,
                    background: "var(--surface-elevated)",
                    opacity: !unlocked ? 0.4 : isVisited ? 1 : 0.88,
                  }}
                >
                  {unlocked ? (
                    <Pin
                      className="absolute -top-4 left-1/2 size-7 -translate-x-1/2 -rotate-12"
                      style={{ color }}
                      fill={color}
                      aria-hidden="true"
                    />
                  ) : (
                    <Lock
                      className="absolute -top-3 left-1/2 size-5 -translate-x-1/2 text-[var(--muted)]"
                      aria-hidden="true"
                    />
                  )}
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em]" style={{ color: unlocked ? color : "var(--muted)" }}>
                    {verbs[index]}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug">
                    {unlocked ? category.title.replace(/^\d\.\d\s*—\s*/, "") : "Locked"}
                  </h3>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                    {!unlocked
                      ? "Declassify the previous pin first"
                      : isVisited
                        ? "Declassified"
                        : `${category.sourceLinks?.length ?? 0} sources — click to declassify`}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
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
                    layoutId={`narrative-pin-${expanded.id}`}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-[var(--border)] bg-[var(--surface-elevated)] p-6 text-left shadow-2xl"
                  >
                    <Pin
                      className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 -rotate-12"
                      style={{ color: severityColor(expandedIndex) }}
                      fill={severityColor(expandedIndex)}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(null)}
                      aria-label="Close"
                      className="absolute right-3 top-3 text-[var(--muted)] transition hover:text-[var(--foreground)]"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                    <p
                      className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: severityColor(expandedIndex) }}
                    >
                      {verbs[expandedIndex]}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{expanded.title.replace(/^\d\.\d\s*—\s*/, "")}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{expanded.description}</p>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {expanded.sourceLinks?.map((link) => {
                        const known = reusedScreenshots[link];
                        return (
                          <div key={link}>
                            {known ? (
                              <figure>
                                <img src={known.imageSrc} alt={known.imageAlt} className="w-full border border-[var(--border)]" />
                                <figcaption className="mt-2 text-xs italic leading-snug text-[var(--muted)]">
                                  {known.caption}
                                </figcaption>
                              </figure>
                            ) : (
                              <LinkPreviewCard url={link} />
                            )}
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
                            >
                              Go to permanent archive ↗
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
