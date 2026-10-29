import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/data/site";
import { skills } from "@/data/skills";

export function About() {
  const { about } = site;

  return (
    <section
      id="about"
      data-section="about"
      data-tone="light"
      aria-labelledby="about-heading"
      className="grid-paper bg-paper"
    >
      <div className="shell py-20 md:py-28 lg:py-36">
        <div className="flex items-baseline justify-between gap-6">
          <h2 id="about-heading" className="eyebrow text-muted">
            (02) About
          </h2>
          <span className="eyebrow text-muted">{site.location}</span>
        </div>

        <Reveal
          as="p"
          mask
          className="mt-10 max-w-[22ch] text-[clamp(2.25rem,5.6vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em] md:mt-16"
        >
          <SplitText text={about.statement} stagger={0.025} />
        </Reveal>

        <Reveal className="mt-16 grid gap-10 border-t border-line pt-8 md:mt-24 md:grid-cols-12 md:gap-x-6">
          <p className="max-w-[44ch] text-lg leading-relaxed md:col-span-5">{about.background}</p>
          <dl className="grid gap-8 sm:grid-cols-3 md:col-span-7 md:gap-x-6">
            {about.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-muted">{fact.label}</dt>
                <dd className="mt-3 text-xl font-medium tracking-[-0.02em]">{fact.value}</dd>
                {fact.detail && <dd className="mt-1 text-sm text-muted">{fact.detail}</dd>}
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
            <h3 className="eyebrow">(02.1) Stack index</h3>
            <span className="eyebrow text-muted">Tools I&apos;ve shipped with</span>
          </div>
          <dl>
            {skills.map((group) => (
              <Reveal key={group.label} className="grid gap-2 border-b border-line py-5 md:grid-cols-12 md:gap-x-6 md:py-6">
                <dt className="eyebrow pt-1 text-muted md:col-span-3">{group.label}</dt>
                <dd className="text-[clamp(1.25rem,2.2vw,2rem)] leading-snug tracking-[-0.025em] md:col-span-9">
                  {group.items.map((item, i) => (
                    <span key={item} className="inline-block">
                      <span className="transition-colors duration-200 hover:text-signal-ink">{item}</span>
                      {i < group.items.length - 1 && (
                        <span aria-hidden="true" className="px-[0.35em] font-serif italic text-muted/60">
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
