import fs from "node:fs";
import path from "node:path";
import type { EvidenceReleaseBundle } from "@/types/evidence-release";

const emptyBundle: EvidenceReleaseBundle = { version: 1, updatedAt: "", items: [] };

function loadReleaseBundle(): EvidenceReleaseBundle {
  try {
    const filePath = path.join(process.cwd(), "private", "evidence", "release-state.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as EvidenceReleaseBundle;
  } catch {
    return emptyBundle;
  }
}

export const releaseBundle = loadReleaseBundle();
