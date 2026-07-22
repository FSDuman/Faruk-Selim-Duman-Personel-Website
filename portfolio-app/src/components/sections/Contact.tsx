"use client";

import { profile } from "@/data/profile";
import { useLocale } from "@/lib/locale-context";
import { ui } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Motion";

export function Contact() {
  const { t } = useLocale();

  const contactLinks = [
    { label: "LinkedIn ↗", href: `https://${profile.linkedin}` },
    { label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  ];

  return (
    <div className="max-w-[900px] mx-auto text-center relative py-12">
      {/* Background Radial Glow */}
      <div
        aria-hidden
        style={{
          background:
            "radial-gradient(circle, rgba(91, 140, 255, 0.12), transparent 65%)",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none select-none"
      />

      <Reveal className="relative z-10">
        {/* Kicker */}
        <p className="font-display font-medium uppercase text-kicker text-accent">
          {t(ui.contactKicker)}
        </p>

        {/* Title */}
        <h2 className="mt-4 font-display font-bold text-display-sm text-text leading-tight text-pretty max-w-2xl mx-auto">
          {t(ui.contactTitle)}
        </h2>

        {/* Blurb */}
        <p className="mt-6 text-body-lg text-text-secondary max-w-[520px] mx-auto leading-relaxed">
          {t(ui.contactBlurb)}
        </p>

        {/* Primary Email CTA Button */}
        <div className="mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2.5 bg-accent text-bg font-display font-bold text-body px-8 py-4.5 rounded-xl hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(91,140,255,0.35)] transition-all duration-300"
          >
            <span className="text-lg">✉</span>
            {profile.email}
          </a>
        </div>

        {/* Secondary Links */}
        <div className="flex justify-center flex-wrap gap-3.5 mt-9">
          {contactLinks.map((cl, idx) => (
            <a
              key={idx}
              href={cl.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 rounded-lg border border-line bg-white/[0.02] text-small font-medium text-text-secondary transition-colors hover:border-accent hover:text-text"
            >
              {cl.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
