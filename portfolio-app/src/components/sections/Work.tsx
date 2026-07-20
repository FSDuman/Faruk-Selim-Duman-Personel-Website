"use client";

import { projects } from "@/data/projects";
import { useLocale } from "@/lib/locale-context";

export function Work() {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((cs) => (
        <div
          key={cs.id}
          style={{
            background: "linear-gradient(160deg, rgba(20, 28, 48, 0.6), rgba(11, 16, 30, 0.4))",
          }}
          className="border border-line rounded-2xl p-8 hover:-translate-y-1 hover:border-mint/30 transition-all duration-300 group"
        >
          {/* Metric Highlight */}
          <div className="flex items-baseline gap-2.5 mb-5.5">
            <span className="font-display font-extrabold text-[38px] text-mint leading-none">
              {cs.metric}
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              {t(cs.metricLabel)}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-semibold text-[19px] text-text mb-3 leading-snug group-hover:text-mint-hi transition-colors">
            {t(cs.title)}
          </h3>

          {/* Project Description */}
          <p className="text-[14.5px] leading-relaxed text-text-secondary mb-5.5 text-pretty">
            {t(cs.description)}
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {cs.tags.map((tg, idx) => (
              <span
                key={idx}
                className="text-[11.5px] font-semibold px-2.5 py-1.5 rounded-md bg-white/[0.04] border border-line text-text-secondary/90"
              >
                {tg}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
