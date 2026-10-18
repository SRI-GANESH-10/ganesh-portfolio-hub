import { ChatPanel } from "./ChatPanel";

export const ProjectsSection = () => (
  // exactly the viewport minus the fixed navbar — the page itself never scrolls
  <section
    id="projects"
    className="container-custom h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] overflow-hidden flex flex-col pt-4 pb-4 md:pb-6"
  >
    <ChatPanel />
  </section>
);
