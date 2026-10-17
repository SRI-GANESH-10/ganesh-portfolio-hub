import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { TypingDots } from "./TypingDots";
import { RichPayload } from "./RichPayload";
import type { Rich } from "@/data/questions";

/** `live` = the newest message. Only it animates; older ones render finished. */
export const ChatMessage = ({
  say,
  rich,
  live,
  onDone,
}: {
  say: string;
  rich?: Rich;
  live: boolean;
  onDone?: () => void;
}) => {
  const [thinking, setThinking] = useState(live);
  const [typed, setTyped] = useState(!live);

  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => setThinking(false), 600);
    return () => clearTimeout(t);
  }, [live]);

  if (thinking) return <TypingDots />;

  return (
    <>
      <p className="text-[16.5px] leading-relaxed min-h-[1.65em]">
        {typed ? (
          say
        ) : (
          <Typewriter
            text={say}
            onDone={() => {
              setTyped(true);
              onDone?.();
            }}
          />
        )}
      </p>

      {typed && rich && (
        <motion.div
          initial={live ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-4"
        >
          <RichPayload payload={rich} />
        </motion.div>
      )}
    </>
  );
};
