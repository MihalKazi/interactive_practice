import { headers } from "next/headers";
import { notFound } from "next/navigation";
import releaseBundle from "../../../../private/evidence/release-state.json";
import { evidenceRecords } from "@/data/evidence";
import { EvidenceImage } from "@/components/evidence/EvidenceImage";
import { validateReleaseEligibility } from "@/lib/evidence-release-validation";
import type { EvidenceReleaseBundle } from "@/types/evidence-release";

export const dynamic = "force-dynamic";

function localHost(hostHeader: string | null) {
  const host = hostHeader?.split(":")[0].toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host === "::1";
}

export default async function EvidenceReleasePage({
  searchParams,
}: {
  searchParams: Promise<{ simulate?: string }>;
}) {
  const headerList = await headers();
  if (process.env.NODE_ENV !== "development" || !localHost(headerList.get("host"))) notFound();
  const params = await searchParams;
  const simulate = params.simulate === "1";
  const releases = releaseBundle as EvidenceReleaseBundle;

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">
        {simulate ? (
          <div className="mb-6 border border-[var(--warning)] bg-[color-mix(in_srgb,var(--warning)_12%,transparent)] p-4 font-mono text-sm uppercase tracking-[0.12em]">
            SIMULATION - NOT PUBLICATION APPROVED
          </div>
        ) : null}
        <header className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">Development only</p>
          <h1 className="mt-2 text-3xl font-semibold">Evidence Release Control</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Release settings remain read-only for Step 7. Publication approval and allowPublication stay false until manual newsroom sign-off.
          </p>
        </header>
        <div className="grid gap-5">
          {releases.items.map((release) => {
            const record = evidenceRecords.find((item) => item.id === release.evidenceId);
            if (!record) return null;
            const result = validateReleaseEligibility(record, release, releases.items);
            return (
              <section key={release.evidenceId} className="border border-[var(--border)] bg-[var(--surface)]">
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_22rem]">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{release.evidenceId} / {release.figureId}</p>
                    <h2 className="mt-2 text-xl font-semibold">{record.title}</h2>
                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                      <div><dt className="text-[var(--muted)]">Confirmed mapping</dt><dd>{release.confirmedFigureId || "pending"}</dd></div>
                      <div><dt className="text-[var(--muted)]">Eligibility</dt><dd>{result.eligible ? "eligible" : "blocked"}</dd></div>
                      <div><dt className="text-[var(--muted)]">Private preview</dt><dd>{simulate ? "simulation metadata only" : "private"}</dd></div>
                      <div><dt className="text-[var(--muted)]">Public derivative</dt><dd>{release.publicDerivativeAvailable ? "available" : "missing"}</dd></div>
                      <div><dt className="text-[var(--muted)]">Proposed version</dt><dd>{release.derivativeVersion}</dd></div>
                      <div><dt className="text-[var(--muted)]">allowPublication</dt><dd>{String(release.allowPublication)}</dd></div>
                      <div><dt className="text-[var(--muted)]">publicationApproved</dt><dd>{String(release.publicationApproved)}</dd></div>
                      <div><dt className="text-[var(--muted)]">Withdrawal</dt><dd>{release.withdrawn ? release.withdrawalReason || "withdrawn" : "none"}</dd></div>
                    </dl>
                    <div className="mt-4">
                      <p className="text-sm font-semibold">Blocking issues</p>
                      <ul className="mt-2 grid gap-1 text-sm text-[var(--muted)]">
                        {result.blockingIssues.map((issue) => <li key={issue}>{issue}</li>)}
                      </ul>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <label className="text-sm">Derivative version<input className="mt-1 w-full border border-[var(--border)] bg-transparent p-2" value={release.derivativeVersion} readOnly /></label>
                      <label className="text-sm">Release notes<input className="mt-1 w-full border border-[var(--border)] bg-transparent p-2" value={release.releaseNotes} readOnly /></label>
                      <label className="text-sm">Replacement version<input className="mt-1 w-full border border-[var(--border)] bg-transparent p-2" value={release.replacementDerivativeVersion} readOnly /></label>
                    </div>
                  </div>
                  <div>
                    {simulate ? <p className="mb-3 text-sm font-semibold text-[var(--warning)]">Private redacted preview simulation only; no public files created.</p> : null}
                    <EvidenceImage record={record} />
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
