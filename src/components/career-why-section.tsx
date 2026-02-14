"use client";

import { useRef, useEffect } from "react";
import { TrendingUp, Globe, Users, Gift } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const whyCards = [
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Fast-track your career with hands-on projects across telecom, IoT, fleet management, and smart building technologies in one of the world's fastest-growing markets.",
  },
  {
    icon: Globe,
    title: "Impact",
    description: "Work on projects that directly contribute to Saudi Vision 2030 — from smart city infrastructure to enterprise digital transformation across the Kingdom.",
  },
  {
    icon: Users,
    title: "Culture",
    description: "Join a diverse, collaborative team that values innovation and initiative. We foster an environment where every voice is heard and ideas turn into action.",
  },
  {
    icon: Gift,
    title: "Benefits",
    description: "Competitive compensation, health insurance, annual leave, professional development allowances, and relocation support for international hires.",
  },
];

export function CareerWhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(".career-why-heading", {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger
      gsap.fromTo(".career-why-card", {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: "#080D1A" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="career-why-heading text-center mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#F5A623]" />
            <span
              className="text-[#F5A623] uppercase text-xs tracking-[2px] font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Why Join Us
            </span>
            <div className="w-8 h-[2px] bg-[#F5A623]" />
          </div>
          <h2
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            Why Axtella
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {whyCards.map((card) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.title}
                className="career-why-card group rounded-2xl border border-[#1F2937] p-6 lg:p-8 transition-all duration-300 hover:border-[#F5A623]/60 hover:shadow-[0_0_30px_rgba(245,166,35,0.1)]"
                style={{ backgroundColor: "#111827" }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#F5A623]/15 flex items-center justify-center mb-5 group-hover:bg-[#F5A623]/25 transition-colors">
                  <IconComp className="w-5 h-5 text-[#F5A623]" />
                </div>

                {/* Title */}
                <h3
                  className="text-white font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "18px",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-white/50 leading-relaxed"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "14px",
                  }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
