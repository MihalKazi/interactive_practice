import { AdminPanel } from "@/components/admin/AdminPanel";
import { getEvidenceRecords } from "@/lib/evidence-store";
import { getReportContent } from "@/lib/report-content-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const report = await getReportContent();
  const evidenceItems = (await getEvidenceRecords()).map((record) => ({
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
