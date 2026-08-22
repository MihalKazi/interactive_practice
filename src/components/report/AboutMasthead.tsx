"use client";

import { FileText } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function StampIcon() {
  return (
    <span className="relative flex size-9 shrink-0 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 45%, transparent) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-dashed"
        style={{ borderColor: "color-mix(in srgb, var(--accent) 70%, transparent)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute inset-[3px] rounded-full border"
        style={{ borderColor: "color-mix(in srgb, var(--accent) 35%, transparent)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <FileText className="relative size-4 text-[var(--accent)]" aria-hidden="true" />
    </span>
  );
}

function DeclassifiedCredit({ role, name, index }: { role: string; name: string; index: number }) {
  return (
    <div className="flex h-full min-h-[110px] flex-col justify-between border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{role}</p>
      <div className="mt-3">
        <p className="relative inline-block overflow-hidden text-base font-semibold leading-tight text-[var(--foreground)]">
          <span>{name}</span>
          <motion.span
            className="absolute inset-0"
            style={{ background: "var(--accent)" }}
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.4 + index * 0.15 }}
          />
        </p>
        <motion.div
          className="mt-2 h-px origin-left bg-[var(--accent)]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 + index * 0.15 }}
        />
      </div>
    </div>
  );
}

export function AboutMasthead({
  author,
  date,
  credits,
}: {
  author: string;
  date: string;
  credits: { role: string; name: string }[];
}) {
  return (
    <motion.div
      className="mx-auto max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.div className="flex items-center gap-3" variants={fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <StampIcon />
        <div>
          <p className="eyebrow text-[var(--accent)]">About this report</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            By {author} · {date}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 h-px origin-left bg-[var(--border)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />

      <div className="mt-6 grid items-stretch gap-3 sm:grid-cols-3">
        {credits.map((credit, index) => (
          <motion.div key={credit.role} className="h-full" variants={fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <DeclassifiedCredit role={credit.role} name={credit.name} index={index} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
