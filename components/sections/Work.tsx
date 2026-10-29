import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { WorkShowcase } from "@/components/work/WorkShowcase";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function Work() {
  return (
    <section
      id="work"
      data-section="work"
      data-tone="dark"
      aria-labelledby="work-heading"
      className="grid-ink bg-ink text-on-ink"
    >
      <div className="shell pb-16 pt-16 md:pt-24 lg:pb-24">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-x-6">
          <p className="eyebrow text-on-ink-muted md:col-span-3">(01) Selected work</p>
          <Reveal as="h2" mask id="work-heading" className="text-[clamp(3.5rem,11vw,11rem)] font-semibold leading-[0.82] tracking-[-0.065em] md:col-span-9">
            <SplitText text="Selected work" by="char" stagger={0.03} />
          </Reveal>
          <p className="max-w-[40ch] text-on-ink-muted md:col-span-4 md:col-start-4">{site.work.intro}</p>
        </div>

        <div className="mt-10 lg:mt-6">
          <WorkShowcase projects={projects} />
        </div>
      </div>
    </section>
  );
}
