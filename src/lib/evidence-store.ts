import "server-only";

import { getJSON, setJSON } from "@/lib/kv-store";
import { evidenceRecords as seedRecords } from "@/data/evidence";
import type { EvidenceRecord } from "@/types/evidence";

const STORE_KEY = "evidence-records";

async function readStore(): Promise<EvidenceRecord[]> {
  const records = await getJSON<EvidenceRecord[]>(STORE_KEY);
  return records ?? seedRecords;
}

export async function getEvidenceRecords(): Promise<EvidenceRecord[]> {
  return readStore();
}

export async function saveEvidenceRecord(patch: Partial<EvidenceRecord> & { id: string }): Promise<EvidenceRecord[]> {
  const records = await readStore();
  const index = records.findIndex((item) => item.id === patch.id);
  if (index === -1) throw new Error(`Unknown evidence id: ${patch.id}`);
  records[index] = { ...records[index], ...patch };
  await setJSON(STORE_KEY, records);
  return records;
}
