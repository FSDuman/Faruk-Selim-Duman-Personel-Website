"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ui } from "@/lib/i18n";
import { useLocale } from "@/lib/locale-context";
import { isWebGLAvailable } from "@/lib/webgl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// Client-only: R3F must not run on the server. Skeleton matches final framing
// (full-bleed, same box) so there is no layout shift when it swaps in.
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <HeroPoster /> }
);

// Static poster: dim radial mint glow + faint node grid. Doubles as the
// no-WebGL / reduced-motion fallback so the canvas box is never blank.
function HeroPoster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(closest-side at 62% 45%, rgba(127,209,185,0.14), transparent 70%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(127,209,185,0.25) 1px, transparent 1.5px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(closest-side at 62% 45%, #000, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 62% 45%, #000, transparent 72%)",
        }}
      />
    </div>
  );
}

export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const scrollRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => setWebgl(isWebGLAvailable()), []);

  // Scroll progress across the hero → sequences the scene's resolve.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const h = el.offsetHeight || window.innerHeight;
      scrollRef.current = Math.min(Math.max(window.scrollY / h, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pause the render loop when the hero leaves the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showCanvas = webgl === true;
  const frozen = !!reduced; // freeze animation, keep a static render

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D layer — behind the text, never gates it */}
      <div className="pointer-events-none absolute inset-0">
        {showCanvas ? (
          <Suspense fallback={<HeroPoster />}>
            <HeroCanvas scrollRef={scrollRef} paused={!inView} frozen={frozen} />
          </Suspense>
        ) : (
          <HeroPoster />
        )}
      </div>

      {/* Legibility scrim so text holds contrast over the brightest reveal */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent"
      />

      {/* Text — plain DOM, paints within ~1s regardless of the 3D layer */}
      <Container className="relative z-10 py-32">
        <Badge tone="mint" dot className="animate-fadeUp">
          {t(ui.heroBadge)}
        </Badge>
        <h1 className="mt-6 max-w-4xl font-display font-bold text-display text-text">
          Faruk Selim Duman
        </h1>
        <p className="mt-5 max-w-2xl font-display font-medium text-body-lg text-mint">
          {t(ui.heroTitle)}
        </p>
        <p className="mt-6 max-w-prose text-body-lg text-text-secondary">
          {t(ui.heroIntro1)}
          <br className="hidden sm:block" /> {t(ui.heroIntro2)}
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="#work" variant="primary">
            {t(ui.ctaProjects)} →
          </Button>
          <Button href="#contact" variant="ghost">
            {t(ui.ctaContact)}
          </Button>
        </div>
        {showCanvas && !frozen && (
          <p className="mt-10 text-small text-text-secondary/80">
            {t(ui.heroHint)}
          </p>
        )}
      </Container>
    </section>
  );
}
