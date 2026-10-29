export type Fact = { label: string; value: string; detail?: string };

/** A run of text, optionally set in the italic serif for emphasis. */
export type Segment = { text: string; em?: boolean };

export type SiteConfig = {
  name: string;
  role: string;
  location: string;
  coordinates: string;
  timeZone: string;
  /** Deployed origin, e.g. "https://example.com". Enables canonical URLs and absolute OG links. */
  url: string | null;
  description: string;
  /** Path under /public. The Resume link only appears once this file exists. */
  resumePath: string;
  contact: {
    linkedin: string | null;
    github: string | null;
  };
  hero: {
    label: string;
    tagline: Segment[];
    intro: string;
    primaryCta: string;
    secondaryCta: string;
  };
  work: {
    intro: string;
  };
  about: {
    statement: Segment[];
    background: string;
    facts: Fact[];
  };
  closing: {
    heading: string;
    body: string;
  };
};

export const site: SiteConfig = {
  name: "Shaf Nasir",
  role: "Software Engineer",
  location: "Toronto, Canada",
  coordinates: "43.6532° N, 79.3832° W",
  timeZone: "America/Toronto",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  description:
    "Shaf Nasir is a software engineer in Toronto working on backend systems, full-stack applications, and AI-powered products.",
  resumePath: "/documents/Shaf Nasir Resume.pdf",

  // Placeholders: links set to null are hidden in production and flagged in development.
  contact: {
    linkedin: "https://www.linkedin.com/in/shafnasir/",
    github: "https://github.com/shafnasir",
  },

  hero: {
    label: "Software engineer · Toronto",
    tagline: [{ text: "Building " }, { text: "useful", em: true }, { text: " things for the web." }],
    intro:
      "I'm a software engineer focused on backend systems, full-stack applications, and AI-powered products.",
    primaryCta: "Explore the work",
    secondaryCta: "Get in touch",
  },

  work: {
    intro: "A short list of work. Descriptions stay high level.",
  },

  about: {
    statement: [
      { text: "I like solving practical problems, understanding " },
      { text: "how systems fit together,", em: true },
      { text: " and building things that " },
      { text: "people can actually use.", em: true },
    ],
    background:
      "I'm a software engineer who enjoys working on the systems behind useful products. My experience spans backend services, distributed systems, and full-stack applications, with a growing focus on AI-powered tools.",
    facts: [
      {
        label: "Education",
        value: "University of Toronto",
        detail: "BSc Computer Science (Honours), 2020",
      },
      {
        label: "Currently",
        value: "Cheil Canada",
        detail: "Senior Full Stack Developer, contract",
      },
      {
        label: "Based in",
        value: "Toronto",
        detail: "43.65° N, 79.38° W",
      },
    ],
  },

  closing: {
    heading: "Have something interesting in mind?",
    body: "I'm open to conversations about software engineering opportunities and interesting projects.",
  },
};

export const showPlaceholders = process.env.NODE_ENV !== "production";
