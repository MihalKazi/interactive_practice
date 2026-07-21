export type VerificationStatus =
  | "unverified"
  | "source-document-only"
  | "partially-verified"
  | "verified"
  | "verification-review-required";

export type PublicEditorialStatus =
  | "pending"
  | "reviewed"
  | "approved"
  | "rejected"
  | "clarification-required";

export type LegalStatus = "pending" | "approved" | "restricted" | "legal-review-required";
export type PrivacyStatus = "unreviewed" | "redaction-required" | "redacted" | "approved";
export type TranslationStatus =
  | "not-required"
  | "machine-draft"
  | "researcher-reviewed"
  | "independently-reviewed"
  | "translation-review-required";
export type ArchiveStatus =
  | "unavailable"
  | "privately-archived"
  | "public-archive-approved"
  | "archive-review-required";
export type RedactionStatus = "not-started" | "configured" | "applied" | "redaction-review-required";

export type EvidenceAnnotationType =
  | "context"
  | "highlighted-term"
  | "repetition"
  | "source-post"
  | "comment-pattern"
  | "date"
  | "account-label-redacted"
  | "translation"
  | "verification-note"
  | "limitation";

export type PublicEvidenceAnnotation = {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  annotationType: EvidenceAnnotationType;
  step: number;
  mobileOrder: number;
  editorialStatus: PublicEditorialStatus;
  visibleByDefault: boolean;
};

export type EvidenceRecord = {
  id: string;
  figureNumber: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  chapter: string;
  sourceType: string;
  sourceDocumentPage: string;
  publicImagePath?: string;
  originalImageAvailable: boolean;
  publicDerivativeAvailable: boolean;
  capturedDate?: string;
  eventDate?: string;
  language: "Bengali" | "English" | "Mixed" | "Unknown";
  contentWarning?: string;
  summary: string;
  publicCaption: string;
  verificationStatus: VerificationStatus;
  editorialStatus: PublicEditorialStatus;
  legalStatus: LegalStatus;
  privacyStatus: PrivacyStatus;
  translationStatus: TranslationStatus;
  redactionStatus: RedactionStatus;
  archiveStatus: ArchiveStatus;
  annotations: PublicEvidenceAnnotation[];
  publicExcerpt?: string;
  methodologyNote: string;
  limitations: string[];
  publicationApproved: boolean;
};
