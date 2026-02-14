"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export function CareerHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation - word by word
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

      // Subtext animation
      gsap.fromTo(subtextRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        ease: "power3.out",
      });

      // CTA animation
      gsap.fromTo(ctaRef.current, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToPositions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("open-positions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "900px", minHeight: "450px" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/career/img1.png"
          alt="Career Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(270deg, rgba(0, 0, 0, 0.16) 12.94%, rgba(0, 0, 0, 0.8) 81.08%)",
          }}
        />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/home/dot paatern.png')`,
            backgroundRepeat: "repeat",
          }}
        />
        {/* Gold gradient glows */}
        <div className="absolute bottom-0 left-1/4 w-[min(600px,80vw)] h-[min(400px,60vh)] bg-[#F5A623]/20 blur-[150px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[min(400px,60vw)] h-[min(300px,40vh)] bg-[#F5A623]/10 blur-[120px] rounded-full" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center">
          <div className="w-full max-w-4xl">
            <div className="space-y-6">
              {/* Headline */}
              <h1
                ref={headlineRef}
                className="font-extrabold uppercase"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(32px, 7vw, 72px)",
                  lineHeight: "0.95",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="word inline-block text-white">BUILD</span>{" "}
                <span className="word inline-block text-white">THE</span>{" "}
                <span className="word inline-block text-white">FUTURE</span>
                <br />
                <span className="word inline-block text-white">OF</span>{" "}
                <span className="word inline-block text-[#F5A623]">SAUDI</span>{" "}
                <span className="word inline-block text-[#F5A623]">ARABIA</span>
                <br />
                <span className="word inline-block text-white">WITH</span>{" "}
                <span className="word inline-block text-white">US</span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Join 250+ professionals shaping Vision 2030
              </p>

              {/* CTA */}
              <a
                ref={ctaRef}
                href="#open-positions"
                onClick={handleScrollToPositions}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#080D1A] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)]"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  background: "#F5A623",
                }}
              >
                View Open Positions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080D1A] to-transparent" />
    </section>
  );
}
