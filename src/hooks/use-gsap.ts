"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for basic GSAP animations on mount
 */
export function useGsapAnimation<T extends HTMLElement>(
  animation: (element: T, gsapInstance: typeof gsap) => gsap.core.Tween | gsap.core.Timeline,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      animation(ref.current as T, gsap);
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Hook for scroll-triggered GSAP animations
 */
export function useScrollAnimation<T extends HTMLElement>(
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animation,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...triggerOptions,
        },
      });
    });

    return () => ctx.revert();
  }, [animation, triggerOptions]);

  return ref;
}

/**
 * Hook for staggered animations on child elements
 */
export function useStaggerAnimation(
  selector: string,
  animation: gsap.TweenVars,
  staggerOptions?: gsap.StaggerVars
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        ...animation,
        stagger: staggerOptions || 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [selector, animation, staggerOptions]);

  return containerRef;
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Hook for text reveal animations
 */
export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Direct GSAP instance for advanced usage
 */
export { gsap, ScrollTrigger };
