"use client";

import { profile } from "@/data/profile";
import { skills, certifications } from "@/data/skills";
import { useLocale } from "@/lib/locale-context";
import { ui } from "@/lib/i18n";
import { EcosystemCanvas } from "@/components/graphics/EcosystemCanvas";
import { Reveal } from "@/components/ui/Motion";

export function About() {
  const { t, locale } = useLocale();

  const facts = [
    { k: locale === "en" ? "Location" : "Konum", v: profile.location },
    { k: locale === "en" ? "Education" : "Eğitim", v: t(profile.education) },
    { k: locale === "en" ? "Languages" : "Diller", v: t(profile.languages) },
    { k: locale === "en" ? "Phone" : "Telefon", v: profile.phone },
  ];

  return (
    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      {/* Profile details */}
      <div>
        <Reveal>
          <p className="font-display text-kicker font-medium uppercase text-accent">
            {t(ui.aboutKicker)}
          </p>
          <h2 className="mt-4 font-display text-title font-bold text-text">
            {t(ui.aboutTitle)}
          </h2>
          <p className="mt-6 text-pretty text-body leading-relaxed text-text-secondary">
            {t(ui.aboutP1)}
          </p>
          <p className="mt-5 text-pretty text-body leading-relaxed text-text-secondary">
            {t(ui.aboutP2)}
          </p>
        </Reveal>

        {/* Facts grid */}
        <Reveal
          delay={0.1}
          className="mt-8 grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2"
        >
          {facts.map((fact, idx) => (
            <div key={idx} className="border-l-2 border-accent pl-4.5">
              <span className="block text-[11.5px] font-semibold uppercase tracking-wider text-text-secondary">
                {fact.k}
              </span>
              <span className="mt-1.5 block text-[14.5px] font-medium text-text">
                {fact.v}
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.18}>
          <h3 className="mb-4 mt-9 text-small font-semibold uppercase tracking-wide text-text-secondary">
            {t(ui.skillsLabel)}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((sk, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 text-small font-medium text-text transition-colors hover:border-accent/50"
              >
                {t(sk)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Ecosystem visual + certifications */}
      <Reveal delay={0.15}>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(91,140,255,0.08), rgba(9,13,24,0.9))",
            }}
          />
          <EcosystemCanvas />
          <div className="absolute left-4 top-3.5 font-display text-[11px] uppercase tracking-[0.15em] text-text-secondary/70">
            {t(ui.stackLabel)}
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2.5">
          {certifications.map((c, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/[0.08] px-3.5 py-2 text-[12.5px] font-medium text-accent-hi"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {c.name}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
