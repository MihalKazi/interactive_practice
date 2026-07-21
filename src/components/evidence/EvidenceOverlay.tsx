import type { PublicEvidenceAnnotation } from "@/types/evidence";

export function EvidenceOverlay({ annotations, step = 0 }: { annotations: PublicEvidenceAnnotation[]; step?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {annotations
        .filter((annotation) => annotation.visibleByDefault || annotation.step <= step)
        .map((annotation, index) => (
          <span
            key={annotation.id}
            className="absolute border-2 border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
            style={{
              left: `${annotation.x}%`,
              top: `${annotation.y}%`,
              width: `${annotation.width}%`,
              height: `${annotation.height}%`,
            }}
          >
            <span className="absolute -left-2 -top-2 flex size-6 items-center justify-center bg-[var(--accent)] font-mono text-xs text-[var(--background)]">
              {index + 1}
            </span>
          </span>
        ))}
    </div>
  );
}
