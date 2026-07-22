"use client";

import { motion, type Transition, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useReportContent } from "@/components/providers/ReportContentProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const report = useReportContent();
  const reduceMotion = useReducedMotion();
  const transition: Transition = {
    duration: reduceMotion ? 0 : 0.75,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:py-24">
      <motion.div
        className="hero-network"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 0.62 }}
        transition={{ duration: 1.2 }}
      />
      <Container className="relative grid min-h-[calc(90vh-8rem)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="max-w-5xl">
          <div className="mb-6 hidden gap-2 sm:flex" aria-hidden="true">
            {["Opening", "Dataset", "Evidence", "Method"].map((item, index) => (
              <span key={item} className={`h-1 w-16 ${index === 0 ? "bg-[var(--accent)]" : "bg-[var(--border)]"}`} />
            ))}
          </div>
          <motion.p className="eyebrow text-[var(--accent)]" variants={fadeUp} initial="hidden" animate="visible" transition={transition}>
            Interactive Investigation
          </motion.p>
          <motion.h1
            className="headline-xl mt-7 max-w-5xl font-serif tracking-[-0.02em] text-[var(--foreground)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
          >
            Inside the Network
          </motion.h1>
          <motion.p
            className="mt-8 max-w-3xl text-[clamp(1.25rem,2.1vw,2rem)] leading-[1.35] text-[var(--foreground)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.16 }}
          >
            {report.heroTagline}
          </motion.p>
          <motion.p
            className="editorial-copy mt-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.24 }}
          >
            A data-led examination of 61 highly active profiles, recurring propaganda narratives, inauthentic identity tactics, and the exploitation of national events.
          </motion.p>
          <svg className="mt-8 h-28 w-full max-w-3xl text-[var(--data-secondary)]" viewBox="0 0 720 120" role="img" aria-label="Conceptual profile field without verified account links">
            {Array.from({ length: 18 }).map((_, index) => (
              <circle key={index} cx={30 + index * 38} cy={index % 2 ? 76 : 42} r="3" fill="currentColor" opacity={0.42 + (index % 3) * 0.16} />
            ))}
            <path d="M30 60 C 180 10, 340 110, 520 46 S 650 64, 690 30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" opacity="0.45" />
          </svg>
          <motion.p
            className="mt-8 max-w-2xl border-l-2 border-[var(--warning)] bg-[color-mix(in_srgb,var(--surface)_58%,transparent)] py-3 pl-4 text-sm leading-7 text-[var(--muted)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.32 }}
          >
            This investigation references extremist rhetoric and incitement. Potentially harmful material is presented only where necessary for public-interest reporting.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.4 }}
          >
            <Button href="#overview">Begin the investigation</Button>
            <Button href="#methodology" variant="secondary">Explore the methodology</Button>
          </motion.div>
        </div>

        <motion.aside
          className="border-y border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] py-6 lg:border-l lg:border-y-0 lg:pl-7"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.28 }}
          aria-label="Report metadata"
        >
          <dl className="grid gap-5 text-sm">
            <div>
              <dt className="eyebrow text-[var(--muted)]">Byline</dt>
              <dd className="mt-2 font-semibold">By {report.author}</dd>
            </div>
            <div>
              <dt className="eyebrow text-[var(--muted)]">Report date</dt>
              <dd className="mt-2 font-semibold">{report.date}</dd>
            </div>
            <div>
              <dt className="eyebrow text-[var(--muted)]">Edition</dt>
              <dd className="mt-2 font-semibold">Interactive edition</dd>
            </div>
            <div>
              <dt className="eyebrow text-[var(--muted)]">Dataset</dt>
              <dd className="mt-2 font-semibold">61 public profiles and pages</dd>
            </div>
          </dl>
        </motion.aside>
      </Container>

      <motion.a
        href="#overview"
        className="absolute bottom-6 left-5 hidden text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Scroll to investigate
      </motion.a>
    </section>
  );
}
