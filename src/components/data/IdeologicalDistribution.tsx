"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MethodologyNote } from "@/components/report/MethodologyNote";
import { useReportContent } from "@/components/providers/ReportContentProvider";
import { buildAccessibleChartSummary, formatPercentage, TOTAL_PROFILES, validateCategoryTotal } from "@/lib/report-data";
import type { ChartViewMode, IdeologicalCategory } from "@/types/report";

const caution =
  "Ideological similarity does not by itself establish direct coordination.";

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: IdeologicalCategory & { displayValue: number } }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload as IdeologicalCategory & { displayValue: number };
  return (
    <div className="max-w-xs border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm shadow-lg">
      <p className="font-semibold">{item.label}</p>
      <p className="mt-2 font-mono">{item.value} profiles / {formatPercentage(item.value)}</p>
      <p className="mt-2 leading-6 text-[var(--muted)]">{item.description}</p>
      {item.overlapNote ? <p className="mt-2 leading-6 text-[var(--muted)]">{item.overlapNote}</p> : null}
      <p className="mt-2 leading-6 text-[var(--muted)]">{caution}</p>
    </div>
  );
}

export function IdeologicalDistribution() {
  const report = useReportContent();
  const [mode, setMode] = useState<ChartViewMode>("count");
  const categories = report.ideologicalCategories;
  validateCategoryTotal(categories);
  const data = useMemo(
    () =>
      categories.map((item) => ({
        ...item,
        displayValue: mode === "count" ? item.value : Number(((item.value / TOTAL_PROFILES) * 100).toFixed(1)),
      })),
    [categories, mode],
  );
  const summary = buildAccessibleChartSummary(categories);

  return (
    <section aria-labelledby="ideological-distribution-title" className="mt-12 border-t border-[var(--border)] pt-10">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_0.28fr]">
        <div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[var(--accent)]">n=61</p>
              <h3 id="ideological-distribution-title" className="mt-3 text-3xl font-semibold">
                Ideological classification
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Five verified aggregate classifications from the analysed sample.
              </p>
            </div>
            <div role="group" aria-label="Ideological chart view mode" className="flex flex-wrap gap-2">
              {(["count", "percentage"] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  aria-pressed={mode === view}
                  onClick={() => setMode(view)}
                  className="min-h-11 border border-[var(--border)] px-4 py-2 text-sm font-semibold capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--selection-ring)] aria-pressed:border-[var(--foreground)] aria-pressed:bg-[var(--foreground)] aria-pressed:text-[var(--background)]"
                >
                  {view === "count" ? "Count" : "Percentage"}
                </button>
              ))}
            </div>
          </div>

          <p className="sr-only">{summary}</p>
          <div className="ideology-chart mt-8 hidden h-[390px] md:block" aria-label={summary}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 8, right: 42, bottom: 8, left: 12 }}>
                <XAxis type="number" domain={[0, mode === "count" ? 24 : 40]} tick={{ fill: "var(--muted)", fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis dataKey="shortLabel" type="category" width={190} tick={{ fill: "var(--foreground)", fontSize: 13 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--chart-track)" }} />
                <Bar dataKey="displayValue" radius={0} isAnimationActive>
                  {data.map((entry) => (
                    <Cell key={entry.id} fill="var(--data-primary)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ul className="mt-8 space-y-4 md:hidden">
            {categories.map((item) => (
              <li key={item.id}>
                <button type="button" className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--selection-ring)]">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-2 grid grid-cols-[1fr_auto] items-center gap-3">
                    <span className="h-3 bg-[var(--chart-track)]"><span className="block h-3 bg-[var(--data-primary)]" style={{ width: `${(item.value / 22) * 100}%` }} /></span>
                    <span className="font-mono text-sm">{mode === "count" ? item.value : formatPercentage(item.value)}</span>
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-[var(--muted)]">{item.description} {item.overlapNote ?? ""} {caution}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <MethodologyNote title="Classification caution">
          The published category totals sum to 61. However, the report describes the Al-Qaeda category as including overlapping TTP ties. Before final publication, researchers should clarify whether the categories are mutually exclusive and how overlapping affiliations were coded.
          <br /><br />
          These classifications describe the analysed sample. They do not establish that every account belonged to, was directed by, or formally represented the named organisations.
        </MethodologyNote>
      </div>

      <details className="mt-8 border-y border-[var(--border)] py-4" open>
        <summary className="cursor-pointer font-semibold">View the data table</summary>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <caption className="mb-3 text-left text-[var(--muted)]">Ideological classification values for 61 analysed profiles.</caption>
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th scope="col" className="py-3 pr-4">Classification</th>
                <th scope="col" className="py-3 pr-4">Profiles</th>
                <th scope="col" className="py-3">Percentage of sample</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id} className="border-b border-[var(--border-subtle)]">
                  <th scope="row" className="py-3 pr-4 font-semibold">{item.label}</th>
                  <td className="py-3 pr-4 font-mono">{item.value}</td>
                  <td className="py-3 font-mono">{formatPercentage(item.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
