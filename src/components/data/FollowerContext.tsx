import { Button } from "@/components/ui/Button";

export function FollowerContext() {
  return (
    <section className="mt-12 grid gap-6 border-t border-[var(--border)] pt-10 md:grid-cols-[0.45fr_0.55fr]">
      <div>
        <p className="eyebrow text-[var(--accent)]">Follower-count context</p>
        <h3 className="mt-3 text-3xl font-semibold">Aggregate visibility, not reach</h3>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="border-l-2 border-[var(--data-secondary)] pl-4">
          <p className="font-mono text-4xl">38 / 61</p>
          <p className="mt-2 text-sm text-[var(--muted)]">profiles had publicly visible follower information</p>
        </div>
        <div className="border-l-2 border-[var(--data-primary)] pl-4">
          <p className="font-mono text-4xl">815,000+</p>
          <p className="mt-2 text-sm text-[var(--muted)]">combined visible followers</p>
        </div>
        <p className="sm:col-span-2 text-sm leading-7 text-[var(--muted)]">
          This is an aggregated count of publicly visible followers across 38 accounts. Followers may overlap between accounts, and the figure does not represent unique people reached, post impressions, engagement, or verified exposure.
        </p>
        <div className="sm:col-span-2"><Button href="#methodology" variant="secondary">Methodology shortcut</Button></div>
      </div>
    </section>
  );
}
