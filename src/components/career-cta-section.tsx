"use client";

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CareerCTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".career-cta-content", {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F5A623]/8 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="career-cta-content space-y-6">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[#F5A623]/15 flex items-center justify-center mx-auto">
            <Send className="w-7 h-7 text-[#F5A623]" />
          </div>

          {/* Heading */}
          <h2
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
            }}
          >
            No Matching Role?
          </h2>

          {/* Subtext */}
          <p
            className="text-white/50 max-w-md mx-auto leading-relaxed"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "16px",
            }}
          >
            We&apos;re always looking for talented people. Send your CV and we&apos;ll reach out when a position that fits your profile opens up.
          </p>

          {/* Email */}
          <p
            className="text-white/70"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "14px",
            }}
          >
            Send your CV to{" "}
            <a href="mailto:careers@axtellaglobal.com" className="text-[#F5A623] hover:underline">
              careers@axtellaglobal.com
            </a>
          </p>

          {/* CTA Button */}
          <a
            href="mailto:careers@axtellaglobal.com?subject=CV Submission"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#080D1A] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)]"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              background: "#F5A623",
            }}
          >
            Upload CV
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
