import { MotionConfig, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { roles, type Highlight, type Role } from "@/data/experience";
import { RoleCard } from "./RoleCard";
import { HighlightCard } from "./HighlightCard";
import { Sticker } from "./Sticker";
import { TimelinePath } from "./TimelinePath";
import { OverviewBoard } from "./OverviewBoard";
import { Button } from "@/components/ui/button";

// A fixed tilt pattern so the cards look hand-placed but stay the same on every visit.
const TILTS = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.1, -2.6, 1.9];

type Row =
  | { key: string; kind: "role"; role: Role }
  | {
      key: string;
      kind: "point";
      highlight: Highlight;
      side: "L" | "R";
      tilt: number;
    }
  | { key: string; kind: "end" };

// Flatten roles into one list of rows. Left/right alternates across the whole list,
// so the zig-zag carries on smoothly from one company into the next.
const rows: Row[] = [];
let n = 0;
for (const role of roles) {
  rows.push({ key: role.id, kind: "role", role });
  role.highlights.forEach((highlight, k) => {
    rows.push({
      key: `${role.id}-${k}`,
      kind: "point",
      highlight,
      side: n % 2 ? "R" : "L",
      tilt: TILTS[n % TILTS.length],
    });
    n++;
  });
}
rows.push({ key: "end", kind: "end" });

// e.g. "Oct 2026": worked out from today, so the end card never goes stale
const today = new Date().toLocaleDateString("en", {
  month: "short",
  year: "numeric",
});

const toOverview = () =>
  document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });

const dot =
  "block rounded-full border-muted-foreground/40 bg-background relative z-10 transition-colors duration-300";
const dotReached = "border-primary bg-primary";
const bigDot = "h-[22px] w-[22px] border-[3px]";
const bigDotReached = [
  dotReached,
  "shadow-[0_0_0_6px_hsl(var(--primary)/0.12)]",
];

// Phones: every row is "dot | content" with the line down the left (40px column).
// From md up: highlight rows zig-zag around a centre column, headers stack dot-over-card.
const phoneRow = "grid grid-cols-[40px_1fr]";
const phoneDot = "col-start-1 row-start-1 justify-self-center";
const phoneContent = "col-start-2 row-start-1 w-full";

// Cards "slap" on like stickers when the glow reaches their dot: they start a bit big,
// over-rotated and invisible, then settle with a small overshoot. Scrolling back up peels them off.
const HIDDEN = { opacity: 0, scale: 1.12, rotate: 7, y: 8 };
const SHOWN = { opacity: 1, scale: 1, rotate: 0, y: 0 };
const SLAP = {
  duration: 0.45,
  ease: [0.3, 1.6, 0.5, 1] as const,
  opacity: { duration: 0.35 },
};

const Slap = ({
  reached,
  children,
}: {
  reached: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={HIDDEN}
    animate={reached ? SHOWN : HIDDEN}
    transition={SLAP}
  >
    {children}
  </motion.div>
);

export const ExperienceSection = () => (
  // reducedMotion="user": skip the slap animations for people who've asked their OS for less motion
  <MotionConfig reducedMotion="user">
    {/* overflow-x-clip: cards waiting to slap in are scaled up and would poke past a phone's edge */}
    <section
      id="experience"
      className="container-custom overflow-x-clip pt-6 pb-24"
    >
      <div className="mb-4 flex justify-center">
        <button
          onClick={toOverview}
          className="text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Skip to the overview ↓
        </button>
      </div>
      <TimelinePath startAt={2} className="max-w-[1000px]">
        {(active) =>
          rows.map((r, i) => {
            // one dot per row, so row i's dot is reached when i < active
            const reached = i < active;

            if (r.kind === "role")
              return (
                <div
                  key={r.key}
                  // data-reached lets the stickers inside pop in too (see Sticker)
                  data-reached={reached}
                  className={cn(
                    "group/reach relative mt-8 mb-14 items-start",
                    phoneRow,
                    "md:mt-10 md:mb-24 md:flex md:flex-col md:items-center",
                  )}
                >
                  <i
                    data-dot
                    className={cn(
                      dot,
                      bigDot,
                      phoneDot,
                      // phones: level with the card's top; md: sits on the card's top edge
                      "mt-7 md:mt-0 md:-mb-[11px]",
                      reached && bigDotReached,
                    )}
                  />
                  <div className={cn(phoneContent, "md:max-w-[640px]")}>
                    <Slap reached={reached}>
                      <RoleCard role={r.role} />
                    </Slap>
                  </div>
                </div>
              );

            if (r.kind === "point")
              return (
                <div
                  key={r.key}
                  data-reached={reached}
                  className={cn(
                    "group/reach relative mb-12 items-center",
                    phoneRow,
                    // md: 3 columns, left card | centre dot | right card
                    "md:mb-20 md:grid-cols-[1fr_70px_1fr]",
                  )}
                >
                  <i
                    data-dot
                    className={cn(
                      dot,
                      "h-3.5 w-3.5 border-2",
                      phoneDot,
                      "md:col-start-2",
                      reached && dotReached,
                    )}
                  />
                  <div
                    className={cn(
                      phoneContent,
                      "md:max-w-[400px]",
                      r.side === "L"
                        ? "md:col-start-1 md:justify-self-end"
                        : "md:col-start-3 md:justify-self-start",
                    )}
                  >
                    <Slap reached={reached}>
                      <HighlightCard
                        highlight={r.highlight}
                        side={r.side}
                        tilt={r.tilt}
                      />
                    </Slap>
                  </div>
                </div>
              );

            // the last stop: where things stand today
            return (
              <div
                key={r.key}
                data-reached={reached}
                className={cn(
                  "group/reach relative items-center",
                  phoneRow,
                  "md:flex md:flex-col md:gap-5",
                )}
              >
                <i
                  data-dot
                  className={cn(
                    dot,
                    bigDot,
                    phoneDot,
                    reached && bigDotReached,
                  )}
                />
                <div className={cn(phoneContent, "md:text-center")}>
                  <Slap reached={reached}>
                    <Sticker big tilt={-3} className="static inline-flex">
                      ● Now · {today}
                    </Sticker>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Still shipping. Next stop: your team?
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toOverview}
                      className="mt-4 rounded-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      See it all at once ↓
                    </Button>
                  </Slap>
                </div>
              </div>
            );
          })
        }
      </TimelinePath>
      {/* also the room the last dot needs to scroll up to the mid-screen reading line */}
      <div className="mt-[30vh]">
        <OverviewBoard />
      </div>
    </section>
  </MotionConfig>
);
