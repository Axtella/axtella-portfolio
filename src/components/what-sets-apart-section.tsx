"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cards = [
  {
    title: "End-to-End Delivery",
    description:
      "From planning and procurement to installation and post-deployment support — we manage every phase.",
  },
  {
    title: "250+ Skilled Professionals",
    description:
      "Engineers, technicians, and project managers delivering excellence across the Kingdom.",
  },
  {
    title: "9 Integrated Verticals",
    description:
      "Telecom, IT, Civil, IoT, ELV, Renewable Energy, MEP, Security, and Smart Solutions.",
  },
  {
    title: "Vision 2030 Aligned",
    description:
      "Every project we deliver supports Saudi Arabia's digital transformation goals.",
  },
];

export function WhatSetsApartSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll("[data-card]");
      if (items) {
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
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
      className="relative py-12 md:py-16 lg:py-20"
      style={{ background: "#f5f3f0" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:max-w-[1600px] lg:mx-auto">
          {/* Header */}
          <div data-card className="mb-8 md:mb-12 opacity-0">
            <h2
              className="font-bold mb-3"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(28px, 5vw, 42px)",
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
                color: "#1A1A1A",
              }}
            >
              What Sets Axtella Apart
            </h2>
            <p
              className="max-w-2xl"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: "1.6",
                color: "rgba(0, 0, 0, 0.55)",
              }}
            >
              Delivering integrated technology and infrastructure solutions with
              precision, reliability, and scale.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Top — End-to-End Delivery */}
            <div
              data-card
              className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col justify-between opacity-0 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <h3
                className="font-bold text-lg lg:text-xl mb-3"
                style={{ color: "#1A1A1A" }}
              >
                {cards[0].title}
              </h3>
              <p
                className="text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.55)" }}
              >
                {cards[0].description}
              </p>
            </div>

            {/* Center — Image (spans 2 rows) */}
            <div
              data-card
              className="relative rounded-2xl overflow-hidden opacity-0 min-h-[300px] lg:min-h-0 lg:row-span-2"
            >
              <Image
                src="/images/about/image3.png"
                alt="Axtella engineer"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Top — 9 Integrated Verticals */}
            <div
              data-card
              className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col justify-between opacity-0 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <h3
                className="font-bold text-lg lg:text-xl mb-3"
                style={{ color: "#1A1A1A" }}
              >
                {cards[2].title}
              </h3>
              <p
                className="text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.55)" }}
              >
                {cards[2].description}
              </p>
            </div>

            {/* Left Bottom — 250+ Skilled Professionals */}
            <div
              data-card
              className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col justify-between opacity-0 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <h3
                className="font-bold text-lg lg:text-xl mb-3"
                style={{ color: "#1A1A1A" }}
              >
                {cards[1].title}
              </h3>
              <p
                className="text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.55)" }}
              >
                {cards[1].description}
              </p>
            </div>

            {/* Right Bottom — Vision 2030 Aligned */}
            <div
              data-card
              className="bg-white rounded-2xl p-6 lg:p-8 flex flex-col justify-between opacity-0 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <h3
                className="font-bold text-lg lg:text-xl mb-3"
                style={{ color: "#1A1A1A" }}
              >
                {cards[3].title}
              </h3>
              <p
                className="text-sm lg:text-base leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.55)" }}
              >
                {cards[3].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
