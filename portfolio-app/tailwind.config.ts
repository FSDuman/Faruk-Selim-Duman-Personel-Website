import type { Config } from "tailwindcss";

// Single source of truth for color + type tokens. Components reference these
// tokens only — no raw hex in JSX/CSS.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070B16",
        surface: "#0E1526",
        text: {
          DEFAULT: "#E8ECF4",
          secondary: "#A9B6CD",
        },
        accent: {
          DEFAULT: "#5B8CFF",
          hi: "#8FB4FF",
        },
        coral: "#E39A94",
        line: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 10px 34px rgba(91,140,255,0.3)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-ibm-plex-sans)", "sans-serif"],
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
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-2deg)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 34s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
