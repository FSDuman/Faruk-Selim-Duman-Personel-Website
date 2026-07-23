"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV = [
  { key: "navAbout", href: "#about" },
  { key: "navExperience", href: "#experience" },
  { key: "navWork", href: "#work" },
  { key: "navContact", href: "#contact" },
] as const;

export function Header() {
  const { locale, toggle, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 font-display text-[15px] font-extrabold tracking-tight text-text"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-[14px] font-extrabold text-accent-ink">
            FD
          </span>
          FARUK SELIM DUMAN
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-small font-medium text-text-secondary transition-colors hover:text-text"
              >
                {t(ui[item.key])}
              </a>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={toggle}
            aria-label={t(ui.langLabel)}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-text/[0.03] px-3 py-1.5 font-display text-xs font-semibold tracking-wide transition-colors hover:border-accent"
          >
            <span className={locale === "en" ? "text-text" : "text-text-secondary"}>
              EN
            </span>
            <span className="text-text-secondary/50">/</span>
            <span className={locale === "tr" ? "text-text" : "text-text-secondary"}>
              TR
            </span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-text transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-0.5 w-4 bg-text transition-opacity duration-200",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-0.5 w-4 bg-text transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-bg/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="flex flex-col py-4">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-display text-body-lg font-medium text-text-secondary transition-colors hover:text-text"
            >
              {t(ui[item.key])}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}
