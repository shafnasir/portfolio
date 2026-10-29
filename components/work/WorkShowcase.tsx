"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FigureFrame } from "@/components/projects/FigureFrame";
import { ProjectFigure } from "@/components/projects/ProjectFigure";
import type { Project } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Projects as chapters: on large screens the text scrolls past a sticky stage whose figure
 * changes with the project in view; on small screens each project carries its own figure.
 */
export function WorkShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    items.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  const current = projects[active];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
      <ol className="lg:col-span-5">
        {projects.map((project, i) => (
          <li
            key={project.slug}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            style={{ "--p": project.accent } as CSSProperties}
            className="group/project relative border-t border-line-ink py-14 first:border-t-0 sm:py-20 lg:flex lg:min-h-[88svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-24"
          >
            <FigureFrame index={i} caption={project.figure.caption} className="mb-10 aspect-[4/3.4] lg:hidden">
              <ProjectFigure kind={project.figure.kind} active={active === i} />
            </FigureFrame>

            <div className="flex items-baseline justify-between gap-6">
              <span
                aria-hidden="true"
                className={`outline-type text-[clamp(4.5rem,9vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] transition-opacity duration-500 ${
                  active === i ? "opacity-100" : "lg:opacity-30"
                }`}
              >
                {pad(i + 1)}
              </span>
              <span className="eyebrow text-right text-on-ink-muted">
                {project.context}
                {project.period && (
                  <>
                    <br />
                    {project.period}
                  </>
                )}
              </span>
            </div>

            <h3 className="mt-6 text-[clamp(2.25rem,4.4vw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              {project.title}
            </h3>

            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-on-ink-muted">{project.summary}</p>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
              <ul className="flex max-w-[34ch] flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-on-ink-muted" aria-label="Technologies">
                {project.tags.map((tag, j) => (
                  <li key={tag} className="flex gap-3">
                    {j > 0 && <span aria-hidden="true" className="text-[var(--p)]">/</span>}
                    {tag}
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="h-px w-10 bg-[var(--p)]" />
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:col-span-7 lg:block">
        <div
          className="sticky top-[calc(var(--header-h)+5svh)] flex h-[calc(100svh-var(--header-h)-10svh)] flex-col"
          style={{ "--p": current.accent } as CSSProperties}
        >
          <div className="relative min-h-0 flex-1">
            {projects.map((project, i) => (
              <div
                key={project.slug}
                style={{ "--p": project.accent } as CSSProperties}
                className={`absolute inset-0 transition-[clip-path,opacity] duration-[900ms] ease-[var(--ease-in-out)] ${
                  active === i
                    ? "opacity-100 [clip-path:inset(0_0_0_0)]"
                    : i < active
                      ? "opacity-0 [clip-path:inset(0_0_100%_0)]"
                      : "opacity-0 [clip-path:inset(100%_0_0_0)]"
                }`}
                aria-hidden={active !== i}
              >
                <FigureFrame index={i} caption={project.figure.caption} className="h-full">
                  <ProjectFigure kind={project.figure.kind} active={active === i} />
                </FigureFrame>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-1" role="group" aria-label="Jump to project">
              {projects.map((project, i) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show ${project.title}`}
                  aria-current={active === i ? "true" : undefined}
                  className={`eyebrow h-9 min-w-11 border px-2 transition-colors duration-200 ${
                    active === i
                      ? "border-[var(--p)] text-[var(--p)]"
                      : "border-line-ink text-on-ink-muted hover:text-on-ink"
                  }`}
                >
                  {pad(i + 1)}
                </button>
              ))}
            </div>
            <span className="eyebrow text-on-ink-muted">
              {pad(active + 1)} / {pad(projects.length)} — {current.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
