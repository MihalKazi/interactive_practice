import type { ReportData } from "@/types/report";

export const report: ReportData = {
  title:
    "Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces",
  author: "Hasan Al Mahmud",
  date: "March 20, 2026",
  importantDataNote:
    "The combined follower figure is an aggregate of publicly visible follower counts from 38 accounts. It must not be interpreted as unique audience reach, impressions, or verified exposure.",
  openingStatistics: [
    { id: "profiles", value: "61", label: "profiles analysed" },
    {
      id: "fake",
      value: "42",
      label: "fake or pseudonymous identities",
    },
    {
      id: "followers",
      value: "815,000+",
      label: "combined visible followers",
      note: "Aggregate visible follower count across 38 accounts; not unique reach.",
    },
    {
      id: "narratives",
      value: "4",
      label: "recurring narrative categories",
    },
  ],
  ideologicalClassification: [
    { label: "Al-Qaeda, including overlapping TTP ties", count: 22 },
    { label: "Tehrik-i-Taliban Pakistan", count: 12 },
    { label: "Jamaat-ul-Mujahideen Bangladesh", count: 7 },
    { label: "ISIS", count: 4 },
    { label: "Unclassified or general extremism", count: 16 },
  ],
  profileClassification: [
    { label: "Fake identities or pseudonyms", count: 42 },
    { label: "Apparently real names and photographs", count: 18 },
    { label: "Undetermined", count: 1 },
  ],
  ideologicalCategories: [
    {
      id: "al-qaeda-overlap-ttp",
      label: "Al-Qaeda, including overlapping TTP ties",
      shortLabel: "Al-Qaeda / overlapping TTP",
      value: 22,
      description: "Profiles classified by researchers as aligned with Al-Qaeda narratives, with overlapping TTP ties noted in the published report.",
      reviewStatus: "Methodology clarification required",
      overlapNote:
        "This report labels this category as including overlapping TTP ties. The exact account-level overlap requires editorial clarification.",
    },
    {
      id: "ttp",
      label: "Tehrik-i-Taliban Pakistan",
      shortLabel: "TTP",
      value: 12,
      description: "Profiles classified by researchers as aligned with Tehrik-i-Taliban Pakistan-related material.",
      reviewStatus: "Analysis",
    },
    {
      id: "jmb",
      label: "Jamaat-ul-Mujahideen Bangladesh",
      shortLabel: "JMB",
      value: 7,
      description: "Profiles classified by researchers as aligned with Jamaat-ul-Mujahideen Bangladesh-related material.",
      reviewStatus: "Analysis",
    },
    {
      id: "isis",
      label: "ISIS",
      shortLabel: "ISIS",
      value: 4,
      description: "Profiles classified by researchers as aligned with ISIS-related material.",
      reviewStatus: "Analysis",
    },
    {
      id: "unclassified-general",
      label: "Unclassified or general extremism",
      shortLabel: "Unclassified / general",
      value: 16,
      description: "Profiles placed outside named categories or treated as general extremist content within the analysed sample.",
      reviewStatus: "Analysis",
    },
  ],
  identityCategories: [
    {
      id: "fake-or-pseudonymous",
      label: "Fake identities or pseudonyms",
      shortLabel: "Fake or pseudonymous",
      value: 42,
      description:
        "Profiles classified by the researchers as using fake names, pseudonyms, stolen imagery, or other inauthentic identity information.",
    },
    {
      id: "apparently-real",
      label: "Apparently real names and photographs",
      shortLabel: "Apparently real identity",
      value: 18,
      description:
        "Profiles classified as appearing to use real names and photographs. This does not independently verify the person's legal identity.",
    },
    {
      id: "undetermined",
      label: "Undetermined",
      shortLabel: "Undetermined",
      value: 1,
      description: "Available information was insufficient for classification.",
    },
  ],
  narrativeCategories: [
    {
      id: "deployments",
      title: "Delegitimising international deployments and UN missions",
      description:
        "Future analysis will show how peacekeeping and international deployments were reframed in hostile religious and political terms.",
    },
    {
      id: "grief",
      title: "Hijacking national grief and public discourse",
      description:
        "This thread will document how moments of mourning and public discussion were targeted by anonymised accounts.",
    },
    {
      id: "unrest",
      title: "Exploiting domestic unrest and law-enforcement incidents",
      description:
        "This category will separate documented incident references from analysis of opportunistic narrative framing.",
    },
    {
      id: "theology",
      title: "Theological justification for real-world violence",
      description:
        "This section requires careful editorial review because it contains references to incitement and violent rhetoric.",
    },
  ],
  timeline: [
    {
      year: "2015",
      title: "Foundational narrative documented",
      description:
        "A future timeline entry will explain the documented origin of the anti-military narrative without linking to extremist sources.",
    },
    {
      year: "2024-early 2026",
      title: "Observation period",
      description:
        "The interactive edition will identify the observed period and the evidence boundaries used by researchers.",
    },
    {
      year: "2025-2026",
      title: "Incident-driven campaign activity",
      description:
        "Later versions will connect public events to documented waves of narrative activity, with limitations shown beside the evidence.",
    },
  ],
  evidencePreview: [
    {
      id: "EV-001",
      accountLabel: "Account A",
      date: "December 2025",
      type: "Public post share",
      verificationStatus: "Editorial review required",
      redactionStatus: "Redaction required",
      editorialStatus: "Editorial review required",
      translationStatus: "Translation review required",
      description:
        "An anonymised example showing how a condolence message was reframed with hostile terminology.",
    },
    {
      id: "EV-002",
      accountLabel: "Account B",
      date: "December 2025",
      type: "Comment cluster",
      verificationStatus: "Legal review required",
      redactionStatus: "Redaction required",
      editorialStatus: "Legal review required",
      translationStatus: "Translation review required",
      description:
        "A placeholder for grouped comments that will be redacted and excerpted only where necessary.",
    },
    {
      id: "EV-003",
      accountLabel: "Account C",
      date: "2025-2026",
      type: "Narrative recurrence",
      verificationStatus: "Methodology review required",
      redactionStatus: "Public excerpt pending",
      editorialStatus: "Methodology clarification required",
      description:
        "A future evidence card for repeated language patterns across public posts, without direct platform links.",
    },
  ],
};

export const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "triggering-event", label: "Triggering event" },
  { id: "origins", label: "Origins" },
  { id: "dataset", label: "Dataset" },
  { id: "narratives", label: "Narratives" },
  { id: "evidence", label: "Evidence" },
  { id: "methodology", label: "Methodology" },
  { id: "limitations", label: "Limitations" },
  { id: "recommendations", label: "Recommendations" },
  { id: "about", label: "About" },
] as const;
