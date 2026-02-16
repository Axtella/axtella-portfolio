"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface ServiceHeroData {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CGCHeroSection({ data }: { data?: ServiceHeroData | null }) {
  const lines = data?.heroTitle?.split("|") || [];
  const heroLine1 = lines[0] || "Building Tomorrow\u2019s";
  const heroLine2 = lines[1] || "Infrastructure.";
  const heroSubtitle = data?.heroSubtitle || "Professional civil engineering and general construction — from site preparation and structural works to finishing and handover for projects across Saudi Arabia.";
  const ctaText = data?.ctaLabel || "Get a Free Consultation";
  const ctaHref = data?.ctaHref || "/contact";

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation - word by word
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "power4.out",
          }
        );
      }

      // Subtext animation
      gsap.fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: "power3.out" }
      );

      // CTA buttons
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.1, ease: "power3.out" }
      );

      // Hero visual - slide in from right
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      // Continuous float on entire right column
      gsap.to(imageRef.current, {
        y: -8,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Crane and scaffolding lines fade in
      const sceneLines =
        sectionRef.current?.querySelectorAll(".scene-line");
      if (sceneLines) {
        gsap.fromTo(
          sceneLines,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            delay: 0.6,
            ease: "power2.inOut",
          }
        );
      }

      // Scene elements fade in (opacity only — no transform props to avoid SVG conflict)
      const sceneElements = sectionRef.current?.querySelectorAll(".scene-element");
      if (sceneElements) {
        gsap.fromTo(
          sceneElements,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            delay: 0.8,
            ease: "power3.out",
          }
        );
      }

      // Workers fade-in animation (opacity only — no transform props to avoid SVG conflict)
      const workers = sectionRef.current?.querySelectorAll(".worker");
      if (workers) {
        gsap.fromTo(
          workers,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 1.2,
            ease: "power2.out",
          }
        );
      }

      // Crane hook swing animation (rotation-based pendulum)
      const craneHook = sectionRef.current?.querySelector(".crane-hook");
      if (craneHook) {
        gsap.to(craneHook, {
          rotation: 3,
          transformOrigin: "50% 0%",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Dashboard panel fade in from top
      const dashboard = sectionRef.current?.querySelector(".cgc-dashboard");
      if (dashboard) {
        gsap.fromTo(
          dashboard,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: "power3.out" }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Arrow1 Icon
  const Arrow1Icon = () => (
    <svg
      className="w-5 h-7"
      viewBox="0 0 135 197"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4802 40.691C27.1762 40.691 30.1724 37.6948 30.1724 33.9987C30.1724 30.3027 27.1762 27.3064 23.4802 27.3064C19.7841 27.3064 16.7879 30.3027 16.7879 33.9987C16.7879 37.6948 19.7841 40.691 23.4802 40.691Z"
        fill="currentColor"
      />
      <path
        d="M43.3545 62.323C47.0506 62.323 50.0469 59.3268 50.0469 55.6308C50.0469 51.9347 47.0506 48.9385 43.3545 48.9385C39.6585 48.9385 36.6623 51.9347 36.6623 55.6308C36.6623 59.3268 39.6585 62.323 43.3545 62.323Z"
        fill="currentColor"
      />
      <path
        d="M43.3545 40.691C47.0506 40.691 50.0469 37.6948 50.0469 33.9987C50.0469 30.3027 47.0506 27.3064 43.3545 27.3064C39.6585 27.3064 36.6623 30.3027 36.6623 33.9987C36.6623 37.6948 39.6585 40.691 43.3545 40.691Z"
        fill="currentColor"
      />
      <path
        d="M63.229 62.323C66.925 62.323 69.9213 59.3268 69.9213 55.6308C69.9213 51.9347 66.925 48.9385 63.229 48.9385C59.533 48.9385 56.5367 51.9347 56.5367 55.6308C56.5367 59.3268 59.533 62.323 63.229 62.323Z"
        fill="currentColor"
      />
      <path
        d="M63.229 83.522C66.925 83.522 69.9213 80.5258 69.9213 76.8297C69.9213 73.1337 66.925 70.1375 63.229 70.1375C59.533 70.1375 56.5367 73.1337 56.5367 76.8297C56.5367 80.5258 59.533 83.522 63.229 83.522Z"
        fill="currentColor"
      />
      <path
        d="M63.2294 126.354C66.9257 126.354 69.9222 123.357 69.9222 119.661C69.9222 115.965 66.9257 112.969 63.2294 112.969C59.5331 112.969 56.5367 115.965 56.5367 119.661C56.5367 123.357 59.5331 126.354 63.2294 126.354Z"
        fill="currentColor"
      />
      <path
        d="M43.3545 147.578C47.0506 147.578 50.0469 144.582 50.0469 140.886C50.0469 137.19 47.0506 134.194 43.3545 134.194C39.6585 134.194 36.6623 137.19 36.6623 140.886C36.6623 144.582 39.6585 147.578 43.3545 147.578Z"
        fill="currentColor"
      />
      <path
        d="M63.229 147.578C66.925 147.578 69.9213 144.582 69.9213 140.886C69.9213 137.19 66.925 134.194 63.229 134.194C59.533 134.194 56.5367 137.19 56.5367 140.886C56.5367 144.582 59.533 147.578 63.229 147.578Z"
        fill="currentColor"
      />
      <path
        d="M83.9405 83.522C87.6367 83.522 90.633 80.5258 90.633 76.8297C90.633 73.1337 87.6367 70.1375 83.9405 70.1375C80.2445 70.1375 77.2483 73.1337 77.2483 76.8297C77.2483 80.5258 80.2445 83.522 83.9405 83.522Z"
        fill="currentColor"
      />
      <path
        d="M83.9405 104.722C87.6367 104.722 90.633 101.725 90.633 98.0288C90.633 94.3328 87.6367 91.3369 83.9405 91.3369C80.2445 91.3369 77.2483 94.3328 77.2483 98.0288C77.2483 101.725 80.2445 104.722 83.9405 104.722Z"
        fill="currentColor"
      />
      <path
        d="M83.941 126.354C87.6374 126.354 90.6339 123.357 90.6339 119.661C90.6339 115.965 87.6374 112.969 83.941 112.969C80.2447 112.969 77.2483 115.965 77.2483 119.661C77.2483 123.357 80.2447 126.354 83.941 126.354Z"
        fill="currentColor"
      />
      <path
        d="M23.4806 169.67C27.1769 169.67 30.1734 166.674 30.1734 162.978C30.1734 159.281 27.1769 156.285 23.4806 156.285C19.7844 156.285 16.7879 159.281 16.7879 162.978C16.7879 166.674 19.7844 169.67 23.4806 169.67Z"
        fill="currentColor"
      />
      <path
        d="M43.355 169.67C47.0514 169.67 50.0478 166.674 50.0478 162.978C50.0478 159.281 47.0514 156.285 43.355 156.285C39.6587 156.285 36.6623 159.281 36.6623 162.978C36.6623 166.674 39.6587 169.67 43.355 169.67Z"
        fill="currentColor"
      />
      <path
        d="M103.839 104.722C107.535 104.722 110.531 101.725 110.531 98.0288C110.531 94.3328 107.535 91.3369 103.839 91.3369C100.143 91.3369 97.1468 94.3328 97.1468 98.0288C97.1468 101.725 100.143 104.722 103.839 104.722Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden lg:h-screen pb-6 sm:pb-8 lg:pb-0"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Navy gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0A2463 0%, #0D1B3E 100%)",
          }}
        />
        {/* Radial gold glow */}
        <div className="absolute top-1/3 right-1/4 w-[min(500px,70vw)] h-[min(400px,50vh)] bg-[#F5A623]/8 blur-[150px] rounded-full pointer-events-none" />
        {/* Blue accent glow */}
        <div className="absolute bottom-1/4 left-1/3 w-[min(300px,50vw)] h-[min(250px,35vh)] bg-[#1B7FE0]/6 blur-[120px] rounded-full pointer-events-none" />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `url('/images/home/dot paatern.png')`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 lg:h-full">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6 sm:gap-8 lg:gap-12 lg:h-full">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-[50%] pt-28 sm:pt-32 md:pt-36 lg:pt-0 relative z-20 lg:flex lg:items-center">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Headline */}
              <h1
                ref={headlineRef}
                className="font-extrabold uppercase"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(32px, 3.5vw, 72px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.01em",
                }}
              >
                <span className="word inline-block text-white">
                  {heroLine1}
                </span>
                <br />
                <span className="word inline-block text-[#F5A623]">
                  {heroLine2}
                </span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed opacity-0"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {heroSubtitle}
              </p>

              {/* CTA Buttons */}
              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-3 pt-2 opacity-0"
              >
                <Link
                  href={ctaHref}
                  className={cn(
                    "group flex items-center gap-3 bg-[#F5A623] text-[#080D1A]",
                    "px-7 py-3.5 rounded-full font-semibold text-sm",
                    "hover:bg-[#D4910A] hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)]",
                    "transition-all duration-300"
                  )}
                >
                  {ctaText}
                  <Arrow1Icon />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - SVG Construction Network Visualization */}
          <div
            ref={imageRef}
            className="relative w-full lg:w-[50%] h-[280px] sm:h-[340px] md:h-[420px] lg:h-[calc(100vh-80px)] lg:pt-16"
          >
            <svg
              viewBox="0 0 800 700"
              className="w-full h-full"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              fill="none"
            >
              <defs>
                <filter id="cgc-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="cgc-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="cgc-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
                </filter>
              </defs>

              {/* === Faint Grid Pattern === */}
              {[0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800].map(
                (x) => (
                  <line
                    key={`gv-${x}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="700"
                    stroke="rgba(255,255,255,0.025)"
                    strokeWidth="0.5"
                  />
                )
              )}
              {[0, 80, 160, 240, 320, 400, 480, 560, 640, 700].map((y) => (
                <line
                  key={`gh-${y}`}
                  x1="0"
                  y1={y}
                  x2="800"
                  y2={y}
                  stroke="rgba(255,255,255,0.025)"
                  strokeWidth="0.5"
                />
              ))}

              {/* === GROUND / SITE BASE === */}
              <path
                d="M 0 590 Q 100 580, 200 585 Q 350 592, 500 588 Q 650 583, 800 590 L 800 700 L 0 700 Z"
                fill="rgba(30,50,90,0.4)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
              {/* Gravel/dirt texture dots */}
              {[60, 150, 250, 340, 430, 520, 610, 700, 740].map((x, i) => (
                <circle key={`gravel-${i}`} cx={x} cy={595 + (i % 3) * 4} r="1.5" fill="rgba(245,166,35,0.15)" />
              ))}
              {/* Construction fence posts */}
              {[80, 160, 240, 560, 640, 720].map((x, i) => (
                <g key={`fence-${i}`}>
                  <rect x={x - 1.5} y="575" width="3" height="18" fill="rgba(245,166,35,0.3)" />
                  <circle cx={x} cy="575" r="2.5" fill="rgba(245,166,35,0.45)" />
                </g>
              ))}
              {/* Fence rails between posts */}
              <line className="scene-line" x1="80" y1="580" x2="240" y2="580" stroke="rgba(245,166,35,0.2)" strokeWidth="1.5" />
              <line className="scene-line" x1="80" y1="586" x2="240" y2="586" stroke="rgba(245,166,35,0.15)" strokeWidth="1" />
              <line className="scene-line" x1="560" y1="580" x2="720" y2="580" stroke="rgba(245,166,35,0.2)" strokeWidth="1.5" />
              <line className="scene-line" x1="560" y1="586" x2="720" y2="586" stroke="rgba(245,166,35,0.15)" strokeWidth="1" />

              {/* === BUILDING UNDER CONSTRUCTION (center-left) === */}
              <g className="scene-element" filter="url(#cgc-shadow)">
                {/* Building main structure — 4 floors */}
                <rect x="200" y="280" width="200" height="300" rx="3" fill="rgba(15,30,70,0.7)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                {/* Floor slabs */}
                <line x1="200" y1="355" x2="400" y2="355" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="200" y1="430" x2="400" y2="430" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="200" y1="505" x2="400" y2="505" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

                {/* Top floor — exposed rebar/columns (unfinished) */}
                <rect x="220" y="280" width="8" height="75" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <rect x="260" y="280" width="8" height="75" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <rect x="300" y="280" width="8" height="75" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <rect x="340" y="280" width="8" height="75" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <rect x="380" y="280" width="8" height="75" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                {/* Rebar sticking up from top */}
                <line x1="224" y1="265" x2="224" y2="280" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />
                <line x1="264" y1="268" x2="264" y2="280" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />
                <line x1="304" y1="266" x2="304" y2="280" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />
                <line x1="344" y1="269" x2="344" y2="280" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />
                <line x1="384" y1="267" x2="384" y2="280" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />

                {/* 2nd floor — window openings */}
                <rect x="215" y="365" width="30" height="25" rx="2" fill="rgba(27,127,224,0.15)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <rect x="260" y="365" width="30" height="25" rx="2" fill="rgba(27,127,224,0.15)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <rect x="305" y="365" width="30" height="25" rx="2" fill="rgba(27,127,224,0.15)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <rect x="355" y="365" width="30" height="25" rx="2" fill="rgba(27,127,224,0.15)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />

                {/* 3rd floor — completed windows */}
                <rect x="215" y="440" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />
                <rect x="260" y="440" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />
                <rect x="305" y="440" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />
                <rect x="355" y="440" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />

                {/* Ground floor — completed windows + door */}
                <rect x="215" y="515" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />
                <rect x="355" y="515" width="30" height="25" rx="2" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.35)" strokeWidth="0.8" />
                {/* Main door */}
                <rect x="280" y="520" width="40" height="60" rx="2" fill="rgba(27,127,224,0.12)" stroke="rgba(27,127,224,0.35)" strokeWidth="1" />
                <circle cx="312" cy="552" r="2" fill="rgba(245,166,35,0.6)" />

                {/* Scaffolding on right side */}
                <rect className="scene-line" x="402" y="290" width="3" height="290" fill="rgba(245,166,35,0.35)" />
                <rect className="scene-line" x="412" y="290" width="3" height="290" fill="rgba(245,166,35,0.25)" />
                <rect className="scene-line" x="402" y="330" width="14" height="2" fill="rgba(245,166,35,0.3)" />
                <rect className="scene-line" x="402" y="370" width="14" height="2" fill="rgba(245,166,35,0.3)" />
                <rect className="scene-line" x="402" y="410" width="14" height="2" fill="rgba(245,166,35,0.3)" />
                <rect className="scene-line" x="402" y="450" width="14" height="2" fill="rgba(245,166,35,0.3)" />
                <rect className="scene-line" x="402" y="490" width="14" height="2" fill="rgba(245,166,35,0.3)" />
                <rect className="scene-line" x="402" y="530" width="14" height="2" fill="rgba(245,166,35,0.3)" />
              </g>

              {/* === LARGE TOWER CRANE (center-right, dominant) === */}
              <g className="scene-element">
                {/* Crane mast (vertical) */}
                <rect className="scene-line" x="530" y="170" width="10" height="420" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.5)" strokeWidth="1.5" />
                {/* Mast cross-bracing */}
                <line className="scene-line" x1="530" y1="200" x2="540" y2="250" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="540" y1="200" x2="530" y2="250" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="530" y1="260" x2="540" y2="310" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="540" y1="260" x2="530" y2="310" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="530" y1="320" x2="540" y2="370" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="540" y1="320" x2="530" y2="370" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="530" y1="380" x2="540" y2="430" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="540" y1="380" x2="530" y2="430" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="530" y1="440" x2="540" y2="490" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <line className="scene-line" x1="540" y1="440" x2="530" y2="490" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />

                {/* Crane base (wider) */}
                <rect x="520" y="580" width="30" height="10" rx="2" fill="rgba(27,127,224,0.35)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <line x1="520" y1="580" x2="530" y2="490" stroke="rgba(27,127,224,0.3)" strokeWidth="1" />
                <line x1="550" y1="580" x2="540" y2="490" stroke="rgba(27,127,224,0.3)" strokeWidth="1" />

                {/* Crane cab at top */}
                <rect x="526" y="165" width="18" height="14" rx="2" fill="rgba(27,127,224,0.35)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <rect x="530" y="168" width="8" height="6" rx="1" fill="rgba(27,127,224,0.15)" stroke="rgba(27,127,224,0.3)" strokeWidth="0.5" />

                {/* Horizontal jib (boom) — extending left toward building */}
                <rect className="scene-line" x="300" y="165" width="240" height="5" rx="1" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />

                {/* Counter-jib (extending right) */}
                <rect className="scene-line" x="545" y="165" width="100" height="5" rx="1" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.4)" strokeWidth="1" />
                {/* Counterweight block */}
                <rect x="620" y="155" width="25" height="20" rx="2" fill="rgba(27,127,224,0.4)" stroke="rgba(27,127,224,0.6)" strokeWidth="1" />

                {/* Diagonal cable — mast top to jib end */}
                <line className="scene-line" x1="535" y1="165" x2="305" y2="165" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" strokeDasharray="4 3" />
                <line className="scene-line" x1="535" y1="155" x2="305" y2="165" stroke="rgba(245,166,35,0.35)" strokeWidth="0.8" />
                {/* Diagonal cable — mast top to counter-jib */}
                <line className="scene-line" x1="535" y1="155" x2="640" y2="165" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8" />

                {/* Mast top peak */}
                <polygon points="530,155 540,155 535,145" fill="rgba(27,127,224,0.4)" stroke="rgba(27,127,224,0.6)" strokeWidth="0.8" />

                {/* Hook assembly — dangling from jib (animated) */}
                <g transform="translate(370, 170)">
                  <g className="crane-hook">
                    {/* Cable */}
                    <line x1="0" y1="0" x2="0" y2="70" stroke="rgba(245,166,35,0.5)" strokeWidth="1.5" />
                    {/* Hook */}
                    <path d="M -5 68 C -5 78, 5 78, 5 68" stroke="rgba(245,166,35,0.7)" strokeWidth="2" fill="none" />
                    {/* Steel beam load */}
                    <rect x="-25" y="72" width="50" height="8" rx="1" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="1">
                      <animate attributeName="opacity" values="0.8;0.5;0.8" dur="3s" repeatCount="indefinite" />
                    </rect>
                    {/* Pulley at top */}
                    <circle cx="0" cy="0" r="4" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="1" />
                  </g>
                </g>
              </g>

              {/* === CONCRETE MIXER TRUCK (left side) === */}
              <g className="scene-element" transform="translate(90, 555)">
                {/* Truck body */}
                <rect x="-30" y="0" width="50" height="20" rx="3" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                {/* Cab */}
                <rect x="-30" y="-10" width="18" height="12" rx="2" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <rect x="-26" y="-8" width="8" height="6" rx="1" fill="rgba(27,127,224,0.12)" />
                {/* Mixing drum */}
                <ellipse cx="8" cy="-10" rx="22" ry="14" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.5)" strokeWidth="1.5" transform="rotate(-12, 8, -10)" />
                {/* Drum stripes */}
                <line x1="-4" y1="-16" x2="0" y2="-4" stroke="rgba(27,127,224,0.25)" strokeWidth="0.8" />
                <line x1="8" y1="-22" x2="10" y2="-1" stroke="rgba(27,127,224,0.25)" strokeWidth="0.8" />
                <line x1="20" y1="-18" x2="18" y2="-4" stroke="rgba(27,127,224,0.25)" strokeWidth="0.8" />
                {/* Wheels */}
                <circle cx="-20" cy="22" r="5" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <circle cx="10" cy="22" r="5" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
              </g>

              {/* === MATERIAL PILE (right side) === */}
              <g className="scene-element" transform="translate(680, 560)">
                <path d="M -30 20 Q -15 -10, 0 -15 Q 15 -10, 30 20 Z" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8" />
                <path d="M -20 20 Q -8 0, 5 -5 Q 18 0, 25 20 Z" fill="rgba(245,166,35,0.1)" />
                {/* Small gravel dots */}
                <circle cx="-10" cy="10" r="1.5" fill="rgba(245,166,35,0.2)" />
                <circle cx="5" cy="5" r="1" fill="rgba(245,166,35,0.25)" />
                <circle cx="15" cy="12" r="1.5" fill="rgba(245,166,35,0.2)" />
              </g>

              {/* === SAFETY CONES === */}
              <polygon points="450,580 456,580 453,568" fill="rgba(245,166,35,0.5)" stroke="rgba(245,166,35,0.7)" strokeWidth="0.8" />
              <rect x="448" y="580" width="10" height="3" rx="1" fill="rgba(245,166,35,0.3)" />
              <polygon points="480,582 486,582 483,570" fill="rgba(245,166,35,0.5)" stroke="rgba(245,166,35,0.7)" strokeWidth="0.8" />
              <rect x="478" y="582" width="10" height="3" rx="1" fill="rgba(245,166,35,0.3)" />

              {/* === WALKING ENGINEERS / WORKERS === */}
              {/* Worker 1 — walking with clipboard (near building) */}
              <g className="worker" transform="translate(280, 540)">
                {/* Hard hat */}
                <path d="M -7 -3 C -7 -11, 7 -11, 7 -3 Z" fill="rgba(245,166,35,0.85)" />
                <rect x="-8" y="-3" width="16" height="3" rx="1" fill="rgba(245,166,35,0.7)" />
                {/* Head */}
                <circle cx="0" cy="-12" r="7" fill="rgba(27,127,224,0.6)" stroke="rgba(27,127,224,0.85)" strokeWidth="1.5" />
                {/* Body */}
                <line x1="0" y1="-5" x2="0" y2="18" stroke="rgba(27,127,224,0.85)" strokeWidth="3" strokeLinecap="round" />
                {/* Safety vest */}
                <rect x="-4" y="-2" width="8" height="10" rx="1" fill="rgba(245,166,35,0.4)" stroke="rgba(245,166,35,0.65)" strokeWidth="0.8" />
                {/* Left arm — holding clipboard (subtle swing) */}
                <line x1="0" y1="0" x2="-10" y2="12" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-10;-8;-10;-12;-10" dur="1.2s" repeatCount="indefinite" />
                </line>
                {/* Clipboard */}
                <rect x="-15" y="8" width="9" height="11" rx="1" fill="rgba(245,166,35,0.45)" stroke="rgba(245,166,35,0.7)" strokeWidth="0.8">
                  <animate attributeName="x" values="-15;-13;-15;-17;-15" dur="1.2s" repeatCount="indefinite" />
                </rect>
                {/* Right arm — swinging */}
                <line x1="0" y1="0" x2="9" y2="10" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="9;5;9;12;9" dur="1.2s" repeatCount="indefinite" />
                </line>
                {/* Left leg — walking */}
                <line x1="0" y1="18" x2="-7" y2="35" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-7;3;-7" dur="1.2s" repeatCount="indefinite" />
                </line>
                {/* Right leg — walking (opposite phase) */}
                <line x1="0" y1="18" x2="6" y2="35" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="6;-4;6" dur="1.2s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Worker 2 — standing, pointing up at building (gesturing) */}
              <g className="worker" transform="translate(360, 540)">
                {/* Hard hat */}
                <path d="M -7 -3 C -7 -11, 7 -11, 7 -3 Z" fill="rgba(245,166,35,0.85)" />
                <rect x="-8" y="-3" width="16" height="3" rx="1" fill="rgba(245,166,35,0.7)" />
                {/* Head */}
                <circle cx="0" cy="-12" r="7" fill="rgba(27,127,224,0.6)" stroke="rgba(27,127,224,0.85)" strokeWidth="1.5" />
                {/* Body */}
                <line x1="0" y1="-5" x2="0" y2="18" stroke="rgba(27,127,224,0.85)" strokeWidth="3" strokeLinecap="round" />
                {/* Safety vest */}
                <rect x="-4" y="-2" width="8" height="10" rx="1" fill="rgba(245,166,35,0.4)" stroke="rgba(245,166,35,0.65)" strokeWidth="0.8" />
                {/* Right arm — pointing up (animated gesture) */}
                <line x1="0" y1="0" x2="12" y2="-14" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="12;14;12;10;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="-14;-16;-14;-12;-14" dur="2s" repeatCount="indefinite" />
                </line>
                {/* Left arm — gesturing at side */}
                <line x1="0" y1="0" x2="-8" y2="12" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-8;-6;-8;-10;-8" dur="2s" repeatCount="indefinite" />
                </line>
                {/* Legs — standing with slight weight shift */}
                <line x1="0" y1="18" x2="-5" y2="35" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-5;-4;-5;-6;-5" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="0" y1="18" x2="5" y2="35" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="5;6;5;4;5" dur="3s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Worker 3 — walking near crane */}
              <g className="worker" transform="translate(500, 543)">
                {/* Hard hat */}
                <path d="M -7 -3 C -7 -11, 7 -11, 7 -3 Z" fill="rgba(245,166,35,0.85)" />
                <rect x="-8" y="-3" width="16" height="3" rx="1" fill="rgba(245,166,35,0.7)" />
                {/* Head */}
                <circle cx="0" cy="-12" r="7" fill="rgba(27,127,224,0.6)" stroke="rgba(27,127,224,0.85)" strokeWidth="1.5" />
                {/* Body */}
                <line x1="0" y1="-5" x2="0" y2="18" stroke="rgba(27,127,224,0.85)" strokeWidth="3" strokeLinecap="round" />
                {/* Safety vest */}
                <rect x="-4" y="-2" width="8" height="10" rx="1" fill="rgba(245,166,35,0.4)" stroke="rgba(245,166,35,0.65)" strokeWidth="0.8" />
                {/* Left arm — swinging */}
                <line x1="0" y1="0" x2="-9" y2="8" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-9;-3;-9;-14;-9" dur="1s" repeatCount="indefinite" />
                </line>
                {/* Right arm — swinging (opposite) */}
                <line x1="0" y1="0" x2="9" y2="10" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="9;14;9;3;9" dur="1s" repeatCount="indefinite" />
                </line>
                {/* Left leg — walking */}
                <line x1="0" y1="18" x2="-8" y2="33" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-8;4;-8" dur="1s" repeatCount="indefinite" />
                </line>
                {/* Right leg — walking (opposite phase) */}
                <line x1="0" y1="18" x2="7" y2="33" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="7;-5;7" dur="1s" repeatCount="indefinite" />
                </line>
              </g>

              {/* Worker 4 — carrying beam/materials */}
              <g className="worker" transform="translate(610, 543)">
                {/* Hard hat */}
                <path d="M -7 -3 C -7 -11, 7 -11, 7 -3 Z" fill="rgba(245,166,35,0.85)" />
                <rect x="-8" y="-3" width="16" height="3" rx="1" fill="rgba(245,166,35,0.7)" />
                {/* Head */}
                <circle cx="0" cy="-12" r="7" fill="rgba(27,127,224,0.6)" stroke="rgba(27,127,224,0.85)" strokeWidth="1.5" />
                {/* Body */}
                <line x1="0" y1="-5" x2="0" y2="18" stroke="rgba(27,127,224,0.85)" strokeWidth="3" strokeLinecap="round" />
                {/* Safety vest */}
                <rect x="-4" y="-2" width="8" height="10" rx="1" fill="rgba(245,166,35,0.4)" stroke="rgba(245,166,35,0.65)" strokeWidth="0.8" />
                {/* Arms — holding beam steady */}
                <line x1="0" y1="0" x2="-6" y2="-5" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="0" y1="0" x2="6" y2="-5" stroke="rgba(27,127,224,0.75)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Beam on shoulder (slight bob) */}
                <rect x="-22" y="-9" width="44" height="5" rx="1" fill="rgba(245,166,35,0.45)" stroke="rgba(245,166,35,0.7)" strokeWidth="1">
                  <animate attributeName="y" values="-9;-10;-9;-8;-9" dur="1.4s" repeatCount="indefinite" />
                </rect>
                {/* Left leg — walking */}
                <line x1="0" y1="18" x2="-6" y2="33" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="-6;3;-6" dur="1.4s" repeatCount="indefinite" />
                </line>
                {/* Right leg — walking (opposite phase) */}
                <line x1="0" y1="18" x2="7" y2="33" stroke="rgba(27,127,224,0.7)" strokeWidth="2.5" strokeLinecap="round">
                  <animate attributeName="x2" values="7;-4;7" dur="1.4s" repeatCount="indefinite" />
                </line>
              </g>

              {/* === Dashboard Panel (PROJECT STATUS) === */}
              <g className="cgc-dashboard" transform="translate(600, 130)">
                <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(10,20,50,0.88)" stroke="rgba(27,127,224,0.4)" strokeWidth="1" />
                <text x="14" y="22" fill="rgba(255,255,255,0.9)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PROJECT STATUS</text>
                <line x1="14" y1="30" x2="166" y2="30" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* Stat card 1 - On-Time */}
                <rect x="14" y="38" width="72" height="28" rx="4" fill="rgba(27,127,224,0.2)" />
                <text x="50" y="50" textAnchor="middle" fill="#1B7FE0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">96%</text>
                <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">ON-TIME</text>
                {/* Stat card 2 - Incidents */}
                <rect x="94" y="38" width="72" height="28" rx="4" fill="rgba(245,166,35,0.2)" />
                <text x="130" y="50" textAnchor="middle" fill="#F5A623" fontSize="12" fontWeight="bold" fontFamily="sans-serif">0</text>
                <text x="130" y="60" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">INCIDENTS</text>
                {/* Progress mini chart */}
                <text x="14" y="82" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">Progress</text>
                <circle cx="60" cy="88" r="2" fill="#1B7FE0" opacity="0.8" />
                <circle cx="80" cy="82" r="2" fill="#F5A623" opacity="0.8" />
                <circle cx="100" cy="86" r="2" fill="#1B7FE0" opacity="0.8" />
                <line x1="60" y1="88" x2="80" y2="82" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                <line x1="80" y1="82" x2="100" y2="86" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                <circle cx="120" cy="84" r="2" fill="#F5A623" opacity="0.8" />
                <line x1="100" y1="86" x2="120" y2="84" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                <circle cx="140" cy="88" r="2" fill="#1B7FE0" opacity="0.8" />
                <line x1="120" y1="84" x2="140" y2="88" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                {/* Status bar */}
                <rect x="14" y="98" width="152" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="14" y="98" width="150" height="4" rx="2" fill="rgba(27,127,224,0.6)" />
              </g>

              {/* === Floating Notification Badges === */}
              {/* Site Active — near building */}
              <g transform="translate(300, 260)">
                <rect x="-40" y="-10" width="80" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
                <circle cx="-26" cy="0" r="3" fill="#22c55e" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Site Active</text>
              </g>

              {/* On Schedule — near crane top */}
              <g transform="translate(535, 140)">
                <rect x="-46" y="-10" width="92" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                <circle cx="-32" cy="0" r="3" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <text x="2" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">On Schedule</text>
              </g>

              {/* Safety Clear — near workers */}
              <g transform="translate(440, 525)">
                <rect x="-44" y="-10" width="88" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                <circle cx="-29" cy="0" r="3" fill="#1B7FE0" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Safety Clear</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-t from-[#080D1A] to-transparent" />
    </section>
  );
}
