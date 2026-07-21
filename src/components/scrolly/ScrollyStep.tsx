import { EditorialStatus } from "@/components/report/EditorialStatus";
import type { EditorialStatus as EditorialStatusType } from "@/types/report";

export type ScrollyStepData = {
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  status?: EditorialStatusType;
};

export function ScrollyStep({
  step,
  index,
  active,
}: {
  step: ScrollyStepData;
  index: number;
  active: boolean;
}) {
  return (
    <article className={`scrolly-step ${active ? "is-active" : ""}`} data-step-index={index}>
      <p className="font-mono text-sm text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
      {step.eyebrow ? <p className="eyebrow mt-4 text-[var(--muted)]">{step.eyebrow}</p> : null}
      <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
      <div className="mt-4 space-y-4 text-base leading-8 text-[var(--muted)]">{step.body}</div>
      {step.status ? <EditorialStatus status={step.status} className="mt-5" /> : null}
    </article>
  );
}
