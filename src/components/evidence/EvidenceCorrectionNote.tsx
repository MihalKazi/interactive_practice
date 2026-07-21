import type { PublicEvidenceStatus } from "@/types/evidence-release";

export function EvidenceCorrectionNote({
  status,
  date,
  explanation,
  replacementReference,
}: {
  status: PublicEvidenceStatus;
  date?: string;
  explanation?: string;
  replacementReference?: string;
}) {
  if (!explanation && status === "active") return null;
  return (
    <aside className="border-t border-[var(--border)] p-4 text-sm" aria-live="polite">
      <p className="font-semibold">Evidence status: {status}</p>
      {date ? <p className="mt-1 text-[var(--muted)]">{date}</p> : null}
      {explanation ? <p className="mt-2 leading-6 text-[var(--muted)]">{explanation}</p> : null}
      {replacementReference ? <p className="mt-2 font-mono text-xs text-[var(--muted)]">Replacement: {replacementReference}</p> : null}
    </aside>
  );
}
