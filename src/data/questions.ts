import { profile } from "./profile";

export type Rich =
  | { kind: "projects"; ids: string[] }
  | { kind: "stack" }
  | { kind: "resume" }
  | { kind: "contact" };

export type Question = {
  id: string;
  /** Tray pill + user bubble. null = unprompted opener, no pill, no user bubble. */
  label: string | null;
  /** The pre-written answer the bot types out. */
  say: string;
  /** Optional attachment rendered under the answer. */
  rich?: Rich;
};

export const QUESTIONS: Question[] = [
  {
    id: "intro",
    label: null,
    say: "Hi, I'm Sri. Here's everything I've built so far. Tap any question below to dig deeper into a project, my stack, or how to reach me.",
    rich: { kind: "projects", ids: ["kanban", "shopee", "ux"] },
  },
  {
    id: "all",
    label: "Show all projects",
    say: "Here's everything I've shipped so far: three projects across frontend, full-stack and design.",
    rich: { kind: "projects", ids: ["kanban", "shopee", "ux"] },
  },
  {
    id: "full",
    label: "Which one is full-stack?",
    say: "Shopee. I took it from database design to a deployed app: Next.js, Express and MongoDB, with an admin dashboard that has full CRUD.",
    rich: { kind: "projects", ids: ["shopee"] },
  },
  {
    id: "hack",
    label: "What did you build in a hackathon?",
    say: "A Kanban board, in 48 hours at Track3D.ai. The team liked it enough to adopt it internally.",
    rich: { kind: "projects", ids: ["kanban"] },
  },
  {
    id: "design",
    label: "Any design work?",
    say: "Yes. I'm Google UX Certified and I like taking designs from Figma all the way to code. This case study covers user research, prototypes and accessibility-first decisions.",
    rich: { kind: "projects", ids: ["ux"] },
  },
  {
    id: "front",
    label: "Show your React & TypeScript work",
    say: "React and TypeScript are my daily tools. The Kanban board shows interaction-heavy UI, and Shopee shows a responsive, component-driven storefront.",
    rich: { kind: "projects", ids: ["kanban", "shopee"] },
  },
  {
    id: "stack",
    label: "What's your tech stack?",
    say: "Here's what I work with day to day, grouped by area.",
    rich: { kind: "stack" },
  },
  {
    id: "about",
    label: "Who are you?",
    say: `I'm ${profile.name}, a frontend engineer with ${profile.experience} building production React and TypeScript apps. I'm currently at PrivaSapien on a micro-frontend privacy governance platform, and before that I was at Track3D.ai.`,
  },
  {
    id: "resume",
    label: "Download your resume",
    say: "Sure, here you go.",
    rich: { kind: "resume" },
  },
  {
    id: "contact",
    label: "How can I reach you?",
    say: "I'd love to hear from you. I'm based in Bengaluru and open to frontend and design-system opportunities.",
    rich: { kind: "contact" },
  },
];
