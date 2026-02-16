"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

interface ServiceHeroData {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function FleetManagementHeroSection({ data }: { data?: ServiceHeroData | null }) {
  const lines = data?.heroTitle?.split("|") || [];
  const heroLine1 = lines[0] || "Track. Optimize.";
  const heroLine2 = lines[1] || "Manage.";
  const heroLine3 = lines[2] || "In Real-Time.";
  const heroSubtitle = data?.heroSubtitle || "End-to-end AVL and fleet management solutions powered by GPS, IoT, and cloud technology — designed for government and private fleet operators across Saudi Arabia.";
  const ctaText = data?.ctaLabel || "Get a Free Quote";
  const ctaHref = data?.ctaHref || "/get-quote/fleet";

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

      // Route lines fade in
      const routeLines =
        sectionRef.current?.querySelectorAll(".route-line");
      if (routeLines) {
        gsap.fromTo(
          routeLines,
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

      // Destination pins scale in
      const destPins = sectionRef.current?.querySelectorAll(".dest-pin");
      if (destPins) {
        gsap.fromTo(
          destPins,
          { scale: 0, opacity: 0, transformOrigin: "center bottom" },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 1.0,
            ease: "back.out(1.7)",
          }
        );
      }

      // Vehicle 1 — Truck moving along road-1
      gsap.to(".vehicle-1", {
        motionPath: {
          path: "#road-1",
          align: "#road-1",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration: 10,
        ease: "none",
        repeat: -1,
        delay: 0.8,
      });

      // Vehicle 2 — Van moving along road-2
      gsap.to(".vehicle-2", {
        motionPath: {
          path: "#road-2",
          align: "#road-2",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration: 12,
        ease: "none",
        repeat: -1,
        delay: 1.0,
      });

      // Vehicle 3 — SUV moving along road-3
      gsap.to(".vehicle-3", {
        motionPath: {
          path: "#road-3",
          align: "#road-3",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration: 8,
        ease: "none",
        repeat: -1,
        delay: 1.2,
      });
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
                <span className="word inline-block text-white">{heroLine2}</span>
                <br />
                <span className="word inline-block text-[#F5A623]">
                  {heroLine3}
                </span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed opacity-0"
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

          {/* Right Column - SVG City Map with Animated Vehicles */}
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
                  <filter id="fleet-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="fleet-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="fleet-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
                  </filter>
                  <filter id="geofence-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <pattern id="window-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="4" x2="8" y2="4" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                    <line x1="4" y1="0" x2="4" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                  </pattern>
                </defs>

                {/* === City Map Background === */}
                {/* Faint grid pattern */}
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

                {/* Faint Saudi Arabia outline */}
                <polygon
                  points="180,160 220,130 300,115 380,120 440,140 490,170 540,200 580,250 590,310 560,370 520,410 480,430 430,420 380,440 320,470 260,460 210,420 170,370 160,310 165,260 175,210"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                />

                {/* Road branches extending to edges */}
                <path d="M 50 380 C 30 390, 10 410, 0 430" stroke="#111d38" strokeWidth="50" strokeLinecap="round" opacity="0.7" />
                <path d="M 750 310 C 770 305, 785 300, 800 295" stroke="#111d38" strokeWidth="50" strokeLinecap="round" opacity="0.7" />
                <path d="M 50 500 C 30 510, 10 530, 0 560" stroke="#111d38" strokeWidth="48" strokeLinecap="round" opacity="0.7" />
                <path d="M 750 480 C 770 475, 790 465, 800 455" stroke="#111d38" strokeWidth="48" strokeLinecap="round" opacity="0.7" />
                <path d="M 480 150 C 490 120, 500 90, 510 50" stroke="#111d38" strokeWidth="44" strokeLinecap="round" opacity="0.7" />
                <path d="M 400 620 C 395 650, 390 670, 385 700" stroke="#111d38" strokeWidth="44" strokeLinecap="round" opacity="0.7" />
                {/* Branch lane markings */}
                <path d="M 50 380 C 30 390, 10 410, 0 430" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 750 310 C 770 305, 785 300, 800 295" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 50 500 C 30 510, 10 530, 0 560" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 750 480 C 770 475, 790 465, 800 455" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 480 150 C 490 120, 500 90, 510 50" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 400 620 C 395 650, 390 670, 385 700" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />

                {/* Road surfaces — thick dark paths (2x wider) */}
                <path d="M 50 380 C 150 360, 280 300, 400 330 S 600 280, 750 310" stroke="#111d38" strokeWidth="56" strokeLinecap="round" opacity="0.7" />
                <path d="M 750 480 C 620 460, 450 430, 300 470 S 120 520, 50 500" stroke="#111d38" strokeWidth="52" strokeLinecap="round" opacity="0.7" />
                <path d="M 400 620 C 390 530, 420 430, 410 350 S 440 220, 480 150" stroke="#111d38" strokeWidth="48" strokeLinecap="round" opacity="0.7" />

                {/* Lane markings — bolder dashed center lines */}
                <path d="M 50 380 C 150 360, 280 300, 400 330 S 600 280, 750 310" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 750 480 C 620 460, 450 430, 300 470 S 120 520, 50 500" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />
                <path d="M 400 620 C 390 530, 420 430, 410 350 S 440 220, 480 150" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="16 12" strokeLinecap="round" />

                {/* Road intersection circle (larger) */}
                <circle cx="405" cy="345" r="38" fill="#111d38" opacity="0.6" />
                {/* Geofence — glowing dashed circle */}
                <circle cx="405" cy="345" r="38" fill="none" stroke="#1B7FE0" strokeWidth="2" strokeDasharray="10 6" opacity="0.3" filter="url(#geofence-glow)" />

                {/* 3D City blocks / buildings in organized clusters */}
                {[
                  // Cluster A — top-left (above road-1)
                  { x: 80,  y: 235, w: 45, h: 35 },
                  { x: 130, y: 225, w: 35, h: 50 },
                  { x: 170, y: 238, w: 42, h: 35 },
                  // Cluster B — top-right (above road-1)
                  { x: 540, y: 190, w: 50, h: 38 },
                  { x: 596, y: 185, w: 38, h: 48 },
                  { x: 640, y: 195, w: 42, h: 35 },
                  // Cluster C — mid-left (between road-1 and road-2)
                  { x: 80,  y: 410, w: 50, h: 35 },
                  { x: 136, y: 405, w: 38, h: 42 },
                  // Cluster D — mid-right (between road-1 and road-2)
                  { x: 620, y: 365, w: 48, h: 38 },
                  { x: 674, y: 360, w: 36, h: 45 },
                  // Cluster E — bottom (below road-2)
                  { x: 210, y: 545, w: 42, h: 32 },
                  { x: 258, y: 540, w: 35, h: 40 },
                  { x: 298, y: 548, w: 45, h: 30 },
                  // Cluster F — top-center (flanking road-3)
                  { x: 345, y: 170, w: 42, h: 30 },
                  { x: 455, y: 175, w: 38, h: 35 },
                ].map((b, i) => (
                  <g key={`bldg-${i}`} filter="url(#fleet-shadow)">
                    {/* 3D depth offset (behind) */}
                    <rect x={b.x - 2} y={b.y - 2} width={b.w} height={b.h} rx={3} fill="#1a2850" opacity="0.6" />
                    {/* Main building */}
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={3} fill="#162044" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                    {/* Window grid overlay */}
                    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={3} fill="url(#window-grid)" />
                  </g>
                ))}

                {/* Crosswalk markings at intersection */}
                {[0, 5, 10, 15, 20].map((offset) => (
                  <line
                    key={`cw-${offset}`}
                    x1={388 + offset}
                    y1="318"
                    x2={388 + offset}
                    y2="326"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}
                {[0, 5, 10, 15, 20].map((offset) => (
                  <line
                    key={`cw2-${offset}`}
                    x1={395 + offset}
                    y1="358"
                    x2={395 + offset}
                    y2="366"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* === Invisible Road Paths (MotionPath guides) === */}
                <path
                  id="road-1"
                  d="M 50 380 C 150 360, 280 300, 400 330 S 600 280, 750 310"
                  stroke="none"
                  fill="none"
                />
                <path
                  id="road-2"
                  d="M 750 480 C 620 460, 450 430, 300 470 S 120 520, 50 500"
                  stroke="none"
                  fill="none"
                />
                <path
                  id="road-3"
                  d="M 400 620 C 390 530, 420 430, 410 350 S 440 220, 480 150"
                  stroke="none"
                  fill="none"
                />

                {/* === Visible Route Lines (dashed, animated) === */}
                <path
                  className="route-line"
                  d="M 50 380 C 150 360, 280 300, 400 330 S 600 280, 750 310"
                  stroke="rgba(27,127,224,0.45)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  style={{ animation: "dash-flow 3s linear infinite" }}
                />
                <path
                  className="route-line"
                  d="M 750 480 C 620 460, 450 430, 300 470 S 120 520, 50 500"
                  stroke="rgba(27,127,224,0.4)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  style={{ animation: "dash-flow 3.5s linear infinite" }}
                />
                <path
                  className="route-line"
                  d="M 400 620 C 390 530, 420 430, 410 350 S 440 220, 480 150"
                  stroke="rgba(245,166,35,0.35)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="8 6"
                  style={{ animation: "dash-flow 4s linear infinite" }}
                />

                {/* === Destination Pins === */}
                {/* Pin 1 - end of road-1 */}
                <g className="dest-pin" transform="translate(750, 295)">
                  <circle
                    r="12"
                    fill="#F59E0B"
                    opacity="0.15"
                    filter="url(#fleet-glow)"
                  >
                    <animate
                      attributeName="r"
                      values="12;18;12"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.15;0.06;0.15"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 0 -13 c-6 0-10.5 4.5-10.5 10.5 c0 8.5 10.5 17 10.5 17 s10.5-8.5 10.5-17 c0-6-4.5-10.5-10.5-10.5z"
                    fill="#F59E0B"
                    opacity="0.9"
                  />
                  <circle
                    r="4"
                    cy="-3"
                    fill="rgba(255,255,255,0.85)"
                  />
                </g>

                {/* Pin 2 - end of road-2 */}
                <g className="dest-pin" transform="translate(50, 485)">
                  <circle
                    r="12"
                    fill="#1B7FE0"
                    opacity="0.15"
                    filter="url(#fleet-glow)"
                  >
                    <animate
                      attributeName="r"
                      values="12;18;12"
                      dur="2.3s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.15;0.06;0.15"
                      dur="2.3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 0 -13 c-6 0-10.5 4.5-10.5 10.5 c0 8.5 10.5 17 10.5 17 s10.5-8.5 10.5-17 c0-6-4.5-10.5-10.5-10.5z"
                    fill="#1B7FE0"
                    opacity="0.9"
                  />
                  <circle
                    r="4"
                    cy="-3"
                    fill="rgba(255,255,255,0.85)"
                  />
                </g>

                {/* Pin 3 - end of road-3 */}
                <g className="dest-pin" transform="translate(480, 135)">
                  <circle
                    r="12"
                    fill="#F59E0B"
                    opacity="0.12"
                    filter="url(#fleet-glow)"
                  >
                    <animate
                      attributeName="r"
                      values="12;18;12"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.12;0.05;0.12"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 0 -13 c-6 0-10.5 4.5-10.5 10.5 c0 8.5 10.5 17 10.5 17 s10.5-8.5 10.5-17 c0-6-4.5-10.5-10.5-10.5z"
                    fill="#F59E0B"
                    opacity="0.85"
                  />
                  <circle
                    r="4"
                    cy="-3"
                    fill="rgba(255,255,255,0.85)"
                  />
                </g>

                {/* Pin 4 - middle junction */}
                <g className="dest-pin" transform="translate(400, 330)">
                  <circle
                    r="10"
                    fill="#F59E0B"
                    opacity="0.12"
                    filter="url(#fleet-glow)"
                  >
                    <animate
                      attributeName="r"
                      values="10;15;10"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.12;0.05;0.12"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 0 -11 c-5 0-9 3.8-9 9 c0 7.2 9 14.5 9 14.5 s9-7.3 9-14.5 c0-5.2-4-9-9-9z"
                    fill="#1B7FE0"
                    opacity="0.85"
                  />
                  <circle
                    r="3.5"
                    cy="-2"
                    fill="rgba(255,255,255,0.85)"
                  />
                </g>

                {/* === Vehicle 1: Truck (moves along road-1) — 2x scale === */}
                <g className="vehicle vehicle-1" filter="url(#fleet-shadow)">
                  <g transform="scale(2)">
                    <rect x="-17" y="-7" width="34" height="14" rx="2" fill="#F5A623" />
                    <rect x="10" y="-6" width="8" height="12" rx="2" fill="#D4910A" />
                    <rect x="14" y="-4.5" width="3" height="9" rx="1.5" fill="rgba(135,206,250,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <line x1="-5" y1="-7" x2="-5" y2="7" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    <line x1="3" y1="-7" x2="3" y2="7" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    <rect x="12" y="-9" width="3" height="2" rx="1" fill="#D4910A" />
                    <rect x="12" y="7" width="3" height="2" rx="1" fill="#D4910A" />
                    <circle cx="18" cy="-4" r="1.5" fill="rgba(255,255,200,0.9)" />
                    <circle cx="18" cy="4" r="1.5" fill="rgba(255,255,200,0.9)" />
                    <rect x="-17.5" y="-6" width="1.5" height="3" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    <rect x="-17.5" y="3" width="1.5" height="3" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    <rect x="-14" y="-9" width="6" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="-14" y="7" width="6" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="5" y="-9" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="5" y="7" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    {/* GPS beacon */}
                    <circle cx="0" cy="-12" r="2" fill="#F5A623" opacity="0.95" filter="url(#fleet-glow-sm)" />
                    <circle cx="0" cy="-12" r="4" fill="none" stroke="#F5A623" strokeWidth="0.5" opacity="0.5">
                      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Speed label */}
                    <g transform="translate(0, -16)">
                      <rect x="-12" y="-5" width="24" height="9" rx="4.5" fill="rgba(10,36,99,0.9)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.5" />
                      <text x="0" y="1" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">85 km/h</text>
                    </g>
                  </g>
                </g>

                {/* === Vehicle 2: Van (moves along road-2) === */}
                <g className="vehicle vehicle-2" filter="url(#fleet-shadow)">
                  <g transform="scale(2)">
                    {/* Van body (top-down) */}
                    <path d="M-14,-6 L10,-6 C13,-6 14,-4 14,0 C14,4 13,6 10,6 L-14,6 C-15.5,6 -16,4.5 -16,0 C-16,-4.5 -15.5,-6 -14,-6 Z" fill="#1B7FE0" />
                    {/* Windshield */}
                    <rect x="10" y="-4" width="3" height="8" rx="1.5" fill="rgba(135,206,250,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    {/* Rear window */}
                    <rect x="-14" y="-3.5" width="2.5" height="7" rx="1" fill="rgba(135,206,250,0.4)" />
                    {/* Side mirrors */}
                    <rect x="9" y="-8" width="3" height="1.5" rx="0.75" fill="#1565C0" />
                    <rect x="9" y="6.5" width="3" height="1.5" rx="0.75" fill="#1565C0" />
                    {/* Headlights */}
                    <circle cx="14" cy="-3.5" r="1.2" fill="rgba(255,255,200,0.9)" />
                    <circle cx="14" cy="3.5" r="1.2" fill="rgba(255,255,200,0.9)" />
                    {/* Tail lights */}
                    <rect x="-16.5" y="-5" width="1.2" height="2.5" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    <rect x="-16.5" y="2.5" width="1.2" height="2.5" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    {/* Wheels */}
                    <rect x="-11" y="-8" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="-11" y="6" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="4" y="-8" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="4" y="6" width="5" height="2" rx="1" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    {/* GPS beacon */}
                    <circle cx="0" cy="-6" r="2" fill="#1B7FE0" opacity="0.95" filter="url(#fleet-glow-sm)" />
                    {/* GPS pulsing ring */}
                    <circle cx="0" cy="-6" r="4" fill="none" stroke="#1B7FE0" strokeWidth="0.5" opacity="0.5">
                      <animate attributeName="r" values="4;8;4" dur="2.3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.3s" repeatCount="indefinite" />
                    </circle>
                    {/* Speed label */}
                    <g transform="translate(0, -13)">
                      <rect x="-12" y="-5" width="24" height="9" rx="4.5" fill="rgba(10,36,99,0.9)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.5" />
                      <text x="0" y="1" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">62 km/h</text>
                    </g>
                  </g>
                </g>

                {/* === Vehicle 3: SUV (moves along road-3) === */}
                <g className="vehicle vehicle-3" filter="url(#fleet-shadow)">
                  <g transform="scale(2)">
                    {/* Car body (top-down) */}
                    <path d="M-11,-5 L8,-5 C10.5,-5 11.5,-3 11.5,0 C11.5,3 10.5,5 8,5 L-11,5 C-12.5,5 -13,3 -13,0 C-13,-3 -12.5,-5 -11,-5 Z" fill="rgba(255,255,255,0.92)" />
                    {/* Windshield */}
                    <rect x="7" y="-3.5" width="3" height="7" rx="1.5" fill="rgba(135,206,250,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    {/* Rear window */}
                    <rect x="-11" y="-3" width="2.5" height="6" rx="1" fill="rgba(135,206,250,0.5)" />
                    {/* Roof panel */}
                    <rect x="-5" y="-3" width="10" height="6" rx="2" fill="rgba(200,210,225,0.5)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                    {/* Side mirrors */}
                    <rect x="6" y="-7" width="2.5" height="1.5" rx="0.75" fill="rgba(220,220,230,0.8)" />
                    <rect x="6" y="5.5" width="2.5" height="1.5" rx="0.75" fill="rgba(220,220,230,0.8)" />
                    {/* Headlights */}
                    <circle cx="11.5" cy="-3" r="1.2" fill="rgba(255,255,200,0.9)" />
                    <circle cx="11.5" cy="3" r="1.2" fill="rgba(255,255,200,0.9)" />
                    {/* Tail lights */}
                    <rect x="-13.5" y="-4" width="1.2" height="2" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    <rect x="-13.5" y="2" width="1.2" height="2" rx="0.5" fill="rgba(255,60,60,0.7)" />
                    {/* Wheels */}
                    <rect x="-9" y="-7" width="4.5" height="1.8" rx="0.9" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="-9" y="5.2" width="4.5" height="1.8" rx="0.9" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="3" y="-7" width="4.5" height="1.8" rx="0.9" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    <rect x="3" y="5.2" width="4.5" height="1.8" rx="0.9" fill="#111827" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    {/* GPS beacon */}
                    <circle cx="0" cy="-6" r="2" fill="#F5A623" opacity="0.95" filter="url(#fleet-glow-sm)" />
                    {/* GPS pulsing ring */}
                    <circle cx="0" cy="-6" r="4" fill="none" stroke="#F5A623" strokeWidth="0.5" opacity="0.5">
                      <animate attributeName="r" values="4;8;4" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    {/* Speed label */}
                    <g transform="translate(0, -13)">
                      <rect x="-12" y="-5" width="24" height="9" rx="4.5" fill="rgba(10,36,99,0.9)" stroke="rgba(245,166,35,0.5)" strokeWidth="0.5" />
                      <text x="0" y="1" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">91 km/h</text>
                    </g>
                  </g>
                </g>

                {/* === Floating Icons === */}
                <g transform="translate(680, 540)">
                  <circle r="16" fill="rgba(27,127,224,0.12)" stroke="rgba(27,127,224,0.25)" strokeWidth="1" />
                  <text y="1" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">⛽</text>
                  <text y="24" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Fuel</text>
                </g>
                <g transform="translate(150, 180)">
                  <circle r="16" fill="rgba(27,127,224,0.12)" stroke="rgba(27,127,224,0.25)" strokeWidth="1" />
                  <text y="1" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">🛡️</text>
                  <text y="24" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Safety</text>
                </g>
                <g transform="translate(680, 150)">
                  <circle r="16" fill="rgba(27,127,224,0.12)" stroke="rgba(27,127,224,0.25)" strokeWidth="1" />
                  <text y="1" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">🔔</text>
                  <text y="24" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Alert</text>
                </g>
                <g transform="translate(150, 560)">
                  <circle r="16" fill="rgba(27,127,224,0.12)" stroke="rgba(27,127,224,0.25)" strokeWidth="1" />
                  <text y="1" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="14">🔧</text>
                  <text y="24" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="sans-serif">Maint.</text>
                </g>

                {/* === Dashboard Panel (upper right) === */}
                <g transform="translate(600, 60)">
                  <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(10,20,50,0.75)" stroke="rgba(27,127,224,0.2)" strokeWidth="1" />
                  <text x="14" y="22" fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">FLEET OVERVIEW</text>
                  <line x1="14" y1="30" x2="166" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  {/* Stat card 1 */}
                  <rect x="14" y="38" width="72" height="28" rx="4" fill="rgba(27,127,224,0.15)" />
                  <text x="50" y="50" textAnchor="middle" fill="#1B7FE0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">12</text>
                  <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">ACTIVE</text>
                  {/* Stat card 2 */}
                  <rect x="94" y="38" width="72" height="28" rx="4" fill="rgba(245,166,35,0.15)" />
                  <text x="130" y="50" textAnchor="middle" fill="#F5A623" fontSize="12" fontWeight="bold" fontFamily="sans-serif">3</text>
                  <text x="130" y="60" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="sans-serif">ALERTS</text>
                  {/* Mini route map */}
                  <text x="14" y="82" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="sans-serif">Routes</text>
                  <circle cx="60" cy="88" r="2" fill="#1B7FE0" opacity="0.6" />
                  <circle cx="80" cy="85" r="2" fill="#F5A623" opacity="0.6" />
                  <circle cx="100" cy="92" r="2" fill="#1B7FE0" opacity="0.6" />
                  <line x1="60" y1="88" x2="80" y2="85" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                  <line x1="80" y1="85" x2="100" y2="92" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8" />
                  <circle cx="120" cy="88" r="2" fill="#F5A623" opacity="0.6" />
                  <line x1="100" y1="92" x2="120" y2="88" stroke="rgba(27,127,224,0.3)" strokeWidth="0.8" />
                  <circle cx="140" cy="90" r="2" fill="#1B7FE0" opacity="0.6" />
                  <line x1="120" y1="88" x2="140" y2="90" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8" />
                  {/* Status bar */}
                  <rect x="14" y="98" width="152" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
                  <rect x="14" y="98" width="114" height="4" rx="2" fill="rgba(27,127,224,0.4)" />
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
