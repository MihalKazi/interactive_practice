"use client";

import { useEffect, useRef, useState } from "react";

function computeStepProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const refY = vh * 0.5;
  return Math.min(1, Math.max(0, (refY - rect.top) / Math.max(1, rect.height)));
}

export function useActiveScrollStep(stepCount: number) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeStepProgress, setActiveStepProgress] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          const index = Number(visible.target.dataset.stepIndex ?? 0);
          setActiveStep(index);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, [stepCount]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = stepRefs.current[activeStep];
        if (el) setActiveStepProgress(computeStepProgress(el));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [activeStep]);

  return { activeStep, activeStepProgress, stepRefs };
}
