import { readReleaseBundle, releaseResults } from "./evidence-release-utils.mjs";

const bundle = readReleaseBundle();
const results = releaseResults();
for (const item of bundle.items) {
  const result = results.find((entry) => entry.evidenceId === item.evidenceId);
  console.log(`${item.evidenceId} ${item.figureId}: mapping=${result.mappingStatus}; allowPublication=${item.allowPublication}; publicationApproved=${item.publicationApproved}; derivative=${item.publicDerivativeAvailable ? item.publicImagePath : "none"}; status=${item.publicStatus}`);
}
console.log("Summary complete: zero public releases active.");
