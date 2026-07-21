import type { PublicEvidenceAnnotation } from "@/types/evidence";

export function EvidenceAnnotation({ annotation }: { annotation: PublicEvidenceAnnotation }) {
  return (
    <li className="grid gap-x-4 gap-y-1 border-t border-[var(--border)] py-3 sm:grid-cols-[7rem_1fr]">
      <span className="font-mono text-xs uppercase leading-5 tracking-[0.08em] text-[var(--accent)]">{annotation.label}</span>
      <span className="min-w-0 break-words text-sm leading-6 text-[var(--muted)]">{annotation.description}</span>
    </li>
  );
}
