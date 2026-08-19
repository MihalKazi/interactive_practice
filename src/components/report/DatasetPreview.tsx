import { IdeologicalDistribution } from "@/components/data/IdeologicalDistribution";
import { ProfileIdentityGrid } from "@/components/data/ProfileIdentityGrid";

export function DatasetPreview() {
  return (
    <div className="mt-12">
      <IdeologicalDistribution />
      <ProfileIdentityGrid />
    </div>
  );
}
