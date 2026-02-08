"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: "98%", label: "Program Satisfaction" },
  { value: "4.8/5", label: "Program Ratings" },
  { value: "+75%", label: "Increased Productivity" },
];

export function CorporateInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate stats on scroll
      const statItems = statsRef.current?.querySelectorAll(".stat-item");
      if (statItems) {
        gsap.fromTo(statItems, {
          y: 30,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Description */}
        <p
          className="w-full text-[#303030]"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(16px, 2vw, 24px)",
            lineHeight: "1.5",
            letterSpacing: "-0.02em",
          }}
        >
          We provide specialized corporate training programs designed to enhance employee skills, improve productivity, and empower organizations to make data-driven decisions. Our training is tailored to meet your company&apos;s unique requirements, ensuring practical, hands-on learning that can be applied directly to your business processes. We deliver training programs across multiple tools including Advanced Excel, Power BI, and Tableau.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-8 lg:gap-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div
                className="text-black font-semibold"
                style={{
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  fontSize: "clamp(32px, 5vw, 57px)",
                  lineHeight: "1.23",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[#404040] font-semibold mt-1 sm:mt-2"
                style={{
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  fontSize: "clamp(12px, 1.5vw, 18px)",
                  lineHeight: "1.5",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Discover More Button */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <a
            href="#courses"
            className="inline-flex items-center gap-2 sm:gap-3 bg-[#F5A623] hover:bg-[#D4910A] text-white rounded-full px-5 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 transition-all duration-300"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(16px, 2vw, 22px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Discover More
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 lg:w-6 lg:h-6"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
