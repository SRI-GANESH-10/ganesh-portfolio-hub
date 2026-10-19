import { cn } from "@/lib/utils";
import type { Highlight } from "@/data/experience";
import { Sticker } from "./Sticker";

// One bullet as a tilted card. Its sticker sits on the edge facing the centre line.
export const HighlightCard = ({
  highlight,
  side,
  tilt,
}: {
  highlight: Highlight;
  side: "L" | "R";
  tilt: number;
}) => (
  <div
    className={cn(
      "relative rounded-2xl border border-border bg-card px-5 py-[18px] text-[15px] leading-relaxed text-foreground/80",
      highlight.sticker && "pt-6",
    )}
    style={{ transform: `rotate(${tilt}deg)` }}
  >
    {highlight.sticker && (
      <Sticker
        tilt={side === "L" ? -5 : 5}
        className={cn(
          "-top-[15px] left-[18px]",
          side === "L" && "md:left-auto md:right-[18px]",
        )}
      >
        {highlight.sticker}
      </Sticker>
    )}
    {highlight.text}
  </div>
);
