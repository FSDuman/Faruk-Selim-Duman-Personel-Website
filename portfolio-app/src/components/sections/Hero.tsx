"use client";

import Image from "next/image";
import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { profile } from "@/data/profile";
import { heroStats } from "@/data/hero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pb-10 pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-8%] top-[6%] h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(91,140,255,0.12), transparent 62%)",
        }}
      />

      <Container className="relative grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10">
          <div className="mb-7 flex flex-wrap items-center gap-4">
            <Badge tone="accent" dot className="animate-fadeUp">
              {t(ui.heroBadge)}
            </Badge>
            <span className="font-display text-xs uppercase tracking-[0.15em] text-text-secondary/70">
              {t(ui.labelSince)}
            </span>
          </div>

          <h1 className="font-display text-[clamp(3.25rem,8.4vw,7.75rem)] font-extrabold leading-[0.9] tracking-[-0.06em]">
            <span className="block text-white">FARUK</span>
            <span className="block text-white">SELIM</span>
            <span className="block text-accent">
              DUMAN<span className="text-text-secondary/40">.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl font-display text-[clamp(0.95rem,1.7vw,1.25rem)] font-semibold leading-snug text-text">
            {t(ui.heroTitle)}
          </p>
          <p className="mt-5 max-w-lg text-pretty text-[15.5px] leading-relaxed text-text-secondary">
            {t(ui.heroBlurb)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="#work" variant="primary">
              {t(ui.ctaProjects)} →
            </Button>
            <Button href="#contact" variant="ghost">
              {t(ui.ctaContact)}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-10 border-t border-line pt-6.5">
            {heroStats.map((s, i) => (
              <div key={i}>
                <div className="font-display text-[30px] font-extrabold leading-none text-white">
                  {s.num}
                </div>
                <div className="mt-1.5 max-w-[140px] text-xs leading-snug text-text-secondary/80">
                  {t(s.label)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative self-end">
          <span className="absolute -top-8 right-0.5 font-display text-xs tracking-[0.2em] text-text-secondary/60">
            {t(ui.labelYear)}
          </span>
          <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/faruk.jpg"
              alt={profile.name}
              width={720}
              height={960}
              priority
              className="block aspect-[3/4] w-full object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(7,11,22,0.72))",
              }}
            />
            <div className="absolute bottom-4 left-4.5 flex items-center gap-2 rounded-full border border-line bg-bg/55 px-3.5 py-2 font-display text-xs font-semibold text-text backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.location}
            </div>
          </div>
          <div className="absolute -bottom-3.5 -right-3.5 -z-10 h-[120px] w-[120px] rounded-2xl border border-accent opacity-35" />
        </div>
      </Container>
    </section>
  );
}
