"use client";

import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-text-secondary">
          © {new Date().getFullYear()} Faruk Selim Duman
        </p>
        {/* full-opacity secondary text — AA-compliant at small size (see report) */}
        <p className="text-small text-text-secondary">{t(ui.footerNote)}</p>
      </Container>
    </footer>
  );
}
