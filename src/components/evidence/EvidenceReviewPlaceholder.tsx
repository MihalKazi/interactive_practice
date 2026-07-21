import { ImageOff } from "lucide-react";
import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceReviewPlaceholder({ record }: { record: EvidenceRecord }) {
  return (
    <div className="evidence-placeholder" role="img" aria-label={`${record.id} image not yet added`}>
      <ImageOff className="h-8 w-8 text-[var(--muted)]" aria-hidden="true" strokeWidth={1.5} />
      <span className="evidence-placeholder__badge evidence-status-pill evidence-status-pill--pending">Pending review</span>
      <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted)]">{record.summary}</p>
    </div>
  );
}
