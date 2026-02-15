"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AboutHeroData {
  headline?: string[];
  subtext?: string;
}

export function AboutHeroSection({ data }: { data?: AboutHeroData | null }) {
  const headline = data?.headline || ["WE'RE AXTELLA"];
  const subtext = data?.subtext || "Lorem ipsum dolor sit amet consectetur. Nisl risus lacus nulla. Laoreet in nulla risus et met adipiscing.";
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", maxHeight: "900px", minHeight: "450px" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/about/abouthero.png"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay from Figma - darkens left side for text readability */}
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
        {/* Green gradient glow */}
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
                {headline.map((line, i) => (
                  <span key={i}>
                    {line.split(" ").map((word, wi, arr) => (
                      <span key={wi}>
                        <span className="word inline-block text-white">{word}</span>
                        {wi < arr.length - 1 ? " " : ""}
                      </span>
                    ))}
                    {i < headline.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-base lg:text-lg max-w-xl leading-relaxed"
              >
                {subtext}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080D1A] to-transparent" />
    </section>
  );
}
