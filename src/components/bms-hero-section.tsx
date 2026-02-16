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

export function BMSHeroSection({ data }: { data?: ServiceHeroData | null }) {
  const lines = data?.heroTitle?.split("|") || [];
  const heroLine1 = lines[0] || "Intelligent Building";
  const heroLine2 = lines[1] || "Management.";
  const heroSubtitle = data?.heroSubtitle || "End-to-end BMS and smart building automation — from HVAC control and energy management to integrated safety systems for projects across Saudi Arabia.";
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

      // HVAC duct lines draw in
      const ductLines = sectionRef.current?.querySelectorAll(".duct-line");
      if (ductLines) {
        gsap.fromTo(
          ductLines,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            delay: 0.6,
            ease: "power2.inOut",
          }
        );
      }

      // Sensor icons fade in (opacity only for g elements with transforms)
      const sensorIcons = sectionRef.current?.querySelectorAll(".sensor-icon");
      if (sensorIcons) {
        gsap.fromTo(
          sensorIcons,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 1.0,
            ease: "power2.out",
          }
        );
      }

      // Dashboard panel fade in
      const dashboard = sectionRef.current?.querySelector(".bms-dashboard");
      if (dashboard) {
        gsap.fromTo(
          dashboard,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 0.8, ease: "power3.out" }
        );
      }

      // Notification badges fade in
      const badges = sectionRef.current?.querySelectorAll(".bms-badge");
      if (badges) {
        gsap.fromTo(
          badges,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 1.3,
            ease: "power2.out",
          }
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

          {/* Right Column - SVG Smart Building Visualization */}
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
                <filter id="bms-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="bms-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="bms-shadow" x="-20%" y="-20%" width="140%" height="140%">
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

              {/* ============================================ */}
              {/* === MULTI-FLOOR BUILDING CROSS-SECTION === */}
              {/* ============================================ */}

              {/* Building outer frame */}
              <g filter="url(#bms-shadow)">
                <rect
                  x="120"
                  y="100"
                  width="300"
                  height="500"
                  rx="6"
                  fill="rgba(10,20,50,0.7)"
                  stroke="rgba(27,127,224,0.4)"
                  strokeWidth="1.5"
                />
                {/* Roof structure */}
                <rect
                  x="115"
                  y="90"
                  width="310"
                  height="18"
                  rx="4"
                  fill="rgba(15,35,70,0.9)"
                  stroke="rgba(27,127,224,0.35)"
                  strokeWidth="1"
                />
                {/* Roof antenna / BMS tower */}
                <rect x="258" y="60" width="24" height="30" rx="2" fill="rgba(15,35,70,0.8)" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                <circle cx="270" cy="56" r="5" fill="rgba(27,127,224,0.4)" stroke="rgba(27,127,224,0.6)" strokeWidth="1">
                  <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Signal waves from antenna */}
                <circle cx="270" cy="56" r="12" fill="none" stroke="rgba(27,127,224,0.2)" strokeWidth="0.5">
                  <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="270" cy="56" r="18" fill="none" stroke="rgba(27,127,224,0.15)" strokeWidth="0.5">
                  <animate attributeName="r" values="18;28;18" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </circle>

                {/* Building label */}
                <text x="270" y="85" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SMART BUILDING</text>

                {/* === Floor 5 (Top) y=108 to y=188 === */}
                <rect x="128" y="112" width="284" height="76" rx="3" fill="rgba(15,30,65,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x="140" y="126" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">F5 — MECHANICAL</text>

                {/* HVAC Duct lines Floor 5 */}
                <line className="duct-line" x1="135" y1="140" x2="405" y2="140" stroke="rgba(27,127,224,0.45)" strokeWidth="2" strokeDasharray="12 4" style={{ animation: "dash-flow 4s linear infinite" }} />
                <line className="duct-line" x1="200" y1="140" x2="200" y2="165" stroke="rgba(27,127,224,0.35)" strokeWidth="1.5" />
                <line className="duct-line" x1="300" y1="140" x2="300" y2="165" stroke="rgba(27,127,224,0.35)" strokeWidth="1.5" />
                {/* HVAC unit */}
                <rect x="350" y="130" width="45" height="22" rx="3" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.4)" strokeWidth="0.8" />
                <text x="372" y="144" textAnchor="middle" fill="rgba(27,127,224,0.7)" fontSize="6" fontFamily="sans-serif">AHU-1</text>
                {/* Fan symbol */}
                <circle cx="360" cy="141" r="4" fill="none" stroke="rgba(27,127,224,0.5)" strokeWidth="0.6">
                  <animateTransform attributeName="transform" type="rotate" from="0 360 141" to="360 360 141" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Temperature sensor Floor 5 */}
                <g className="sensor-icon" transform="translate(200, 170)">
                  {/* Thermometer body */}
                  <rect x="-2" y="-8" width="4" height="12" rx="2" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8" />
                  <circle cx="0" cy="6" r="4" fill="rgba(245,166,35,0.35)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="10" y="2" fill="rgba(255,255,255,0.55)" fontSize="6" fontFamily="sans-serif">23°C</text>
                </g>

                {/* Light zone indicator Floor 5 */}
                <g className="sensor-icon" transform="translate(260, 165)">
                  {/* Light bulb glow */}
                  <circle cx="0" cy="0" r="5" fill="rgba(245,166,35,0.25)" filter="url(#bms-glow-sm)">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="rgba(245,166,35,0.6)" />
                  <text x="10" y="3" fill="rgba(255,255,255,0.45)" fontSize="5" fontFamily="sans-serif">Zone A</text>
                </g>

                {/* === Floor 4 y=190 to y=268 === */}
                <rect x="128" y="192" width="284" height="76" rx="3" fill="rgba(15,30,65,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x="140" y="206" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">F4 — OFFICE</text>

                {/* HVAC Duct lines Floor 4 */}
                <line className="duct-line" x1="135" y1="220" x2="405" y2="220" stroke="rgba(27,127,224,0.4)" strokeWidth="2" strokeDasharray="12 4" style={{ animation: "dash-flow 4.5s linear infinite" }} />
                <line className="duct-line" x1="180" y1="220" x2="180" y2="245" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />
                <line className="duct-line" x1="320" y1="220" x2="320" y2="245" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />

                {/* Temperature sensor Floor 4 */}
                <g className="sensor-icon" transform="translate(180, 250)">
                  <rect x="-2" y="-8" width="4" height="12" rx="2" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8" />
                  <circle cx="0" cy="6" r="4" fill="rgba(245,166,35,0.35)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <text x="10" y="2" fill="rgba(255,255,255,0.55)" fontSize="6" fontFamily="sans-serif">22°C</text>
                </g>

                {/* Light zone indicator Floor 4 */}
                <g className="sensor-icon" transform="translate(250, 245)">
                  <circle cx="0" cy="0" r="5" fill="rgba(245,166,35,0.25)" filter="url(#bms-glow-sm)">
                    <animate attributeName="opacity" values="0.7;0.25;0.7" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="rgba(245,166,35,0.6)" />
                  <text x="10" y="3" fill="rgba(255,255,255,0.45)" fontSize="5" fontFamily="sans-serif">Zone B</text>
                </g>

                {/* Occupancy sensor Floor 4 */}
                <g className="sensor-icon" transform="translate(360, 245)">
                  <circle cx="0" cy="0" r="4" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Motion wave */}
                  <path d="M -6 -6 Q 0 -10 6 -6" fill="none" stroke="rgba(27,127,224,0.4)" strokeWidth="0.6" />
                  <text x="8" y="3" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">PIR</text>
                </g>

                {/* === Floor 3 y=270 to y=348 === */}
                <rect x="128" y="272" width="284" height="76" rx="3" fill="rgba(15,30,65,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x="140" y="286" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">F3 — OFFICE</text>

                {/* HVAC Duct lines Floor 3 */}
                <line className="duct-line" x1="135" y1="300" x2="405" y2="300" stroke="rgba(27,127,224,0.4)" strokeWidth="2" strokeDasharray="12 4" style={{ animation: "dash-flow 5s linear infinite" }} />
                <line className="duct-line" x1="220" y1="300" x2="220" y2="325" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />
                <line className="duct-line" x1="350" y1="300" x2="350" y2="325" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />

                {/* Temperature sensor Floor 3 */}
                <g className="sensor-icon" transform="translate(220, 330)">
                  <rect x="-2" y="-8" width="4" height="12" rx="2" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8" />
                  <circle cx="0" cy="6" r="4" fill="rgba(245,166,35,0.35)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <text x="10" y="2" fill="rgba(255,255,255,0.55)" fontSize="6" fontFamily="sans-serif">22°C</text>
                </g>

                {/* Light zone indicator Floor 3 */}
                <g className="sensor-icon" transform="translate(290, 325)">
                  <circle cx="0" cy="0" r="5" fill="rgba(245,166,35,0.25)" filter="url(#bms-glow-sm)">
                    <animate attributeName="opacity" values="0.75;0.3;0.75" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="rgba(245,166,35,0.6)" />
                  <text x="10" y="3" fill="rgba(255,255,255,0.45)" fontSize="5" fontFamily="sans-serif">Zone C</text>
                </g>

                {/* === Floor 2 y=350 to y=428 === */}
                <rect x="128" y="352" width="284" height="76" rx="3" fill="rgba(15,30,65,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x="140" y="366" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">F2 — LOBBY</text>

                {/* HVAC Duct lines Floor 2 */}
                <line className="duct-line" x1="135" y1="380" x2="405" y2="380" stroke="rgba(27,127,224,0.4)" strokeWidth="2" strokeDasharray="12 4" style={{ animation: "dash-flow 4.2s linear infinite" }} />
                <line className="duct-line" x1="270" y1="380" x2="270" y2="405" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />

                {/* Temperature sensor Floor 2 */}
                <g className="sensor-icon" transform="translate(270, 410)">
                  <rect x="-2" y="-8" width="4" height="12" rx="2" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8" />
                  <circle cx="0" cy="6" r="4" fill="rgba(245,166,35,0.35)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                  <text x="10" y="2" fill="rgba(255,255,255,0.55)" fontSize="6" fontFamily="sans-serif">24°C</text>
                </g>

                {/* Fire safety sensor Floor 2 */}
                <g className="sensor-icon" transform="translate(370, 400)">
                  <circle cx="0" cy="0" r="5" fill="rgba(212,35,47,0.25)" stroke="rgba(212,35,47,0.5)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  {/* Flame icon simplified */}
                  <path d="M 0 -3 Q 2 -1 1 2 Q 0 3 -1 2 Q -2 -1 0 -3" fill="rgba(212,35,47,0.6)" />
                  <text x="10" y="3" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">FIRE</text>
                </g>

                {/* Light zone indicator Floor 2 */}
                <g className="sensor-icon" transform="translate(180, 400)">
                  <circle cx="0" cy="0" r="5" fill="rgba(245,166,35,0.25)" filter="url(#bms-glow-sm)">
                    <animate attributeName="opacity" values="0.65;0.2;0.65" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="rgba(245,166,35,0.6)" />
                  <text x="10" y="3" fill="rgba(255,255,255,0.45)" fontSize="5" fontFamily="sans-serif">Zone D</text>
                </g>

                {/* === Floor 1 (Ground) y=430 to y=596 === */}
                <rect x="128" y="432" width="284" height="76" rx="3" fill="rgba(15,30,65,0.5)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x="140" y="446" fill="rgba(255,255,255,0.35)" fontSize="6" fontFamily="sans-serif">F1 — GROUND / ELECTRICAL</text>

                {/* HVAC Duct lines Floor 1 */}
                <line className="duct-line" x1="135" y1="460" x2="405" y2="460" stroke="rgba(27,127,224,0.4)" strokeWidth="2" strokeDasharray="12 4" style={{ animation: "dash-flow 3.8s linear infinite" }} />

                {/* Main electrical panel */}
                <rect x="145" y="470" width="40" height="28" rx="3" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <text x="165" y="487" textAnchor="middle" fill="rgba(245,166,35,0.6)" fontSize="5" fontFamily="sans-serif">MDB</text>
                {/* Power indicator */}
                <circle cx="155" cy="478" r="2" fill="#F5A623" opacity="0.8">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* BMS Controller */}
                <rect x="230" y="468" width="80" height="32" rx="4" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <text x="270" y="482" textAnchor="middle" fill="rgba(27,127,224,0.8)" fontSize="6" fontWeight="bold" fontFamily="sans-serif">BMS CTRL</text>
                <text x="270" y="492" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">DDC Panel</text>
                {/* Status LEDs on controller */}
                <circle cx="240" cy="488" r="2" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="248" cy="488" r="2" fill="#F5A623" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="256" cy="488" r="2" fill="#22c55e" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.35;0.85" dur="1.4s" repeatCount="indefinite" />
                </circle>

                {/* Building base */}
                <rect x="118" y="510" width="304" height="6" rx="2" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.3)" strokeWidth="0.5" />
              </g>

              {/* === Data Flow Lines — Building to Dashboard === */}
              <path
                className="duct-line"
                d="M 420 250 C 470 250, 500 220, 540 200"
                stroke="rgba(27,127,224,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 3s linear infinite" }}
              />
              <path
                className="duct-line"
                d="M 420 350 C 480 340, 520 290, 560 250"
                stroke="rgba(27,127,224,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 3.5s linear infinite" }}
              />
              <path
                className="duct-line"
                d="M 420 450 C 490 440, 540 400, 580 370"
                stroke="rgba(245,166,35,0.45)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 4s linear infinite" }}
              />

              {/* === Data Flow Particles === */}
              <circle cx="470" cy="245" r="3" fill="#1B7FE0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.25;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="510" cy="215" r="2.5" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="500" cy="310" r="3" fill="#1B7FE0" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="540" cy="275" r="2.5" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="520" cy="420" r="3" fill="#F5A623" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="560" cy="390" r="2.5" fill="#F5A623" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.7s" repeatCount="indefinite" />
              </circle>

              {/* === Connection node dots at building endpoints === */}
              <circle cx="420" cy="250" r="5" fill="#1B7FE0" opacity="0.8" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.8;0.35;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="420" cy="350" r="5" fill="#1B7FE0" opacity="0.7" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="420" cy="450" r="5" fill="#F5A623" opacity="0.7" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>

              {/* ============================================ */}
              {/* === BMS DASHBOARD PANEL === */}
              {/* ============================================ */}
              <g className="bms-dashboard" transform="translate(540, 120)">
                <rect x="0" y="0" width="240" height="260" rx="8" fill="rgba(10,20,50,0.92)" stroke="rgba(27,127,224,0.4)" strokeWidth="1" />
                <text x="16" y="24" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="bold" fontFamily="sans-serif">BMS DASHBOARD</text>
                <line x1="16" y1="32" x2="224" y2="32" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

                {/* Temperature Gauge */}
                <rect x="16" y="42" width="100" height="52" rx="5" fill="rgba(27,127,224,0.15)" stroke="rgba(27,127,224,0.25)" strokeWidth="0.5" />
                <text x="66" y="56" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">TEMPERATURE</text>
                {/* Gauge arc */}
                <path d="M 40 80 A 26 26 0 0 1 92 80" fill="none" stroke="rgba(27,127,224,0.3)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 40 80 A 26 26 0 0 1 78 63" fill="none" stroke="#1B7FE0" strokeWidth="3" strokeLinecap="round" />
                {/* Gauge needle dot */}
                <circle cx="78" cy="63" r="3" fill="#1B7FE0" filter="url(#bms-glow-sm)">
                  <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="66" y="88" textAnchor="middle" fill="#1B7FE0" fontSize="14" fontWeight="bold" fontFamily="sans-serif">22°C</text>

                {/* System Status */}
                <rect x="124" y="42" width="100" height="52" rx="5" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.25)" strokeWidth="0.5" />
                <text x="174" y="56" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">SYSTEM STATUS</text>
                {/* Status circle */}
                <circle cx="174" cy="74" r="10" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.5)" strokeWidth="1">
                  <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="174" cy="74" r="5" fill="#22c55e" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="174" y="92" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="bold" fontFamily="sans-serif">ALL OK</text>

                {/* Energy Usage Bar */}
                <rect x="16" y="102" width="208" height="48" rx="5" fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.2)" strokeWidth="0.5" />
                <text x="28" y="116" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">ENERGY USAGE</text>
                <text x="190" y="116" textAnchor="end" fill="#F5A623" fontSize="7" fontWeight="bold" fontFamily="sans-serif">67% Optimal</text>
                {/* Energy bar background */}
                <rect x="28" y="124" width="184" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
                {/* Energy bar fill */}
                <rect x="28" y="124" width="123" height="8" rx="4" fill="rgba(245,166,35,0.6)" />
                {/* Energy bar segments */}
                <line x1="74" y1="124" x2="74" y2="132" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="120" y1="124" x2="120" y2="132" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="166" y1="124" x2="166" y2="132" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* kWh labels */}
                <text x="28" y="143" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="sans-serif">0 kWh</text>
                <text x="212" y="143" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="sans-serif">850 kWh</text>

                {/* HVAC Zones mini overview */}
                <text x="16" y="166" fill="rgba(255,255,255,0.6)" fontSize="7" fontWeight="600" fontFamily="sans-serif">HVAC Zones</text>
                {/* Zone bars */}
                <rect x="16" y="174" width="40" height="22" rx="3" fill="rgba(27,127,224,0.2)" />
                <text x="36" y="184" textAnchor="middle" fill="#1B7FE0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">23°</text>
                <text x="36" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">F5</text>

                <rect x="62" y="174" width="40" height="22" rx="3" fill="rgba(27,127,224,0.2)" />
                <text x="82" y="184" textAnchor="middle" fill="#1B7FE0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">22°</text>
                <text x="82" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">F4</text>

                <rect x="108" y="174" width="40" height="22" rx="3" fill="rgba(27,127,224,0.2)" />
                <text x="128" y="184" textAnchor="middle" fill="#1B7FE0" fontSize="8" fontWeight="bold" fontFamily="sans-serif">22°</text>
                <text x="128" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">F3</text>

                <rect x="154" y="174" width="40" height="22" rx="3" fill="rgba(245,166,35,0.2)" />
                <text x="174" y="184" textAnchor="middle" fill="#F5A623" fontSize="8" fontWeight="bold" fontFamily="sans-serif">24°</text>
                <text x="174" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">F2</text>

                <rect x="200" y="174" width="24" height="22" rx="3" fill="rgba(34,197,94,0.15)" />
                <text x="212" y="184" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold" fontFamily="sans-serif">21°</text>
                <text x="212" y="192" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="sans-serif">F1</text>

                {/* Lighting & Safety row */}
                <text x="16" y="212" fill="rgba(255,255,255,0.6)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Subsystems</text>
                {/* Lighting indicator */}
                <rect x="16" y="220" width="64" height="18" rx="3" fill="rgba(245,166,35,0.15)" />
                <circle cx="28" cy="229" r="3" fill="#F5A623" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.4;0.85" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="48" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="sans-serif">Lighting</text>

                {/* Fire Alarm indicator */}
                <rect x="86" y="220" width="64" height="18" rx="3" fill="rgba(34,197,94,0.12)" />
                <circle cx="98" cy="229" r="3" fill="#22c55e" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.4;0.85" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <text x="122" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="sans-serif">Fire Alarm</text>

                {/* Access Control indicator */}
                <rect x="156" y="220" width="68" height="18" rx="3" fill="rgba(27,127,224,0.15)" />
                <circle cx="168" cy="229" r="3" fill="#1B7FE0" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.4;0.85" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <text x="196" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="sans-serif">Access Ctrl</text>

                {/* Bottom status bar */}
                <rect x="16" y="246" width="208" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="16" y="246" width="205" height="4" rx="2" fill="rgba(27,127,224,0.6)" />
              </g>

              {/* ============================================ */}
              {/* === FLOATING NOTIFICATION BADGES === */}
              {/* ============================================ */}

              {/* HVAC Active - near top of building */}
              <g className="bms-badge" transform="translate(155, 135)">
                <rect x="-44" y="-10" width="88" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                <circle cx="-29" cy="0" r="3" fill="#1B7FE0" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">HVAC Active</text>
              </g>

              {/* Energy Optimal - near middle of building */}
              <g className="bms-badge" transform="translate(140, 315)">
                <rect x="-52" y="-10" width="104" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                <circle cx="-36" cy="0" r="3" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Energy Optimal</text>
              </g>

              {/* All Systems OK - near bottom of building */}
              <g className="bms-badge" transform="translate(155, 475)">
                <rect x="-50" y="-10" width="100" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
                <circle cx="-35" cy="0" r="3" fill="#22c55e" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">All Systems OK</text>
              </g>

              {/* === Vertical data backbone line inside building === */}
              <line className="duct-line" x1="270" y1="108" x2="270" y2="510" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="4 8" />
              {/* Sensor pulse dots on backbone */}
              <circle cx="270" cy="170" r="3" fill="#1B7FE0" opacity="0.6" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="270" cy="250" r="3" fill="#1B7FE0" opacity="0.6" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="270" cy="330" r="3" fill="#F5A623" opacity="0.5" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="270" cy="410" r="3" fill="#1B7FE0" opacity="0.5" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="270" cy="490" r="3" fill="#F5A623" opacity="0.6" filter="url(#bms-glow-sm)">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-t from-[#080D1A] to-transparent" />
    </section>
  );
}
