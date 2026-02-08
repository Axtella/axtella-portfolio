"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FeatureSection {
  title: string;
  items: string[];
}

interface CaseStudyFeaturesCardProps {
  topLeft: FeatureSection;
  topRight: FeatureSection;
  bottomLeft: FeatureSection;
  bottomRight: FeatureSection;
}

function FeatureBlock({ title, items }: FeatureSection) {
  return (
    <div className="p-6 lg:p-10">
      <h3
        className="font-bold mb-4"
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "24px",
          lineHeight: "32px",
          color: "#000000",
        }}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "16px",
              lineHeight: "28px",
              color: "#000000",
            }}
          >
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyFeaturesCard({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: CaseStudyFeaturesCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="bg-white rounded-2xl relative overflow-hidden"
          style={{
            boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.12)",
          }}
        >
          {/* Vertical Divider - centered with margin from top/bottom */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              backgroundColor: "#D9D9D9",
              top: "24px",
              bottom: "24px",
            }}
          />

          {/* Horizontal Divider - centered with margin from left/right */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-px"
            style={{
              backgroundColor: "#D9D9D9",
              left: "24px",
              right: "24px",
            }}
          />

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Top Left */}
            <div className="relative">
              <FeatureBlock {...topLeft} />
            </div>

            {/* Top Right */}
            <div className="relative">
              <FeatureBlock {...topRight} />
            </div>

            {/* Bottom Left */}
            <div className="relative">
              <FeatureBlock {...bottomLeft} />
            </div>

            {/* Bottom Right */}
            <div className="relative">
              <FeatureBlock {...bottomRight} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
