"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollyProgress } from "@/components/scrolly/ScrollyProgress";
import { ScrollyStep, type ScrollyStepData } from "@/components/scrolly/ScrollyStep";
import { StickyVisualStage } from "@/components/scrolly/StickyVisualStage";
import { useActiveScrollStep } from "@/hooks/useActiveScrollStep";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useStickySupport } from "@/hooks/useStickySupport";

function MobileStepVisual({ reduced, children }: { reduced: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      className="mt-6 lg:hidden"
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollyChapter({
  id,
  title,
  visualTitle,
  source,
  caption,
  steps,
  renderVisual,
  dark = false,
  hideVisualHeader = false,
  popEffect = false,
  mobileStatic = false,
  mobileStaticStep,
}: {
  id?: string;
  title: string;
  visualTitle: string;
  source: string;
  caption?: React.ReactNode;
  steps: ScrollyStepData[];
  renderVisual: (activeStep: number, stepProgress?: number, instanceKey?: string) => React.ReactNode;
  dark?: boolean;
  hideVisualHeader?: boolean;
  popEffect?: boolean;
  mobileStatic?: boolean;
  mobileStaticStep?: number;
}) {
  const { activeStep, activeStepProgress, stepRefs } = useActiveScrollStep(steps.length);
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

  const enterProps =
    popEffect && !reduced
      ? {
          initial: { opacity: 0, y: 64 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0, margin: "0px 0px -15% 0px" },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {};

  return (
    <section id={id} className={`scrolly-chapter ${dark ? "dark-chapter" : ""} ${debug ? "debug-scrolly" : ""}`}>
      <p className="sr-only">
        As you scroll, the accompanying visual changes to illustrate each stage of the investigation. The complete information is also available in the surrounding text.
      </p>
      <div className="mx-auto max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid lg:grid-cols-[0.4fr_0.6fr] lg:px-12">
        <motion.div
          className={`hidden lg:block ${stickySupported ? "lg:sticky lg:top-24" : ""} lg:order-2 lg:self-start`}
          {...enterProps}
        >
          <StickyVisualStage title={visualTitle} source={source} caption={caption} hideHeader={hideVisualHeader}>
            {renderVisual(active, activeStepProgress)}
          </StickyVisualStage>
          {debug ? (
            <pre className="mt-3 border border-[var(--warning)] p-3 text-xs">
              step {active + 1}/{steps.length} | reduced {String(reduced)}
            </pre>
          ) : null}
        </motion.div>
        <motion.div className="scrolly-copy lg:order-1" {...enterProps}>
          <ScrollyProgress count={steps.length} active={active} title={title} />
          {mobileStatic ? (
            <div className="mt-6 lg:hidden">
              <StickyVisualStage title={visualTitle} source={source} caption={caption} hideHeader={hideVisualHeader}>
                {renderVisual(mobileStaticStep ?? steps.length - 1, undefined, "mobile-static")}
              </StickyVisualStage>
            </div>
          ) : null}
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-step-index={index}
            >
              <ScrollyStep step={step} index={index} active={index === active} />
              {mobileStatic ? null : (
                <MobileStepVisual reduced={Boolean(reduced)}>
                  <StickyVisualStage title={visualTitle} source={source} caption={caption} hideHeader={hideVisualHeader}>
                    {renderVisual(index, undefined, `mobile-${index}`)}
                  </StickyVisualStage>
                </MobileStepVisual>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
