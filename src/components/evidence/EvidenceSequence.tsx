import { EvidenceGallery } from "@/components/evidence/EvidenceGallery";
import { getEvidenceRecords } from "@/lib/evidence-store";

export async function EvidenceSequence() {
  const evidenceRecords = await getEvidenceRecords();
  return <EvidenceGallery records={evidenceRecords} />;
}
