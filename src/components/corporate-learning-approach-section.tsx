"use client";

import { useState } from "react";

const approaches = [
  {
    id: 1,
    text: "CUSTOM MODULES TAILORED TO TEAM SKILLS AND BUSINESS NEEDS.",
  },
  {
    id: 2,
    text: "HANDS-ON EXERCISES AND REAL-LIFE CASE STUDIES",
  },
  {
    id: 3,
    text: "FLEXIBLE SCHEDULES TO MINIMIZE BUSINESS DISRUPTION",
  },
  {
    id: 4,
    text: "TRAINER-LED SESSIONS WITH BOTH THEORY AND PRACTICAL APPLICATION",
  },
  {
    id: 5,
    text: "BLENDED LEARNING OPTIONS: IN-PERSON, ON-SITE, OR VIRTUAL SESSIONS",
  },
];

export function CorporateLearningApproachSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-white py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className="text-black font-extrabold uppercase text-center"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(32px, 5vw, 62px)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          CUSTOMIZED
          <br />
          LEARNING APPROACH
        </h2>

        {/* Subtitle */}
        <p
          className="text-black font-semibold text-center mt-6 lg:mt-8"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(16px, 2vw, 22px)",
            lineHeight: "42px",
            letterSpacing: "-0.02em",
          }}
        >
          Our corporate training programs are designed around your organization&apos;s goals:
        </p>

        <p
          className="text-black/60 text-center mt-4 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "1.7",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Circles */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-wrap justify-center items-center gap-3 sm:gap-4 lg:gap-6">
          {approaches.map((approach) => {
            const isHovered = hoveredId === approach.id;
            return (
              <div
                key={approach.id}
                className="flex items-center justify-center text-center cursor-pointer rounded-full transition-all duration-300"
                style={{
                  width: "clamp(180px, 30vw, 280px)",
                  height: "clamp(180px, 30vw, 280px)",
                  background: isHovered ? "#009412" : "#FFFFFF",
                  border: isHovered ? "1px solid #009412" : "1px solid rgba(0, 0, 0, 0.31)",
                }}
                onMouseEnter={() => setHoveredId(approach.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <p
                  className="px-3 sm:px-4 lg:px-6 font-bold uppercase transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(10px, 1.2vw, 14px)",
                    lineHeight: "1.4",
                    letterSpacing: "-0.01em",
                    color: isHovered ? "#FFFFFF" : "#000000",
                  }}
                >
                  {approach.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
