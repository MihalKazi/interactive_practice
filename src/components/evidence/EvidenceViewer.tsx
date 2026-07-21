import { EvidenceAnnotation } from "@/components/evidence/EvidenceAnnotation";
import { EvidenceCaption } from "@/components/evidence/EvidenceCaption";
import { EvidenceContentWarning } from "@/components/evidence/EvidenceContentWarning";
import { EvidenceImage } from "@/components/evidence/EvidenceImage";
import { EvidenceMetadata } from "@/components/evidence/EvidenceMetadata";
import { EvidenceStatusPanel } from "@/components/evidence/EvidenceStatusPanel";
import { EvidenceCorrectionNote } from "@/components/evidence/EvidenceCorrectionNote";
import type { EvidenceRecord } from "@/types/evidence";
import releaseBundle from "../../../private/evidence/release-state.json";
import type { EvidenceReleaseBundle } from "@/types/evidence-release";

function ViewerBody({ record, step = 0 }: { record: EvidenceRecord; step?: number }) {
  const release = (releaseBundle as EvidenceReleaseBundle).items.find((item) => item.evidenceId === record.id);
  return (
    <figure className="evidence-frame">
      <header className="grid gap-3 border-b border-[var(--border)] p-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{record.id} / Figure {String(record.figureNumber).padStart(3, "0")}</p>
          <h3 className="mt-1 text-xl font-semibold">{record.title}</h3>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--warning)]">{record.legalStatus}</span>
      </header>
      <EvidenceImage record={record} step={step} />
      <EvidenceCaption record={record} />
      {release ? <EvidenceCorrectionNote status={release.publicStatus} date={release.correctionDate} explanation={release.correctionNote || release.withdrawalReason} replacementReference={release.replacementDerivativeVersion} /> : null}
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_18rem]">
        <div>
          <EvidenceMetadata record={record} />
          <ol className="mt-4">
            {record.annotations
              .slice()
              .sort((a, b) => a.mobileOrder - b.mobileOrder)
              .map((annotation) => (
                <EvidenceAnnotation key={annotation.id} annotation={annotation} />
              ))}
          </ol>
        </div>
        <EvidenceStatusPanel record={record} />
      </div>
    </figure>
  );
}

export function EvidenceViewer({ record, step = 0 }: { record: EvidenceRecord; step?: number }) {
  if (record.contentWarning) {
    return (
      <EvidenceContentWarning warning={record.contentWarning}>
        <ViewerBody record={record} step={step} />
      </EvidenceContentWarning>
    );
  }
  return <ViewerBody record={record} step={step} />;
}
