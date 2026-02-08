"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "blur"
  | "rotate"
  | "bounce";

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnScroll?: boolean;
  once?: boolean;
}

const fromConfig: Record<AnimationType, gsap.TweenVars> = {
  "fade-up": { y: 50, opacity: 0 },
  "fade-down": { y: -50, opacity: 0 },
  "fade-left": { x: 50, opacity: 0 },
  "fade-right": { x: -50, opacity: 0 },
  scale: { scale: 0.8, opacity: 0 },
  blur: { filter: "blur(10px)", opacity: 0 },
  rotate: { rotation: -10, opacity: 0 },
  bounce: { y: -30, opacity: 0 },
};

const toConfig: Record<AnimationType, gsap.TweenVars> = {
  "fade-up": { y: 0, opacity: 1 },
  "fade-down": { y: 0, opacity: 1 },
  "fade-left": { x: 0, opacity: 1 },
  "fade-right": { x: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  blur: { filter: "blur(0px)", opacity: 1 },
  rotate: { rotation: 0, opacity: 1 },
  bounce: { y: 0, opacity: 1, ease: "bounce.out" },
};

export function AnimatedContainer({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  className,
  triggerOnScroll = true,
  once = true,
}: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const from = fromConfig[animation];
    const to = toConfig[animation];
    const ctx = gsap.context(() => {
      if (triggerOnScroll) {
        gsap.fromTo(ref.current, from, {
          ...to,
          duration,
          delay,
          ease: to.ease || "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(ref.current, from, {
          ...to,
          duration,
          delay,
          ease: to.ease || "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, [animation, delay, duration, triggerOnScroll, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
