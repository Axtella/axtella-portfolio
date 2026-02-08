"use client";

import { useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  icon?: ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  floatIntensity?: number;
}

export function FloatingCard({
  icon,
  image,
  title,
  subtitle,
  className,
  style,
  delay = 0,
  floatIntensity = 10,
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(cardRef.current, {
        scale: 0.5,
        opacity: 0,
        y: 30,
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "back.out(1.7)",
      });

      // Continuous float animation
      gsap.to(cardRef.current, {
        y: -floatIntensity,
        duration: 2,
        delay: delay + 0.8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [delay, floatIntensity]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "flex flex-col items-center justify-end gap-4 sm:gap-6 p-4 sm:p-6",
        "shadow-lg shadow-black/20",
        className
      )}
      style={{
        width: "clamp(160px, 18vw, 280px)",
        height: "clamp(180px, 20vw, 300px)",
        borderRadius: "clamp(12px, 1.5vw, 24px)",
        border: "3px solid rgba(238, 238, 238, 0.26)",
        background: "rgba(255, 255, 255, 0.11)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* Image or Icon */}
      {image ? (
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="relative" style={{
            width: "clamp(100px, 10vw, 172px)",
            height: "clamp(80px, 8vw, 140px)",
          }}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ) : icon ? (
        <div className="w-full flex-1 flex items-center justify-center">
          <div
            className="rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ width: "clamp(80px, 10vw, 168px)", height: "clamp(80px, 10vw, 168px)" }}
          >
            {icon}
          </div>
        </div>
      ) : null}

      {/* Title */}
      <div className="text-center w-full">
        <h3
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(18px, 1.8vw, 29px)",
            lineHeight: "clamp(22px, 2.2vw, 34px)",
            letterSpacing: "-0.04em",
            fontWeight: 600,
          }}
        >
          {subtitle && (
            <>
              {subtitle}
              <br />
            </>
          )}
          {title}
        </h3>
      </div>
    </div>
  );
}
