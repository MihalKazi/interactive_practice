"use client";

import { useState } from "react";

export function SensitiveEvidenceGate({
  warning,
  children,
}: {
  warning: string;
  children: React.ReactNode;
}) {
  const [choice, setChoice] = useState<"pending" | "revealed" | "skipped">("pending");

  if (choice === "revealed") return <>{children}</>;
  if (choice === "skipped") {
    return (
      <div className="border border-[var(--border)] p-5 text-sm text-[var(--muted)]" aria-live="polite">
        Evidence remains covered. Continue reading normally.
      </div>
    );
  }

  return (
    <section className="border border-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_8%,transparent)] p-5" aria-label="Sensitive evidence gate">
      <p className="font-semibold">Content warning</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{warning}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => setChoice("revealed")} className="dataset-toggle">
          Reveal reviewed evidence
        </button>
        <button type="button" onClick={() => setChoice("skipped")} className="dataset-toggle">
          Continue without revealing
        </button>
      </div>
    </section>
  );
}
