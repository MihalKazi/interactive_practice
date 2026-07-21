import { report } from "@/data/report";

const markerCount = 61;

export function MarkerField({ step }: { step: number }) {
  return (
    <div>
      <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
        {Array.from({ length: markerCount }).map((_, index) => {
          const identity = index < 42 ? "fake" : index < 60 ? "apparent" : "unknown";
          const visible = step === 0 ? index === 0 || index < 18 : true;
          const emph =
            (step === 1 && identity === "fake") ||
            (step === 2 && index < 38) ||
            step === 3;
          return (
            <span
              key={index}
              className={`marker-dot ${identity} ${emph ? "emph" : ""}`}
              style={{ opacity: visible ? 1 : 0.14 }}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <div className="mt-6 border-t border-[var(--border)] pt-5">
        {step === 0 ? <p className="font-mono text-4xl">n=61</p> : null}
        {step === 1 ? <p className="font-mono text-4xl">42 of 61 / 68.9%</p> : null}
        {step === 2 ? <p className="font-mono text-4xl">38 public follower records</p> : null}
        {step === 3 ? (
          <>
            <p className="font-mono text-5xl">815,000+</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Aggregate publicly visible follower count across 38 accounts; not unique reach, impressions, engagement, or verified exposure.</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function TriggeringVisual({ step }: { step: number }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 border border-[var(--border)] p-4">
        <p className="eyebrow text-[var(--muted)]">Diagrammatic reconstruction</p>
        <div className="h-4 w-1/2 bg-[var(--border)]" />
        <div className="h-16 border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`h-7 border border-[var(--border)] ${step >= 2 && index % 3 === 0 ? "bg-[color-mix(in_srgb,var(--warning)_18%,transparent)]" : "bg-[color-mix(in_srgb,var(--surface)_60%,transparent)]"}`}
            />
          ))}
        </div>
      </div>
      {step === 0 ? <p className="font-mono text-2xl">National event / Abyei, Sudan</p> : null}
      {step === 1 ? <p className="font-mono text-2xl">Public mourning space</p> : null}
      {step === 2 ? <p className="border-l-2 border-[var(--warning)] pl-3 text-sm">Content warning: hostile narrative markers shown without full violent text.</p> : null}
      {step === 3 ? <p className="font-mono text-4xl">28 of 97</p> : null}
    </div>
  );
}

export function TimelineVisual({ step }: { step: number }) {
  return (
    <div className="timeline-visual">
      {report.timeline.map((point, index) => (
        <div key={point.year} className={`timeline-node ${index === step ? "is-active" : ""}`}>
          <span className="font-mono text-sm">{point.year}</span>
          <strong>{point.title}</strong>
        </div>
      ))}
    </div>
  );
}

export function NarrativeVisual({ index }: { index: number }) {
  const labels = ["Route motif", "Comment space", "Incident strip", "Redacted document"];
  return (
    <div className={`narrative-visual motif-${index}`}>
      <p className="eyebrow text-[var(--muted)]">{labels[index]}</p>
      <div className="mt-8 h-56 border border-[var(--border)] bg-[var(--background)]">
        <svg viewBox="0 0 420 220" className="h-full w-full" role="img" aria-label={`${labels[index]} visual placeholder`}>
          <path d="M30 150 C 120 40, 260 210, 390 70" fill="none" stroke="var(--data-secondary)" strokeWidth="2" strokeDasharray={index === 0 ? "4 8" : "0"} />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={42 + i * 58} y={index === 3 ? 48 + i * 18 : 90 + (i % 2) * 28} width="40" height="12" fill={i % 2 ? "var(--border)" : "var(--accent-muted)"} />
          ))}
          {index === 2 ? <line x1="40" y1="175" x2="380" y2="175" stroke="var(--foreground)" strokeWidth="1" /> : null}
        </svg>
      </div>
    </div>
  );
}
