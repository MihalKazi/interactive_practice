import type { ReportData } from "@/types/report";

export const defaultReport: ReportData = {
  title:
    "Propaganda: An Analysis of Extremist Campaigns Targeting the Bangladesh Armed Forces",
  author: "Activate Rights",
  date: "August 12, 2026",
  heroTagline:
    "How 'murtad' became a recurring narrative against Bangladesh's armed forces.",
  importantDataNote:
    "The combined follower figure is an aggregate of publicly visible follower counts across 73 profiles. It must not be interpreted as unique audience reach, impressions, or verified exposure.",
  openingStatistics: [
    { id: "profiles", value: "73", label: "profiles analysed" },
    {
      id: "fake",
      value: "36",
      label: "fake or pseudonymous identities",
      note: "37 profiles assessed as authentic, 36 as fake or pseudonymous.",
    },
    {
      id: "followers",
      value: "900,000+",
      label: "combined visible followers",
      note: "Aggregate visible follower count across 73 profiles; not unique reach.",
    },
    {
      id: "narratives",
      value: "5",
      label: "recurring narrative categories",
    },
  ],
  ideologicalClassification: [
    { label: "Al-Qaeda", count: 21 },
    { label: "Tehrik-i-Taliban Pakistan", count: 13 },
    { label: "Jamaat-ul-Mujahideen Bangladesh", count: 4 },
    { label: "ISIS", count: 2 },
    { label: "General extremism", count: 33 },
  ],
  profileClassification: [
    { label: "Fake identities or pseudonyms", count: 36 },
    { label: "Apparently real names and photographs", count: 37 },
  ],
  ideologicalCategories: [
    {
      id: "al-qaeda",
      label: "Al-Qaeda",
      shortLabel: "Al-Qaeda",
      value: 21,
      description: "Profiles classified by researchers as aligned with Al-Qaeda narratives.",
    },
    {
      id: "ttp",
      label: "Tehrik-i-Taliban Pakistan",
      shortLabel: "TTP",
      value: 13,
      description: "Profiles classified by researchers as aligned with Tehrik-i-Taliban Pakistan-related material.",
    },
    {
      id: "jmb",
      label: "Jamaat-ul-Mujahideen Bangladesh",
      shortLabel: "JMB",
      value: 4,
      description: "Profiles classified by researchers as aligned with Jamaat-ul-Mujahideen Bangladesh-related material.",
    },
    {
      id: "isis",
      label: "ISIS",
      shortLabel: "ISIS",
      value: 2,
      description: "Profiles classified by researchers as aligned with ISIS-related material.",
    },
    {
      id: "general-extremism",
      label: "General extremism",
      shortLabel: "General extremism",
      value: 33,
      description: "Profiles placed outside named factional categories or treated as general extremist content within the analysed sample.",
    },
  ],
  identityCategories: [
    {
      id: "fake-or-pseudonymous",
      label: "Fake identities or pseudonyms",
      shortLabel: "Fake or pseudonymous",
      value: 36,
      description:
        "Profiles classified by the researchers as using fake names, pseudonyms, stolen imagery, or other inauthentic identity information.",
    },
    {
      id: "apparently-real",
      label: "Apparently real names and photographs",
      shortLabel: "Apparently real identity",
      value: 37,
      description:
        "Profiles classified as appearing to use real names and photographs. This does not independently verify the person's legal identity.",
    },
  ],
  narrativeCategories: [
    {
      id: "anti-islamic",
      title: "4.1 — Framing the army as anti-Islamic",
      description:
        "Posts recast routine institutional conduct as evidence the military stands against Islam itself — the foundational frame every other narrative in the campaign builds on.",
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0514-20/https://www.facebook.com:443/cheney.mousseau/posts/pfbid02v2dMBheM1AtDkUneYSd2b3k6DwepPEpfvoTfMTm2harxwjMV2F6m2pywPC7YFCyGl",
        "https://megalodon.jp/2026-0814-0400-22/https://www.facebook.com:443/mahfujurshanto/posts/pfbid02x7rLy8gPB1kpFZWE7Q9Ca91gYeDGkUqTwfy69VwYKpRv7HN7onmTWDU61GJreshAl",
      ],
    },
    {
      id: "western-war",
      title: "4.2 — Peacekeeping as a Western war against Muslims",
      description:
        "UN deployments are reframed as service to Western and Jewish geopolitical interests rather than international peacekeeping — turning a source of national pride into evidence of apostasy.",
      sourceLinks: [
        "https://archive.ph/iM7X7",
        "https://megalodon.jp/2026-0812-0554-05/https://www.facebook.com:443/mdborhanuddinriyad1/posts/pfbid02pkBbbnDeAMet9rNFrgZfqt7R9XrU2APJCwGvU2Gs4zMhnrs718YqSEbPNCGu8gxpl",
      ],
    },
    {
      id: "fails-at-home",
      title: "4.3 — The army fails at home",
      description:
        "Domestic law-enforcement and crowd-control actions are stripped of civic context and re-cast as an occupying force attacking devout Muslims on their own soil.",
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0555-39/https://www.facebook.com:443/tahsin.mobailexchange/posts/pfbid028SS1HUMyUv1yYB8VXppPNdRepNvSiLtKAwhgxKPsygxY7CviKU6NtgMUMXFNYX5sl",
        "https://archive.ph/RQaWO",
      ],
    },
    {
      id: "mujahideen-vs-army",
      title: "4.4 — Mujahideen and Tawhidists versus the army",
      description:
        "The army is positioned as the direct adversary of \"true\" Muslims — global Mujahideen networks — rather than a national institution, aligning domestic anti-military sentiment with transnational jihadist framing.",
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0615-33/https://www.facebook.com:443/tafannumakter.mahmuda/posts/pfbid0367EDuM6pj6DNeu7fAMo2qQ2mFh9syaFjHLoBm7BuGUmnTm9z8jDMmLnSWKcV9WM3l",
        "https://archive.org/details/httpswww.facebook.compermalink.phpstory_fbidpfbid02xigabgxty4x3daqtfgvgxpz",
      ],
    },
    {
      id: "threatening-violence",
      title: "4.5 — Threatening and justifying violence against the army",
      description:
        "The most severe category: explicit theological arguments that soldiers' blood is \"halal\" — moving from delegitimising rhetoric to direct incitement.",
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0514-20/https://www.facebook.com:443/cheney.mousseau/posts/pfbid02v2dMBheM1AtDkUneYSd2b3k6DwepPEpfvoTfMTm2harxwjMV2F6m2pywPC7YFCyGl",
        "https://archive.org/details/httpswww.facebook.comsharep18bgkvtsx4",
      ],
    },
  ],
  timeline: [
    {
      year: "2015",
      title: "Foundational fatwa published",
      description:
        "An AQIS-affiliated Bengali website, \"Dawah Ilallah,\" publishes a fatwa declaring the Bangladesh Army a \"murtad\" (apostate) institution — calling for \"all-out jihad\" against the military collectively, regardless of whether individual soldiers are practicing believers (mumin) or sinners (fasik).",
      roots: [
        {
          label: "Protecting \"Taghut\"",
          text: "Acting as a defense mechanism for secular rulers and un-Islamic governance.",
        },
        {
          label: "Serving foreign imperialism",
          text: "Protecting the strategic interests of Jewish and American forces.",
        },
      ],
      sourceLinks: [
        "https://web.archive.org/web/20260319172922/https://dawahilallah.com/forum/%E0%A6%AE%E0%A7%82%E0%A6%B2-%E0%A6%AB%E0%A7%8B%E0%A6%B0%E0%A6%BE%E0%A6%AE/%E0%A6%AE%E0%A6%BE%E0%A6%A8%E0%A6%B9%E0%A6%BE%E0%A6%AF/598-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80-%E0%A6%B9%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A7%87-%E0%A6%A6%E0%A6%B2%E0%A6%97%E0%A6%A4%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%8F%E0%A6%95%E0%A6%9F%E0%A6%BF-%E0%A6%AE%E0%A7%81%E0%A6%B0%E0%A6%A4%E0%A6%BE%E0%A6%A6-%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80",
      ],
    },
    {
      year: "Apr 12, 2025",
      title: "\"March for Gaza\" and the black Kalima flag restriction",
      description:
        "When the army restricted the display of black Kalima flags during the March for Gaza rally, an online campaign targeting the army launched on social media, framing the restriction as anti-Islamic.",
      breakdown: [
        {
          label: "The trigger",
          text: "Army confiscates black Kalima flags at the rally, citing security searches.",
        },
        {
          label: "The reframing",
          text: "Posts relabel the army \"Taghut force\" and \"murtad forces\" within hours — the 2015 fatwa's own terms.",
        },
      ],
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0650-15/https://www.facebook.com:443/azmayen.haque.abir/posts/pfbid02RCwxbTv8TG4Qt3PMqXoQXAFEThAgaqLmYmzz2TPX2L2dK1YPYCjCqeC9BJMf1XkPl",
        "https://megalodon.jp/2026-0814-0317-35/https://www.facebook.com:443/Rayhan.Sharif.74/posts/pfbid0YFiuLWRpcFwZ4KNn93GoP8Y5dbrRs4dhLowRQac522DwGNiTEn4c18v629xfW875l",
        "https://megalodon.jp/2026-0814-0324-54/https://www.facebook.com:443/nayem.mahmud.3954/videos/569551019496193/",
      ],
    },
    {
      year: "Nov 17, 2025",
      title: "Dhanmondi 32 incident",
      description:
        "Security forces stop a group attempting to destroy Sheikh Mujibur Rahman's Dhanmondi 32 residence. The network targets the army as apostates using the same tactics, rallying around a hashtag campaign.",
      breakdown: [
        {
          label: "The trigger",
          text: "Army and security forces stop a group from destroying the Dhanmondi 32 residence.",
        },
        {
          label: "The reframing",
          text: "Posts call the army \"the pet dog of Taghut rulers\" and argue every soldier is murtad, \"either directly or through complicity.\"",
        },
      ],
      sourceLinks: [
        "https://megalodon.jp/2026-0812-0630-54/https://www.facebook.com:443/taimura.lana/posts/pfbid02ZMidKaXPXNtLPWXBjPfJT2aVCBLUUyrh8t7zW7jx1cwhMiEDY6VeqWyieUrfS6bil",
        "https://megalodon.jp/2026-0814-0400-22/https://www.facebook.com:443/mahfujurshanto/posts/pfbid02x7rLy8gPB1kpFZWE7Q9Ca91gYeDGkUqTwfy69VwYKpRv7HN7onmTWDU61GJreshAl",
      ],
    },
    {
      year: "Dec 13, 2025",
      title: "Abyei, Sudan drone strike and hijacked mourning",
      description:
        "A drone strike on a UN peacekeeping base kills six Bangladeshi peacekeepers and injures nine. Condolence posts from Prime Minister Tarique Rahman, the Bangladesh Navy, and an opposition party page are flooded with comments labelling the dead \"murtad.\"",
      breakdown: [
        {
          label: "The trigger",
          text: "Six peacekeepers killed in Abyei, Sudan; state leaders post public condolences.",
        },
        {
          label: "The reframing",
          text: "Same accusation repeats across three unrelated institutional pages — Tarique Rahman, Jamaat-e-Islami, Bangladesh Navy — disputing the dead's martyrdom.",
        },
      ],
      sourceLinks: [
        "https://news.un.org/en/story/2025/12/1166601",
        "https://www.facebook.com/photo/?fbid=1430598028430530&set=a.430295218460821",
        "https://www.facebook.com/photo/?fbid=1268858378604390",
        "https://www.facebook.com/bangladeshnavy.mil.bd/posts/%E0%A6%B8%E0%A7%81%E0%A6%A6%E0%A6%BE%E0%A6%A8%E0%A7%87-%E0%A6%B8%E0%A6%A8%E0%A7%8D%E0%A6%A4%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A7%80-%E0%A6%B9%E0%A6%BE%E0%A6%AE%E0%A6%B2%E0%A6%BE%E0%A6%AF%E0%A6%BC-%E0%A6%B9%E0%A6%A4%E0%A6%BE%E0%A6%B9%E0%A6%A4-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D%E0%A6%A4%E0%A6%BF%E0%A6%B0%E0%A6%95%E0%A7%8D%E0%A6%B7%E0%A7%80%E0%A6%A6%E0%A7%87%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A4%E0%A6%BF-%E0%A6%97%E0%A6%AD%E0%A7%80%E0%A6%B0-%E0%A6%B6%E0%A7%8D/898020886127879/",
      ],
    },
  ],
  methodologyStages: [
    {
      title: "Keyword and narrative monitoring",
      detail: "Recurring anti-army narratives were monitored and relevant keywords identified across public Facebook activity.",
    },
    {
      title: "Data collection",
      detail: "Posts, comments, and profile activity were collected using OSINT tools — 73 profiles observed between 2024 and August 2026.",
    },
    {
      title: "Account classification",
      detail:
        "Each profile was assessed for stated or inferred ideological alignment (Al-Qaeda, TTP, JMB, ISIS, or general extremism) and for identity presentation (fake/pseudonymous or apparently real).",
    },
    {
      title: "Narrative coding",
      detail:
        "Recurring content was grouped into five thematic categories, tracing a consistent pattern: de-legitimise, reframe, accuse, glorify the opposing side, justify confrontation.",
    },
    {
      title: "Coordination indicators",
      detail:
        "Repeated hashtags, near-identical captions, and synchronised posting around specific events were treated as evidence of narrative alignment — not, by itself, proof of formal coordination or shared control.",
    },
    {
      title: "Follower-count calculation",
      detail:
        "Publicly visible follower counts were summed across the 73 profiles, producing an aggregate of 900,000+. This is a visibility total, not unique reach or impressions.",
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
      audience: "Social media platforms",
      action: "Human moderation for Bengali content",
      detail:
        "Invest in human moderation to identify weaponised theological terms inciting violence against security personnel, and enforce stricter identity verification to curb fake profiles.",
    },
    {
      audience: "Researchers and communities",
      action: "Cross-platform threat mapping",
      detail:
        "Prioritise cross-platform mapping (Telegram, X, WhatsApp) to trace extremist network infrastructure as groups migrate following takedowns.",
    },
    {
      audience: "Civil society and platforms",
      action: "Digital-literacy campaigns",
      detail:
        "Launch literacy campaigns to help users detect fake profiles, manipulated narratives, and the coordinated exploitation of national tragedies.",
    },
  ],
  limitations: [
    {
      title: "Sample limitations",
      note: "73 profiles is a bounded sample, not a census of the network.",
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
  credits: [
    { role: "Reporting", name: "Hasan Al Mahmud, Jobair Ahmad" },
    { role: "Data collection", name: "Mohammad Abdul Mokim" },
    { role: "Data visualization", name: "Kazi Rohanuzzaman Mehal" },
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
