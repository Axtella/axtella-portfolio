"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export function CaseStudyHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(words, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.2,
          ease: "power4.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[600px] lg:min-h-[700px] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/herobg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url('/images/home/dot paatern.png')`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Green gradient glow */}
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] lg:w-[800px] h-[300px] md:h-[500px] lg:h-[600px] bg-[#F5A623]/20 blur-[150px] rounded-full" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col justify-end h-full min-h-[600px] lg:min-h-[700px] pb-16 lg:pb-24">
          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-extrabold uppercase max-w-[1238px]"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(36px, 5.5vw, 82px)",
              lineHeight: "0.93",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="word inline-block text-white">UNLOCKING</span>
            <br />
            <span className="word inline-block text-white">OPERATIONAL EFFICIENCY</span>
            <br />
            <span className="word inline-block text-white">THROUGH AUTOMATION</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
