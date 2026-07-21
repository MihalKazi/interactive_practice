import type { EditorialStatus as EditorialStatusType, EvidenceItem } from "@/types/report";
import { EditorialStatus } from "@/components/report/EditorialStatus";

export function EvidenceFrame({
  item,
  stage = 0,
  caption,
}: {
  item: EvidenceItem;
  stage?: number;
  caption?: string;
}) {
  const status = (item.editorialStatus || "Editorial review required") as EditorialStatusType;
  return (
    <article className="evidence-frame">
      <header className="grid gap-3 border-b border-[var(--border)] p-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{item.id}</p>
          <h3 className="mt-1 text-xl font-semibold">{item.type}</h3>
        </div>
        <EditorialStatus status={status} />
      </header>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
        <div className="absolute inset-5 border border-dashed border-[var(--border)]" />
        <div className="absolute left-[12%] right-[12%] top-[18%] space-y-3">
          <div className="h-5 w-2/3 bg-[var(--border-subtle)]" />
          <div className={`h-16 border border-[var(--border)] bg-[var(--surface)] ${stage >= 1 ? "opacity-35" : ""}`} />
          <div className={`h-16 border border-[var(--border)] bg-[var(--surface)] ${stage >= 2 ? "ring-2 ring-[var(--warning)]" : ""}`} />
          <div className={`h-12 border border-[var(--border)] bg-[var(--surface)] ${stage >= 3 ? "opacity-35" : ""}`} />
        </div>
        {stage >= 2 ? <div className="absolute right-[18%] top-[48%] border border-[var(--warning)] bg-[var(--surface-elevated)] px-3 py-2 text-xs">Annotation region</div> : null}
        <div className="absolute inset-x-0 bottom-0 bg-[var(--surface-elevated)] p-3 text-center text-sm text-[var(--muted)]">
          Verified evidence image pending editorial approval
        </div>
      </div>
      <dl className="grid gap-3 border-t border-[var(--border)] p-4 text-sm sm:grid-cols-3">
        <div><dt className="text-[var(--muted)]">Capture date</dt><dd>{item.date}</dd></div>
        <div><dt className="text-[var(--muted)]">Verification</dt><dd>{item.verificationStatus}</dd></div>
        <div><dt className="text-[var(--muted)]">Redaction</dt><dd>{item.redactionStatus ?? "Required"}</dd></div>
      </dl>
      {caption ? <p className="border-t border-[var(--border)] p-4 text-sm leading-7 text-[var(--muted)]">{caption}</p> : null}
    </article>
  );
}
