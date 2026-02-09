"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left content stagger
      const leftItems = sectionRef.current?.querySelectorAll("[data-animate]");
      if (leftItems) {
        gsap.fromTo(
          leftItems,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Image reveal
      const imageEl = sectionRef.current?.querySelector("[data-image]");
      if (imageEl) {
        gsap.fromTo(
          imageEl,
          { scale: 1.05, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 md:py-12 lg:py-16 bg-[#161616]"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:max-w-[1600px] lg:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT — Text + Mini Stats */}
            <div>
              {/* Label */}
              <p
                data-animate
                className="font-semibold tracking-[0.2em] uppercase mb-4 opacity-0"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(12px, 2vw, 14px)",
                  color: "#F5A623",
                }}
              >
                WHO WE ARE
              </p>

              {/* Heading */}
              <h2
                data-animate
                className="font-bold mb-6 opacity-0"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(28px, 5vw, 42px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                About Axtella Global
              </h2>

              {/* Paragraph 1 */}
              <p
                data-animate
                className="mb-4 opacity-0"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  lineHeight: "1.7",
                  color: "rgba(255, 255, 255, 0.62)",
                }}
              >
                Established in 2019, Axtella Global Information Technology
                Company is a Saudi-based LLC operating at the intersection of
                technology, infrastructure, and service excellence. With our
                corporate headquarters in Riyadh and strategic branches in
                Bahrain and India, we have emerged as a trusted partner in
                delivering comprehensive solutions across Telecom, IT, Civil,
                IoT, ELV, and Renewable Energy sectors.
              </p>

              {/* Paragraph 2 */}
              <p
                data-animate
                className="mb-0 opacity-0"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(15px, 2vw, 18px)",
                  lineHeight: "1.7",
                  color: "rgba(255, 255, 255, 0.62)",
                }}
              >
                Backed by a team of over 250 skilled professionals and decades
                of leadership experience, we deliver end-to-end project
                execution built to meet the growing demands of smart cities,
                connected infrastructure, and digitally-driven industries —
                fully aligned with Saudi Vision 2030.
              </p>

            </div>

            {/* RIGHT — Image */}
            <div
              data-image
              className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-0 lg:h-full opacity-0"
              style={{ minHeight: "400px" }}
            >
              <Image
                src="/images/about/image2.png"
                alt="Axtella operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
