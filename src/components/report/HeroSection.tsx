"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, type Transition, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CountValue } from "@/components/report/StatGrid";
import { useReportContent } from "@/components/providers/ReportContentProvider";
import { generateIdentityGrid } from "@/lib/report-data";
import type { IdentityCategory, IdentityType } from "@/types/report";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const identityDotColor: Record<IdentityType, string> = {
  "fake-or-pseudonymous": "var(--identity-inauthentic)",
  "apparently-real": "var(--identity-apparent)",
  undetermined: "var(--identity-undetermined)",
};

// Deterministic pseudo-scatter so server and client render identical dot positions (avoids hydration mismatch from Math.random).
function seededPosition(index: number) {
  const a = Math.sin(index * 12.9898) * 43758.5453;
  const b = Math.sin(index * 78.233) * 12543.859;
  return {
    x: (a - Math.floor(a)) * 100,
    y: (b - Math.floor(b)) * 100,
  };
}

function HeroNodeField({ identityCategories }: { identityCategories: IdentityCategory[] }) {
  const reduceMotion = useReducedMotion();
  const cells = useMemo(() => generateIdentityGrid(identityCategories), [identityCategories]);
  const positions = useMemo(() => cells.map((_, index) => seededPosition(index)), [cells]);
  const edges = useMemo(() => {
    const links: { a: number; b: number; dist: number }[] = [];
    const threshold = 16;
    for (let i = 0; i < positions.length; i += 1) {
      for (let j = i + 1; j < positions.length; j += 1) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < threshold) links.push({ a: i, b: j, dist });
      }
    }
    return links;
  }, [positions]);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="hero-node-field"
      aria-hidden="true"
      onMouseMove={(event) => {
        if (reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: px, y: py });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <svg className="absolute inset-0 size-full overflow-visible" preserveAspectRatio="none">
        {edges.map(({ a, b }) => (
          <motion.line
            key={`${a}-${b}`}
            x1={`${positions[a].x}%`}
            y1={`${positions[a].y}%`}
            x2={`${positions[b].x}%`}
            y2={`${positions[b].y}%`}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1.2, delay: reduceMotion ? 0 : 0.4 + (a % 6) * 0.08 }}
          />
        ))}
      </svg>
      {cells.map((cell, index) => {
        const pos = positions[index];
        const depth = ((index % 5) + 1) / 5;
        return (
          <motion.span
            key={cell.id}
            className="hero-node"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              background: identityDotColor[cell.identityType],
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.55, 0.95, 0.55],
              scale: 1,
              x: tilt.x * 24 * depth,
              y: tilt.y * 24 * depth,
            }}
            transition={{
              opacity: { duration: 3 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: (index % 7) * 0.2 },
              scale: { duration: 0.5, delay: reduceMotion ? 0 : index * 0.01 },
              x: { type: "spring", stiffness: 60, damping: 12 },
              y: { type: "spring", stiffness: 60, damping: 12 },
            }}
          />
        );
      })}
    </div>
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
      <div className="hero-glow" aria-hidden="true" />
      <HeroNodeField identityCategories={report.identityCategories} />
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
          <motion.h1
            className="headline-xl mt-7 max-w-5xl font-serif tracking-[-0.02em] text-[var(--foreground)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
          >
            Propaganda
          </motion.h1>
          <motion.span
            className="mt-4 block h-[3px] w-24 origin-left bg-[var(--accent)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="editorial-copy mt-6 max-w-2xl text-[clamp(1.05rem,1.6vw,1.25rem)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: reduceMotion ? 0 : 0.16 }}
          >
            An analysis of extremist campaigns targeting the Bangladesh Armed Forces — a data-led examination of{" "}
            <span className="font-semibold text-[var(--foreground)]">
              <CountValue value="61" />
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
