"use client";

import { useState } from "react";
import { ScrollyProgress } from "@/components/scrolly/ScrollyProgress";
import { ScrollyStep, type ScrollyStepData } from "@/components/scrolly/ScrollyStep";
import { StickyVisualStage } from "@/components/scrolly/StickyVisualStage";
import { useActiveScrollStep } from "@/hooks/useActiveScrollStep";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useStickySupport } from "@/hooks/useStickySupport";

export function ScrollyChapter({
  id,
  title,
  visualTitle,
  source,
  caption,
  steps,
  renderVisual,
  dark = false,
}: {
  id?: string;
  title: string;
  visualTitle: string;
  source: string;
  caption: React.ReactNode;
  steps: ScrollyStepData[];
  renderVisual: (activeStep: number) => React.ReactNode;
  dark?: boolean;
}) {
  const { activeStep, stepRefs } = useActiveScrollStep(steps.length);
  const reduced = useReducedMotionPreference();
  const stickySupported = useStickySupport();
  const [debug] = useState(() =>
    typeof window === "undefined"
      ? false
      : 
      process.env.NODE_ENV !== "production" &&
        new URLSearchParams(window.location.search).get("debugScrolly") === "1",
  );
  const active = reduced ? steps.length - 1 : activeStep;

  return (
    <section id={id} className={`scrolly-chapter ${dark ? "dark-chapter" : ""} ${debug ? "debug-scrolly" : ""}`}>
      <p className="sr-only">
        As you scroll, the accompanying visual changes to illustrate each stage of the investigation. The complete information is also available in the surrounding text.
      </p>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.4fr_0.6fr] lg:px-12">
        <div className="scrolly-copy">
          <ScrollyProgress count={steps.length} active={active} title={title} />
          {steps.map((step, index) => (
            <div
              key={step.title}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-step-index={index}
            >
              <ScrollyStep step={step} index={index} active={index === active} />
              <div className="mobile-scrolly-visual lg:hidden">
                <StickyVisualStage title={visualTitle} source={source} caption={caption}>
                  {renderVisual(index)}
                </StickyVisualStage>
              </div>
            </div>
          ))}
        </div>
        <div className={stickySupported ? "sticky top-24 hidden self-start lg:block" : "hidden lg:block"}>
          <StickyVisualStage title={visualTitle} source={source} caption={caption}>
            {renderVisual(active)}
          </StickyVisualStage>
          {debug ? (
            <pre className="mt-3 border border-[var(--warning)] p-3 text-xs">
              step {active + 1}/{steps.length} | reduced {String(reduced)}
            </pre>
          ) : null}
        </div>
      </div>
    </section>
  );
}
