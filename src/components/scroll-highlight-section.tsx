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

interface ScrollHighlightSectionData {
  paragraphs?: string[];
}

interface ScrollHighlightSectionProps {
  theme?: "light" | "dark";
  data?: ScrollHighlightSectionData | null;
}

// Text organized by sentences, each containing styled segments
const defaultSentences: TextSegment[][] = [
  [
    { text: "Axtella was founded by ", weight: 400 },
    { text: "Hassan AbdulShukkur", weight: 700 },
    { text: " with a vision to deliver integrated technology and infrastructure solutions across Saudi Arabia and the GCC.", weight: 400 },
  ],
  [
    { text: "Since 2019, we've grown from a focused consultancy into a trusted partner with ", weight: 400 },
    { text: "250+ skilled professionals", weight: 700 },
    { text: " delivering across 9 service verticals.", weight: 400 },
  ],
  [
    { text: "From telecommunications and IoT to smart buildings and construction — we engineer ", weight: 400 },
    { text: "end-to-end solutions", weight: 700 },
    { text: " that perform, scale, and last.", weight: 400 },
  ],
  [
    { text: "Headquartered in Riyadh, every project we take on is aligned with ", weight: 400 },
    { text: "Saudi Vision 2030", weight: 700 },
    { text: " and built on a foundation of engineering excellence.", weight: 400 },
  ],
];

export function ScrollHighlightSection({ theme = "light", data }: ScrollHighlightSectionProps) {
  // If data.paragraphs provided from DB, convert to TextSegment[][] format
  const sentences: TextSegment[][] = data?.paragraphs
    ? data.paragraphs.map((p) => [{ text: p, weight: 400 }])
    : defaultSentences;
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const colors = useMemo(() => ({
    background: theme === "light" ? "bg-white" : "bg-[#080D1A]",
    dimColor: theme === "light" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
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
          start: "top 85%",
          end: "bottom 30%",
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
      className={`py-16 md:py-20 lg:py-24 ${colors.background}`}
    >
      <div
        className="w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12"
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "clamp(18px, 3.5vw, 36px)",
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
    </section>
  );
}
