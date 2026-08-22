import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader, Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ReportContentProvider } from "@/components/providers/ReportContentProvider";
import { getReportContent } from "@/lib/report-content-store";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bengaliSans = Noto_Sans_Bengali({
  variable: "--font-bengali-sans",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const bengaliSerif = Noto_Serif_Bengali({
  variable: "--font-bengali-serif",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "How 'murtad' became a recurring narrative against Bangladesh's armed forces",
  description:
    "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
  authors: [{ name: "Tech and Hate" }],
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "How 'murtad' became a recurring narrative against Bangladesh's armed forces",
    description:
      "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
    type: "article",
    publishedTime: "2026-03-20",
    authors: ["Tech and Hate"],
    url: "https://example.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "How 'murtad' became a recurring narrative against Bangladesh's armed forces",
    description:
      "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#14150f",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const reportContent = await getReportContent();
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${bengaliSans.variable} ${bengaliSerif.variable} scroll-smooth`}
    >
      <body>
        <ReportContentProvider value={reportContent}>{children}</ReportContentProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
