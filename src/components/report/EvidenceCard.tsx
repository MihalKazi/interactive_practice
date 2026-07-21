import type { EvidenceItem } from "@/types/report";
import { EditorialStatus } from "@/components/report/EditorialStatus";
import { Card } from "@/components/ui/Card";

export function EvidenceCard({ item }: { item: EvidenceItem }) {
  return (
    <Card className="flex h-full flex-col gap-5 p-0">
      <div className="flex aspect-[16/10] items-center justify-center border-b border-dashed border-[var(--border)] bg-[var(--background)] px-6 text-center text-sm text-[var(--muted)]">
        Verified evidence image pending editorial review
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-0">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            Evidence {item.id.replace("EV-", "")}
          </p>
          <h3 className="mt-2 text-xl font-semibold">{item.type}</h3>
        </div>
        <dl className="grid gap-3 border-y border-[var(--border)] py-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--muted)]">Date</dt>
            <dd className="font-mono">{item.date}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Anonymised label</dt>
            <dd>{item.accountLabel}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Verification</dt>
            <dd>{item.verificationStatus}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Redaction</dt>
            <dd>{item.redactionStatus ?? "Redaction required"}</dd>
          </div>
        </dl>
        <p className="text-sm leading-7 text-[var(--muted)]">{item.description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          <EditorialStatus status="Editorial review required" />
          {item.translationStatus ? <EditorialStatus status="Translation review required" /> : null}
        </div>
      </div>
    </Card>
  );
}
