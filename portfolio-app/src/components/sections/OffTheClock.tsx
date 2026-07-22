"use client";

import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { Container } from "@/components/ui/Container";

// The design references a personal Procreate drawing (assets/frog.png) that
// couldn't be pulled from the design project (file exceeds the fetch size
// cap). Swap this placeholder for the real artwork at /public/images/frog.png
// and replace the emoji below with an <Image>.
export function OffTheClock() {
  const { t } = useLocale();

  return (
    <section className="py-10 sm:py-16">
      <Container>
        <div
          className="grid grid-cols-1 items-center gap-12 rounded-3xl border border-line p-10 sm:p-12 lg:grid-cols-[0.9fr_1.1fr]"
          style={{
            background:
              "linear-gradient(150deg, rgba(20,28,48,0.5), rgba(11,16,30,0.3))",
          }}
        >
          <div className="flex items-center justify-center">
            <div
              aria-label="Frog illustration placeholder"
              className="flex aspect-square w-full max-w-[280px] animate-floaty items-center justify-center rounded-3xl border border-dashed border-line bg-white/[0.02] text-7xl"
            >
              🐸
            </div>
          </div>

          <div>
            <p className="font-display text-kicker font-medium uppercase text-accent">
              {t(ui.offKicker)}
            </p>
            <h2 className="mt-4 max-w-lg text-pretty font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-text">
              {t(ui.offTitle)}
            </h2>
            <p className="mt-5 max-w-[520px] text-pretty text-body leading-relaxed text-text-secondary">
              {t(ui.offP)}
            </p>
            <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-2 text-[12.5px] font-medium text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t(ui.offNote)}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
