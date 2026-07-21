import { notFound } from "next/navigation";
import { EvidenceViewer } from "@/components/evidence/EvidenceViewer";
import { evidenceRecords } from "@/data/evidence";
import { getEvidenceValidationErrors } from "@/lib/evidence-validation";

export default function EvidenceReviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const errors = getEvidenceValidationErrors(evidenceRecords);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
      <p className="eyebrow text-[var(--accent)]">Development only</p>
      <h1 className="mt-4 font-serif text-5xl">Evidence review</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
        Public metadata and public-safe previews only. Private original images and private paths are not served here.
      </p>
      <section className="mt-8 border border-[var(--border)] p-5">
        <h2 className="text-xl font-semibold">Validation</h2>
        {errors.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--muted)]">No validation errors.</p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-[var(--warning)]">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-8 grid gap-8">
        {evidenceRecords.map((record) => (
          <EvidenceViewer key={record.id} record={record} />
        ))}
      </section>
    </main>
  );
}
