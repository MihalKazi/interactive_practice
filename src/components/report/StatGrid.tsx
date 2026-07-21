"use client";

import { useEffect, useRef, useState } from "react";
import type { Statistic } from "@/types/report";
import { cn } from "@/lib/utils";

function CountValue({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    if (!numeric || numeric > 9999) return;
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
  }, [value]);

  return display;
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
                "border-t border-[var(--border)] py-5 sm:border-l sm:border-t-0 sm:px-5",
                index === 0 && "sm:border-l-0",
              )}
            >
              <p className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-none text-[var(--foreground)]">
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
