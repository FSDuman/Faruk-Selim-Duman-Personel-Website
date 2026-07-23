import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { profile } from "@/data/profile";
import { LocaleProvider } from "@/lib/locale-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

// Runs before hydration so a saved theme applies with no flash. Light is
// the default for first-time visitors — no prefers-color-scheme fallback.
const THEME_BOOTSTRAP = `(function(){try{var k="fd-theme",s=localStorage.getItem(k);document.documentElement.classList.toggle("dark",s==="dark");}catch(e){}})();`;

// latin-ext carries Turkish glyphs (ı İ ğ ş ç ö ü). Self-hosted via next/font,
// so no render-blocking Google request — friendly to the Lighthouse target.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
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
      className={`${bricolageGrotesque.variable} ${ibmPlexSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body className="bg-bg font-body text-text antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
