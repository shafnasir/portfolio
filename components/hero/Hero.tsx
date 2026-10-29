import type { CSSProperties } from "react";
import { SystemMap } from "@/components/hero/SystemMap";
import { Arrow } from "@/components/ui/Arrow";
import { LocalTime } from "@/components/ui/LocalTime";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/data/site";

export function Hero() {
  const [first, last] = site.name.split(" ");
  const { hero } = site;

  return (
    <section
      data-section="intro"
      data-tone="light"
      aria-labelledby="intro-heading"
      className="grid-paper relative overflow-hidden bg-paper"
    >
      <div className="shell relative flex min-h-[calc(100svh-var(--header-h))] flex-col pb-8 pt-5 lg:pb-10">
        <div className="eyebrow load-rise flex items-center justify-between gap-4 text-muted" style={{ "--d": "0.9s" } as CSSProperties}>
          <span className="truncate">
            (00) <span className="hidden sm:inline">{hero.label}</span>
            <span className="sm:hidden">Index</span>
          </span>
          <span className="hidden md:inline">{site.coordinates}</span>
          <span className="shrink-0 whitespace-nowrap">
            Toronto <span className="text-ink">
              <LocalTime timeZone={site.timeZone} />
            </span>
          </span>
        </div>

        <div className="relative mt-[5svh] flex-1">
          <SystemMap className="absolute right-0 top-[3%] hidden h-auto w-[50%] lg:block xl:w-[46%]" />

          <h1
            id="intro-heading"
            className="split-load pointer-events-none relative text-[clamp(5.5rem,min(27vw,41svh),25rem)] font-semibold leading-[0.8] tracking-[-0.07em]"
          >
            <span className="sr-only">
              {site.name}, {site.role.toLowerCase()}
            </span>
            <span aria-hidden="true" className="block">
              <SplitText text={first} by="char" delay={0.05} />
            </span>
            <span aria-hidden="true" className="block text-right lg:pr-[6%]">
              <SplitText text={last} by="char" delay={0.25} />
              <span className="cursor-block" />
            </span>
          </h1>
        </div>

        <div
          className="load-rise mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:gap-x-6 lg:mt-12"
          style={{ "--d": "0.7s" } as CSSProperties}
        >
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted md:col-span-4">
            {hero.intro}
          </p>
          <p className="text-[clamp(1.875rem,3.2vw,3rem)] leading-[1] tracking-[-0.03em] md:col-span-5">
            {hero.tagline.map((s) =>
              s.em ? (
                <em key={s.text} className="font-serif font-normal tracking-normal text-signal-ink">
                  {s.text}
                </em>
              ) : (
                <span key={s.text}>{s.text}</span>
              ),
            )}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-3 md:flex-col md:items-end md:justify-between">
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-4 bg-ink pl-5 pr-4 text-sm font-medium text-paper transition-colors duration-200 hover:bg-signal hover:text-ink"
            >
              {hero.primaryCta}
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                <Arrow dir="down" />
              </span>
            </a>
            <a href="#contact" className="link-grow inline-flex h-11 items-center text-sm">
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <SystemMap className="mt-10 h-auto w-full lg:hidden" />
      </div>
    </section>
  );
}
