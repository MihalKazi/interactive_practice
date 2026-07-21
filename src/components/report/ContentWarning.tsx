"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export function ContentWarning({
  title,
  description,
  severity,
  revealButton,
  children,
}: {
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  revealButton?: string;
  children?: React.ReactNode;
}) {
  const [revealed, setRevealed] = useState(!revealButton);

  return (
    <div className="border border-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_8%,transparent)] p-5">
      <div className="flex gap-3">
        <AlertTriangle className="mt-1 size-5 shrink-0 text-[var(--warning)]" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--warning)]">
            Content warning · {severity}
          </p>
          <h3 className="mt-2 text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{description}</p>
          {revealButton ? (
            <button
              type="button"
              className="mt-4 min-h-11 rounded-sm border border-[var(--warning)] px-4 text-sm font-semibold text-[var(--warning)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              onClick={() => setRevealed((value) => !value)}
              aria-expanded={revealed}
            >
              {revealed ? "Hide sensitive excerpt context" : revealButton}
            </button>
          ) : null}
        </div>
      </div>
      <div className={revealButton && !revealed ? "sr-only" : "mt-5"}>{children}</div>
    </div>
  );
}
