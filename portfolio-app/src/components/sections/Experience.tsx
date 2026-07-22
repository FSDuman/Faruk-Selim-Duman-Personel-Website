"use client";

import { experience } from "@/data/experience";
import { useLocale } from "@/lib/locale-context";
import { useFocusTimeline } from "@/lib/useFocusTimeline";
import { cn } from "@/lib/cn";

export function Experience() {
  const { t } = useLocale();
  const {
    containerRef,
    trackRef,
    registerEntry,
    containerHandlers,
    entryHandlers,
    getVisual,
  } = useFocusTimeline(experience.length, { capture: false });

  return (
    <div
      ref={containerRef}
      {...containerHandlers}
      className="outline-none"
    >
      <div
        ref={trackRef}
        className="relative pl-9 sm:pl-10 flex flex-col gap-3"
      >
        {/* Timeline vertical bar */}
        <div className="absolute left-[5px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent to-accent/15" />

        {experience.map((e, idx) => {
          const visual = getVisual(idx);
          const handlers = entryHandlers(idx);

          return (
            <div
              key={e.id}
              ref={registerEntry(idx)}
              {...handlers}
              style={{
                opacity: visual.opacity,
                filter: visual.blur > 0 ? `blur(${visual.blur}px)` : "none",
                transform: `scale(${visual.scale})`,
                transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                zIndex: visual.elevated ? 10 : 1,
              }}
              className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-8 py-6.5 outline-none origin-left"
            >
              {/* Bullet circle dot marker */}
              <span
                className={cn(
                  "absolute left-[-39px] sm:left-[-40px] top-[32px] w-3 h-3 rounded-full bg-accent transition-all duration-300 ring-4 ring-bg",
                  visual.active
                    ? "shadow-[0_0_12px_rgba(127,209,185,0.8)] scale-110"
                    : "scale-100 opacity-80"
                )}
              />

              {/* Company & Date */}
              <div>
                <h3 className="font-display font-bold text-[15px] text-text">
                  {e.company}
                </h3>
                <p className="mt-1.5 text-xs text-text-secondary/80 font-medium">
                  {t(e.period)}
                </p>
                {e.intern && (
                  <p className="mt-1 text-[11.5px] font-semibold text-text-secondary/60">
                    {t(e.intern)}
                  </p>
                )}
              </div>

              {/* Role & Bullets */}
              <div>
                <h4 className="font-display font-semibold text-[17px] text-accent">
                  {t(e.role)}
                </h4>
                <ul
                  className={cn(
                    "flex flex-col gap-3.5 list-none overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    visual.expanded
                      ? "mt-4.5 max-h-[600px] opacity-100"
                      : "mt-0 max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  {e.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex gap-3 text-[14.5px] leading-relaxed text-text-secondary text-pretty"
                    >
                      <span className="text-accent flex-shrink-0 select-none mt-0.5">▹</span>
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
