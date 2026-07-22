"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Section } from "@/components/ui/Section";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { OffTheClock } from "@/components/sections/OffTheClock";
import { Contact } from "@/components/sections/Contact";
import { useLocale } from "@/lib/locale-context";
import { ui } from "@/lib/i18n";

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />

        <Section id="about">
          <About />
        </Section>

        <Section
          id="experience"
          kicker={t(ui.expKicker)}
          title={t(ui.expTitle)}
          className="bg-surface/40"
        >
          <Experience />
        </Section>

        <Section
          id="work"
          kicker={t(ui.workKicker)}
          title={t(ui.workTitle)}
          lead={t(ui.workBlurb)}
        >
          <Work />
        </Section>

        <OffTheClock />

        <Section id="contact">
          <Contact />
        </Section>
      </main>
      <Footer />
    </>
  );
}
