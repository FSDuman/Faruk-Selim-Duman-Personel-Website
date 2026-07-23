"use client";

import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="overflow-hidden border-t border-line pb-8 pt-11">
      <Container>
        <div
          aria-hidden
          className="select-none text-center font-display text-[clamp(3.5rem,15vw,13.75rem)] font-extrabold leading-[0.82] tracking-[-0.08em] text-text/[0.06]"
        >
          DUMAN
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-small text-text-secondary">
            © {new Date().getFullYear()} Faruk Selim Duman
          </p>
          {/* full-opacity secondary text — AA-compliant at small size (see report) */}
          <p className="text-small text-text-secondary">{t(ui.footerNote)}</p>
        </div>
      </Container>
    </footer>
  );
}
