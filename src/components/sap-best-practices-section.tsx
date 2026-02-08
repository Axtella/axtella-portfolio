"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PracticeCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const practices: PracticeCard[] = [
  {
    id: "objectives",
    title: "Clear Business Objectives",
    description:
      "Every integration begins with identifying key business questions and decision points. This ensures analytics efforts are aligned with real business needs rather than technical outputs.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1.png",
  },
  {
    id: "modeling",
    title: "Robust Data Modeling",
    description:
      "Well-structured data models improve performance, usability, and accuracy. We design models that are scalable, maintainable, and aligned with SAP best practices.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1 (1).png",
  },
  {
    id: "refresh",
    title: "Intelligent Data Refresh Strategy",
    description:
      "Not all data requires real-time updates. We define refresh frequencies based on business requirements to balance system performance and data freshness.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1 (2).png",
  },
  {
    id: "collaboration",
    title: "Collaboration Between IT Business Teams",
    description:
      "We act as a bridge between technical and business stakeholders, ensuring that dashboards meet operational needs while maintaining technical integrity.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1 (3).png",
  },
  {
    id: "security",
    title: "Strong Security and Compliance Framework",
    description:
      "Security is embedded at every layer—from data extraction to visualization—ensuring compliance with internal policies and industry regulations.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1 (4).png",
  },
  {
    id: "improvement",
    title: "Continuous Improvement and Support",
    description:
      "Analytics is an ongoing journey. We provide continuous monitoring, enhancements, and optimization to keep dashboards aligned with evolving business needs.",
    image: "/images/sap/Gemini_Generated_Image_5cbwc85cbwc85cbw 1 (5).png",
  },
];

export function SapBestPracticesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".practice-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(cards, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-white">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Title */}
        <h2
          className="font-extrabold uppercase text-center mb-12 md:mb-16"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(24px, 2.5vw, 48px)",
            lineHeight: "1.19",
            letterSpacing: "-0.02em",
            color: "#303030",
          }}
        >
          Best Practices Followed
          <br />
          by Axtella
        </h2>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {practices.map((practice) => (
            <div
              key={practice.id}
              className="practice-card group"
              style={{
                background: "#000000",
                border: "2px solid rgba(135, 135, 135, 0.37)",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.11)",
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              {/* Image Container */}
              <div className="relative w-full h-[200px] md:h-[230px] flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <Image
                    src={practice.image}
                    alt={practice.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-8 text-center">
                {/* Title */}
                <h3
                  className="uppercase mb-4"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 800,
                    fontSize: "clamp(18px, 1.9vw, 36px)",
                    lineHeight: "1.22",
                    color: "#FFFFFF",
                  }}
                >
                  {practice.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.05vw, 20px)",
                    lineHeight: "1.45",
                    color: "rgba(255, 255, 255, 0.91)",
                  }}
                >
                  {practice.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
