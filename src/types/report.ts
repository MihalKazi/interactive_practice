export type Language = "en" | "bn";

export type Statistic = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export type ClassificationDatum = {
  label: string;
  count: number;
};

export type ChartViewMode = "count" | "percentage";

export type DatasetAnnotation = {
  id: string;
  title: string;
  body: string;
  status?: EditorialStatus;
};

export type IdeologicalCategory = {
  id: string;
  label: string;
  shortLabel: string;
  value: number;
  description: string;
  reviewStatus: EditorialStatus;
  overlapNote?: string;
};

export type IdentityType = "fake-or-pseudonymous" | "apparently-real" | "undetermined";

export type IdentityCategory = {
  id: IdentityType;
  label: string;
  shortLabel: string;
  value: number;
  description: string;
};

export type ProfileGridCell = {
  id: string;
  displayLabel: string;
  identityType: IdentityType;
  position: number;
  isSyntheticDisplayIdentifier: true;
};

export type NarrativeCategory = {
  id: string;
  title: string;
  description: string;
};

export type TimelinePoint = {
  year: string;
  title: string;
  description: string;
};

export type EvidenceItem = {
  id: string;
  accountLabel: string;
  date: string;
  type: string;
  verificationStatus: string;
  redactionStatus?: string;
  editorialStatus?: string;
  translationStatus?: string;
  description: string;
};

export type ReviewState = "pending" | "in-review" | "approved";

export type EditorialStatus =
  | "Documented finding"
  | "Analysis"
  | "Editorial review required"
  | "Legal review required"
  | "Evidence pending"
  | "Translation review required"
  | "Methodology clarification required";

export type ReportData = {
  title: string;
  author: string;
  date: string;
  importantDataNote: string;
  openingStatistics: Statistic[];
  ideologicalClassification: ClassificationDatum[];
  profileClassification: ClassificationDatum[];
  ideologicalCategories: IdeologicalCategory[];
  identityCategories: IdentityCategory[];
  narrativeCategories: NarrativeCategory[];
  timeline: TimelinePoint[];
  evidencePreview: EvidenceItem[];
};
