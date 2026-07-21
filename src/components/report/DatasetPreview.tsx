import { FollowerContext } from "@/components/data/FollowerContext";
import { IdeologicalDistribution } from "@/components/data/IdeologicalDistribution";
import { ProfileIdentityGrid } from "@/components/data/ProfileIdentityGrid";

export function DatasetPreview() {
  return (
    <div className="mt-12">
      <div className="grid gap-8 border-y border-[var(--border)] py-8 md:grid-cols-[0.55fr_0.45fr]">
        <p className="text-xl leading-9">
          The investigation examined 61 highly active public Facebook profiles and pages. The classifications below summarise the research team&apos;s assessment of ideological alignment and identity presentation within that sample.
        </p>
        <p className="text-sm leading-7 text-[var(--muted)]">
          These classifications should be interpreted as characteristics of the analysed dataset, not as proof that every account was formally controlled by the organisations referenced.
        </p>
      </div>
      <IdeologicalDistribution />
      <ProfileIdentityGrid />
      <FollowerContext />
    </div>
  );
}
