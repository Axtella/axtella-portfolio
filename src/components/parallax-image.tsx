"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  speed?: number;
  className?: string;
  containerClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  width = 800,
  height = 600,
  speed = 0.3,
  className,
  containerClassName,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden relative", containerClassName)}
    >
      <div ref={imageRef} className="scale-[1.3]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("w-full h-full object-cover", className)}
        />
      </div>
    </div>
  );
}
