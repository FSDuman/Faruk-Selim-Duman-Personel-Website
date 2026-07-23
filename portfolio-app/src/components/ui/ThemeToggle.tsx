"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import { useLocale } from "@/lib/locale-context";
import { ui } from "@/lib/i18n";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 0 L9.4 6.2 L16 8 L9.4 9.8 L8 16 L6.6 9.8 L0 8 L6.6 6.2 Z" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M9 0 L2.5 9 L7 9 L6 16 L13.5 6.2 L9 6.2 Z" />
    </svg>
  );
}

// Pill switch whose thumb morphs between the site's own star/bolt motifs —
// clicking seeds theme-context's spotlight wipe from the click position.
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme(e.clientX, e.clientY)}
      aria-label={t(ui.themeLabel)}
      className="relative flex h-8 w-[52px] shrink-0 items-center rounded-full border border-line bg-text/[0.03] px-1 transition-colors hover:border-accent"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-ink"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="flex h-3 w-3 items-center justify-center"
          >
            {isDark ? (
              <BoltIcon className="h-3 w-3" />
            ) : (
              <StarIcon className="h-3 w-3" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
