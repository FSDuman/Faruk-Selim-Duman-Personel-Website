"use client";

import { Project, projects } from "@/data/projects";
import { useLocale } from "@/lib/locale-context";
import { Reveal } from "@/components/ui/Motion";
import { useTiltHover } from "@/lib/useTiltHover";

function ProjectCard({ cs, idx }: { cs: Project; idx: number }) {
  const { t } = useLocale();
  const { ref, style, handlers } = useTiltHover();

  return (
    <div
      ref={ref}
      style={{
        background:
          "linear-gradient(160deg, rgba(20, 28, 48, 0.6), rgba(11, 16, 30, 0.4))",
        ...style,
      }}
      {...handlers}
      className="relative overflow-hidden border border-line rounded-2xl p-8 hover:border-accent/30 transition-[border-color] duration-300 group"
    >
      <span className="absolute top-5.5 right-6.5 font-display font-extrabold text-[44px] leading-none text-white/5">
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Metric Highlight */}
      <div className="flex items-baseline gap-2.5 mb-5.5">
        <span className="font-display font-extrabold text-[38px] text-accent leading-none">
          {cs.metric}
        </span>
        <span className="text-xs font-semibold text-text-secondary">
          {t(cs.metricLabel)}
        </span>
      </div>

      {/* Project Title */}
      <h3 className="font-display font-semibold text-[19px] text-text mb-3 leading-snug group-hover:text-accent-hi transition-colors">
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
  );
}

export function Work() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((cs, i) => (
        <Reveal key={cs.id} delay={Math.min(i, 3) * 0.08}>
          <ProjectCard cs={cs} idx={i} />
        </Reveal>
      ))}
    </div>
  );
}
