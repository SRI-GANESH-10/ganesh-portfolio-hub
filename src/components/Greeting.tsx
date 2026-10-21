import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { greetings } from "@/data/contact";

const INTERVAL = 2400; // ms each greeting stays on screen
const STAGGER = 0.06; // s between one letter dropping and the next

// Split into the letters a reader sees, so Indian scripts don't fall apart mid-letter:
// "नमस्ते" → ["न", "म", "स्ते"], not 6 loose pieces. Old browsers without Segmenter split simply.
const letters = (word: string) =>
  "Segmenter" in Intl
    ? [...new Intl.Segmenter().segment(word)].map((s) => s.segment)
    : [...word];

// A huge "Hello" that cycles through languages, each word's letters dropping in one by one.
export const Greeting = () => {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  // People who asked their OS for less motion just get a still "Hello".
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setI((n) => (n + 1) % greetings.length),
      INTERVAL,
    );
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const { word, language } = greetings[i];

  return (
    <div>
      {/* screen readers hear "Hello" once, not a new word every 2.4 s */}
      <span className="sr-only">{greetings[0].word}</span>

      {/* key={i}: a new word mounts fresh spans, so their drop animation plays again */}
      {/* leading-[1.45]: Telugu/Kannada letters hang well below the line; English-tight spacing clips them */}
      <div
        key={i}
        aria-hidden="true"
        className="min-h-[1.45em] font-display text-[clamp(48px,10vw,110px)] font-extrabold leading-[1.45] tracking-[-0.04em]"
      >
        {letters(word).map((letter, k) => (
          <span
            key={k}
            className="inline-block animate-letter-drop motion-reduce:animate-none"
            style={{ animationDelay: `${k * STAGGER}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <p
        aria-hidden="true"
        className="mt-1.5 text-[11.5px] uppercase tracking-[0.14em] text-primary"
      >
        {language}
      </p>
    </div>
  );
};
