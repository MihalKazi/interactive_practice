"use client";

import { useEffect, useRef, useState } from "react";
import type { Statistic } from "@/types/report";
import { cn } from "@/lib/utils";

export function CountValue({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const done = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    done.current = false;
    setDisplay(value.replace(/[0-9][0-9,]*/, "0"));
  }, [value]);

  useEffect(() => {
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !numeric || numeric > 9999) {
      setDisplay(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (done.current) return;
      done.current = true;
      let frame = 0;
      const total = 28;
      const tick = () => {
        frame += 1;
        const next = Math.round((numeric * frame) / total);
        setDisplay(value.replace(/[0-9,]+/, next.toLocaleString("en-US")));
        if (frame < total) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function StatGrid({ stats }: { stats: Statistic[] }) {
  const [primary, ...supporting] = stats;

  return (
    <div className="border-y border-[var(--border)] py-8">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1.4fr] lg:items-end">
        <div>
          <p className="eyebrow text-[var(--muted)]">Scale of reviewed sample</p>
          <p className="mt-4 font-serif text-[clamp(5rem,14vw,11rem)] leading-none text-[var(--foreground)]">
            <CountValue value={primary.value} />
          </p>
          <p className="mt-3 text-lg font-semibold">{primary.label}</p>
        </div>
        <div className="grid gap-0 sm:grid-cols-3">
          {supporting.map((stat, index) => (
            <article
              key={stat.id}
              className={cn(
                "min-w-0 border-t border-[var(--border)] py-5 sm:border-l sm:border-t-0 sm:px-5",
                index === 0 && "sm:border-l-0",
              )}
            >
              <p
                className={cn(
                  "font-serif leading-none text-[var(--foreground)]",
                  stat.value.length > 6 ? "text-[clamp(1.75rem,3.2vw,2.75rem)]" : "text-[clamp(2.4rem,5vw,4.2rem)]",
                )}
              >
                <CountValue value={stat.value} />
              </p>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {stat.label}
              </h3>
              {stat.note ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{stat.note}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
