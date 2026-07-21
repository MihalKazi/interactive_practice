import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { getEvidenceRecords } from "@/lib/evidence-store";
import { getReportContent } from "@/lib/report-content-store";

function localHost(hostHeader: string | null) {
  const host = hostHeader?.split(":")[0].toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1";
}

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const headerList = await headers();
  if (process.env.NODE_ENV !== "development" || !localHost(headerList.get("host"))) notFound();

  const report = getReportContent();
  const evidenceItems = getEvidenceRecords().map((record) => ({
    id: record.id,
    figureNumber: record.figureNumber,
    chapter: record.chapter,
    title: record.title,
    summary: record.summary,
    publicCaption: record.publicCaption,
    publicImagePath: record.publicImagePath || "",
    visible: record.publicationApproved,
  }));

  return <AdminPanel initialReport={report} initialEvidence={evidenceItems} />;
}
