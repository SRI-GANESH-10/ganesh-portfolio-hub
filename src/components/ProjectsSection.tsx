import { motion } from "framer-motion";
import { ChatPanel } from "./ChatPanel";

export const ProjectsSection = () => (
  // exactly the viewport minus the fixed navbar — the page itself never scrolls
  <section
    id="projects"
    className="h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] overflow-hidden flex flex-col px-4 sm:px-6 lg:px-8 pt-4 pb-4 md:pb-6"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-none text-center mb-3 md:mb-4"
    >
      <span className="text-primary font-medium text-xs uppercase tracking-wider">
        Portfolio
      </span>
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-1">
        Featured Projects
      </h2>
    </motion.div>

    <ChatPanel />
  </section>
);
