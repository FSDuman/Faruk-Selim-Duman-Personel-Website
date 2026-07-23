"use client";

import Image from "next/image";
import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

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
          <Reveal className="flex items-center justify-center">
            <Image
              src="/images/frog.png"
              alt="A frog creature drawn in Procreate"
              width={360}
              height={360}
              className="w-full max-w-[280px] animate-floaty rounded-3xl shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
            />
          </Reveal>

          <Reveal delay={0.12}>
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
