import type { Statistic } from "@/types/report";

export function StatCard({ stat }: { stat: Statistic }) {
  return (
    <article className="border-l border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="font-serif text-4xl leading-none text-[var(--foreground)] sm:text-5xl">
        {stat.value}
      </p>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
        {stat.label}
      </h3>
      {stat.note ? <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{stat.note}</p> : null}
    </article>
  );
}
