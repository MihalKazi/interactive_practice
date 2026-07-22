import type { ReportData } from "@/types/report";

export const defaultReport: ReportData = {
  title:
    "Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces",
  author: "Tech and Hate",
  date: "March 20, 2026",
  heroTagline:
    "How extremist narratives targeted Bangladesh's Armed Forces across public social media spaces.",
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
      overlapNote:
        "This report labels this category as including overlapping TTP ties. The exact account-level overlap requires editorial clarification.",
    },
    {
      id: "ttp",
      label: "Tehrik-i-Taliban Pakistan",
      shortLabel: "TTP",
      value: 12,
      description: "Profiles classified by researchers as aligned with Tehrik-i-Taliban Pakistan-related material.",
    },
    {
      id: "jmb",
      label: "Jamaat-ul-Mujahideen Bangladesh",
      shortLabel: "JMB",
      value: 7,
      description: "Profiles classified by researchers as aligned with Jamaat-ul-Mujahideen Bangladesh-related material.",
    },
    {
      id: "isis",
      label: "ISIS",
      shortLabel: "ISIS",
      value: 4,
      description: "Profiles classified by researchers as aligned with ISIS-related material.",
    },
    {
      id: "unclassified-general",
      label: "Unclassified or general extremism",
      shortLabel: "Unclassified / general",
      value: 16,
      description: "Profiles placed outside named categories or treated as general extremist content within the analysed sample.",
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
        "The network reframes Bangladesh's UN peacekeeping role as apostasy and service to Western imperialism. When 99 Navy personnel deployed to South Sudan in December 2025, extremist pages recast the mission as defending a \"Christian state\" carved from Muslim Sudan. In January 2026, ahead of any confirmed decision on a Gaza deployment, the same framing was pushed pre-emptively to shape public sentiment in advance.",
    },
    {
      id: "grief",
      title: "Hijacking national grief and public discourse",
      description:
        "Condolence posts from major political figures and parties become the network's most effective distribution channel. After the December 2025 Abyei, Sudan drone strike killed six peacekeepers, accounts swarmed the resulting condolence posts to deny the dead any martyrdom status, reframing loss of military life as deserved.",
    },
    {
      id: "unrest",
      title: "Exploiting domestic unrest and law-enforcement incidents",
      description:
        "Routine crowd-control and law-enforcement actions are stripped of civic context and re-cast as religious oppression. The November 2025 Dhanmondi 32 dispersal, and the April 2025 and March 2025 protest incidents, were each reframed within hours as an \"apostate\" army attacking devout Muslims.",
    },
    {
      id: "theology",
      title: "Theological justification for real-world violence",
      description:
        "The most severe category: long-form theological posts arguing that military, police, and RAB personnel meet defined criteria that make violence against them permissible. This is incitement, not commentary, and is treated here with the highest evidence and legal-review bar on the site.",
    },
  ],
  timeline: [
    {
      year: "2015",
      title: "Foundational fatwa published",
      description:
        "An AQIS-affiliated Bengali website publishes a fatwa declaring the Bangladesh Army a \"murtad\" (apostate) institution, arguing the military exists to protect secular rulers (\"taghut\") and foreign interests rather than Islam.",
    },
    {
      year: "2024 – early 2026",
      title: "Observation window",
      description:
        "The 61-profile dataset was drawn from public Facebook activity across this period, using OSINT scraping of timestamps, post text, account metadata, and follower counts.",
    },
    {
      year: "Mar–Apr 2025",
      title: "Domestic protest incidents exploited",
      description:
        "The Hefazat-e-Islam protests over Israeli strikes and the Kohinoor chemical-factory protests in Dhaka are reframed as the military attacking devout Muslims rather than responding to civil unrest.",
    },
    {
      year: "Nov 2025",
      title: "Dhanmondi 32 dispersal",
      description:
        "Security forces disperse protesters at the Dhanmondi 32 memorial site; the network rallies around the incident with a coordinated hashtag campaign branding the army \"the pet dog of taghut rulers.\"",
    },
    {
      year: "Dec 2025",
      title: "Abyei, Sudan drone strike and hijacked mourning",
      description:
        "A drone strike kills six Bangladeshi UN peacekeepers. Condolence posts from Bangladesh's Prime Minister and the Jamaat-e-Islami page are flooded with comments labelling the dead \"murtad.\" Around the same period, a separate Navy deployment to South Sudan is reframed as defending a \"Christian state.\"",
    },
    {
      year: "Jan 2026",
      title: "Pre-emptive narrative shaping on Gaza",
      description:
        "Ahead of any confirmed Bangladeshi role in a Gaza peacekeeping force, the network floods social media with \"murtad\" framing to pre-shape public opinion against the prospect.",
    },
  ],
  methodologyStages: [
    {
      title: "Sample selection",
      detail:
        "61 highly active public Facebook profiles and pages, observed between 2024 and early 2026, selected for volume and consistency of anti-military content.",
    },
    {
      title: "Data collection",
      detail:
        "Open-source intelligence (OSINT) and automated scraping tools extracted exact timestamps, verbatim post text, account metadata, and follower counts.",
    },
    {
      title: "Account classification",
      detail:
        "Each profile was assessed for stated or inferred ideological alignment (Al-Qaeda, TTP, JMB, ISIS, or unclassified) and for identity presentation (fake/pseudonymous, apparently real, or undetermined).",
    },
    {
      title: "Narrative coding",
      detail:
        "Recurring content was grouped into four thematic pillars: international-deployment framing, hijacked mourning, domestic-unrest exploitation, and theological incitement.",
    },
    {
      title: "Coordination indicators",
      detail:
        "Repeated hashtags, near-identical captions, and synchronised posting around specific events were treated as evidence of narrative alignment — not, by themselves, proof of formal coordination or shared control.",
    },
    {
      title: "Follower-count calculation",
      detail:
        "Publicly visible follower counts were summed across 38 of the 61 accounts (follower data was not public on the rest), producing an aggregate of 815,000+. This is a visibility total, not unique reach or impressions.",
    },
    {
      title: "Translation and review",
      detail:
        "Bengali-language material was translated for analysis. Sensitive or incitement-adjacent passages are held to a stricter internal review bar before any public excerpt is approved.",
    },
    {
      title: "Ethical handling",
      detail:
        "Account identities, screenshots, and direct platform links are withheld from public release pending editorial and legal review, regardless of what is named in the source report.",
    },
  ],
  recommendations: [
    {
      audience: "Platforms (Meta/Facebook)",
      action: "Context-aware moderation for Bengali content",
      detail:
        "Human-in-the-loop review for Bengali-language posts, filters trained to catch weaponised theological terms used to incite violence, and stricter identity verification to curb mass creation of inauthentic profiles.",
    },
    {
      audience: "Research community",
      action: "Cross-platform threat tracking",
      detail:
        "Takedowns on one platform predictably push these networks to Telegram, X, or WhatsApp. Future OSINT work should map that migration, not just the Facebook footprint.",
    },
    {
      audience: "Civil society & state communicators",
      action: "Digital-literacy response, not passive monitoring",
      detail:
        "With an exposed audience of 815,000+, mostly young users, the priority is teaching people to recognise inauthentic profiles and manipulated narratives before radicalisation occurs.",
    },
  ],
  limitations: [
    {
      title: "Sample limitations",
      note: "61 profiles is a bounded sample, not a census of the network.",
    },
    {
      title: "Deleted or unavailable content",
      note: "Removed posts and comments cannot be independently re-verified.",
    },
    {
      title: "Follower overlap",
      note: "Aggregate follower totals may double-count shared audiences.",
    },
    {
      title: "Ideological-classification uncertainty",
      note: "Category assignment reflects researcher judgment, not confirmed affiliation.",
    },
    {
      title: "Coordination versus similarity",
      note: "Recurring language shows pattern, not proof of joint operation.",
    },
    {
      title: "Translation limitations",
      note: "Bengali-to-English rendering can shift tone and emphasis.",
    },
  ],
};

export const sectionLinks = [
  { id: "triggering-event", label: "Triggering event" },
  { id: "origins", label: "Origins" },
  { id: "dataset", label: "Dataset" },
  { id: "narratives", label: "Narratives" },
  { id: "limitations", label: "Where this stands" },
  { id: "about", label: "About" },
] as const;
