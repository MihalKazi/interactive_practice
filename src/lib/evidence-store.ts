import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { evidenceRecords as seedRecords } from "@/data/evidence";
import type { EvidenceRecord } from "@/types/evidence";

const CONTENT_DIR = join(process.cwd(), "content");
const STORE_PATH = join(CONTENT_DIR, "evidence.json");

function readStore(): EvidenceRecord[] {
  if (!existsSync(STORE_PATH)) return seedRecords;
  try {
    return JSON.parse(readFileSync(STORE_PATH, "utf8")) as EvidenceRecord[];
  } catch {
    return seedRecords;
  }
}

function writeStore(records: EvidenceRecord[]) {
  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(records, null, 2));
}

export function getEvidenceRecords(): EvidenceRecord[] {
  return readStore();
}

export function saveEvidenceRecord(patch: Partial<EvidenceRecord> & { id: string }): EvidenceRecord[] {
  const records = readStore();
  const index = records.findIndex((item) => item.id === patch.id);
  if (index === -1) throw new Error(`Unknown evidence id: ${patch.id}`);
  records[index] = { ...records[index], ...patch };
  writeStore(records);
  return records;
}
