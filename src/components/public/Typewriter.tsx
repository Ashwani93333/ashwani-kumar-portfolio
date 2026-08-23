"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
}

/**
 * Cycles through a list of words with a typewriter effect and a blinking
 * terminal cursor at the end.
 */
export function Typewriter({
  words,
  className,
  typingSpeed = 90,
  deletingSpeed = 45,
  pause = 1600,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = words[wordIndex % words.length];

    if (!deleting) {
      // typing
      if (text.length < word.length) {
        timeoutRef.current = setTimeout(() => {
          setText(word.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      // deleting
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(word.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{text}</span>
      <span className="inline-block w-[0.6ch] h-[1.05em] bg-primary animate-blink" />
    </span>
  );
}
