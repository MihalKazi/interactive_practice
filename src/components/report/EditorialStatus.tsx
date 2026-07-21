import type { EditorialStatus as EditorialStatusType } from "@/types/report";
import { cn } from "@/lib/utils";

const tone: Record<EditorialStatusType, string> = {
  "Documented finding": "border-[var(--data-primary)] text-[var(--data-primary)]",
  Analysis: "border-[var(--data-secondary)] text-[var(--data-secondary)]",
  "Editorial review required": "border-[var(--warning)] text-[var(--warning)]",
  "Legal review required": "border-[var(--warning)] text-[var(--warning)]",
  "Evidence pending": "border-[var(--muted)] text-[var(--muted)]",
  "Translation review required": "border-[var(--accent)] text-[var(--accent)]",
  "Methodology clarification required": "border-[var(--accent)] text-[var(--accent)]",
};

export function EditorialStatus({
  status,
  className,
}: {
  status: EditorialStatusType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center border px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em]",
        tone[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
