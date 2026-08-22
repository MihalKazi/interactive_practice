import { Container } from "@/components/ui/Container";
import { getReportContent } from "@/lib/report-content-store";

export async function SiteFooter() {
  const report = await getReportContent();
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="grid gap-4 text-sm leading-7 text-[var(--muted)] md:grid-cols-[1fr_auto]">
        <p>{report.title}</p>
        <p>© 2026 Activate Rights</p>
      </Container>
    </footer>
  );
}
