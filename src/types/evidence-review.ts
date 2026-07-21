import type {
  ArchiveStatus,
  LegalStatus,
  PrivacyStatus,
  PublicEditorialStatus,
  RedactionStatus,
  TranslationStatus,
  VerificationStatus,
} from "@/types/evidence";

export type MatchDecision = "pending" | "confirmed" | "rejected" | "uncertain" | "duplicate" | "unrelated-image";
export type MatchConfidence = "low" | "medium" | "high";
export type PublicationRecommendation =
  | "do-not-publish"
  | "hold-for-review"
  | "suitable-after-redaction"
  | "suitable-after-legal-review"
  | "suitable-after-translation-review"
  | "suitable-for-publication-review";
export type RegionKind = "solid-redaction" | "blur" | "pixelate" | "highlight" | "annotation" | "crop";
export type CaptionApprovalState =
  | "not-started"
  | "draft"
  | "researcher-reviewed"
  | "editor-reviewed"
  | "legal-review-required"
  | "approved-for-publication-review";
export type RightOfReplyStatus =
  | "not-assessed"
  | "not-required"
  | "required"
  | "requested"
  | "response-received"
  | "declined"
  | "pending";

export type ReviewRegion = {
  id: string;
  type: RegionKind;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  privateNote: string;
  step: number;
  mobileOrder: number;
  visibleInPreview: boolean;
};

export type EvidenceReviewState = {
  extractionId: string;
  proposedFigureId: string;
  confirmedFigureId: string;
  sourceDocumentPage: string;
  expectedCaption: string;
  expectedContent: string;
  matchDecision: MatchDecision;
  matchConfidence: MatchConfidence;
  matchNotes: string;
  reviewerInitials: string;
  reviewedAt: string;
  captionDecision: CaptionApprovalState;
  privacyDecision: PrivacyStatus;
  legalDecision: LegalStatus;
  translationDecision: TranslationStatus;
  archiveDecision: ArchiveStatus;
  rightOfReplyDecision: RightOfReplyStatus;
  verificationDecision: VerificationStatus;
  editorialDecision: PublicEditorialStatus;
  redactionDecision: RedactionStatus;
  publicationRecommendation: PublicationRecommendation;
  redactionRegions: ReviewRegion[];
  highlightRegions: ReviewRegion[];
  annotationRegions: ReviewRegion[];
  cropRegion: ReviewRegion | null;
  internalCaption: string;
  publicCaptionDraft: string;
  accessibilityDescription: string;
  analyticalSummary: string;
  limitationsNote: string;
  originalLanguageExcerpt: string;
  englishTranslationExcerpt: string;
  dateConfidence: "unknown" | "low" | "medium" | "high";
  eventDate: string;
  captureDate: string;
  previewGenerated: boolean;
  unresolvedIssues: string[];
  revision: number;
  updatedAt: string;
};

export type EvidenceReviewBundle = {
  version: 1;
  updatedAt: string;
  items: EvidenceReviewState[];
};
