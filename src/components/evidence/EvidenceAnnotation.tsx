import type { PublicEvidenceAnnotation } from "@/types/evidence";

export function EvidenceAnnotation({ annotation }: { annotation: PublicEvidenceAnnotation }) {
  return (
    <li className="grid gap-2 border-t border-[var(--border)] py-3 sm:grid-cols-[4rem_1fr]">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{annotation.label}</span>
      <span className="text-sm leading-6 text-[var(--muted)]">{annotation.description}</span>
    </li>
  );
}
