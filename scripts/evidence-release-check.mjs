import { releaseResults } from "./evidence-release-utils.mjs";

const results = releaseResults();
for (const result of results) {
  console.log(`${result.evidenceId} ${result.figureId}: ${result.eligible ? "eligible" : "blocked"} (${result.reviewStatusSummary})`);
  for (const issue of result.blockingIssues) console.log(`  - ${issue}`);
}
const blocked = results.filter((result) => !result.eligible).length;
console.log(`Release check complete: ${blocked}/${results.length} blocked.`);
if (results.length !== 6) process.exitCode = 1;
