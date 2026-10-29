import { Arrow } from "@/components/ui/Arrow";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" data-tone="dark" className="bg-ink text-on-ink-muted">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-6 text-sm">
        <p>
          © {year} {site.name}
        </p>
        <p className="eyebrow hidden md:block">Built with Next.js · Set in Geist and Instrument Serif</p>
        <a href="#top" className="inline-flex h-11 items-center gap-2 hover:text-on-ink">
          <span className="link-grow">Back to top</span>
          <Arrow dir="up" />
        </a>
      </div>
    </footer>
  );
}
