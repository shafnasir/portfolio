import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/** Returns the resume URL only if the PDF is actually present in /public. */
export function getResumeHref() {
  if (!existsSync(path.join(process.cwd(), "public", site.resumePath))) return null;
  // Project sites are served from /<repo>, which Next does not add to handwritten hrefs.
  const base = process.env.PAGES_BASE_PATH ?? "";
  return `${base}${encodeURI(site.resumePath)}`;
}
