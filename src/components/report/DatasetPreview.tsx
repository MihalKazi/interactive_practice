import { FollowerContext } from "@/components/data/FollowerContext";
import { IdeologicalDistribution } from "@/components/data/IdeologicalDistribution";
import { ProfileIdentityGrid } from "@/components/data/ProfileIdentityGrid";

export function DatasetPreview() {
  return (
    <div className="mt-12">
      <div className="border-y border-[var(--border)] py-8">
        <p className="text-xl leading-9">
          61 Facebook profiles, classified by ideology and identity presentation — pattern, not proof of formal control.
        </p>
      </div>
      <IdeologicalDistribution />
      <ProfileIdentityGrid />
      <FollowerContext />
    </div>
  );
}
