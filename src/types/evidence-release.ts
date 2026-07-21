import type { ArchiveStatus, EvidenceAnnotationType, LegalStatus, PrivacyStatus, PublicEditorialStatus, TranslationStatus } from "@/types/evidence";

export type AnnotationApprovalStatus = "draft" | "researcher-reviewed" | "editor-approved" | "publication-approved" | "rejected";
export type PublicEvidenceStatus = "active" | "corrected" | "replaced" | "withdrawn" | "temporarily-unavailable" | "blocked";
export type ReleaseValidationStatus = "blocked" | "eligible" | "withdrawn";

export type PublicApprovedAnnotation = {
  id: string;
  label: string;
  publicDescription: string;
  x: number;
  y: number;
  width: number;
  height: number;
  annotationType: EvidenceAnnotationType;
  step: number;
  mobileOrder: number;
  visibleByDefault: boolean;
  approvalStatus: AnnotationApprovalStatus;
};

export type EvidenceReleaseRecord = {
  evidenceId: string;
  figureId: string;
  extractionId: string;
  proposedFigureId: string;
  confirmedFigureId: string;
  confirmedMappingRequired: boolean;
  reviewConfigurationComplete: boolean;
  allowPublication: boolean;
  publicationApproved: boolean;
  derivativeId: string;
  derivativeVersion: string;
  publicAssetVersion: string;
  publicImagePath: string;
  publicDerivativeAvailable: boolean;
  approvedCaption: string;
  approvedAccessibilityDescription: string;
  approvedExcerptOriginal: string;
  approvedExcerptTranslation: string;
  approvedAnnotations: PublicApprovedAnnotation[];
  contentWarning: string;
  translationReviewLabel: string;
  sourceDocumentPage: string;
  publicStatus: PublicEvidenceStatus;
  editorialStatus: PublicEditorialStatus;
  legalStatus: LegalStatus;
  privacyStatus: PrivacyStatus;
  translationStatus: TranslationStatus;
  archiveDecision: ArchiveStatus | "";
  rightOfReplyDecision: string;
  sensitiveGateRequired: boolean;
  approvedAt: string;
  approvedBy: string;
  releaseNotes: string;
  releasedAt: string;
  withdrawn: boolean;
  withdrawnAt: string;
  withdrawalReason: string;
  replacementDerivativeVersion: string;
  correctionNote: string;
  correctionDate: string;
  integrityFingerprint: string;
  validationStatus: ReleaseValidationStatus;
};

export type EvidenceReleaseBundle = {
  version: 1;
  updatedAt: string;
  items: EvidenceReleaseRecord[];
};

export type ReleaseEligibilityResult = {
  eligible: boolean;
  blockingIssues: string[];
  warnings: string[];
  evidenceId: string;
  figureId: string;
  derivativeVersion: string;
  mappingStatus: string;
  reviewStatusSummary: string;
};
