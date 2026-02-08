"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export function ContactHeroSection() {
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
      style={{ height: "100vh", maxHeight: "900px", minHeight: "500px" }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact/image 118.png"
          alt="Contact Background"
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
                  fontSize: "clamp(36px, 4.3vw, 82px)",
                  lineHeight: "0.93",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="word inline-block text-white">LET&apos;S</span>{" "}
                <span className="word inline-block text-white">BUILD</span>
                <br />
                <span className="word inline-block text-white">SOMETHING</span>
                <br />
                <span className="word inline-block text-white">GREAT</span>{" "}
                <span className="word inline-block text-white">TOGETHER</span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white max-w-[534px]"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.05vw, 20px)",
                  lineHeight: "1.5",
                  letterSpacing: "-0.02em",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Nisl risus lacus nulla.
                Laoreet in nulla risus et met adipiscing.
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
