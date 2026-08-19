"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const lines = [
  "How 'murtad' became a recurring narrative against Bangladesh's armed forces.",
  "For an extended period, a campaign on social media targeted the Bangladesh Armed Forces, religiously apostate and oppressor labeling them as 'Tagut' and 'Murtad.'",
  "Our analysis reveals a coordinated pattern behind it, and profiles spreading these narratives align with radical ideologies and often link to global extremist networks.",
];

const KEYWORDS = new Set(["murtad", "tagut", "taghut", "coordinated", "radical", "extremist"]);

function isKeyword(word: string) {
  return KEYWORDS.has(word.toLowerCase().replace(/[^a-z]/gi, ""));
}

const wordVariants = {
  hidden: { opacity: 0, filter: "blur(6px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${isKeyword(word) ? "font-semibold text-[var(--accent)]" : ""}`}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

type Stage = "lines" | "title" | "done";

export function IntroSequence() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [rawStage, setStage] = useState<Stage>("lines");
  const stage = reduceMotion ? "done" : rawStage;

  useEffect(() => {
    if (stage === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  const advance = () => {
    if (stage === "lines") {
      if (step < lines.length - 1) setStep((s) => s + 1);
      else setStage("title");
    } else if (stage === "title") {
      setStage("done");
    }
  };

  useEffect(() => {
    if (stage === "done") return;

    let locked = false;
    const unlock = () => {
      locked = false;
    };
    const trigger = () => {
      if (locked) return;
      locked = true;
      advance();
      setTimeout(unlock, 500);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 12) return;
      trigger();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStage("done");
        return;
      }
      if (event.key !== "Enter" && event.key !== " " && event.key !== "ArrowDown") return;
      trigger();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, step]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {stage !== "done" ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-background px-6 text-center sm:cursor-auto"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={advance}
        >
          <motion.div
            className="absolute left-6 top-8 font-mono text-sm font-bold uppercase tracking-[0.22em] text-foreground sm:left-10 sm:top-10 sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Activate Rights //
          </motion.div>

          <AnimatePresence mode="wait">
            {stage === "lines" ? (
              <motion.p
                key={step}
                className="max-w-xl font-serif text-[clamp(1.3rem,3vw,2rem)] leading-relaxed text-foreground"
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
              >
                <AnimatedWords text={lines[step]} />
              </motion.p>
            ) : (
              <motion.div key="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <h1 className="font-serif text-[clamp(1.75rem,4.5vw,3rem)] tracking-[-0.02em] text-[var(--accent)]">
                  How &apos;murtad&apos; became a recurring narrative against Bangladesh&apos;s armed forces
                </h1>
                <p className="mt-3 max-w-lg font-serif text-[clamp(1rem,2vw,1.25rem)] text-muted">
                  An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces
                </p>
                <p className="mt-6 font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
                  August 12, 2026 · Activate Rights
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="absolute bottom-8 font-mono text-xs uppercase tracking-[0.16em] text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="sm:hidden">Tap to continue</span>
            <span className="hidden sm:inline">Scroll to continue</span>
          </motion.p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setStage("done");
            }}
            className="absolute bottom-8 right-6 font-mono text-xs uppercase tracking-[0.16em] text-muted transition hover:text-[var(--accent)] sm:right-10"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
