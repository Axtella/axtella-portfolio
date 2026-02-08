"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const programs = [
  {
    id: 1,
    title: "ADVANCED\nEXCEL",
    icon: "/images/corporate/excel-icon.png",
    gradientColors: ["#F5A623", "#a3e635", "#22d3d1"],
    bulletColor: "#F5A623",
    features: [
      "Basic and advanced formulas, functions, and pivot tables",
      "Data cleaning, validation, and error handling",
      "Automation using macros and VBA for repetitive tasks",
      "Conditional formatting and data visualization",
      "Advanced charting and reporting techniques",
      "Data consolidation, lookup functions, and scenario analysis",
      "Dashboard creation within Excel for quick insights",
    ],
  },
  {
    id: 2,
    title: "POWER\nBI",
    icon: "/images/corporate/powerbi-icon.png",
    gradientColors: ["#f59e0b", "#facc15", "#22d3d1"],
    bulletColor: "#f59e0b",
    features: [
      "Data modeling and transformation with Power Query",
      "Creating interactive dashboards and reports",
      "DAX formulas for advanced calculations",
      "Data visualization best practices",
      "Publishing and sharing reports securely",
      "Real-time data monitoring and alerts",
      "Integration with Excel and other Microsoft tools",
    ],
  },
  {
    id: 3,
    title: "TABLEAU",
    icon: "/images/corporate/tableau-icon.png",
    gradientColors: ["#3b82f6", "#8b5cf6", "#22d3d1"],
    bulletColor: "#3b82f6",
    features: [
      "Connecting to various data sources",
      "Building interactive visualizations and dashboards",
      "Calculated fields and table calculations",
      "Advanced mapping and geographic analysis",
      "Dashboard actions and interactivity",
      "Publishing to Tableau Server and Tableau Public",
      "Performance optimization techniques",
    ],
  },
];

// Responsive values based on screen size
const getResponsiveValues = () => {
  if (typeof window === "undefined") return { cardHeight: 520, cardPeek: 60 };
  const width = window.innerWidth;
  if (width < 640) return { cardHeight: 680, cardPeek: 40 }; // Mobile
  if (width < 1024) return { cardHeight: 550, cardPeek: 50 }; // Tablet
  return { cardHeight: 520, cardPeek: 60 }; // Desktop
};

export function CorporateTrainingProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ cardHeight: 520, cardPeek: 60 });
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const updateDimensions = useCallback(() => {
    setDimensions(getResponsiveValues());
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Kill existing ScrollTrigger if any
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${dimensions.cardHeight * programs.length}`,
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [dimensions]);

  // Calculate card position based on scroll progress
  const getCardStyle = (index: number) => {
    const { cardHeight, cardPeek } = dimensions;
    const totalCards = programs.length;
    const progressPerCard = 1 / totalCards;
    const cardProgress = scrollProgress / progressPerCard - index;

    // Base position (stacked with peek offset)
    let translateY = index * cardPeek;

    // As scroll progresses, move cards up
    if (cardProgress > 0) {
      translateY -= cardProgress * (cardHeight + cardPeek);
    }

    // Z-index: front cards on top, but as they scroll away, lower their z-index
    const zIndex = totalCards - index;

    // Opacity: fade out as card scrolls away
    let opacity = 1;
    if (cardProgress > 0.5) {
      opacity = Math.max(0, 1 - (cardProgress - 0.5) * 2);
    }

    return {
      transform: `translateY(${translateY}px)`,
      zIndex,
      opacity: index === totalCards - 1 ? 1 : opacity, // Last card stays visible
    };
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="pt-10 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-[#303030] font-extrabold uppercase"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(24px, 5vw, 46px)",
            lineHeight: "1.24",
            letterSpacing: "-0.02em",
          }}
        >
          TRAINING PROGRAMS WE OFFER
        </h2>
        <p
          className="text-[#999999] text-center mt-4 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "1.7",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div
        ref={cardsContainerRef}
        className="relative mx-auto mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: "1920px",
          height: `${dimensions.cardHeight + (programs.length - 1) * dimensions.cardPeek + 100}px`,
        }}
      >
        {programs.map((program, index) => (
          <div
            key={program.id}
            className="absolute left-0 right-0 mx-4 sm:mx-6 lg:mx-8 transition-all duration-100"
            style={{
              ...getCardStyle(index),
              willChange: "transform, opacity",
            }}
          >
            {/* Card */}
            <div
              className="relative bg-[#f5f5f5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
              style={{ height: `${dimensions.cardHeight}px` }}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Side - Title & Features */}
                <div className="flex-1 p-5 sm:p-8 lg:p-12 flex flex-col justify-start md:justify-center overflow-y-auto">
                  <h3
                    className="text-black font-extrabold uppercase whitespace-pre-line"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "clamp(24px, 4vw, 46px)",
                      lineHeight: "1.1",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {program.title}
                  </h3>

                  <ul className="mt-4 sm:mt-6 lg:mt-8 space-y-1 sm:space-y-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 border-2"
                          style={{ borderColor: program.bulletColor }}
                        />
                        <span
                          className="text-black font-semibold"
                          style={{
                            fontFamily: "var(--font-plus-jakarta)",
                            fontSize: "clamp(13px, 1.8vw, 21px)",
                            lineHeight: "1.6",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side - Gradient & Icon */}
                <div className="relative w-full md:w-[45%] h-[140px] sm:h-[180px] md:h-full flex-shrink-0">
                  {/* Gradient Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, ${program.gradientColors[0]} 0%, ${program.gradientColors[1]} 60%, ${program.gradientColors[2]} 100%)`,
                      clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
                    }}
                  />

                  {/* Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 z-10">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-44 lg:h-44 relative">
                      <Image
                        src={program.icon}
                        alt={program.title}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8 text-center"
        style={{ zIndex: programs.length + 1 }}
      >
        <p
          className="text-black italic"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(12px, 2vw, 20px)",
            lineHeight: "1.5",
          }}
        >
          All programs are hands-on, using real datasets to ensure practical learning.
        </p>
      </div>
    </section>
  );
}
