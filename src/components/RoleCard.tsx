import { cn } from "@/lib/utils";
import type { Role } from "@/data/experience";
import { Sticker } from "./Sticker";
import { StackChips } from "./StackChips";

// Phones: the card is too narrow for both top stickers, so this one drops to the bottom-right corner.
const rightSticker = "-bottom-4 right-4 md:bottom-auto md:-top-4 md:right-6";

// Company header: name, role, stack chips, with date and NOW / "N highlights" stickers on top.
export const RoleCard = ({ role }: { role: Role }) => (
  <div
    className={cn(
      "relative rounded-[22px] border bg-card px-6 pt-10 pb-7 text-left md:px-8 md:text-center",
      role.current ? "border-primary/45" : "border-border",
    )}
    style={{ transform: `rotate(${role.current ? 1 : -1}deg)` }}
  >
    <Sticker tone="white" big tilt={-6} className="-top-4 left-6">
      {role.period}
    </Sticker>
    {role.current ? (
      <Sticker big tilt={6} className={rightSticker}>
        ● NOW
      </Sticker>
    ) : (
      <Sticker tilt={5} className={rightSticker}>
        {role.highlights.length} highlights
      </Sticker>
    )}

    <h3 className="font-display font-extrabold text-[clamp(32px,5.5vw,50px)] leading-[1.05] tracking-[-0.035em]">
      {role.company}
    </h3>
    <p className="mt-1.5 text-muted-foreground">{role.role}</p>

    <StackChips stack={role.stack} className="mt-5 md:justify-center" />
  </div>
);
