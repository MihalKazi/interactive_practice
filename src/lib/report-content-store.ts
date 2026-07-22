import "server-only";

import { getJSON, setJSON } from "@/lib/kv-store";
import { defaultReport } from "@/data/report";
import type { ReportData } from "@/types/report";

const CONTENT_KEY = "report-content";

export async function getReportContent(): Promise<ReportData> {
  const stored = await getJSON<ReportData>(CONTENT_KEY);
  return stored ? { ...defaultReport, ...stored } : defaultReport;
}

export async function saveReportContent(data: ReportData) {
  await setJSON(CONTENT_KEY, data);
}
