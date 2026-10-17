// ============================================================
//  components/Typewriter.tsx
//  Reusable human-like typewriter with:
//    - Variable speed (slightly random per character)
//    - Short pauses at punctuation (. , ? ! …)
//    - Optional delete + retype between lines (hero mode)
//    - Blinking cursor
//    - Respects prefers-reduced-motion
// ============================================================
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TypewriterProps {
  /** Array of lines to cycle through */
  lines: string[];
  /** Milliseconds per character (base, with ±30% jitter) */
  speed?: number;
  /** Pause after completing a line, before deleting */
  pauseAfterLine?: number;
  /** Pause between lines when NOT in cycle mode */
  pauseBetweenLines?: number;
  /** If true: type all lines sequentially (no delete). Used for the letter. */
  sequential?: boolean;
  /** Called each time all lines have been written (for sequential mode) */
  onComplete?: () => void;
  className?: string;
  cursorClassName?: string;
}

// Punctuation that gets an extra pause
const PAUSE_CHARS = new Set([".", ",", "?", "!", "…", ";", "—"]);

export default function Typewriter({
  lines,
  speed = 42,
  pauseAfterLine = 1800,
  pauseBetweenLines = 600,
  sequential = false,
  onComplete,
  className = "",
  cursorClassName = "",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [showCursor, setShowCursor] = useState(true);
  const rafReduced = useRef(false);

  // Sequential mode: builds up all lines with \n between them
  const fullText = useRef("");

  useEffect(() => {
    // Check reduced motion once
    rafReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rafReduced.current) {
      // Show all text instantly
      if (sequential) {
        setDisplayed(lines.join("\n\n"));
        onComplete?.();
      } else {
        setDisplayed(lines[0] ?? "");
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const charIndexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // ── Sequential mode ────────────────────────────────────────
  useEffect(() => {
    if (!sequential || rafReduced.current) return;
    clear();
    fullText.current = "";
    charIndexRef.current = 0;

    const allText = lines.join("\n\n");

    const typeChar = () => {
      if (charIndexRef.current >= allText.length) {
        onComplete?.();
        return;
      }
      const ch = allText[charIndexRef.current];
      fullText.current += ch;
      setDisplayed(fullText.current);
      charIndexRef.current++;

      // Extra pause at punctuation
      const extraPause = PAUSE_CHARS.has(ch) ? 200 : 0;
      const jitter = (Math.random() * 0.6 + 0.7) * speed;
      timeoutRef.current = setTimeout(typeChar, jitter + extraPause);
    };

    timeoutRef.current = setTimeout(typeChar, 400);
    return clear;
  }, [lines, sequential]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cycling mode (hero) ────────────────────────────────────
  useEffect(() => {
    if (sequential || rafReduced.current) return;
    clear();
    charIndexRef.current = 0;
    let localDisplayed = "";
    const line = lines[lineIndex] ?? "";

    if (phase === "typing") {
      const typeNext = () => {
        if (charIndexRef.current >= line.length) {
          // Done typing — pause then start deleting (or move to next in sequential-ish)
          timeoutRef.current = setTimeout(() => setPhase("pause"), pauseAfterLine);
          return;
        }
        const ch = line[charIndexRef.current];
        localDisplayed += ch;
        setDisplayed(localDisplayed);
        charIndexRef.current++;
        const extraPause = PAUSE_CHARS.has(ch) ? 180 : 0;
        const jitter = (Math.random() * 0.6 + 0.7) * speed;
        timeoutRef.current = setTimeout(typeNext, jitter + extraPause);
      };
      // Seed displayed so we don't reset the ref when phase changes
      setDisplayed("");
      localDisplayed = "";
      timeoutRef.current = setTimeout(typeNext, 300);
    }

    if (phase === "pause") {
      setPhase("deleting");
    }

    if (phase === "deleting") {
      let current = line;
      const deleteNext = () => {
        if (current.length === 0) {
          timeoutRef.current = setTimeout(() => {
            setLineIndex((i) => (i + 1) % lines.length);
            setPhase("typing");
          }, pauseBetweenLines);
          return;
        }
        current = current.slice(0, -1);
        setDisplayed(current);
        timeoutRef.current = setTimeout(deleteNext, speed * 0.5);
      };
      timeoutRef.current = setTimeout(deleteNext, 100);
    }

    return clear;
  }, [phase, lineIndex, sequential]); // eslint-disable-line react-hooks/exhaustive-deps

  // Blinking cursor hidden during deleting for cleaner look
  useEffect(() => {
    setShowCursor(phase !== "deleting");
  }, [phase]);

  if (sequential) {
    // Render with preserved newlines
    return (
      <span className={className} aria-live="polite">
        {displayed.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < displayed.split("\n").length - 1 && <br />}
          </span>
        ))}
        <span
          aria-hidden="true"
          className={`tw-cursor inline-block w-[2px] h-[1.1em] bg-current align-middle ml-[2px] ${cursorClassName}`}
        />
      </span>
    );
  }

  return (
    <span className={className} aria-live="polite">
      {displayed}
      {showCursor && (
        <span
          aria-hidden="true"
          className={`tw-cursor inline-block w-[2px] h-[1.1em] bg-current align-middle ml-[2px] ${cursorClassName}`}
        />
      )}
    </span>
  );
}
