import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { roles, type Role } from "@/data/experience";
import { Sticker } from "./Sticker";
import { StackChips } from "./StackChips";

const METRIC_TILTS = [4, -3, 6, -4];

// "30% faster" → ["", "30%", " faster"]: odd parts are the numbers, shown in bold teal
const emphasise = (text: string) =>
  text.split(/(\d+%)/).map((part, i) =>
    i % 2 ? (
      <b key={i} className="font-semibold text-primary">
        {part}
      </b>
    ) : (
      part
    ),
  );

// One company, everything at once. It rises in the first time it scrolls into view;
// data-reached then lets its stickers pop in too (see Sticker).
const BoardCard = ({ role, tilt }: { role: Role; tilt: number }) => {
  const [seen, setSeen] = useState(false);
  // only percentage stickers ("30% less dev time", not "Mentor" or "2-way sync") count as metrics
  const metrics = role.highlights.filter(
    (h) => h.sticker && /\d+%/.test(h.sticker),
  );

  return (
    <motion.div
      data-reached={seen}
      onViewportEnter={() => setSeen(true)}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      initial={{ opacity: 0, y: 24, rotate: tilt }}
      animate={seen ? { opacity: 1, y: 0, rotate: tilt } : undefined}
      transition={{ duration: 0.6, ease: [0.3, 1.4, 0.5, 1] }}
      className={cn(
        "group/reach relative rounded-[22px] border bg-card px-6 pt-12 pb-7 md:px-8",
        role.current ? "border-primary/45" : "border-border",
      )}
    >
      <Sticker tone="white" big tilt={-6} className="-top-4 left-6">
        {role.period}
      </Sticker>
      {role.current ? (
        <Sticker big tilt={5} className="-top-[18px] right-8">
          ● NOW
        </Sticker>
      ) : (
        // phones: a normal row above the name; md: floating along the card's top edge
        <div className="mb-4 flex flex-wrap gap-2 md:absolute md:-top-4 md:right-8 md:mb-0">
          {metrics.map((h, i) => (
            <Sticker
              key={h.sticker}
              tilt={METRIC_TILTS[i % METRIC_TILTS.length]}
              className="static"
            >
              {h.sticker}
            </Sticker>
          ))}
        </div>
      )}

      <h3 className="font-display font-extrabold text-[clamp(30px,5vw,44px)] leading-tight tracking-[-0.03em]">
        {role.company}
      </h3>
      <p className="mt-0.5 text-muted-foreground">{role.role}</p>

      <ul className="mt-5 grid gap-2.5">
        {role.highlights.map((h) => (
          <li
            key={h.text}
            className="relative pl-5 text-[14.5px] leading-relaxed text-foreground/80 before:absolute before:left-0.5 before:top-[0.68em] before:h-1.5 before:w-1.5 before:rounded-[2px] before:bg-primary"
          >
            {emphasise(h.text)}
          </li>
        ))}
      </ul>

      <StackChips stack={role.stack} className="mt-5" />
    </motion.div>
  );
};

// The recruiter view: every company at a glance, newest first.
export const OverviewBoard = () => (
  // scroll-mt: leave room for the fixed navbar when jumped to
  <div id="overview" className="mx-auto max-w-[1000px] scroll-mt-24">
    <div className="mb-14 text-center">
      <p className="text-xs font-medium tracking-[0.14em] text-primary">
        THE WHOLE PICTURE
      </p>
      <h2 className="mt-1.5 font-display text-[clamp(24px,4vw,32px)] font-bold tracking-tight">
        Everything at a glance
      </h2>
    </div>
    <div className="grid gap-16">
      {[...roles].reverse().map((role, i) => (
        <BoardCard key={role.id} role={role} tilt={i ? 0.8 : -0.6} />
      ))}
    </div>
  </div>
);
