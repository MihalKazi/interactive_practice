import { AboutMasthead } from "@/components/report/AboutMasthead";
import { EvidenceZoomImage } from "@/components/report/EvidenceZoomImage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DatasetPreview } from "@/components/report/DatasetPreview";
import { EditorialSection } from "@/components/report/EditorialSection";
import { HeroSection } from "@/components/report/HeroSection";
import { IntroSequence } from "@/components/report/IntroSequence";
import { NarrativeEscalation } from "@/components/report/NarrativeEscalation";
import { TimelinePreview } from "@/components/report/TimelinePreview";
import { ChapterTransition } from "@/components/scrolly/ChapterTransition";
import { TriggeringEventScrolly } from "@/components/scrolly/TriggeringEventScrolly";
import { getReportContent } from "@/lib/report-content-store";

export default async function Home() {
  const report = await getReportContent();
  return (
    <>
      <IntroSequence />
      <SiteHeader />
      <main id="main" className="flex-1">
        <HeroSection />

        <div className="border-t border-[var(--border)] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[65ch]">
            <div className="space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--accent)]">
                <strong className="font-semibold">Six Bangladeshi peacekeepers lost their lives and nine others
                sustained injuries</strong> during a drone attack on a UN peacekeeping base in Abyei, Sudan, on
                December 13, 2025. The attack prompted national grief, with state leaders and major political
                figures issuing public condolences.
              </p>
              <p>
                Beyond national grief, the event highlighted a persistent, hostile backlash across social media.
                When major Bangladeshi political entities, including BNP Chairman and current Prime Minister
                Tarique Rahman, as well as the official Bangladesh Navy page and opposition party Bangladesh
                Jamaat&apos;s page, posted sympathy messages, their comment sections were flooded with derogatory
                statements calling them &quot;murtad&quot; (apostate) and &quot;taghut&quot; (oppressor).
              </p>
              <p>
                Additionally, user responses frequently disputed and mocked the framing of the deceased peacekeepers
                as martyrs. Comparable hostile rhetoric appeared across multiple mainstream media outlets as well.
              </p>
            </div>
          </div>
        </div>

        <TriggeringEventScrolly />

        <div className="border-t border-[var(--border)] px-5 pt-14 pb-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[65ch]">
            <p className="eyebrow text-[var(--accent)]">Inside the dataset</p>
            <div className="mt-3 space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
              <p>
                We gathered and analysed data across various periods regarding the individuals disseminating these
                narratives against the armed forces, as well as their affiliations.
              </p>
              <p>
                Analysis of 73 profiles (37 authentic, 36 fake) spreading these derogatory tags reveals a collective
                reach over 900,000 followers on Facebook. Their activity ties directly to radical extremism,
                including global networks.
              </p>
              <p>
                An analysis of these Facebook accounts&apos; activities indicates links to global extremist
                networks.
              </p>
            </div>
            <span className="mt-6 block h-[3px] w-24 bg-[var(--accent)]" aria-hidden="true" />
          </div>
        </div>

        <EditorialSection id="dataset" className="pt-0 pb-6 sm:pt-0 sm:pb-8 lg:pt-0 lg:pb-8">
          <DatasetPreview />
        </EditorialSection>

        <div className="border-t border-[var(--border)] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[65ch]">
            <p className="eyebrow text-[var(--accent)]">When the campaign started</p>
            <div className="mt-3 space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
              <p>
                <strong className="font-semibold">Not an isolated event.</strong> This campaign started in 2015 when
                the AQIS-affiliated Bengali website &quot;Dawah Ilallah&quot; published a fatwa declaring the
                Bangladesh Army a &quot;murtad&quot; force. The fatwa justified violence by calling for
                &quot;all-out jihad&quot; against the military collectively, regardless of whether individual
                soldiers are practicing believers (mumin) or sinners (fasik). Framing modern state militaries as
                protecting Islam&apos;s enemies, it outlined two anti-Islamic objectives:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="font-semibold text-[var(--accent)]">Protecting &quot;Taghut&quot;:</strong>{" "}
                  Acting as a defense mechanism for secular rulers and un-Islamic governance.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--accent)]">Serving Foreign Imperialism:</strong>{" "}
                  Protecting the strategic interests of Jewish and American forces.
                </li>
              </ul>
            </div>

            <figure className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                EV-003 / Figure 003
              </p>
              <div className="mt-2">
                <EvidenceZoomImage
                  src="/evidence/approved/ev-003-1784657280111.png"
                  alt="Historical-origin source screenshot: the 2015 fatwa published on the Dawah Ilallah website declaring the Bangladesh Army a 'murtad' force"
                />
              </div>
              <figcaption className="mt-2 text-sm italic leading-snug text-[var(--muted)]">
                Historical-origin source screenshot — the 2015 fatwa that first declared the Bangladesh Army
                &quot;murtad.&quot;
              </figcaption>
              <a
                href="https://web.archive.org/web/20260319172922/https://dawahilallah.com/forum/%E0%A6%AE%E0%A7%82%E0%A6%B2-%E0%A6%AB%E0%A7%8B%E0%A6%B0%E0%A6%BE%E0%A6%AE/%E0%A6%AE%E0%A6%BE%E0%A6%A8%E0%A6%B9%E0%A6%BE%E0%A6%AF/598-%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%B8%E0%A7%87%E0%A6%A8%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80-%E0%A6%B9%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A7%87-%E0%A6%A6%E0%A6%B2%E0%A6%97%E0%A6%A4%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%8F%E0%A6%95%E0%A6%9F%E0%A6%BF-%E0%A6%AE%E0%A7%81%E0%A6%B0%E0%A6%A4%E0%A6%BE%E0%A6%A6-%E0%A6%AC%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%A8%E0%A7%80"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-semibold text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 transition hover:decoration-[var(--accent)]"
              >
                Original source, Dawah Ilallah ↗
              </a>
            </figure>

            <span className="mt-6 block h-[3px] w-24 bg-[var(--accent)]" aria-hidden="true" />
          </div>
        </div>

        <TimelinePreview />

        <div className="dark-chapter dark-chapter-lined border-t border-[var(--border)] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[65ch]">
            <p className="eyebrow text-[var(--accent)]">Five narrative categories</p>
            <div className="mt-3 space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
              <p>
                Across these disseminations, extremist campaigns consistently revolve around five core recurring
                narratives, through which they actively construct and amplify strategic themes aimed at undermining
                the legitimacy of the military.
              </p>
            </div>
            <span className="mt-6 block h-[3px] w-24 bg-[var(--accent)]" aria-hidden="true" />
          </div>
        </div>

        <NarrativeEscalation narrativeCategories={report.narrativeCategories} />

        <div className="border-t border-[var(--border)] px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[65ch]">
            <p className="eyebrow text-[var(--accent)]">Key Recommendations</p>
            <div className="mt-3 space-y-5 font-serif text-xl leading-9 text-[var(--foreground)]">
              <p>
                To effectively address online extremist propaganda targeting the state force, the following
                measures are proposed:
              </p>
              <ul className="space-y-3">
                <li>
                  <strong className="font-semibold text-[var(--accent)]">Social Media Platform Oversight:</strong>{" "}
                  Expand human content moderation dedicated to Bengali language materials to detect weaponized
                  theological terms inciting violence, while implementing robust identity verification protocols to
                  mitigate fake accounts.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--accent)]">Cross-Platform Network Mapping:</strong>{" "}
                  Enable researchers and community analysts to track extremist digital infrastructure across
                  multiple platforms (such as Telegram, X, and WhatsApp) as groups adapt and migrate following
                  content takedowns.
                </li>
                <li>
                  <strong className="font-semibold text-[var(--accent)]">Public Digital Literacy Initiatives:</strong>{" "}
                  Establish education campaigns empowering users to recognize fraudulent profiles, manipulated
                  narratives, and coordinated attempts to exploit tragic events.
                </li>
              </ul>
            </div>
            <span className="mt-6 block h-[3px] w-24 bg-[var(--accent)]" aria-hidden="true" />
          </div>
        </div>

        <EditorialSection id="limitations">
          <div id="methodology" className="scroll-mt-28">
            <p className="eyebrow text-[var(--accent)]">Methodology</p>
            <p className="mt-3 max-w-[65ch] font-serif text-xl leading-9 text-[var(--foreground)]">
              We monitored recurring anti-army narratives, identified relevant keywords, and collected posts,
              comments and Facebook profile activity using OSINT tools. We then analysed the content, account
              behaviour and affiliations to identify recurring and coordinated patterns across incidents.
            </p>
          </div>
        </EditorialSection>

        <EditorialSection id="about" className="bg-[var(--surface)] py-10">
          <AboutMasthead author={report.author} date={report.date} credits={report.credits} />
        </EditorialSection>
      </main>
      <SiteFooter />
    </>
  );
}
