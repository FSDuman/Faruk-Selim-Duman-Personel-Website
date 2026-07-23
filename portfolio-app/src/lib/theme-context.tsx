"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** Flips the theme. Pass the click coordinates to seed the spotlight wipe's origin. */
  toggleTheme: (originX?: number, originY?: number) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "fd-theme";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  // Light is the default for first-time visitors — we don't follow system
  // prefers-color-scheme here, only an explicit prior choice.
  if (saved === "light" || saved === "dark") return saved;
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The inline bootstrap script in layout.tsx already set the class on <html>
  // before hydration, so this initial state just needs to match it.
  const [theme, setThemeState] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);

  const toggleTheme = useCallback(
    (originX?: number, originY?: number) => {
      const next: Theme = theme === "light" ? "dark" : "light";
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const supportsViewTransition =
        typeof document.startViewTransition === "function";

      if (!supportsViewTransition || reduced || originX == null || originY == null) {
        setThemeState(next);
        return;
      }

      const x = originX;
      const y = originY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setThemeState(next);
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 550,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {
          // Transition was skipped/interrupted — the theme already flipped above.
        });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
