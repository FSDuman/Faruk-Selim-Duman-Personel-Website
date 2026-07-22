"use client";

import { marqueeItems } from "@/data/marquee";
import { useLocale } from "@/lib/locale-context";

// Duplicated once so the track can loop seamlessly at -50% translateX.
export function Marquee() {
  const { t } = useLocale();
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-line bg-accent/[0.04]">
      <div className="flex w-max animate-marquee will-change-transform">
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 whitespace-nowrap px-5.5 py-4.5 font-display text-[16px] font-semibold text-text-secondary"
          >
            {t(item)}
            <span className="text-[9px] text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
