"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface AvatarStackProps {
  count?: number;
  text?: string;
  className?: string;
  delay?: number;
}

// Placeholder avatar URLs
const avatarUrls = [
  "https://i.pravatar.cc/80?img=1",
  "https://i.pravatar.cc/80?img=2",
  "https://i.pravatar.cc/80?img=3",
  "https://i.pravatar.cc/80?img=4",
];

export function AvatarStack({
  count = 4,
  text = "Trusted by over 14k+ founders",
  className,
  delay = 0,
}: AvatarStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the text
      gsap.fromTo(".trust-text", {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power3.out",
      });

      // Animate avatars with stagger
      gsap.fromTo(".avatar-item", {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        delay: delay + 0.2,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-4", className)}>
      {/* Trust Text - Updated Typography */}
      <p
        className="trust-text text-white"
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "clamp(14px, 3vw, 17px)",
          lineHeight: "30px",
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
        }}
      >
        {text}
      </p>

      {/* Avatar Stack */}
      <div
        className="flex items-center"
        style={{
          width: "clamp(120px, 30vw, 146px)",
          height: "clamp(38px, 10vw, 46px)",
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "avatar-item rounded-full border-2 border-[#080D1A] overflow-hidden",
              index !== 0 && "-ml-3"
            )}
            style={{
              width: "clamp(36px, 9vw, 46px)",
              height: "clamp(36px, 9vw, 46px)",
            }}
          >
            <Image
              src={avatarUrls[index % avatarUrls.length]}
              alt={`User ${index + 1}`}
              width={46}
              height={46}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
