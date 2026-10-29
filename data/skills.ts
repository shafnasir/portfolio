export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "HTML / CSS", "C", "C#", "Scala"],
  },
  {
    label: "Backend",
    items: ["Django", "Flask", "Spring", "Node.js", "Express", "REST APIs"],
  },
  {
    label: "Frontend",
    items: ["React", "Angular", "Bootstrap", "Android"],
  },
  {
    label: "Data and messaging",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Kafka", "Solr"],
  },
  {
    label: "Infrastructure and tooling",
    items: ["AWS", "Docker", "Jenkins", "Datadog", "Git", "GitLab", "Jira", "Figma"],
  },
  {
    label: "AI",
    items: ["Claude", "Cursor", "GitHub Copilot"],
  },
];
