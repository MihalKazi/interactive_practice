import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defaultReport } from "@/data/report";
import type { ReportData } from "@/types/report";

const CONTENT_DIR = join(process.cwd(), "content");
const CONTENT_PATH = join(CONTENT_DIR, "report-content.json");

export function getReportContent(): ReportData {
  if (!existsSync(CONTENT_PATH)) return defaultReport;
  try {
    const raw = readFileSync(CONTENT_PATH, "utf8");
    return { ...defaultReport, ...JSON.parse(raw) } as ReportData;
  } catch {
    return defaultReport;
  }
}

export function saveReportContent(data: ReportData) {
  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2));
}
