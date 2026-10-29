import { RoleItem } from "@/components/sections/RoleItem";
import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      data-section="experience"
      data-tone="dark"
      aria-labelledby="experience-heading"
      className="bg-ink text-on-ink"
    >
      <div className="shell py-20 md:py-28 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <p className="eyebrow text-on-ink-muted">(03) Experience</p>
              <Reveal
                as="h2"
                mask
                id="experience-heading"
                className="mt-6 text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.06em]"
              >
                <SplitText text="Where I've worked" stagger={0.06} />
              </Reveal>
              <p className="eyebrow mt-8 text-on-ink-muted">
                2018 <Arrow className="mx-1 text-signal" /> Now · {experience.length} roles
              </p>
            </div>
          </div>

          <div className="relative mt-14 lg:col-span-8 lg:mt-0">
            <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-line-ink" />
            <span aria-hidden="true" className="trace-draw absolute bottom-0 left-[5px] top-2 w-px bg-signal" />
            <ol>
              {experience.map((role) => (
                <RoleItem key={`${role.company}-${role.start}`} role={role} current={role.end === "Present"} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
