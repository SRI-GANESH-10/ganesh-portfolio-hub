import { profile } from "./profile";

// Each item's body is one of a few shapes; `kind` says which, and AboutSection draws it.
export type AboutItem = { id: string; title: string } & (
  | { kind: "text"; text: string }
  | { kind: "chips"; chips: string[]; note: string }
  | { kind: "education"; degree: string; school: string }
);

// In order: the first one is open when the page loads.
export const aboutItems: AboutItem[] = [
  {
    id: "who",
    title: "Who am I",
    kind: "text",
    text: `I'm a passionate Frontend Engineer with ${profile.experience} of experience specializing in building scalable web applications. My expertise lies in React.js, Next.js, and modern UI frameworks like Tailwind CSS and ShadCN UI. I'm dedicated to creating user-centric, high-performance applications that deliver exceptional user experiences.`,
  },
  {
    id: "drives",
    title: "What drives me",
    kind: "text",
    text: "I love the moment a confusing workflow becomes obvious, when a user doesn't have to think. Most of my favourite work has been taking something complex, like privacy workflows or project tracking, and making it feel simple.",
  },
  {
    id: "how",
    title: "How I work",
    kind: "text",
    text: "I thrive on component-driven development, crafting reusable UI components and design systems. My approach combines clean code practices with a keen eye for design, ensuring both functionality and aesthetics work in harmony.",
  },
  {
    id: "looking",
    title: "What I'm looking for",
    kind: "text",
    text: `I'm looking for a frontend role where I can own the UI layer end to end, from component architecture and design systems to performance. I enjoy teams that care about craft and ship often. Based in ${profile.location}, open to hybrid or remote.`,
  },
  {
    id: "beyond",
    title: "Beyond code",
    kind: "chips",
    chips: ["🎬 Movies", "🏸 Badminton", "🎮 Gaming", "🎧 Music"],
    note: "When I'm not building interfaces, that's where you'll find me.",
  },
  {
    id: "study",
    title: "Where I studied",
    kind: "education",
    degree: "B.Tech in Computer Science Engineering",
    school: "Velagapudi Ramakrishna Siddhartha Engineering College",
  },
];
