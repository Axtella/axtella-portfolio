"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  id: number;
  label: string;
  targetNumber: number;
  format: (num: number) => string;
}

const stats: Stat[] = [
  {
    id: 1,
    label: "Businesses Trust Us",
    targetNumber: 2000,
    format: (num: number) => {
      const k = num / 1000;
      return `${k.toFixed(1)}K+`;
    },
  },
  {
    id: 2,
    label: "Increased Productivity",
    targetNumber: 75,
    format: (num: number) => `+${Math.round(num)}%`,
  },
  {
    id: 3,
    label: "Customer Satisfaction",
    targetNumber: 98,
    format: (num: number) => `${Math.round(num)}%`,
  },
  {
    id: 4,
    label: "Star Rating",
    targetNumber: 4.8,
    format: (num: number) => `${num.toFixed(1)}/5`,
  },
];

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      stats.forEach((stat, index) => {
        const counterEl = counterRefs.current[index];
        if (!counterEl) return;

        // Create an object to animate
        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.targetNumber,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            counterEl.textContent = stat.format(counter.value);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center"
            >
              {/* Counter Number */}
              <span
                ref={(el) => {
                  counterRefs.current[index] = el;
                }}
                className="block mb-2 md:mb-4"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "clamp(40px, 8vw, 72px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                }}
              >
                0
              </span>

              {/* Label */}
              <span
                className="block"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 3vw, 18px)",
                  lineHeight: "1.4",
                  color: "#353535",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
