import { Container } from "@/components/ui/Container";
import { getReportContent } from "@/lib/report-content-store";

export function SiteFooter() {
  const report = getReportContent();
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="grid gap-4 text-sm leading-7 text-[var(--muted)] md:grid-cols-[1fr_auto]">
        <p>
          {report.title}. Interactive edition in development. Public-facing data must remain anonymised until editorial and legal review is complete.
        </p>
        <p>© 2026 Hasan Al Mahmud</p>
      </Container>
    </footer>
  );
}
