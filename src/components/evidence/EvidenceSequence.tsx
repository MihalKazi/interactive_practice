import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { getEvidenceRecords } from "@/lib/evidence-store";

export async function EvidenceSequence() {
  const evidenceRecords = await getEvidenceRecords();
  return (
    <div className="mt-12 grid gap-8">
      {evidenceRecords.map((record, index) => (
        <EvidenceViewer key={record.id} record={record} step={index % 4} />
      ))}
    </div>
  );
}
