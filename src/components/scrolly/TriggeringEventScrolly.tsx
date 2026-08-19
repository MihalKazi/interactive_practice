"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollyChapter } from "@/components/scrolly/ScrollyChapter";
import {
  TriggeringVisual,
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


const steps = [
  {
    eyebrow: "Stage 1 - Tarique Rahman",
    title: "The Prime Minister's condolence post",
    body: (
      <p>
        Posted hours after the strike. The comment section is entered by accounts calling the dead &quot;murtad&quot; and
        &quot;taghut,&quot; disputing their martyrdom status.{" "}
        <a
          href="https://www.facebook.com/photo/?fbid=1430598028430530&set=a.430295218460821"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
        >
          Original post, Dec 13, 2025
        </a>
        .
      </p>
    ),
  },
  {
    eyebrow: "Stage 2 - Jamaat-e-Islami",
    title: "The opposition party's condolence post",
    body: (
      <p>
        At least 28 of 97 comments on this post used the term &quot;murtad&quot; directly, mocking the
        &quot;martyr&quot; framing.{" "}
        <a
          href="https://www.facebook.com/photo/?fbid=1268858378604390"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
        >
          Original post, Dec 14, 2025
        </a>
        .
      </p>
    ),
  },
  {
    eyebrow: "Stage 3 - Bangladesh Navy",
    title: "The official Navy page's condolence post",
    body: (
      <p>
        The same reframing pattern repeats on the Navy&apos;s own page — an official institutional account, not a
        fringe one.{" "}
        <a
          href="https://www.facebook.com/bangladeshnavy.mil.bd/posts/%E0%A6%B8%E0%A7%81%E0%A6%A6%E0%A6%BE%E0%A6%A8%E0%A7%87-%E0%A6%B8%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A7%80-%E0%A6%B9%E0%A6%BE%E0%A6%AE%E0%A6%B2%E0%A6%BE%E0%A6%AF%E0%A6%BC-%E0%A6%B9%E0%A6%A4%E0%A6%BE%E0%A6%B9%E0%A6%A4-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D%E0%A6%A4%E0%A6%BF%E0%A6%B0%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A6%BF-%E0%A6%97%E0%A6%AD%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D/898020886127879/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
        >
          Original post, Dec 14, 2025
        </a>
        .
      </p>
    ),
  },
  {
    eyebrow: "Stage 4 - Beyond the posts",
    title: "A pattern, not an isolated reaction",
    body: (
      <p>
        Across all three condolence posts, accounts disputed and mocked the framing of the dead as martyrs —
        comparable hostile rhetoric also surfaced across mainstream media commentary in the same period.
      </p>
    ),
  },
];

export function TriggeringEventScrolly() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [showPattern, setShowPattern] = useState(false);
  const wasIntersecting = useRef(false);
  const lastScrollY = useRef(0);
  const hasFired = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0]?.isIntersecting ?? false;
        const scrollingDown = window.scrollY > lastScrollY.current;
        if (intersecting && !wasIntersecting.current && scrollingDown && !hasFired.current) {
          hasFired.current = true;
          setShowPattern(true);
        }
        wasIntersecting.current = intersecting;
        lastScrollY.current = window.scrollY;
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closePattern = () => {
    setShowPattern(false);
    requestAnimationFrame(() => {
      document.getElementById("triggering-event")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    if (!showPattern) return;
    const timer = setTimeout(closePattern, 10000);
    return () => clearTimeout(timer);
  }, [showPattern]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <ScrollyChapter
        id="triggering-event"
        dark
        title="Triggering event"
        visualTitle="How public mourning was reframed"
        source="Verified screenshots, archived Dec 2025"
        steps={steps}
        renderVisual={(active, progress) => <TriggeringVisual step={active} stepProgress={progress} />}
        hideVisualHeader
        popEffect
      />
      {showPattern ? <PatternReveal onClose={closePattern} /> : null}

      <PopSection id="march-for-gaza">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">1.1</p>
            <h3 className="mt-3 text-2xl font-semibold">March for Gaza — Kalima flag restriction</h3>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              A similar pattern emerged following the Apr 12, 2025 &quot;March for Gaza&quot; event. When the army restricted
              the display of black Kalima flags during the rally, an online campaign targeting the army was launched on
              social media.
            </p>
            <div className="mt-8">
              <IncidentPostSlider posts={marchForGazaPosts} />
            </div>
          </div>

          <div id="dhanmondi-32" className="scroll-mt-24">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">1.2</p>
            <h3 className="mt-3 text-2xl font-semibold">Dhanmondi 32 intervention</h3>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              On November 17, 2025, the army, along with security forces, stopped a group from destroying Sheikh
              Mujibur Rahman&apos;s Dhanmondi 32 residence. Consequently, an online campaign targeted the army as
              apostates using the same tactics.
            </p>
            <div className="mt-8">
              <IncidentPostSlider posts={dhanmondi32Posts} />
            </div>
          </div>
        </div>
      </PopSection>
    </>
  );
}
