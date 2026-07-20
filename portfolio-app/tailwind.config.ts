import type { Config } from "tailwindcss";

// Single source of truth for color + type tokens. Components reference these
// tokens only — no raw hex in JSX/CSS. (GPU material colors in the R3F scene
// are the one intentional exception: they are shader values, not styling.)
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0F14",
        surface: "#131A22",
        text: {
          DEFAULT: "#E8EDF2",
          secondary: "#8A97A6",
        },
        mint: {
          DEFAULT: "#7FD1B9",
          hi: "#9BE0CB",
        },
        coral: "#E39A94",
        line: "rgba(232,237,242,0.08)",
      },
      boxShadow: {
        glow: "0 0 80px rgba(127,209,185,0.14)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      // Semantic type scale — used via text-display / text-title / text-body, etc.
      fontSize: {
        kicker: ["0.75rem", { lineHeight: "1", letterSpacing: "0.2em" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        title: [
          "clamp(1.75rem, 3vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        display: [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em" },
        ],
      },
      maxWidth: {
        shell: "1240px",
        prose: "68ch",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
