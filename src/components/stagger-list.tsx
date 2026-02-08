"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StaggerListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
  triggerOnScroll?: boolean;
}

export function StaggerList({
  children,
  className,
  itemClassName,
  stagger = 0.1,
  direction = "up",
  triggerOnScroll = true,
}: StaggerListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const directionConfig = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".stagger-item");
      if (!items) return;

      const config = directionConfig[direction];

      const fromVars: gsap.TweenVars = {
        ...config,
        opacity: 0,
      };

      const toVars: gsap.TweenVars = {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: "power3.out",
      };

      if (triggerOnScroll) {
        gsap.fromTo(items, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(items, fromVars, toVars);
      }
    });

    return () => ctx.revert();
  }, [direction, stagger, triggerOnScroll]);

  return (
    <div ref={containerRef} className={cn(className)}>
      {children.map((child, index) => (
        <div key={index} className={cn("stagger-item", itemClassName)}>
          {child}
        </div>
      ))}
    </div>
  );
}
