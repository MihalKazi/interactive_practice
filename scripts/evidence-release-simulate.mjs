import { mkdirSync, writeFileSync } from "node:fs";
import { readReleaseBundle } from "./evidence-release-utils.mjs";

const outDir = "private/evidence/simulation";
mkdirSync(outDir, { recursive: true });
const bundle = readReleaseBundle();
const simulation = {
  generatedAt: new Date().toISOString(),
  notice: "SIMULATION - NOT PUBLICATION APPROVED. Uses private redacted preview references only. Never copy to public/.",
  items: bundle.items.map((item) => ({
    evidenceId: item.evidenceId,
    figureId: item.figureId,
    previewPath: `private/evidence/previews/evidence-${item.evidenceId.slice(-3)}-review-preview.svg`,
    simulatedOnly: true,
  })),
};
writeFileSync(`${outDir}/release-simulation.json`, JSON.stringify(simulation, null, 2));
console.log(`Simulation metadata written to ${outDir}/release-simulation.json`);
