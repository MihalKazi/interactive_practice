"use client";

import { motion } from "framer-motion";

export function ChapterTransition({
  number,
  label,
  statement,
  dark = false,
}: {
  number: string;
  label: string;
  statement: string;
  dark?: boolean;
}) {
  return (
    <section className={`chapter-transition ${dark ? "dark-chapter" : ""}`}>
      <motion.div
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-serif text-8xl text-[var(--accent)]">{number}</p>
        <p className="eyebrow mt-4 text-[var(--muted)]">{label}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{statement}</h2>
      </motion.div>
    </section>
  );
}
