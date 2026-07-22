"use client";

import { useState } from "react";
import Image from "next/image";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { isEvidenceRenderable } from "@/components/evidence/EvidenceImage";
import type { EvidenceRecord } from "@/types/evidence";

export function EvidenceGallery({ records }: { records: EvidenceRecord[] }) {
  const [selectedId, setSelectedId] = useState(records[0]?.id);
  const selected = records.find((record) => record.id === selectedId) ?? records[0];
  const selectedIndex = records.findIndex((record) => record.id === selectedId);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {records.map((record) => {
          const isSelected = record.id === selectedId;
          const renderable = isEvidenceRenderable(record);
          return (
            <button
              key={record.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(record.id)}
              className={`group relative aspect-[16/10] overflow-hidden border bg-[var(--background)] text-left transition ${
                isSelected ? "border-[var(--accent)] ring-1 ring-[var(--accent)]" : "border-[var(--border)] hover:border-[var(--accent)]"
              }`}
            >
              {renderable ? (
                <Image
                  src={record.publicImagePath!}
                  alt={record.publicCaption}
                  fill
                  sizes="(max-width: 640px) 33vw, 16vw"
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[var(--surface-elevated)] px-2 text-center text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  Pending review
                </div>
              )}
              <span className="absolute bottom-0 left-0 right-0 bg-[color-mix(in_srgb,var(--background)_75%,transparent)] px-1.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--foreground)]">
                Fig {String(record.figureNumber).padStart(3, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="mt-6">
          <EvidenceViewer record={selected} step={selectedIndex % 4} />
        </div>
      ) : null}
    </div>
  );
}
