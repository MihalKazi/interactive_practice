import type { EvidenceRecord } from "@/types/evidence";

const blockedPatterns = [
  /\/private/i,
  /^[a-z]:\\/i,
  /facebook\.com/i,
  /telegram\./i,
  /\bx\.com\b/i,
  /twitter\.com/i,
];

function wordCount(text = "") {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function getEvidenceValidationErrors(records: EvidenceRecord[]) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const figures = new Set<number>();

  for (const record of records) {
    if (ids.has(record.id)) errors.push(`${record.id}: duplicate evidence ID`);
    ids.add(record.id);
    if (figures.has(record.figureNumber)) errors.push(`${record.id}: duplicate figure number ${record.figureNumber}`);
    figures.add(record.figureNumber);

    if (record.publicationApproved && !record.publicImagePath) {
      errors.push(`${record.id}: approved evidence requires publicImagePath`);
    }
    if (!record.publicationApproved && record.publicImagePath) {
      errors.push(`${record.id}: non-approved evidence cannot expose publicImagePath`);
    }
    if (record.publicationApproved && record.publicDerivativeAvailable === false) {
      errors.push(`${record.id}: approved evidence requires derivative availability`);
    }
    if (record.figureNumber === 6 && !record.contentWarning) {
      errors.push(`${record.id}: sensitive evidence requires content warning`);
    }
    if (wordCount(record.publicExcerpt) > 35) {
      errors.push(`${record.id}: public excerpt exceeds word limit`);
    }

    const publicText = JSON.stringify(record);
    if (blockedPatterns.some((pattern) => pattern.test(publicText))) {
      errors.push(`${record.id}: public evidence data contains private path or direct platform URL`);
    }

    for (const annotation of record.annotations) {
      const values = [annotation.x, annotation.y, annotation.width, annotation.height];
      if (values.some((value) => value < 0 || value > 100)) {
        errors.push(`${record.id}/${annotation.id}: annotation coordinate outside 0-100`);
      }
      if (annotation.x + annotation.width > 100 || annotation.y + annotation.height > 100) {
        errors.push(`${record.id}/${annotation.id}: annotation region exceeds bounds`);
      }
    }
  }

  return errors;
}

export function validateEvidenceRecords(records: EvidenceRecord[]) {
  const errors = getEvidenceValidationErrors(records);
  if (errors.length > 0) {
    throw new Error(`Evidence validation failed:\n${errors.join("\n")}`);
  }
}
