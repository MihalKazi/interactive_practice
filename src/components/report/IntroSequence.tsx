"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const lines = [
  "Six peacekeepers died.",
  "Their condolence posts became a delivery channel.",
  "61 profiles. One narrative machine.",
];

const LINE_DURATION = 2400;

export function IntroSequence() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setDismissed(true);
      return;
    }
    if (step >= lines.length) {
      const closeTimer = setTimeout(() => setDismissed(true), 2800);
      return () => clearTimeout(closeTimer);
    }
    const timer = setTimeout(() => setStep((s) => s + 1), LINE_DURATION);
    return () => clearTimeout(timer);
  }, [step, reduceMotion]);

  useEffect(() => {
    if (dismissed) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const skip = (event: KeyboardEvent | MouseEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " " && event.key !== "Escape") return;
      setDismissed(true);
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [dismissed]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {!dismissed ? (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[var(--background)] px-6 text-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="intro-scanlines" aria-hidden="true" />
          <div className="hud-corner hud-corner-tl" aria-hidden="true" />
          <div className="hud-corner hud-corner-tr" aria-hidden="true" />
          <div className="hud-corner hud-corner-bl" aria-hidden="true" />
          <div className="hud-corner hud-corner-br" aria-hidden="true" />

          <motion.div
            className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] sm:left-10 sm:top-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[var(--accent)]">▸</span> ABYEI, SUDAN — 13.12.2025
          </motion.div>

          <AnimatePresence mode="wait">
            {step < lines.length ? (
              <motion.p
                key={step}
                className="dossier-line relative max-w-2xl font-serif text-[clamp(1.5rem,4vw,2.75rem)] leading-tight text-[var(--foreground)]"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="bullet-marker" aria-hidden="true" />
                {lines[step]}
              </motion.p>
            ) : (
              <motion.div
                key="title"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <p className="eyebrow text-[var(--accent)]">Interactive Investigation</p>
                <h1 className="mt-4 font-serif text-[clamp(2.5rem,8vw,5.5rem)] tracking-[-0.02em] text-[var(--foreground)]">
                  Propaganda
                </h1>
                <p className="mt-3 max-w-xl font-serif text-[clamp(1rem,2.2vw,1.4rem)] text-[var(--muted)]">
                  An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  By Tech and Hate
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute bottom-8 z-10 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] transition hover:text-[var(--accent)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            [ Skip ]
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
