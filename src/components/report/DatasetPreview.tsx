import { IdeologicalDistribution } from "@/components/data/IdeologicalDistribution";
import { ProfileIdentityGrid } from "@/components/data/ProfileIdentityGrid";

export function DatasetPreview() {
  return (
    <div>
      <IdeologicalDistribution />
      <ProfileIdentityGrid />
    </div>
  );
}
