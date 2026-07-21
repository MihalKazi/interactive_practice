import type { Metadata, Viewport } from "next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sans = Noto_Sans_Bengali({
  variable: "--font-sans",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Noto_Serif_Bengali({
  variable: "--font-serif",
  subsets: ["bengali", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Inside the Network | Interactive Investigation",
  description:
    "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
  authors: [{ name: "Hasan Al Mahmud" }],
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Inside the Network | Interactive Investigation",
    description:
      "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
    type: "article",
    publishedTime: "2026-03-20",
    authors: ["Hasan Al Mahmud"],
    url: "https://example.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inside the Network | Interactive Investigation",
    description:
      "An interactive data-led investigation into extremist online narratives targeting the Bangladesh Armed Forces.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} scroll-smooth`} suppressHydrationWarning>
      <Script id="theme-init" strategy="beforeInteractive">
        {"try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}"}
      </Script>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
