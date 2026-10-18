export type SkillGroup = { id: string; name: string; short: string; color: string };
export type Skill = { id: string; label: string; group: string; abbr: string };
export type SkillEdge = { from: string; to: string };

export const skillGroups: SkillGroup[] = [
  { id: "frontend", name: "Frontend", short: "Frontend", color: "#2dd4cf" },
  { id: "ui", name: "UI Libraries", short: "UI", color: "#2b9fd8" },
  { id: "backend", name: "Backend & Database", short: "Backend", color: "#9b8cf7" },
  { id: "tools", name: "Tools & Workflow", short: "Tools", color: "#7be0a8" },
];

export const skills: Skill[] = [
  { id: "html", label: "HTML", group: "frontend", abbr: "H5" },
  { id: "css", label: "CSS", group: "frontend", abbr: "C3" },
  { id: "js", label: "JavaScript", group: "frontend", abbr: "JS" },
  { id: "ts", label: "TypeScript", group: "frontend", abbr: "TS" },
  { id: "react", label: "React.js", group: "frontend", abbr: "Rx" },
  { id: "redux", label: "Redux Toolkit", group: "frontend", abbr: "Rd" },
  { id: "tailwind", label: "Tailwind CSS", group: "ui", abbr: "Tw" },
  { id: "shadcn", label: "ShadCN UI", group: "ui", abbr: "Sh" },
  { id: "mui", label: "Material UI", group: "ui", abbr: "MU" },
  { id: "responsive", label: "Responsive Design", group: "ui", abbr: "Rs" },
  { id: "node", label: "Node.js", group: "backend", abbr: "No" },
  { id: "express", label: "Express.js", group: "backend", abbr: "Ex" },
  { id: "mongo", label: "MongoDB", group: "backend", abbr: "Mg" },
  { id: "git", label: "Git", group: "tools", abbr: "Gt" },
  { id: "rest", label: "REST APIs", group: "tools", abbr: "Rt" },
  { id: "figma", label: "Figma", group: "tools", abbr: "Fg" },
  { id: "postman", label: "Postman", group: "tools", abbr: "Pm" },
  { id: "agile", label: "Agile/Scrum", group: "tools", abbr: "Ag" },
  { id: "ai", label: "AI Tools", group: "tools", abbr: "AI" },
];

// Each connection is written once. Directions follow docs/skills.html.
export const skillEdges: SkillEdge[] = [
  { from: "html", to: "css" },
  { from: "html", to: "js" },
  { from: "css", to: "responsive" },
  { from: "css", to: "tailwind" },
  { from: "figma", to: "responsive" },
  { from: "figma", to: "shadcn" },
  { from: "js", to: "ts" },
  { from: "ts", to: "react" },
  { from: "js", to: "react" },
  { from: "react", to: "redux" },
  { from: "react", to: "shadcn" },
  { from: "tailwind", to: "shadcn" },
  { from: "react", to: "mui" },
  { from: "js", to: "node" },
  { from: "ts", to: "node" },
  { from: "node", to: "express" },
  { from: "express", to: "mongo" },
  { from: "express", to: "rest" },
  { from: "rest", to: "react" },
  { from: "rest", to: "postman" },
  { from: "redux", to: "rest" },
  { from: "git", to: "agile" },
  { from: "ai", to: "react" },
  { from: "ai", to: "git" },
];

// Skills this one builds on, e.g. incoming("react") → ["ts", "js", "rest", "ai"]
export const incoming = (id: string) =>
  skillEdges.filter((e) => e.to === id).map((e) => e.from);

// Skills this one leads to, e.g. outgoing("js") → ["ts", "react", "node"]
export const outgoing = (id: string) =>
  skillEdges.filter((e) => e.from === id).map((e) => e.to);

// Both directions, built once at import. Hover only does neighbours.get(id).has(other).
export const neighbours = new Map<string, Set<string>>(skills.map((s) => [s.id, new Set()]));
for (const { from, to } of skillEdges) {
  neighbours.get(from)!.add(to);
  neighbours.get(to)!.add(from);
}

export type Layout = Record<string, { x: number; y: number }>;

// Picked offline: random positions that keep left → right flow, best of thousands by
// fewest line crossings, no line through a box. Static, so every visit sees the same graph.
export const networkLayout: Layout = {
  figma: { x: 290, y: -140 },
  responsive: { x: 560, y: -40 },
  css: { x: 290, y: 10 },
  shadcn: { x: 860, y: 60 },
  html: { x: 20, y: 70 },
  tailwind: { x: 560, y: 90 },
  redux: { x: 860, y: 200 },
  ts: { x: 290, y: 250 },
  js: { x: 20, y: 260 },
  react: { x: 560, y: 260 },
  mui: { x: 860, y: 330 },
  rest: { x: 560, y: 420 },
  node: { x: 20, y: 440 },
  express: { x: 290, y: 450 },
  postman: { x: 860, y: 470 },
  mongo: { x: 560, y: 560 },
  git: { x: 20, y: 620 },
  ai: { x: 860, y: 620 },
  agile: { x: 290, y: 640 },
};

// One column per group (in skillGroups order), skills stacked in skills order.
export const areaLayout: Layout = Object.fromEntries(
  skillGroups.flatMap((g, gi) =>
    skills.filter((s) => s.group === g.id).map((s, k) => [s.id, { x: gi * 230, y: k * 78 }]),
  ),
);
