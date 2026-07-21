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
};

export type IdeologicalCategory = {
  id: string;
  label: string;
  shortLabel: string;
  value: number;
  description: string;
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

export type MethodologyStage = {
  title: string;
  detail: string;
};

export type Recommendation = {
  audience: string;
  action: string;
  detail: string;
};

export type Limitation = {
  title: string;
  note: string;
};

export type ReportData = {
  title: string;
  author: string;
  date: string;
  heroTagline: string;
  importantDataNote: string;
  openingStatistics: Statistic[];
  ideologicalClassification: ClassificationDatum[];
  profileClassification: ClassificationDatum[];
  ideologicalCategories: IdeologicalCategory[];
  identityCategories: IdentityCategory[];
  narrativeCategories: NarrativeCategory[];
  timeline: TimelinePoint[];
  methodologyStages: MethodologyStage[];
  recommendations: Recommendation[];
  limitations: Limitation[];
};
