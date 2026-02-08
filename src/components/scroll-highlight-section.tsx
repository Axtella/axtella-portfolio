"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextSegment {
  text: string;
  weight?: 400 | 600 | 700;
}

interface ScrollHighlightSectionProps {
  theme?: "light" | "dark";
}

// Text organized by sentences, each containing styled segments
const sentences: TextSegment[][] = [
  [
    { text: "Axtella was founded by ", weight: 400 },
    { text: "Hassan AbdulShukkur", weight: 700 },
    { text: " lorem ipsum dolor sit amet, consectetur adipiscing elit.", weight: 400 },
  ],
  [
    { text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ", weight: 400 },
    { text: "Ut enim ad minim veniam.", weight: 700 },
  ],
  [
    { text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", weight: 400 },
    { text: "Duis aute irure dolor", weight: 700 },
    { text: " in reprehenderit in voluptate velit.", weight: 400 },
  ],
  [
    { text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", weight: 400 },
  ],
];

export function ScrollHighlightSection({ theme = "light" }: ScrollHighlightSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const colors = useMemo(() => ({
    background: theme === "light" ? "bg-white" : "bg-[#080D1A]",
    dimColor: theme === "light" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)",
    activeColor: theme === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)",
  }), [theme]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const sentenceElements = sentenceRefs.current.filter(Boolean) as HTMLSpanElement[];
    if (sentenceElements.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      sentenceElements.forEach((sentence, i) => {
        // Highlight current sentence
        tl.to(sentence, {
          color: colors.activeColor,
          duration: 0.4,
          ease: "none",
        }, i === 0 ? 0 : `>-0.1`);

        // Dim previous sentence
        if (i > 0) {
          tl.to(sentenceElements[i - 1], {
            color: colors.dimColor,
            duration: 0.3,
            ease: "none",
          }, "<");
        }

        // Hold pause so the sentence is readable
        tl.to({}, { duration: 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [colors.activeColor, colors.dimColor]);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen ${colors.background}`}
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className={`w-full ${colors.background}`}>
        <div
          className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(16px, 3.5vw, 36px)",
            lineHeight: "1.5",
            letterSpacing: "-0.02em",
          }}
        >
          <p>
            {sentences.map((segments, sentenceIndex) => (
              <span
                key={sentenceIndex}
                ref={(el) => {
                  sentenceRefs.current[sentenceIndex] = el;
                }}
                style={{ color: colors.dimColor }}
              >
                {segments.map((segment, segIndex) => (
                  <span
                    key={segIndex}
                    style={{
                      fontWeight: segment.weight || 400,
                      display: "inline",
                    }}
                  >
                    {segment.text}
                  </span>
                ))}
                {sentenceIndex < sentences.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
