import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { evidenceRecordsForCurrentEnvironment } from "@/lib/dev-public-evidence";

export function EvidenceSequence() {
  const evidenceRecords = evidenceRecordsForCurrentEnvironment();
  return (
    <div className="mt-12 grid gap-8">
      {evidenceRecords.map((record, index) => (
        <EvidenceViewer key={record.id} record={record} step={index % 4} />
      ))}
    </div>
  );
}
