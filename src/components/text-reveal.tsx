"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  variant?: "word" | "char" | "line";
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export function TextReveal({
  text,
  className,
  variant = "word",
  delay = 0,
  stagger = 0.05,
  triggerOnScroll = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".reveal-item");
      if (!elements) return;

      const fromVars: gsap.TweenVars = {
        y: 100,
        opacity: 0,
      };

      const toVars: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        delay,
        ease: "power4.out",
      };

      if (triggerOnScroll) {
        gsap.fromTo(elements, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(elements, fromVars, toVars);
      }
    });

    return () => ctx.revert();
  }, [text, variant, delay, stagger, triggerOnScroll]);

  const renderContent = () => {
    if (variant === "char") {
      return text.split("").map((char, i) => (
        <span key={i} className="reveal-item inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    if (variant === "word") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="reveal-item inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }

    // line variant
    return text.split("\n").map((line, i) => (
      <span key={i} className="reveal-item block">
        {line}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {renderContent()}
    </div>
  );
}
