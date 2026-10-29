import { Arrow } from "@/components/ui/Arrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { showPlaceholders, site } from "@/data/site";

type ContactLink = {
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  configKey: string;
};

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Contact({ resumeHref }: { resumeHref: string | null }) {
  const { linkedin, github } = site.contact;

  const links: ContactLink[] = [
    { label: "LinkedIn", value: linkedin ? displayUrl(linkedin) : "", href: linkedin, external: true, configKey: "site.contact.linkedin" },
    { label: "GitHub", value: github ? displayUrl(github) : "", href: github, external: true, configKey: "site.contact.github" },
    { label: "Resume", value: "PDF", href: resumeHref, external: true, configKey: "public" + site.resumePath },
  ];
  const visible = links.filter((link) => link.href || showPlaceholders);

  return (
    <section
      id="contact"
      data-section="contact"
      data-tone="signal"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-signal text-ink"
    >
      <div className="shell relative py-20 md:py-28">
        <div className="flex items-baseline justify-between gap-6">
          <p className="eyebrow">(04) Contact</p>
          <p className="eyebrow">End of line</p>
        </div>

        <Reveal
          as="h2"
          mask
          id="contact-heading"
          className="mt-10 max-w-[13ch] text-[clamp(3.25rem,10vw,11rem)] font-semibold leading-[0.84] tracking-[-0.065em] md:mt-14"
        >
          <SplitText text={site.closing.heading} stagger={0.05} />
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-4">
            <p className="max-w-[34ch] text-lg leading-relaxed">{site.closing.body}</p>
            <div aria-hidden="true" className="mt-10 hidden items-center gap-3 md:flex">
              <span className="h-px w-24 bg-ink" />
              <span className="h-3 w-3 bg-ink" />
            </div>
          </div>

          {visible.length > 0 && (
            <ul className="border-t border-ink md:col-span-8">
              {visible.map((link) => (
                <li key={link.label} className="border-b border-ink">
                  {link.href ? (
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group relative flex min-h-20 items-center justify-between gap-4 overflow-hidden px-1 py-4 md:min-h-24"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                      />
                      <span className="relative text-[clamp(1.75rem,4vw,3.5rem)] font-semibold tracking-[-0.04em] transition-colors duration-300 group-hover:pl-4 group-hover:text-signal">
                        {link.label}
                      </span>
                      <span className="relative flex items-center gap-4 truncate font-mono text-sm transition-colors duration-300 group-hover:pr-4 group-hover:text-signal">
                        <span className="hidden truncate sm:inline">{link.value}</span>
                        <span className="text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                          <Arrow dir="up-right" />
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex min-h-20 items-center justify-between gap-4 px-1 py-4 opacity-55 md:min-h-24">
                      <span className="text-[clamp(1.75rem,4vw,3.5rem)] font-semibold tracking-[-0.04em]">{link.label}</span>
                      <span className="text-right font-mono text-xs">Placeholder · set {link.configKey}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
