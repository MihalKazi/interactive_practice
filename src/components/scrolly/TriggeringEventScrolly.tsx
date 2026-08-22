"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TriggeringEventDeck,
  IncidentPostSlider,
  PatternReveal,
  marchForGazaPosts,
  dhanmondi32Posts,
} from "@/components/scrolly/ScrollyVisuals";

function PopSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="dark-chapter scroll-mt-24 border-t border-[var(--border)] px-5 py-16 sm:px-8 lg:px-12"
    >
      {children}
    </motion.section>
  );
}

export function TriggeringEventScrolly() {
  const [showPattern, setShowPattern] = useState(false);

  const closePattern = () => {
    setShowPattern(false);
    requestAnimationFrame(() => {
      document.getElementById("trigger-post-mainstream-media")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <TriggeringEventDeck onShowPattern={() => setShowPattern(true)} />
      {showPattern ? <PatternReveal onClose={closePattern} /> : null}

      <PopSection id="march-for-gaza">
        <div className="mx-auto max-w-[65ch]">
          <p className="eyebrow text-[var(--accent)]">A recurring pattern</p>
          <div className="mt-3 space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
            <p>
              From time to time on different incidents, these structured online propaganda operations and
              coordinated disinformation efforts escalate across social media whenever the armed forces are
              deployed, participate in key national security missions, or become involved in international events.
            </p>
            <p>
              A similar pattern emerged following the Apr 12, 2025 &quot;March for Gaza&quot; event, when the army
              restricted the display of black Kalima flags during the rally and an online campaign targeting the
              army was launched on social media.
            </p>
            <p>
              On November 17, 2025, the army, along with security forces, stopped a group from destroying Sheikh
              Mujibur Rahman&apos;s Dhanmondi 32 residence — consequently, an online campaign targeted the army as
              apostates using the same tactics.
            </p>
          </div>
          <span className="mt-6 block h-[3px] w-24 bg-[var(--accent)]" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">1.1</p>
            <h3 className="mt-3 text-2xl font-semibold">March for Gaza — Kalima flag restriction</h3>
            <div className="mt-8">
              <IncidentPostSlider posts={marchForGazaPosts} />
            </div>
          </div>

          <div id="dhanmondi-32" className="scroll-mt-24">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">1.2</p>
            <h3 className="mt-3 text-2xl font-semibold">Dhanmondi 32 intervention</h3>
            <div className="mt-8">
              <IncidentPostSlider posts={dhanmondi32Posts} />
            </div>
          </div>
        </div>
      </PopSection>
    </>
  );
}
