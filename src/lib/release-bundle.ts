import "server-only";

import { getJSON } from "@/lib/kv-store";
import type { EvidenceReleaseBundle } from "@/types/evidence-release";

const RELEASE_STATE_KEY = "release-state";
const emptyBundle: EvidenceReleaseBundle = { version: 1, updatedAt: "", items: [] };

export async function getReleaseBundle(): Promise<EvidenceReleaseBundle> {
  const bundle = await getJSON<EvidenceReleaseBundle>(RELEASE_STATE_KEY);
  return bundle ?? emptyBundle;
}
