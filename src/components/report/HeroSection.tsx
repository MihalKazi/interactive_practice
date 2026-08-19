"use client";

import { useEffect, useState } from "react";
import { motion, type Transition, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountValue } from "@/components/report/StatGrid";
import { useReportContent } from "@/components/providers/ReportContentProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const DECODE_WORDS = ["MURTAD", "TAGHUT", "APOSTATE"];

function HeroPhoto() {
  return (
    <div className="hero-redaction" aria-hidden="true">
      <div className="hero-redaction-photo">
        <Image
          src="/evidence/source/hero-jamaat-condolence-post-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function DecodingHeadline() {
  const reduceMotion = useReducedMotion();
  const totalTicks = DECODE_WORDS.length * 2;
  const [index, setIndex] = useState(0);
  const settled = Boolean(reduceMotion) || index >= totalTicks;

  useEffect(() => {
    if (settled) return;
    const t = setTimeout(() => setIndex((i) => i + 1), 110);
    return () => clearTimeout(t);
  }, [index, settled]);

  return (
    <motion.h1
      className="headline-xl mt-7 max-w-5xl font-serif tracking-[-0.02em] text-[var(--foreground)]"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.08 }}
    >
      {settled ? "Propaganda" : DECODE_WORDS[index % DECODE_WORDS.length]}
    </motion.h1>
  );
}

const heroSteps = [
  { label: "Opening", id: "triggering-event" },
  { label: "Dataset", id: "dataset" },
  { label: "Evidence", id: "evidence-standards" },
  { label: "Method", id: "methodology" },
];

function useActiveHeroStep() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = heroSteps
      .map((step, index) => ({ index, node: document.getElementById(step.id) }))
      .filter((entry) => entry.node);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const match = targets.find((entry) => entry.node === topMost.target);
        if (match) setActive(match.index);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    targets.forEach((entry) => observer.observe(entry.node!));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function HeroSection() {
  const report = useReportContent();
  const reduceMotion = useReducedMotion();
  const activeStep = useActiveHeroStep();
  const transition: Transition = {
    duration: reduceMotion ? 0 : 0.75,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden border-b border-[var(--border)] py-16 sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:py-24">
      <HeroPhoto />
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 42%, color-mix(in srgb, var(--background) 55%, transparent) 68%, color-mix(in srgb, var(--background) 30%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, var(--background) 0%, transparent 30%, transparent 80%, color-mix(in srgb, var(--background) 60%, transparent) 100%)" }}
        />
      </div>

      <Container className="relative grid min-h-[calc(90vh-8rem)] items-center gap-12">
        <div className="max-w-5xl">
          <nav className="relative mb-6 hidden gap-2 sm:flex" aria-label="Jump to section">
            <div className="absolute left-0 right-0 top-[3px] h-px bg-[var(--border)]" aria-hidden="true" />
            <motion.div
              className="absolute left-0 top-[3px] h-px origin-left bg-[var(--accent)]"
              aria-hidden="true"
              initial={false}
              animate={{ width: `${((activeStep + 1) / heroSteps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {heroSteps.map((step, index) => (
              <a key={step.id} href={`#${step.id}`} aria-current={index === activeStep ? "true" : undefined} className="group relative flex w-16 flex-col items-start gap-1.5">
                <span
                  className={`size-[7px] rounded-full transition-colors ${
                    index === activeStep ? "bg-[var(--accent)]" : "bg-[var(--border)] group-hover:bg-[var(--accent)]"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    index === activeStep ? "text-[var(--accent)]" : "text-[var(--muted)] group-hover:text-[var(--accent)]"
                  }`}
                >
                  {step.label}
                </span>
              </a>
            ))}
          </nav>
          <motion.p
            className="dossier-line font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={transition}
          >
            <span className="bullet-marker" aria-hidden="true" />
            Interactive Investigation
          </motion.p>
          <DecodingHeadline />
          <motion.span
            className="mt-4 block h-[3px] w-24 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="mt-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.12 }}
          >
            By {report.author} · {report.date} · Verified screenshots, archived Dec 2025
          </motion.p>
          <motion.p
            className="editorial-copy mt-6 max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.16 }}
          >
            An analysis of extremist campaigns targeting the Bangladesh Armed Forces — a data-led examination of{" "}
            <span className="font-semibold text-[var(--foreground)]">
              <CountValue value="73" />
            </span>{" "}
            highly active profiles, recurring propaganda narratives, inauthentic identity tactics, and the exploitation of national events.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.32 }}
          >
            <Button href="#triggering-event">Begin the investigation</Button>
            <Button href="#methodology" variant="secondary">Explore the methodology</Button>
          </motion.div>
          <motion.p
            className="mt-5 max-w-2xl text-xs leading-6 text-(--muted)"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.4 }}
          >
            This investigation references extremist rhetoric and incitement. Potentially harmful material is presented only where necessary for public-interest reporting.
          </motion.p>
        </div>
      </Container>

      <motion.a
        href="#triggering-event"
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
