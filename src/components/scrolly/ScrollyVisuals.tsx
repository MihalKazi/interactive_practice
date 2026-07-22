"use client";

import { useEffect, useState } from "react";
import { UserRound, UserRoundX } from "lucide-react";
import { CountValue } from "@/components/report/StatGrid";
import { useReportContent } from "@/components/providers/ReportContentProvider";

type ReframeSegment = { text: string } | { term: keyof typeof glossary };

const glossary = {
  murtad: "Arabic term for “apostate” — one who has left the faith. Used here to strip the fallen soldiers of martyr status.",
  taghut: "Term for an illegitimate or tyrannical authority operating outside “proper” religious law — used to delegitimize the state itself.",
} as const;

function seg(text: string): ReframeSegment {
  return { text };
}
function term(id: keyof typeof glossary): ReframeSegment {
  return { term: id };
}

const reframeStages: {
  label: string;
  hasReply: boolean;
  posted: string;
  reframed: ReframeSegment[];
  why: string;
  flagged: boolean;
}[] = [
  {
    label: "National event / Abyei, Sudan",
    hasReply: false,
    posted: "Official condolence statements from state leaders and major political figures, made in the immediate aftermath.",
    reframed: [seg("No hostile reply observed yet — mourning was still in its public, unchallenged phase.")],
    why: "Baseline stage: included for contrast so the shift in stages 3-4 reads as a change, not the starting condition.",
    flagged: false,
  },
  {
    label: "Public mourning space",
    hasReply: true,
    posted: "Condolence posts from the Prime Minister's page and the Jamaat-e-Islami party page, addressed to the fallen peacekeepers.",
    reframed: [seg("A reply appears beneath the condolence post — the entry point for hostile narrative framing.")],
    why: "Analysts flag this as the pivot point: the same public post that carried mourning also carried, unmoderated, the earliest hostile replies.",
    flagged: false,
  },
  {
    label: "Narrative intrusion",
    hasReply: true,
    posted: "Standard condolence-message text, paraphrased here and stripped of identifying detail.",
    reframed: [
      seg("Recasts the fallen soldiers as "),
      term("murtad"),
      seg(", serving a "),
      term("taghut"),
      seg(" state — denying them martyrdom status."),
    ],
    why: "Reframing a state death as religious betrayal is a recurring propaganda pattern in this dataset — it converts sympathy into a recruitment/legitimacy argument.",
    flagged: true,
  },
  {
    label: "Measured observation",
    hasReply: true,
    posted: "97 total comments examined on one condolence post.",
    reframed: [
      seg("28 of 97 (28.9%) replies explicitly used the term "),
      term("murtad"),
      seg(". A bounded finding on one thread, not a claim about all public reaction."),
    ],
    why: "Reported as a share of one thread, not extrapolated to the platform or the wider public — avoids overstating coordination from a single sample.",
    flagged: true,
  },
];

export function TriggeringVisual({ step }: { step: number }) {
  const stage = reframeStages[step] ?? reframeStages[0];
  const [showWhy, setShowWhy] = useState(false);
  const [activeTerm, setActiveTerm] = useState<keyof typeof glossary | null>(null);
  useEffect(() => {
    setShowWhy(false);
    setActiveTerm(null);
  }, [step]);

  return (
    <div className="space-y-3">
      <p className="eyebrow text-[var(--muted)]">{stage.label}</p>
      <div className="reframe-thread">
        <div className="thread-comment">
          <span className="thread-badge">Original post</span>
          <span className="thread-avatar" aria-hidden="true">
            <UserRound className="thread-avatar-icon" />
          </span>
          <div className="thread-body">
            <p className="thread-name">Official condolence page <span className="thread-time">· Dec 13, 2025</span></p>
            <p className="thread-text">{stage.posted}</p>
            <div className="thread-footer">
              <span>Like</span>
              <span>Reply</span>
              <span>Share</span>
            </div>
          </div>
        </div>

        {stage.hasReply ? (
          <div className={`thread-comment thread-reply ${stage.flagged ? "flagged" : ""}`}>
            <span className={`thread-badge ${stage.flagged ? "flagged" : ""}`}>Hostile reply</span>
            <span className="thread-avatar reply" aria-hidden="true">
              <UserRoundX className="thread-avatar-icon" />
            </span>
            <div className="thread-body">
              <p className="thread-name">Unverified account <span className="thread-time">· reply</span></p>
              <p className="thread-text">
                {stage.reframed.map((part, index) =>
                  "term" in part ? (
                    <button
                      key={index}
                      type="button"
                      className="glossary-chip"
                      aria-pressed={activeTerm === part.term}
                      onClick={() => setActiveTerm((current) => (current === part.term ? null : part.term))}
                    >
                      {part.term}
                    </button>
                  ) : (
                    <span key={index}>{part.text}</span>
                  ),
                )}
              </p>
              {activeTerm ? (
                <div className="glossary-popover" role="note" aria-live="polite">
                  <p className="glossary-popover-term">{activeTerm}</p>
                  <p>{glossary[activeTerm]}</p>
                </div>
              ) : null}
              <div className="thread-footer">
                <span>Like</span>
                <span>Reply</span>
                <span>Share</span>
              </div>
              <button
                type="button"
                className="reframe-why-toggle"
                aria-expanded={showWhy}
                onClick={() => setShowWhy((v) => !v)}
              >
                {showWhy ? "Hide analyst note" : "Why this counts as reframing"}
              </button>
              {showWhy ? <p className="reframe-why-note">{stage.why}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
      {step === 3 ? (
        <p className="font-mono text-4xl">
          <CountValue value="28" /> of <CountValue value="97" />
        </p>
      ) : null}
    </div>
  );
}

export function TimelineVisual({ step }: { step: number }) {
  const report = useReportContent();
  return (
    <div className="timeline-visual">
      {report.timeline.map((point, index) => (
        <div key={point.year} className={`timeline-node ${index === step ? "is-active" : ""}`}>
          <span className="font-mono text-sm font-semibold text-(--accent)">{point.year}</span>
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
