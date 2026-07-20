import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { profile } from "@/data/profile";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

// latin-ext carries Turkish glyphs (ı İ ğ ş ç ö ü). Self-hosted via next/font,
// so no render-blocking Google request — friendly to the Lighthouse target.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.positioning,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://faruk-duman.example"
  ),
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.positioning,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-bg font-body text-text antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
