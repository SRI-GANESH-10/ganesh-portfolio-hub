import { motion } from "framer-motion";

// Magic UI's BlurFade, ported to the framer-motion already in this project.
export const BlurFade = ({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 10,
  blur = "8px",
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  blur?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: offset, filter: `blur(${blur})` }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
