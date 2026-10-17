import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { AskAboutMe } from "./AskAboutMe";
import { QUESTIONS } from "@/data/questions";

const byId = (id: string) => QUESTIONS.find((q) => q.id === id)!;
const PILLS = QUESTIONS.filter((q) => q.label).map((q) => ({
  id: q.id,
  label: q.label!,
}));

export const ChatPanel = () => {
  const [history, setHistory] = useState<string[]>(["intro"]);
  const [busy, setBusy] = useState(true);
  // bumped on reset so keys change and ChatMessage remounts with fresh state
  const [run, setRun] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  // keep the newest turn in view, like any chat app
  useEffect(() => {
    const el = scroller.current;
    el?.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [history, busy]);

  const onAsk = (id: string) => {
    if (busy) return;
    setHistory((h) => [...h, id]);
    setBusy(true);
  };

  return (
    <div className="w-full max-w-[880px] mx-auto flex-1 min-h-0 flex flex-col">
      {/* only this scrolls */}
      <div ref={scroller} className="flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {history.map((id, i) => {
        const q = byId(id);
        const isLast = i === history.length - 1;

        return (
          <div key={`${run}-${id}-${i}`}>
            {/* what the visitor tapped — instant, no animation */}
            {q.label && (
              <div className="flex justify-end mt-6">
                <div className="max-w-[75%] px-5 py-3 text-[15px] font-semibold rounded-[20px_20px_4px_20px] bg-primary text-primary-foreground">
                  {q.label}
                </div>
              </div>
            )}

            <div className="flex gap-3.5 mt-6">
              <Avatar className="h-9 w-9 mt-0.5 shadow-[0_0_20px_hsl(var(--primary)/0.35)]">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  SG
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <ChatMessage
                  say={q.say}
                  rich={q.rich}
                  live={isLast && busy}
                  onDone={() => setBusy(false)}
                />
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* pinned below the scroll area */}
      <div className="flex-none pt-3">
        <AskAboutMe
          questions={PILLS}
          onAsk={onAsk}
          disabled={busy}
          action={
            history.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                disabled={busy}
                onClick={() => {
                  setHistory(["intro"]);
                  setBusy(true);
                  setRun((r) => r + 1);
                }}
                className="h-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] text-muted-foreground hover:text-primary"
              >
                <RotateCcw /> Start over
              </Button>
            )
          }
        />
      </div>
    </div>
  );
};
