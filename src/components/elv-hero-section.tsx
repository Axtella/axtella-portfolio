"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function ELVHeroSection() {
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

      // Building floors light up bottom to top
      const buildingFloors = sectionRef.current?.querySelectorAll(".building-floor");
      if (buildingFloors) {
        gsap.fromTo(
          buildingFloors,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            delay: 0.8,
            ease: "power2.out",
          }
        );
      }

      // ELV icons appear one by one
      const elvIcons = sectionRef.current?.querySelectorAll(".elv-icon");
      if (elvIcons) {
        gsap.fromTo(
          elvIcons,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.25,
            delay: 1.2,
            ease: "power2.out",
          }
        );
      }

      // Structured cabling fades in
      const cables = sectionRef.current?.querySelectorAll(".elv-cable");
      if (cables) {
        gsap.fromTo(
          cables,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 1.5,
            ease: "power2.inOut",
          }
        );
      }

      // Dashboard panel fades in
      const dashboard = sectionRef.current?.querySelector(".elv-dashboard");
      if (dashboard) {
        gsap.fromTo(
          dashboard,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.8, ease: "power3.out" }
        );
      }

      // Connection lines fade in
      const connections = sectionRef.current?.querySelectorAll(".elv-connection");
      if (connections) {
        gsap.fromTo(
          connections,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            delay: 2.0,
            ease: "power2.inOut",
          }
        );
      }

      // Notification badges appear
      const badges = sectionRef.current?.querySelectorAll(".elv-badge");
      if (badges) {
        gsap.fromTo(
          badges,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 2.3,
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
                  Intelligent Low Voltage
                </span>
                <br />
                <span className="word inline-block text-[#F5A623]">
                  Solutions.
                </span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed opacity-0"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Complete ELV systems including CCTV, access control, fire alarm,
                public address, and structured cabling — designed for facilities
                across Saudi Arabia.
              </p>

              {/* CTA Buttons */}
              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-3 pt-2 opacity-0"
              >
                <Link
                  href="/contact"
                  className={cn(
                    "group flex items-center gap-3 bg-[#F5A623] text-[#080D1A]",
                    "px-7 py-3.5 rounded-full font-semibold text-sm",
                    "hover:bg-[#D4910A] hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)]",
                    "transition-all duration-300"
                  )}
                >
                  Get a Free Consultation
                  <Arrow1Icon />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - SVG ELV Systems Visualization */}
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
                <filter id="elv-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="elv-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="elv-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.4)" />
                </filter>
                <filter id="elv-window-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
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

              {/* === Ground Plane === */}
              <rect x="150" y="580" width="420" height="4" rx="2" fill="rgba(27,127,224,0.15)" />
              <line x1="150" y1="582" x2="570" y2="582" stroke="rgba(27,127,224,0.25)" strokeWidth="0.5" />

              {/* === Building A (Tall, 5 floors) === */}
              <g filter="url(#elv-shadow)">
                {/* Roof cap */}
                <rect x="165" y="150" width="190" height="14" rx="3" fill="rgba(15,30,65,0.9)" stroke="rgba(27,127,224,0.35)" strokeWidth="1" />
                {/* Building body */}
                <rect x="170" y="164" width="180" height="416" rx="2" fill="rgba(10,20,50,0.75)" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />
                {/* Floor separator lines */}
                <line x1="170" y1="246" x2="350" y2="246" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                <line x1="170" y1="328" x2="350" y2="328" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                <line x1="170" y1="410" x2="350" y2="410" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                <line x1="170" y1="492" x2="350" y2="492" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                {/* Entrance */}
                <rect x="235" y="545" width="50" height="35" rx="2" fill="rgba(15,30,65,0.6)" stroke="rgba(27,127,224,0.25)" strokeWidth="1" />
                <line x1="260" y1="545" x2="260" y2="580" stroke="rgba(27,127,224,0.15)" strokeWidth="0.5" />
              </g>

              {/* Building A Dark Windows (always visible) */}
              {/* Floor 1 (Ground) y=505 */}
              {[190, 220, 280, 310].map((wx) => (
                <rect key={`a1d-${wx}`} x={wx} y={505} width={24} height={16} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 2 y=423 */}
              {[190, 220, 280, 310].map((wx) => (
                <rect key={`a2d-${wx}`} x={wx} y={423} width={24} height={16} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 3 y=341 */}
              {[190, 220, 280, 310].map((wx) => (
                <rect key={`a3d-${wx}`} x={wx} y={341} width={24} height={16} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 4 y=259 */}
              {[190, 220, 280, 310].map((wx) => (
                <rect key={`a4d-${wx}`} x={wx} y={259} width={24} height={16} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 5 (Top) y=177 */}
              {[190, 220, 280, 310].map((wx) => (
                <rect key={`a5d-${wx}`} x={wx} y={177} width={24} height={16} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}

              {/* Building A Lit Windows (animated floor by floor, bottom to top) */}
              {/* Floor 1 */}
              <g className="building-floor" opacity="0">
                {[190, 220, 280, 310].map((wx, i) => (
                  <rect key={`a1l-${wx}`} x={wx} y={505} width={24} height={16} rx={2} fill="rgba(245,166,35,0.4)" filter="url(#elv-window-glow)">
                    {i === 1 && <animate attributeName="opacity" values="1;0.6;1" dur="4s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 2 */}
              <g className="building-floor" opacity="0">
                {[190, 220, 280, 310].map((wx, i) => (
                  <rect key={`a2l-${wx}`} x={wx} y={423} width={24} height={16} rx={2} fill="rgba(245,166,35,0.4)" filter="url(#elv-window-glow)">
                    {i === 2 && <animate attributeName="opacity" values="1;0.5;1" dur="5s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 3 */}
              <g className="building-floor" opacity="0">
                {[190, 220, 280, 310].map((wx, i) => (
                  <rect key={`a3l-${wx}`} x={wx} y={341} width={24} height={16} rx={2} fill="rgba(245,166,35,0.35)" filter="url(#elv-window-glow)">
                    {i === 0 && <animate attributeName="opacity" values="1;0.7;1" dur="3.5s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 4 */}
              <g className="building-floor" opacity="0">
                {[190, 220, 280, 310].map((wx, i) => (
                  <rect key={`a4l-${wx}`} x={wx} y={259} width={24} height={16} rx={2} fill="rgba(245,166,35,0.3)" filter="url(#elv-window-glow)">
                    {i === 3 && <animate attributeName="opacity" values="1;0.55;1" dur="4.5s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 5 */}
              <g className="building-floor" opacity="0">
                {[190, 220, 280, 310].map((wx) => (
                  <rect key={`a5l-${wx}`} x={wx} y={177} width={24} height={16} rx={2} fill="rgba(245,166,35,0.25)" filter="url(#elv-window-glow)" />
                ))}
              </g>

              {/* === Building B (Shorter, 4 floors) === */}
              <g filter="url(#elv-shadow)">
                {/* Roof cap */}
                <rect x="365" y="240" width="160" height="14" rx="3" fill="rgba(15,30,65,0.9)" stroke="rgba(27,127,224,0.35)" strokeWidth="1" />
                {/* Building body */}
                <rect x="370" y="254" width="150" height="326" rx="2" fill="rgba(10,20,50,0.75)" stroke="rgba(27,127,224,0.3)" strokeWidth="1.5" />
                {/* Floor separator lines */}
                <line x1="370" y1="335" x2="520" y2="335" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                <line x1="370" y1="416" x2="520" y2="416" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
                <line x1="370" y1="497" x2="520" y2="497" stroke="rgba(27,127,224,0.12)" strokeWidth="0.5" />
              </g>

              {/* Building B Dark Windows */}
              {/* Floor 1 y=510 */}
              {[390, 420, 470, 500].map((wx) => (
                <rect key={`b1d-${wx}`} x={wx} y={510} width={20} height={14} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 2 y=428 */}
              {[390, 420, 470, 500].map((wx) => (
                <rect key={`b2d-${wx}`} x={wx} y={428} width={20} height={14} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 3 y=348 */}
              {[390, 420, 470, 500].map((wx) => (
                <rect key={`b3d-${wx}`} x={wx} y={348} width={20} height={14} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}
              {/* Floor 4 y=268 */}
              {[390, 420, 470, 500].map((wx) => (
                <rect key={`b4d-${wx}`} x={wx} y={268} width={20} height={14} rx={2} fill="rgba(15,25,50,0.6)" stroke="rgba(27,127,224,0.1)" strokeWidth="0.5" />
              ))}

              {/* Building B Lit Windows */}
              {/* Floor 1 */}
              <g className="building-floor" opacity="0">
                {[390, 420, 470, 500].map((wx, i) => (
                  <rect key={`b1l-${wx}`} x={wx} y={510} width={20} height={14} rx={2} fill="rgba(245,166,35,0.4)" filter="url(#elv-window-glow)">
                    {i === 0 && <animate attributeName="opacity" values="1;0.6;1" dur="3.8s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 2 */}
              <g className="building-floor" opacity="0">
                {[390, 420, 470, 500].map((wx, i) => (
                  <rect key={`b2l-${wx}`} x={wx} y={428} width={20} height={14} rx={2} fill="rgba(245,166,35,0.35)" filter="url(#elv-window-glow)">
                    {i === 2 && <animate attributeName="opacity" values="1;0.5;1" dur="4.2s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>
              {/* Floor 3 */}
              <g className="building-floor" opacity="0">
                {[390, 420, 470, 500].map((wx) => (
                  <rect key={`b3l-${wx}`} x={wx} y={348} width={20} height={14} rx={2} fill="rgba(245,166,35,0.3)" filter="url(#elv-window-glow)" />
                ))}
              </g>
              {/* Floor 4 */}
              <g className="building-floor" opacity="0">
                {[390, 420, 470, 500].map((wx, i) => (
                  <rect key={`b4l-${wx}`} x={wx} y={268} width={20} height={14} rx={2} fill="rgba(245,166,35,0.25)" filter="url(#elv-window-glow)">
                    {i === 1 && <animate attributeName="opacity" values="1;0.65;1" dur="4.8s" repeatCount="indefinite" />}
                  </rect>
                ))}
              </g>

              {/* === Structured Cabling (inside Building A) === */}
              <line className="elv-cable" x1="265" y1="165" x2="265" y2="545" stroke="rgba(27,127,224,0.2)" strokeWidth="1.5" strokeDasharray="4 6" />
              {/* Cable branches per floor */}
              <line className="elv-cable" x1="265" y1="190" x2="310" y2="190" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              <line className="elv-cable" x1="265" y1="270" x2="310" y2="270" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              <line className="elv-cable" x1="265" y1="350" x2="310" y2="350" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              <line className="elv-cable" x1="265" y1="430" x2="310" y2="430" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              <line className="elv-cable" x1="265" y1="515" x2="310" y2="515" stroke="rgba(27,127,224,0.15)" strokeWidth="1" strokeDasharray="3 4" />
              {/* Cable data flow dots */}
              <circle cx="265" cy="250" r="2" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="265" cy="380" r="2" fill="#1B7FE0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="265" cy="470" r="2" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>

              {/* === CCTV Camera 1 (Building A roof, left corner) === */}
              <g className="elv-icon" transform="translate(195, 140)" opacity="0">
                {/* Mounting bracket */}
                <rect x="-4" y="0" width="8" height="6" fill="rgba(27,127,224,0.3)" />
                {/* Camera dome base */}
                <ellipse cx="0" cy="-2" rx="14" ry="4" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                {/* Dome */}
                <path d="M -14 -2 C -14 -2, -14 -10, -8 -14 C -2 -18, 2 -18, 8 -14 C 14 -10, 14 -2, 14 -2" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.6)" strokeWidth="1" />
                {/* Lens */}
                <circle cx="0" cy="-8" r="5" fill="rgba(10,20,50,0.8)" stroke="rgba(27,127,224,0.7)" strokeWidth="1" />
                <circle cx="0" cy="-8" r="2" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Scan beam (nested wrapper for animateTransform) */}
                <g transform="translate(0, -8)">
                  <g>
                    <path d="M 0 0 L -18 -28 A 32 32 0 0 1 18 -28 Z" fill="rgba(27,127,224,0.08)" stroke="rgba(27,127,224,0.15)" strokeWidth="0.5">
                      <animateTransform attributeName="transform" type="rotate" values="-30 0 0;30 0 0;-30 0 0" dur="3s" repeatCount="indefinite" />
                    </path>
                  </g>
                </g>
              </g>

              {/* === CCTV Camera 2 (Building B roof, right corner) === */}
              <g className="elv-icon" transform="translate(505, 230)" opacity="0">
                {/* Mounting bracket */}
                <rect x="-4" y="0" width="8" height="6" fill="rgba(27,127,224,0.3)" />
                {/* Camera dome base */}
                <ellipse cx="0" cy="-2" rx="14" ry="4" fill="rgba(27,127,224,0.2)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                {/* Dome */}
                <path d="M -14 -2 C -14 -2, -14 -10, -8 -14 C -2 -18, 2 -18, 8 -14 C 14 -10, 14 -2, 14 -2" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.6)" strokeWidth="1" />
                {/* Lens */}
                <circle cx="0" cy="-8" r="5" fill="rgba(10,20,50,0.8)" stroke="rgba(27,127,224,0.7)" strokeWidth="1" />
                <circle cx="0" cy="-8" r="2" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.2s" repeatCount="indefinite" />
                </circle>
                {/* Scan beam (offset phase) */}
                <g transform="translate(0, -8)">
                  <g>
                    <path d="M 0 0 L -18 -28 A 32 32 0 0 1 18 -28 Z" fill="rgba(27,127,224,0.08)" stroke="rgba(27,127,224,0.15)" strokeWidth="0.5">
                      <animateTransform attributeName="transform" type="rotate" values="30 0 0;-30 0 0;30 0 0" dur="3s" repeatCount="indefinite" />
                    </path>
                  </g>
                </g>
              </g>

              {/* === Access Control (Building A entrance) === */}
              <g className="elv-icon" transform="translate(300, 555)" opacity="0">
                {/* Card reader body */}
                <rect x="-10" y="-14" width="20" height="28" rx="3" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.6)" strokeWidth="1" />
                {/* Screen */}
                <rect x="-7" y="-11" width="14" height="7" rx="1" fill="rgba(10,20,50,0.7)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.5" />
                <line x1="-5" y1="-8" x2="3" y2="-8" stroke="rgba(245,166,35,0.4)" strokeWidth="0.5" />
                {/* Keypad (2x3) */}
                {[-4, 4].map((kx) =>
                  [0, 5, 10].map((ky) => (
                    <rect key={`ak-${kx}-${ky}`} x={kx - 2} y={ky - 2} width="4" height="3" rx="0.5" fill="rgba(245,166,35,0.18)" stroke="rgba(245,166,35,0.3)" strokeWidth="0.3" />
                  ))
                )}
                {/* NFC pulse rings */}
                <circle cx="0" cy="-8" r="8" fill="none" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8">
                  <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="-8" r="14" fill="none" stroke="rgba(245,166,35,0.2)" strokeWidth="0.6">
                  <animate attributeName="r" values="14;22;14" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
              </g>

              {/* === Fire Alarm (Building A wall, Floor 3) === */}
              <g className="elv-icon" transform="translate(355, 350)" opacity="0">
                {/* Bell body */}
                <path d="M 0 -12 C -2 -12, -10 -7, -12 0 C -13 5, -12 8, -12 8 L 12 8 C 12 8, 13 5, 12 0 C 10 -7, 2 -12, 0 -12 Z" fill="rgba(212,35,47,0.3)" stroke="rgba(212,35,47,0.6)" strokeWidth="1" />
                {/* Bell knob */}
                <circle cx="0" cy="-12" r="2" fill="rgba(212,35,47,0.4)" stroke="rgba(212,35,47,0.6)" strokeWidth="0.8" />
                {/* Bell clapper */}
                <circle cx="0" cy="10" r="2.5" fill="rgba(212,35,47,0.3)" stroke="rgba(212,35,47,0.5)" strokeWidth="0.8" />
                {/* Flame inside */}
                <path d="M 0 -5 C -1 -2, -4 0, -4 3 C -4 5, -2 6, 0 6 C 2 6, 4 5, 4 3 C 4 0, 1 -2, 0 -5 Z" fill="rgba(245,166,35,0.6)" />
                {/* Alert pulse rings */}
                <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(212,35,47,0.2)" strokeWidth="0.8">
                  <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(212,35,47,0.12)" strokeWidth="0.6">
                  <animate attributeName="r" values="22;32;22" dur="2.5s" repeatCount="indefinite" begin="0.6s" />
                  <animate attributeName="opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" begin="0.6s" />
                </circle>
              </g>

              {/* === PA Speaker (Building B wall, Floor 2) === */}
              <g className="elv-icon" transform="translate(525, 435)" opacity="0">
                {/* Speaker body */}
                <path d="M -8 -6 L -8 6 L -2 6 L 10 14 L 10 -14 L -2 -6 Z" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.6)" strokeWidth="1" />
                {/* Speaker cone */}
                <circle cx="4" cy="0" r="3" fill="rgba(10,20,50,0.5)" stroke="rgba(245,166,35,0.4)" strokeWidth="0.5" />
                <circle cx="4" cy="0" r="1.2" fill="rgba(245,166,35,0.4)" />
                {/* Sound wave 1 */}
                <path d="M 14 -8 C 18 -4, 18 4, 14 8" stroke="rgba(245,166,35,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="0.5;0.12;0.5" dur="1.5s" repeatCount="indefinite" />
                </path>
                {/* Sound wave 2 */}
                <path d="M 18 -12 C 24 -6, 24 6, 18 12" stroke="rgba(245,166,35,0.35)" strokeWidth="1" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="0.35;0.08;0.35" dur="1.8s" repeatCount="indefinite" />
                </path>
                {/* Sound wave 3 */}
                <path d="M 22 -16 C 30 -8, 30 8, 22 16" stroke="rgba(245,166,35,0.2)" strokeWidth="0.8" strokeLinecap="round" fill="none">
                  <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.1s" repeatCount="indefinite" />
                </path>
              </g>

              {/* === Connection Lines (Buildings → Dashboard) === */}
              {/* Building A top → Dashboard */}
              <path className="elv-connection" d="M 350 200 C 420 180, 520 150, 590 150" stroke="rgba(27,127,224,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 6" fill="none" style={{ animation: "dash-flow 3s linear infinite" }} opacity="0" />
              {/* Building A mid → Dashboard */}
              <path className="elv-connection" d="M 350 380 C 420 360, 520 220, 590 200" stroke="rgba(27,127,224,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 6" fill="none" style={{ animation: "dash-flow 3.5s linear infinite" }} opacity="0" />
              {/* Building B mid → Dashboard */}
              <path className="elv-connection" d="M 520 350 C 540 320, 560 260, 590 230" stroke="rgba(245,166,35,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 6" fill="none" style={{ animation: "dash-flow 4s linear infinite" }} opacity="0" />

              {/* Data flow particles on connection lines */}
              <circle cx="440" cy="185" r="2.5" fill="#1B7FE0" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="490" cy="300" r="2.5" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="550" cy="290" r="2.5" fill="#F5A623" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>

              {/* === Dashboard Panel === */}
              <g className="elv-dashboard" transform="translate(590, 90)" opacity="0">
                <rect x="0" y="0" width="190" height="170" rx="8" fill="rgba(10,20,50,0.88)" stroke="rgba(27,127,224,0.4)" strokeWidth="1" />
                <text x="14" y="22" fill="rgba(255,255,255,0.9)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ELV OVERVIEW</text>
                <line x1="14" y1="30" x2="176" y2="30" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* Status */}
                <text x="14" y="44" fill="rgba(34,197,94,0.9)" fontSize="8" fontFamily="sans-serif">All Systems Online</text>
                {/* Stat cards */}
                <rect x="14" y="52" width="78" height="28" rx="4" fill="rgba(27,127,224,0.2)" />
                <text x="53" y="64" textAnchor="middle" fill="#1B7FE0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">128</text>
                <text x="53" y="74" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">CAMERAS</text>
                <rect x="100" y="52" width="78" height="28" rx="4" fill="rgba(245,166,35,0.2)" />
                <text x="139" y="64" textAnchor="middle" fill="#F5A623" fontSize="12" fontWeight="bold" fontFamily="sans-serif">24</text>
                <text x="139" y="74" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">ZONES</text>
                {/* Subsystem status */}
                <text x="14" y="98" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">SUBSYSTEMS</text>
                {/* CCTV */}
                <circle cx="20" cy="110" r="3" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="28" y="113" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif">CCTV Active</text>
                {/* ACCESS */}
                <circle cx="105" cy="110" r="3" fill="#F5A623" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.2s" repeatCount="indefinite" />
                </circle>
                <text x="113" y="113" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif">Armed</text>
                {/* FIRE */}
                <circle cx="20" cy="126" r="3" fill="#22c55e" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x="28" y="129" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif">Fire Normal</text>
                {/* PA */}
                <circle cx="105" cy="126" r="3" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <text x="113" y="129" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="sans-serif">PA Ready</text>
                {/* Status bar */}
                <rect x="14" y="140" width="162" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
                <rect x="14" y="140" width="160" height="4" rx="2" fill="rgba(27,127,224,0.6)" />
                {/* Activity dots */}
                <text x="14" y="158" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">Activity</text>
                <circle cx="60" cy="156" r="1.5" fill="#1B7FE0" opacity="0.8" />
                <circle cx="80" cy="152" r="1.5" fill="#F5A623" opacity="0.8" />
                <circle cx="100" cy="154" r="1.5" fill="#1B7FE0" opacity="0.8" />
                <circle cx="120" cy="150" r="1.5" fill="#F5A623" opacity="0.8" />
                <line x1="60" y1="156" x2="80" y2="152" stroke="rgba(27,127,224,0.4)" strokeWidth="0.6" />
                <line x1="80" y1="152" x2="100" y2="154" stroke="rgba(245,166,35,0.4)" strokeWidth="0.6" />
                <line x1="100" y1="154" x2="120" y2="150" stroke="rgba(27,127,224,0.4)" strokeWidth="0.6" />
              </g>

              {/* === Floating Notification Badges === */}
              {/* System Armed - near entrance */}
              <g className="elv-badge" transform="translate(260, 530)" opacity="0">
                <rect x="-48" y="-10" width="96" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
                <circle cx="-32" cy="0" r="3" fill="#22c55e" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">System Armed</text>
              </g>

              {/* Fire Normal - near fire alarm */}
              <g className="elv-badge" transform="translate(355, 395)" opacity="0">
                <rect x="-42" y="-10" width="84" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                <circle cx="-27" cy="0" r="3" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Fire Normal</text>
              </g>

              {/* PA Ready - near speaker */}
              <g className="elv-badge" transform="translate(530, 475)" opacity="0">
                <rect x="-36" y="-10" width="72" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                <circle cx="-21" cy="0" r="3" fill="#1B7FE0" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">PA Ready</text>
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
