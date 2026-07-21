"use client";

import { createContext, useContext } from "react";
import { defaultReport } from "@/data/report";
import type { ReportData } from "@/types/report";

const ReportContentContext = createContext<ReportData>(defaultReport);

export function ReportContentProvider({ value, children }: { value: ReportData; children: React.ReactNode }) {
  return <ReportContentContext.Provider value={value}>{children}</ReportContentContext.Provider>;
}

export function useReportContent() {
  return useContext(ReportContentContext);
}
