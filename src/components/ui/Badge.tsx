import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
