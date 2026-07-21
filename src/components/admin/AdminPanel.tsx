"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReportData } from "@/types/report";

type EvidenceFormItem = {
  id: string;
  figureNumber: number;
  chapter: string;
  title: string;
  summary: string;
  publicCaption: string;
  publicImagePath: string;
  visible: boolean;
};

function TextField({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function ContentTab({ initialReport }: { initialReport: ReportData }) {
  const [report, setReport] = useState(initialReport);
  const [status, setStatus] = useState("");

  const save = async () => {
    setStatus("Saving...");
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });
    setStatus(response.ok ? `Saved ${new Date().toLocaleTimeString()}` : "Save failed");
  };

  const updateArrayItem = <K extends keyof ReportData>(key: K, index: number, patch: Partial<ReportData[K] extends (infer U)[] ? U : never>) => {
    setReport((current) => {
      const list = [...(current[key] as unknown as Record<string, unknown>[])];
      list[index] = { ...list[index], ...patch };
      return { ...current, [key]: list };
    });
  };

  return (
    <div className="admin-panel-body">
      <section className="admin-section">
        <h2>Basics</h2>
        <TextField label="Report title" value={report.title} onChange={(v) => setReport({ ...report, title: v })} />
        <TextField label="Author" value={report.author} onChange={(v) => setReport({ ...report, author: v })} />
        <TextField label="Date" value={report.date} onChange={(v) => setReport({ ...report, date: v })} />
        <TextField label="Hero tagline" value={report.heroTagline} onChange={(v) => setReport({ ...report, heroTagline: v })} textarea />
        <TextField label="Follower-count note" value={report.importantDataNote} onChange={(v) => setReport({ ...report, importantDataNote: v })} textarea />
      </section>

      <section className="admin-section">
        <h2>Opening statistics</h2>
        {report.openingStatistics.map((stat, index) => (
          <div key={stat.id} className="admin-row">
            <TextField label="Value" value={stat.value} onChange={(v) => updateArrayItem("openingStatistics", index, { value: v })} />
            <TextField label="Label" value={stat.label} onChange={(v) => updateArrayItem("openingStatistics", index, { label: v })} />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Narrative categories</h2>
        {report.narrativeCategories.map((item, index) => (
          <div key={item.id} className="admin-card">
            <TextField label="Title" value={item.title} onChange={(v) => updateArrayItem("narrativeCategories", index, { title: v })} />
            <TextField label="Description" value={item.description} onChange={(v) => updateArrayItem("narrativeCategories", index, { description: v })} textarea />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Timeline</h2>
        {report.timeline.map((point, index) => (
          <div key={index} className="admin-card">
            <TextField label="Year / period" value={point.year} onChange={(v) => updateArrayItem("timeline", index, { year: v })} />
            <TextField label="Title" value={point.title} onChange={(v) => updateArrayItem("timeline", index, { title: v })} />
            <TextField label="Description" value={point.description} onChange={(v) => updateArrayItem("timeline", index, { description: v })} textarea />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Methodology stages</h2>
        {report.methodologyStages.map((stage, index) => (
          <div key={index} className="admin-card">
            <TextField label="Title" value={stage.title} onChange={(v) => updateArrayItem("methodologyStages", index, { title: v })} />
            <TextField label="Detail" value={stage.detail} onChange={(v) => updateArrayItem("methodologyStages", index, { detail: v })} textarea />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Recommendations</h2>
        {report.recommendations.map((item, index) => (
          <div key={index} className="admin-card">
            <TextField label="Audience" value={item.audience} onChange={(v) => updateArrayItem("recommendations", index, { audience: v })} />
            <TextField label="Action" value={item.action} onChange={(v) => updateArrayItem("recommendations", index, { action: v })} />
            <TextField label="Detail" value={item.detail} onChange={(v) => updateArrayItem("recommendations", index, { detail: v })} textarea />
          </div>
        ))}
      </section>

      <section className="admin-section">
        <h2>Limitations</h2>
        {report.limitations.map((item, index) => (
          <div key={index} className="admin-card">
            <TextField label="Title" value={item.title} onChange={(v) => updateArrayItem("limitations", index, { title: v })} />
            <TextField label="Note" value={item.note} onChange={(v) => updateArrayItem("limitations", index, { note: v })} textarea />
          </div>
        ))}
      </section>

      <div className="admin-action-row">
        <button type="button" onClick={save}>Save content</button>
        <span>{status}</span>
      </div>
    </div>
  );
}

function itemKey(item: EvidenceFormItem) {
  return JSON.stringify({
    title: item.title,
    summary: item.summary,
    publicCaption: item.publicCaption,
    publicImagePath: item.publicImagePath,
    visible: item.visible,
  });
}

function EvidenceTab({ initialEvidence }: { initialEvidence: EvidenceFormItem[] }) {
  const [items, setItems] = useState(initialEvidence);
  const [savedSnapshots, setSavedSnapshots] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialEvidence.map((item) => [item.id, itemKey(item)]))
  );
  const [status, setStatus] = useState("");

  const update = (id: string, patch: Partial<EvidenceFormItem>) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const save = async (item: EvidenceFormItem) => {
    setStatus(`Saving ${item.id}...`);
    const response = await fetch("/api/admin/evidence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        title: item.title,
        summary: item.summary,
        publicCaption: item.publicCaption,
        publicImagePath: item.publicImagePath,
        publicDerivativeAvailable: Boolean(item.publicImagePath) || undefined,
        publicationApproved: item.visible,
      }),
    });
    if (response.ok) {
      setSavedSnapshots((current) => ({ ...current, [item.id]: itemKey(item) }));
      setStatus(`Saved ${item.id} at ${new Date().toLocaleTimeString()}`);
    } else {
      setStatus(`Save failed for ${item.id}`);
    }
  };

  const upload = async (item: EvidenceFormItem, file: File) => {
    setStatus(`Uploading image for ${item.id}...`);
    const formData = new FormData();
    formData.set("id", item.id);
    formData.set("file", file);
    const response = await fetch("/api/admin/evidence/upload", { method: "POST", body: formData });
    const result = await response.json().catch(() => ({}));
    if (response.ok && result.path) {
      update(item.id, { publicImagePath: result.path });
      setStatus(`Image uploaded for ${item.id}. Click Save to apply.`);
    } else {
      setStatus(result.error || "Upload failed");
    }
  };

  return (
    <div className="admin-panel-body">
      <p className="admin-help">
        Upload an image, write a caption, then tick &quot;Show on website&quot; and save. Nothing appears publicly until you save with the box checked.
      </p>
      <div className="admin-save-drawer">
        <strong>Save status</strong>
        <ul>
          {items.map((item) => {
            const dirty = savedSnapshots[item.id] !== itemKey(item);
            return (
              <li key={item.id}>
                <span>{item.id}</span>
                <span className={dirty ? "admin-status-unsaved" : "admin-status-saved"}>
                  {dirty ? "Unsaved changes" : "Saved"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {items.map((item) => {
        const dirty = savedSnapshots[item.id] !== itemKey(item);
        return (
        <div key={item.id} className="admin-card">
          <div className="admin-card-heading">
            <strong>{item.id}</strong>
            <span>{item.chapter}</span>
            <span className={dirty ? "admin-status-unsaved" : "admin-status-saved"}>{dirty ? "Unsaved changes" : "Saved"}</span>
          </div>
          {item.publicImagePath ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.publicImagePath} alt="" className="admin-evidence-preview" />
          ) : (
            <div className="admin-evidence-placeholder">No image uploaded yet</div>
          )}
          <label className="admin-field">
            <span>Image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(item, file);
              }}
            />
          </label>
          <TextField label="Title" value={item.title} onChange={(v) => update(item.id, { title: v })} />
          <TextField label="Summary (internal)" value={item.summary} onChange={(v) => update(item.id, { summary: v })} textarea />
          <TextField label="Caption (shown on website)" value={item.publicCaption} onChange={(v) => update(item.id, { publicCaption: v })} textarea />
          <label className="admin-field admin-checkbox">
            <input type="checkbox" checked={item.visible} onChange={(e) => update(item.id, { visible: e.target.checked })} />
            <span>Show on website</span>
          </label>
          <div className="admin-action-row">
            <button type="button" onClick={() => save(item)}>Save {item.id}</button>
          </div>
        </div>
        );
      })}
      <p className="admin-help">{status}</p>
    </div>
  );
}

export function AdminPanel({ initialReport, initialEvidence }: { initialReport: ReportData; initialEvidence: EvidenceFormItem[] }) {
  const [tab, setTab] = useState<"content" | "evidence">("content");

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">Local admin — dev only</p>
          <h1>Website editor</h1>
        </div>
        <Link href="/">View website</Link>
      </header>
      <nav className="admin-tabs">
        <button type="button" aria-pressed={tab === "content"} onClick={() => setTab("content")}>Content</button>
        <button type="button" aria-pressed={tab === "evidence"} onClick={() => setTab("evidence")}>Evidence</button>
      </nav>
      {tab === "content" ? <ContentTab initialReport={initialReport} /> : <EvidenceTab initialEvidence={initialEvidence} />}
    </div>
  );
}
