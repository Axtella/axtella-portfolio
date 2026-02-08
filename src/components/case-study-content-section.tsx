"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ListItem {
  header: string;
  items: string[];
}

interface CaseStudyContentSectionProps {
  title: string;
  description?: string;
  list?: ListItem;
}

export function CaseStudyContentSection({
  title,
  description,
  list,
}: CaseStudyContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.fromTo(contentRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-semibold mb-6"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(28px, 3.2vw, 46px)",
            lineHeight: "1.24",
            letterSpacing: "-0.02em",
            color: "#303030",
          }}
        >
          {title}
        </h2>

        <div ref={contentRef}>
          {/* Description */}
          {description && (
            <p
              className="mb-8"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "18px",
                lineHeight: "32px",
                color: "rgba(0, 0, 0, 0.7)",
                maxWidth: "1400px",
              }}
            >
              {description}
            </p>
          )}

          {/* List with Header */}
          {list && (
            <div className="mt-6">
              <h3
                className="font-bold mb-4"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: "#000000",
                }}
              >
                {list.header}
              </h3>
              <ul className="space-y-2">
                {list.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-bold"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "24px",
                      lineHeight: "32px",
                      color: "#000000",
                    }}
                  >
                    <span className="mt-3 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
