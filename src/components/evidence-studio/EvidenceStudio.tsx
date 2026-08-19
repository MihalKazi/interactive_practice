"use client";

import { useEffect, useMemo, useState } from "react";
import type { EvidenceReviewState, RegionKind, ReviewRegion } from "@/types/evidence-review";

type ManifestItem = {
  extractionId: string;
  proposedFigureId: string;
  width: number | null;
  height: number | null;
  hashPrefix: string;
};

const tools: RegionKind[] = ["solid-redaction", "blur", "pixelate", "highlight", "annotation", "crop"];
const toolLabels: Record<RegionKind, string> = {
  "solid-redaction": "Hide text/name",
  blur: "Blur area",
  pixelate: "Pixelate photo",
  highlight: "Highlight evidence",
  annotation: "Add note",
  crop: "Set crop",
};

const modeLabels = {
  redaction: "Edit safe version",
  public: "Website preview",
  original: "View source image",
} as const;

const decisionLabels = {
  pending: "Not reviewed",
  confirmed: "Correct figure",
  rejected: "Wrong image",
  uncertain: "Unsure",
  duplicate: "Duplicate",
  "unrelated-image": "Unrelated",
} as const;

const checklistByFigure: Record<string, string[]> = {
  "FIG-001": [
    "Does this show a repost or reshared condolence context?",
    "Should account name and profile image be hidden?",
    "Is enough original-post context preserved?",
    "Is any long inflammatory caption avoided in public copy?",
  ],
  "FIG-002": [
    "Is this the comment collage from one defined comment section?",
    "Are unrelated commenter names and photos visible?",
    "Does it support the 28-of-97 observation?",
    "Is the counting boundary documented?",
  ],
  "FIG-003": [
    "Is this the expected 2015 document or webpage?",
    "Is title/date/archive status confirmed?",
    "Is any direct extremist URL hidden?",
    "Is only the minimum necessary excerpt identified?",
  ],
  "FIG-004": [
    "Is the deployment-related post or photocard visible?",
    "Are event context and campaign framing separated?",
    "Are account identity and platform details necessary?",
    "Is the deployment date confirmed?",
  ],
  "FIG-005": [
    "Is the repeated hashtag or caption pattern visible?",
    "Are unrelated user identities hidden?",
    "Does the note avoid claiming coordination from repetition alone?",
    "Are relevant timestamps preserved?",
  ],
  "FIG-006": [
    "Does this contain language analysed as incitement?",
    "Can most text remain covered?",
    "Are Bengali and English translation reviews still required?",
    "Should public display stay user-reveal only?",
  ],
};

function uid() {
  return `region-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function allRegions(item: EvidenceReviewState) {
  return [...item.redactionRegions, ...item.highlightRegions, ...item.annotationRegions, ...(item.cropRegion ? [item.cropRegion] : [])];
}

function blockers(item: EvidenceReviewState) {
  const list = [
    item.matchDecision !== "confirmed" && "Figure match unconfirmed",
    !item.reviewerInitials && "Missing reviewer initials",
    !item.publicCaptionDraft && "Public caption missing",
    !item.accessibilityDescription && "Accessibility description missing",
    item.privacyDecision === "redaction-required" && item.redactionRegions.length === 0 && "Required redaction regions missing",
    item.legalDecision === "legal-review-required" && "Legal review required",
    item.translationDecision === "translation-review-required" && "Translation review required",
    item.rightOfReplyDecision === "not-assessed" && "Right-of-reply decision unresolved",
    "Publication remains intentionally disabled",
  ].filter(Boolean) as string[];
  return list;
}

function friendlyStatus(item: EvidenceReviewState) {
  if (item.matchDecision === "confirmed" && blockers(item).length === 1) return "Ready for senior review";
  if (item.matchDecision === "confirmed") return "Matched, needs review work";
  if (item.matchDecision === "uncertain") return "Needs second look";
  if (item.matchDecision === "rejected") return "Rejected";
  return "Not reviewed";
}

function websiteSlot(item: EvidenceReviewState) {
  const slots: Record<string, string> = {
    "FIG-001": "Triggering event evidence",
    "FIG-002": "Comment-count evidence",
    "FIG-003": "Historical-origin evidence",
    "FIG-004": "Deployment narrative evidence",
    "FIG-005": "Domestic-incident evidence",
    "FIG-006": "Sensitive incitement evidence",
  };
  return slots[item.proposedFigureId] ?? "Website evidence item";
}

export function EvidenceStudio({
  manifest,
  initialItems,
  initialActiveId,
  initialMode = "redaction",
  summary = false,
}: {
  manifest: ManifestItem[];
  initialItems: EvidenceReviewState[];
  initialActiveId?: string;
  initialMode?: "redaction" | "public" | "original";
  summary?: boolean;
}) {
  const [items, setItems] = useState(initialItems);
  const activeId = initialActiveId || initialItems[0]?.extractionId || "";
  const [tool, setTool] = useState<RegionKind>("solid-redaction");
  const mode = initialMode;
  const [selectedRegion, setSelectedRegion] = useState("");
  const [saveState, setSaveState] = useState("Saved");
  const active = items.find((item) => item.extractionId === activeId) ?? items[0];
  const meta = manifest.find((item) => item.extractionId === active?.extractionId);
  const dirty = saveState === "Unsaved";

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const updateActive = (next: EvidenceReviewState) => {
    setItems((current) => current.map((item) => (item.extractionId === next.extractionId ? next : item)));
    setSaveState("Unsaved");
  };

  const saveRegions = async () => {
    await fetch("/api/dev/evidence-review/regions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        extractionId: active.extractionId,
        reviewerInitials: active.reviewerInitials,
        redactionRegions: active.redactionRegions,
        highlightRegions: active.highlightRegions,
        annotationRegions: active.annotationRegions,
        cropRegion: active.cropRegion,
      }),
    });
    setSaveState(`Saved ${new Date().toLocaleTimeString()}`);
  };

  const saveMatch = async () => {
    const response = await fetch("/api/dev/evidence-review/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(active),
    });
    setSaveState(response.ok ? `Saved ${new Date().toLocaleTimeString()}` : "Save error");
  };

  const saveMetadata = async () => {
    const response = await fetch("/api/dev/evidence-review/metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(active),
    });
    setSaveState(response.ok ? `Saved ${new Date().toLocaleTimeString()}` : "Save error");
  };

  const exportConfig = async () => {
    const response = await fetch("/api/dev/evidence-review/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewerInitials: active.reviewerInitials }),
    });
    setSaveState(response.ok ? "Exported private config" : "Export error");
  };

  const publishLocal = async () => {
    setSaveState("Publishing to local website...");
    await saveMetadata();
    const response = await fetch("/api/dev/evidence-review/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extractionId: active.extractionId, reviewerInitials: active.reviewerInitials }),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok) {
      setSaveState("Published. Refresh the website page to see it.");
      return;
    }
    setSaveState(result.error || "Publish failed");
  };

  const uploadItem = async (formData: FormData) => {
    setSaveState("Uploading...");
    const response = await fetch("/api/dev/evidence-review/upload", {
      method: "POST",
      body: formData,
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.extractionId) {
      window.location.href = `/dev/evidence-studio?item=${result.extractionId}&mode=redaction`;
      return;
    }
    setSaveState(result.error || "Upload failed");
  };

  const removeItem = async () => {
    if (!active) return;
    if (!confirm(`Remove ${websiteSlot(active)} from the studio? The private original will move to private/evidence/removed, not public/.`)) return;
    const response = await fetch("/api/dev/evidence-review/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extractionId: active.extractionId, reviewerInitials: active.reviewerInitials }),
    });
    setSaveState(response.ok ? "Removed item" : "Remove failed");
    if (response.ok) window.location.href = "/dev/evidence-studio";
  };

  const addRegion = (region: Omit<ReviewRegion, "id" | "type" | "label" | "privateNote" | "step" | "mobileOrder" | "visibleInPreview">) => {
    const nextRegion: ReviewRegion = {
      id: uid(),
      type: tool,
      label: tool,
      privateNote: "",
      step: 0,
      mobileOrder: allRegions(active).length + 1,
      visibleInPreview: true,
      ...region,
    };
    const next = { ...active };
    if (tool === "crop") next.cropRegion = nextRegion;
    else if (tool === "highlight") next.highlightRegions = [...next.highlightRegions, nextRegion];
    else if (tool === "annotation") next.annotationRegions = [...next.annotationRegions, nextRegion];
    else next.redactionRegions = [...next.redactionRegions, nextRegion];
    updateActive(next);
    setSelectedRegion(nextRegion.id);
  };

  const deleteRegion = (id: string) => {
    if (!confirm("Delete selected region?")) return;
    updateActive({
      ...active,
      redactionRegions: active.redactionRegions.filter((r) => r.id !== id),
      highlightRegions: active.highlightRegions.filter((r) => r.id !== id),
      annotationRegions: active.annotationRegions.filter((r) => r.id !== id),
      cropRegion: active.cropRegion?.id === id ? null : active.cropRegion,
    });
    setSelectedRegion("");
  };

  const summaryRows = useMemo(() => items.map((item) => ({ item, issues: blockers(item) })), [items]);

  if (summary) {
    return (
      <div className="studio-shell">
        <StudioBanner />
        <div className="studio-summary">
          <h1>Website evidence summary</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Simple readiness board. Nothing here publishes evidence.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead><tr>{["Website item", "Status", "Boxes drawn", "Caption", "Needs", "Website publish"].map((h) => <th key={h} className="border-b border-[var(--border)] p-2">{h}</th>)}</tr></thead>
              <tbody>{summaryRows.map(({ item, issues }) => <tr key={item.extractionId}><td className="p-2">{websiteSlot(item)}</td><td className="p-2">{friendlyStatus(item)}</td><td className="p-2">{item.redactionRegions.length + item.highlightRegions.length + item.annotationRegions.length}</td><td className="p-2">{item.publicCaptionDraft ? "Drafted" : "Missing"}</td><td className="p-2">{issues.filter((issue) => issue !== "Publication remains intentionally disabled").slice(0, 3).join(", ") || "Senior review"}</td><td className="p-2">Off</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (!active) return <p>No extracted evidence manifest found. Run npm run evidence:extract.</p>;

  return (
    <div className="studio-shell">
      <StudioBanner />
      <aside className="studio-list">
        <div className="studio-list-heading">
          <p className="eyebrow">Website Items</p>
          <a href="/dev/evidence-studio?view=summary">Summary</a>
        </div>
        <form
          className="studio-upload"
          onSubmit={(event) => {
            event.preventDefault();
            void uploadItem(new FormData(event.currentTarget));
          }}
        >
          <label>
            Add image
            <input name="file" type="file" accept="image/png,image/jpeg,image/webp" />
          </label>
          <label>
            Website slot
            <select name="figureId" defaultValue="FIG-001">
              {["FIG-001", "FIG-002", "FIG-003", "FIG-004", "FIG-005", "FIG-006"].map((figure) => (
                <option key={figure} value={figure}>{figure.replace("FIG-", "Figure ")}</option>
              ))}
            </select>
          </label>
          <button type="submit">Add to website editor</button>
          <small>Appears here for review. It is not published to the live website.</small>
        </form>
        {items.map((item) => (
          <a
            key={item.extractionId}
            href={`/dev/evidence-studio?item=${item.extractionId}&mode=${mode}`}
            className={`studio-list-item ${item.extractionId === active.extractionId ? "active" : ""}`}
          >
            <span>{websiteSlot(item)}</span>
            <strong>{friendlyStatus(item)}</strong>
            <small>{blockers(item).length} open items</small>
          </a>
        ))}
      </aside>
      <main className="studio-main">
        <div className="studio-titlebar">
          <div>
            <p className="eyebrow">Website Evidence Editor</p>
            <h1>{websiteSlot(active)}</h1>
            <p className="studio-help">{active.expectedContent}</p>
          </div>
          <div className="studio-pub-state">Not published</div>
        </div>
        <div className="studio-toolbar">
          <strong>{modeLabels[mode]}</strong>
          <span>{meta?.width} x {meta?.height}px</span>
          <details>
            <summary>Technical details</summary>
            <span>Local ID {active.extractionId}</span>
            <span>hash {meta?.hashPrefix}</span>
          </details>
          <span>{saveState}</span>
          <button type="button" className="studio-danger-action" onClick={removeItem}>Remove this item</button>
          {(["redaction", "public", "original"] as const).map((nextMode) => (
            <a
              key={nextMode}
              href={`/dev/evidence-studio?item=${active.extractionId}&mode=${nextMode}`}
              data-mode-button={nextMode}
              aria-current={mode === nextMode ? "true" : undefined}
            >
              {modeLabels[nextMode]}
            </a>
          ))}
        </div>
        <ImageWorkbench item={active} mode={mode} tool={tool} selectedRegion={selectedRegion} onSelect={setSelectedRegion} onCreate={addRegion} />
        <div className="studio-bottom">
          <RegionList item={active} selected={selectedRegion} onSelect={setSelectedRegion} onDelete={deleteRegion} />
          <ValidationPanel issues={blockers(active)} />
        </div>
      </main>
      <aside className="studio-panel">
        <section className="studio-step-primary">
          <h2>Step 1: Pick if this image belongs here</h2>
          <p className="studio-help">Expected: {active.expectedCaption}</p>
          <div className="studio-choice-grid">
            {(["confirmed", "uncertain", "rejected"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={active.matchDecision === value}
                onClick={() => updateActive({ ...active, matchDecision: value, confirmedFigureId: value === "confirmed" ? active.proposedFigureId : active.confirmedFigureId })}
              >
                {decisionLabels[value]}
              </button>
            ))}
          </div>
          <label>How confident are you? <select value={active.matchConfidence} onChange={(e) => updateActive({ ...active, matchConfidence: e.target.value as EvidenceReviewState["matchConfidence"] })}>{["low", "medium", "high"].map((v) => <option key={v}>{v}</option>)}</select></label>
          <label>Your initials <input value={active.reviewerInitials} onChange={(e) => updateActive({ ...active, reviewerInitials: e.target.value })} /></label>
          <label>Reviewer note <textarea value={active.matchNotes} onChange={(e) => updateActive({ ...active, matchNotes: e.target.value })} placeholder="What did you check? What still worries you?" /></label>
          <button type="button" onClick={saveMatch}>Save Step 1</button>
        </section>
        <section>
          <h2>Step 2: Checklist</h2>
          <ul className="studio-checklist">
            {(checklistByFigure[active.proposedFigureId] ?? []).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section>
          <h2>Step 3: Hide or highlight parts</h2>
          <p className="studio-help">Use this only after viewing the source image locally. Draw boxes; nothing is published.</p>
          <div className="studio-tools">{tools.map((nextTool) => <button key={nextTool} type="button" aria-pressed={tool === nextTool} onClick={() => setTool(nextTool)}>{toolLabels[nextTool]}</button>)}</div>
          <button type="button" onClick={saveRegions}>Save Step 3</button>
        </section>
        <section className="studio-step-primary">
          <h2>Step 4: Write what appears on website</h2>
          <label>Public caption draft <textarea value={active.publicCaptionDraft} onChange={(e) => updateActive({ ...active, publicCaptionDraft: e.target.value })} placeholder="Short, careful caption for readers." /></label>
          <small>{active.publicCaptionDraft.trim().split(/\s+/).filter(Boolean).length} words</small>
          <label>Accessibility description <textarea value={active.accessibilityDescription} onChange={(e) => updateActive({ ...active, accessibilityDescription: e.target.value })} placeholder="Describe the evidentiary function, not every word." /></label>
          <h3 className="mt-4 font-semibold">Senior review needed</h3>
          <label>Privacy <select value={active.privacyDecision} onChange={(e) => updateActive({ ...active, privacyDecision: e.target.value as EvidenceReviewState["privacyDecision"] })}>{["unreviewed", "redaction-required", "redacted", "approved"].map((v) => <option key={v}>{v}</option>)}</select></label>
          <label>Legal <select value={active.legalDecision} onChange={(e) => updateActive({ ...active, legalDecision: e.target.value as EvidenceReviewState["legalDecision"] })}>{["pending", "approved", "restricted", "legal-review-required"].map((v) => <option key={v}>{v}</option>)}</select></label>
          <label>Translation <select value={active.translationDecision} onChange={(e) => updateActive({ ...active, translationDecision: e.target.value as EvidenceReviewState["translationDecision"] })}>{["not-required", "machine-draft", "researcher-reviewed", "independently-reviewed", "translation-review-required"].map((v) => <option key={v}>{v}</option>)}</select></label>
          <div className="studio-action-row">
            <button type="button" className="studio-publish-action" onClick={publishLocal}>Publish to local website</button>
            <button type="button" onClick={saveMetadata}>Save Step 4</button>
            <button type="button" onClick={exportConfig}>Send saved draft to developer</button>
          </div>
        </section>
      </aside>
    </div>
  );
}

function StudioBanner() {
  return <div className="studio-banner">LOCAL WEBSITE EVIDENCE EDITOR. Nothing publishes from here. Do not screenshot private originals.</div>;
}

function ImageWorkbench({ item, mode, tool, selectedRegion, onSelect, onCreate }: { item: EvidenceReviewState; mode: string; tool: RegionKind; selectedRegion: string; onSelect: (id: string) => void; onCreate: (region: { x: number; y: number; width: number; height: number }) => void }) {
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [revealedExtractionId, setRevealedExtractionId] = useState("");
  const regions = allRegions(item);
  const sensitive = item.proposedFigureId === "FIG-006";
  const showOriginal = mode === "original" && (!sensitive || revealedExtractionId === item.extractionId);
  const originalUrl = `/api/dev/evidence-original/${item.extractionId}`;

  const point = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 };
  };

  return (
    <div className="studio-viewer" data-viewer-mode={mode} data-extraction-id={item.extractionId}>
      {mode === "original" ? <div className="studio-private-warning">PRIVATE ORIGINAL VIEW. Do not screenshot or publish.</div> : null}
      {sensitive && mode === "original" && revealedExtractionId !== item.extractionId ? (
        <div className="studio-sensitive-cover"><p>FIG-006 private original is covered by default.</p><button type="button" onClick={() => setRevealedExtractionId(item.extractionId)}>View private original</button></div>
      ) : showOriginal ? (
        <PrivateOriginalImage key={originalUrl} src={originalUrl} extractionId={item.extractionId} />
      ) : null}
      {!showOriginal ? <div className="studio-neutral-preview">Redaction/public-layout preview. Original pixels hidden.</div> : null}
      <svg className="studio-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" onPointerDown={(e) => setDraft(point(e))} onPointerUp={(e) => { if (!draft) return; const end = point(e); onCreate({ x: Math.min(draft.x, end.x), y: Math.min(draft.y, end.y), width: Math.abs(end.x - draft.x), height: Math.abs(end.y - draft.y) }); setDraft(null); }}>
        {regions.map((region) => <rect key={region.id} x={region.x} y={region.y} width={region.width} height={region.height} className={`studio-region ${region.type} ${selectedRegion === region.id ? "selected" : ""}`} onClick={() => onSelect(region.id)}><title>{region.label}</title></rect>)}
      </svg>
      <p className="studio-view-note">Current tool: {toolLabels[tool]}. Drag on the image to draw a box.</p>
    </div>
  );
}

function PrivateOriginalImage({ src, extractionId }: { src: string; extractionId: string }) {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      {imageState === "loading" ? <div className="studio-image-status">Loading private original...</div> : null}
      {imageState === "error" ? (
        <div className="studio-image-status error">Private original could not be loaded. Check the extraction manifest and local API.</div>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${extractionId} private original for local review`}
        className="studio-original-image"
        onLoad={() => setImageState("loaded")}
        onError={() => setImageState("error")}
      />
    </>
  );
}

function RegionList({ item, selected, onSelect, onDelete }: { item: EvidenceReviewState; selected: string; onSelect: (id: string) => void; onDelete: (id: string) => void }) {
  const regions = allRegions(item);
  return <section><h2>Boxes drawn</h2>{regions.length === 0 ? <p>No boxes yet.</p> : <ol>{regions.map((region) => <li key={region.id}><button type="button" onClick={() => onSelect(region.id)} aria-pressed={selected === region.id}>{toolLabels[region.type]}</button><button type="button" onClick={() => onDelete(region.id)}>Delete</button></li>)}</ol>}</section>;
}

function ValidationPanel({ issues }: { issues: string[] }) {
  return <section><h2>Still needs</h2><ul>{issues.map((issue) => <li key={issue}>{issue === "Publication remains intentionally disabled" ? "Website publishing is intentionally off" : issue}</li>)}</ul></section>;
}
