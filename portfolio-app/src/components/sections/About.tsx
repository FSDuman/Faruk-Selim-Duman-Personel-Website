"use client";

import Image from "next/image";
import { profile } from "@/data/profile";
import { skills, certifications } from "@/data/skills";
import { useLocale } from "@/lib/locale-context";
import { ui } from "@/lib/i18n";

export function About() {
  const { t, locale } = useLocale();

  const facts = [
    { k: locale === "en" ? "Location" : "Konum", v: profile.location },
    { k: locale === "en" ? "Education" : "Eğitim", v: t(profile.education) },
    { k: locale === "en" ? "Languages" : "Diller", v: t(profile.languages) },
    { k: locale === "en" ? "Phone" : "Telefon", v: profile.phone },
  ];

  return (
    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-center">
      {/* Profile Image container with border accent */}
      <div className="relative mx-auto w-full max-w-[360px] lg:max-w-none">
        <div className="absolute -inset-3.5 border border-mint/45 rounded-[18px] pointer-events-none" />
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface border border-line">
          <Image
            src="/images/faruk.jpg"
            alt={profile.name}
            fill
            className="object-cover grayscale-[15%] contrast-[102%] transition-all duration-300 hover:grayscale-0"
            sizes="(max-width: 1024px) 360px, 450px"
            priority
          />
        </div>
      </div>

      {/* Profile details */}
      <div>
        <p className="font-display font-medium uppercase text-kicker text-mint">
          {t(ui.aboutKicker)}
        </p>
        <h2 className="mt-4 font-display font-bold text-title text-text">
          {t(ui.aboutTitle)}
        </h2>
        <p className="mt-6 text-body text-text-secondary leading-relaxed text-pretty">
          {t(ui.aboutP1)}
        </p>
        <p className="mt-5 text-body text-text-secondary leading-relaxed text-pretty">
          {t(ui.aboutP2)}
        </p>

        {/* Facts grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5">
          {facts.map((fact, idx) => (
            <div key={idx} className="border-l-2 border-mint pl-4.5">
              <span className="block text-[11.5px] font-semibold tracking-wider uppercase text-text-secondary">
                {fact.k}
              </span>
              <span className="block mt-1.5 text-[14.5px] font-medium text-text">
                {fact.v}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise & Certifications rows (spanning full width below the grid) */}
      <div className="lg:col-span-2 mt-10">
        <div className="border-t border-line pt-10">
          <h3 className="text-small font-semibold text-text-secondary mb-4 uppercase tracking-wide">
            {t(ui.skillsLabel)}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((sk, idx) => (
              <span
                key={idx}
                className="rounded-lg border border-line bg-white/[0.02] px-3.5 py-2 text-small font-medium text-text hover:border-mint/50 transition-colors"
              >
                {t(sk)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          {certifications.map((c, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 rounded-lg border border-mint/20 bg-mint/[0.08] px-4 py-2.5 text-xs font-semibold text-mint-hi"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
