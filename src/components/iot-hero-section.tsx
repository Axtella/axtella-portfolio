"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function IoTHeroSection() {
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

      // Network lines fade in
      const networkLines =
        sectionRef.current?.querySelectorAll(".network-line");
      if (networkLines) {
        gsap.fromTo(
          networkLines,
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

      // Node icons scale in
      const nodeIcons = sectionRef.current?.querySelectorAll(".node-icon");
      if (nodeIcons) {
        gsap.fromTo(
          nodeIcons,
          { scale: 0, opacity: 0, transformOrigin: "center center" },
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

      // Dashboard panel fade in from top
      const dashboard = sectionRef.current?.querySelector(".it-dashboard");
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
                  Connected Intelligence
                </span>
                <br />
                <span className="word inline-block text-[#F5A623]">
                  Everywhere.
                </span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed opacity-0"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Smart IoT ecosystems that connect devices, collect data, and
                deliver actionable insights — designed for businesses across
                Saudi Arabia.
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

          {/* Right Column - SVG IoT Network Visualization */}
          <div
            ref={imageRef}
            className="relative w-full lg:w-[50%] h-[280px] sm:h-[340px] md:h-[420px] lg:h-[calc(100vh-80px)]"
          >
            <svg
              viewBox="0 0 800 700"
              className="w-full h-full"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              fill="none"
            >
              <defs>
                <filter id="iot-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="iot-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="iot-shadow" x="-20%" y="-20%" width="140%" height="140%">
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

              {/* === Network Connection Lines === */}
              {/* Hub → Smart Sensor (top-right) */}
              <path
                className="network-line"
                d="M 450 380 C 490 330, 530 290, 570 250"
                stroke="rgba(27,127,224,0.55)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 3s linear infinite" }}
              />
              {/* Hub → Edge Gateway (top-left) */}
              <path
                className="network-line"
                d="M 350 380 C 310 330, 270 300, 220 270"
                stroke="rgba(27,127,224,0.55)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 3.5s linear infinite" }}
              />
              {/* Hub → Cloud Platform (bottom-left) */}
              <path
                className="network-line"
                d="M 360 480 C 330 510, 280 540, 210 570"
                stroke="rgba(27,127,224,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 4s linear infinite" }}
              />
              {/* Hub → Analytics Dashboard (bottom-right) */}
              <path
                className="network-line"
                d="M 450 480 C 490 510, 540 540, 600 570"
                stroke="rgba(245,166,35,0.55)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="8 6"
                fill="none"
                style={{ animation: "dash-flow 3.8s linear infinite" }}
              />

              {/* === Data Flow Particles === */}
              {/* Hub → Smart Sensor particles */}
              <circle cx="490" cy="340" r="3" fill="#1B7FE0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.25;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="530" cy="295" r="2.5" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              {/* Hub → Edge Gateway particles */}
              <circle cx="300" cy="330" r="3" fill="#1B7FE0" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.25;0.8" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="255" cy="295" r="2.5" fill="#1B7FE0" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.8s" repeatCount="indefinite" />
              </circle>
              {/* Hub → Cloud Platform particles */}
              <circle cx="310" cy="520" r="3" fill="#1B7FE0" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="260" cy="545" r="2.5" fill="#1B7FE0" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.6s" repeatCount="indefinite" />
              </circle>
              {/* Hub → Analytics Dashboard particles */}
              <circle cx="510" cy="520" r="3" fill="#F5A623" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="560" cy="545" r="3.5" fill="#F5A623" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.7s" repeatCount="indefinite" />
              </circle>

              {/* === Central IoT Hub / Gateway Device === */}
              <g filter="url(#iot-shadow)">
                {/* Hub outer frame */}
                <rect
                  x="350"
                  y="340"
                  width="100"
                  height="150"
                  rx="8"
                  fill="#1a2d5a"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                {/* Hub inner border */}
                <rect
                  x="356"
                  y="348"
                  width="88"
                  height="134"
                  rx="5"
                  fill="rgba(15,30,70,0.6)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />

                {/* IoT Hub antenna / signal indicator at top */}
                <line x1="400" y1="330" x2="400" y2="340" stroke="rgba(245,166,35,0.8)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="400" cy="326" r="4" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.7)" strokeWidth="1" />
                <circle cx="400" cy="326" r="2" fill="#F5A623" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
                </circle>
                {/* Signal waves from antenna */}
                <path d="M 390 320 C 388 315, 392 310, 400 308" stroke="rgba(245,166,35,0.3)" strokeWidth="1" fill="none" />
                <path d="M 410 320 C 412 315, 408 310, 400 308" stroke="rgba(245,166,35,0.3)" strokeWidth="1" fill="none" />
                <path d="M 385 316 C 382 308, 388 300, 400 296" stroke="rgba(245,166,35,0.2)" strokeWidth="0.8" fill="none" />
                <path d="M 415 316 C 418 308, 412 300, 400 296" stroke="rgba(245,166,35,0.2)" strokeWidth="0.8" fill="none" />

                {/* Gateway slot 1 - Protocol processor */}
                <rect x="362" y="356" width="76" height="24" rx="3" fill="rgba(30,60,110,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                {/* IoT chip/processor icon */}
                <rect x="368" y="362" width="12" height="12" rx="2" fill="rgba(27,127,224,0.35)" stroke="rgba(27,127,224,0.6)" strokeWidth="0.8" />
                <line x1="374" y1="359" x2="374" y2="362" stroke="rgba(27,127,224,0.4)" strokeWidth="0.5" />
                <line x1="374" y1="374" x2="374" y2="377" stroke="rgba(27,127,224,0.4)" strokeWidth="0.5" />
                <line x1="365" y1="368" x2="368" y2="368" stroke="rgba(27,127,224,0.4)" strokeWidth="0.5" />
                <line x1="380" y1="368" x2="383" y2="368" stroke="rgba(27,127,224,0.4)" strokeWidth="0.5" />
                {/* Data flow lines */}
                <line x1="388" y1="364" x2="420" y2="364" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="368" x2="420" y2="368" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="372" x2="420" y2="372" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* LED indicators */}
                <circle cx="430" cy="364" r="2.5" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="430" cy="372" r="2.5" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Gateway slot 2 - Communication module */}
                <rect x="362" y="386" width="76" height="24" rx="3" fill="rgba(30,60,110,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                {/* WiFi/radio icon */}
                <path d="M 374 400 C 370 396, 370 392, 374 388" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" fill="none" />
                <path d="M 371 402 C 366 396, 366 392, 371 386" stroke="rgba(245,166,35,0.35)" strokeWidth="0.7" fill="none" />
                <circle cx="374" cy="400" r="1.5" fill="#F5A623" opacity="0.8" />
                <line x1="388" y1="392" x2="420" y2="392" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="396" x2="420" y2="396" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="400" x2="420" y2="400" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* LED indicators */}
                <circle cx="430" cy="394" r="2.5" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.35;0.9" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="430" cy="402" r="2.5" fill="#F5A623" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Gateway slot 3 - Data aggregator */}
                <rect x="362" y="416" width="76" height="24" rx="3" fill="rgba(30,60,110,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                {/* Data stream icon */}
                <rect x="368" y="422" width="4" height="8" rx="1" fill="rgba(27,127,224,0.5)" />
                <rect x="374" y="420" width="4" height="12" rx="1" fill="rgba(27,127,224,0.6)" />
                <rect x="380" y="424" width="4" height="6" rx="1" fill="rgba(27,127,224,0.4)" />
                <line x1="388" y1="422" x2="420" y2="422" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="426" x2="420" y2="426" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="430" x2="420" y2="430" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* LED indicators */}
                <circle cx="430" cy="424" r="2.5" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.4;0.95" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="430" cy="432" r="2.5" fill="#1B7FE0" opacity="0.85">
                  <animate attributeName="opacity" values="0.85;0.3;0.85" dur="2.4s" repeatCount="indefinite" />
                </circle>

                {/* Gateway slot 4 - Edge compute */}
                <rect x="362" y="446" width="76" height="24" rx="3" fill="rgba(30,60,110,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                {/* Gear/process icon */}
                <circle cx="374" cy="458" r="5" fill="none" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                <circle cx="374" cy="458" r="2" fill="rgba(245,166,35,0.4)" />
                <line x1="374" y1="451" x2="374" y2="453" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <line x1="374" y1="463" x2="374" y2="465" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <line x1="367" y1="458" x2="369" y2="458" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <line x1="379" y1="458" x2="381" y2="458" stroke="rgba(245,166,35,0.4)" strokeWidth="0.8" />
                <line x1="388" y1="452" x2="420" y2="452" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="456" x2="420" y2="456" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <line x1="388" y1="460" x2="420" y2="460" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* LED indicators */}
                <circle cx="430" cy="454" r="2.5" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="430" cy="462" r="2.5" fill="#F5A623" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.35;0.9" dur="2.1s" repeatCount="indefinite" />
                </circle>

                {/* Hub label */}
                <text x="400" y="336" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="bold" fontFamily="sans-serif">IoT GATEWAY</text>
              </g>

              {/* === Smart Sensor Node (top-right) === */}
              <g className="node-icon" transform="translate(570, 230)">
                {/* Glow background */}
                <circle r="40" fill="rgba(27,127,224,0.15)" filter="url(#iot-glow)">
                  <animate attributeName="r" values="40;46;40" dur="3s" repeatCount="indefinite" />
                </circle>
                {/* Sensor body */}
                <rect x="-18" y="-18" width="36" height="28" rx="4" fill="rgba(27,127,224,0.25)" stroke="rgba(27,127,224,0.6)" strokeWidth="1.5" />
                {/* Sensor eye / lens */}
                <circle cx="0" cy="-6" r="8" fill="rgba(27,127,224,0.15)" stroke="rgba(27,127,224,0.5)" strokeWidth="1" />
                <circle cx="0" cy="-6" r="4" fill="rgba(27,127,224,0.3)" stroke="rgba(27,127,224,0.7)" strokeWidth="0.8" />
                <circle cx="0" cy="-6" r="2" fill="#1B7FE0" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Sensor pins at bottom */}
                <line x1="-10" y1="10" x2="-10" y2="18" stroke="rgba(27,127,224,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-4" y1="10" x2="-4" y2="16" stroke="rgba(27,127,224,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="4" y1="10" x2="4" y2="16" stroke="rgba(27,127,224,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="10" y1="10" x2="10" y2="18" stroke="rgba(27,127,224,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                {/* Label */}
                <text y="34" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Sensor</text>
              </g>

              {/* === Edge Gateway Node (top-left) === */}
              <g className="node-icon" transform="translate(200, 260)">
                {/* Glow background */}
                <circle r="38" fill="rgba(245,166,35,0.15)" filter="url(#iot-glow)">
                  <animate attributeName="r" values="38;44;38" dur="3.5s" repeatCount="indefinite" />
                </circle>
                {/* Edge device body */}
                <rect x="-22" y="-16" width="44" height="32" rx="5" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.6)" strokeWidth="1.5" />
                {/* Inner circuit board pattern */}
                <rect x="-16" y="-10" width="32" height="20" rx="2" fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.3)" strokeWidth="0.5" />
                {/* CPU chip in center */}
                <rect x="-6" y="-6" width="12" height="12" rx="1" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.7)" strokeWidth="0.8" />
                {/* Chip traces */}
                <line x1="-6" y1="-2" x2="-14" y2="-2" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                <line x1="-6" y1="2" x2="-14" y2="2" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                <line x1="6" y1="-2" x2="14" y2="-2" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                <line x1="6" y1="2" x2="14" y2="2" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                <line x1="0" y1="-6" x2="0" y2="-10" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                <line x1="0" y1="6" x2="0" y2="10" stroke="rgba(245,166,35,0.35)" strokeWidth="0.5" />
                {/* Edge status LED */}
                <circle cx="0" cy="0" r="2" fill="#F5A623" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.8s" repeatCount="indefinite" />
                </circle>
                {/* Antenna on top */}
                <line x1="16" y1="-16" x2="16" y2="-26" stroke="rgba(245,166,35,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="16" cy="-28" r="2" fill="rgba(245,166,35,0.4)" stroke="rgba(245,166,35,0.6)" strokeWidth="0.5" />
                {/* Label */}
                <text y="30" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Edge</text>
              </g>

              {/* === Cloud Platform Node (bottom-left) === */}
              <g className="node-icon" transform="translate(180, 560)">
                {/* Glow background */}
                <circle r="36" fill="rgba(27,127,224,0.15)" filter="url(#iot-glow)">
                  <animate attributeName="r" values="36;42;36" dur="3.2s" repeatCount="indefinite" />
                </circle>
                {/* Cloud shape */}
                <path
                  d="M -25 8 C -25 8, -28 8, -28 2 C -28 -4, -22 -8, -16 -8 C -14 -16, -6 -22, 4 -22 C 16 -22, 24 -14, 25 -4 C 30 -3, 32 1, 32 6 C 32 12, 28 14, 22 14 L -20 14 C -24 14, -28 12, -28 8 Z"
                  fill="rgba(27,127,224,0.25)"
                  stroke="rgba(27,127,224,0.6)"
                  strokeWidth="1.5"
                />
                {/* Upload/download arrows inside cloud */}
                <line x1="-4" y1="6" x2="-4" y2="-6" stroke="rgba(27,127,224,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M -8 -2 L -4 -6 L 0 -2" stroke="rgba(27,127,224,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="8" y1="-6" x2="8" y2="6" stroke="rgba(27,127,224,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 4 2 L 8 6 L 12 2" stroke="rgba(27,127,224,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Label */}
                <text y="32" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Cloud</text>
              </g>

              {/* === Analytics Dashboard Node (bottom-right) === */}
              <g className="node-icon" transform="translate(600, 560)">
                {/* Glow background */}
                <circle r="36" fill="rgba(245,166,35,0.15)" filter="url(#iot-glow)">
                  <animate attributeName="r" values="36;42;36" dur="3.4s" repeatCount="indefinite" />
                </circle>
                {/* Monitor frame */}
                <rect x="-26" y="-20" width="52" height="34" rx="3" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.6)" strokeWidth="1.5" />
                {/* Screen inner */}
                <rect x="-22" y="-16" width="44" height="26" rx="2" fill="rgba(245,166,35,0.12)" />
                {/* Bar chart visualization */}
                <rect x="-16" y="2" width="5" height="6" rx="1" fill="rgba(27,127,224,0.6)" />
                <rect x="-8" y="-4" width="5" height="12" rx="1" fill="rgba(245,166,35,0.6)" />
                <rect x="0" y="-1" width="5" height="9" rx="1" fill="rgba(27,127,224,0.6)" />
                <rect x="8" y="-8" width="5" height="16" rx="1" fill="rgba(245,166,35,0.7)" />
                {/* Trend line across bars */}
                <path d="M -14 2 L -6 -2 L 2 0 L 10 -6" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                {/* Dot at trend peak */}
                <circle cx="10" cy="-6" r="1.5" fill="#F5A623" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
                </circle>
                {/* Monitor stand */}
                <rect x="-4" y="14" width="8" height="6" fill="rgba(245,166,35,0.35)" />
                <rect x="-12" y="20" width="24" height="3" rx="1.5" fill="rgba(245,166,35,0.3)" stroke="rgba(245,166,35,0.45)" strokeWidth="0.5" />
                {/* Label */}
                <text y="38" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Analytics</text>
              </g>

              {/* === IoT Dashboard Panel === */}
              <g className="it-dashboard" transform="translate(600, 130)">
                <rect x="0" y="0" width="180" height="110" rx="8" fill="rgba(10,20,50,0.88)" stroke="rgba(27,127,224,0.4)" strokeWidth="1" />
                <text x="14" y="22" fill="rgba(255,255,255,0.9)" fontSize="9" fontWeight="bold" fontFamily="sans-serif">IoT OVERVIEW</text>
                <line x1="14" y1="30" x2="166" y2="30" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
                {/* Stat card 1 - Devices */}
                <rect x="14" y="38" width="72" height="28" rx="4" fill="rgba(27,127,224,0.2)" />
                <text x="50" y="50" textAnchor="middle" fill="#1B7FE0" fontSize="12" fontWeight="bold" fontFamily="sans-serif">10K+</text>
                <text x="50" y="60" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">DEVICES</text>
                {/* Stat card 2 - Status */}
                <rect x="94" y="38" width="72" height="28" rx="4" fill="rgba(245,166,35,0.2)" />
                <text x="130" y="50" textAnchor="middle" fill="#F5A623" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Real-Time</text>
                <text x="130" y="60" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="6" fontFamily="sans-serif">STREAMING</text>
                {/* Throughput mini chart */}
                <text x="14" y="82" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="sans-serif">Throughput</text>
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
                <rect x="14" y="98" width="145" height="4" rx="2" fill="rgba(27,127,224,0.6)" />
              </g>

              {/* === Floating Notification Badges === */}
              {/* Sensors Active - near hub */}
              <g transform="translate(340, 310)">
                <rect x="-48" y="-10" width="96" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(34,197,94,0.5)" strokeWidth="0.8" />
                {/* Green status dot */}
                <circle cx="-32" cy="0" r="3" fill="#22c55e" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Sensors Active</text>
              </g>

              {/* Edge Processing - near edge gateway */}
              <g transform="translate(200, 210)">
                <rect x="-52" y="-10" width="104" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(245,166,35,0.5)" strokeWidth="0.8" />
                {/* Gold status dot */}
                <circle cx="-36" cy="0" r="3" fill="#F5A623" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Edge Processing</text>
              </g>

              {/* Data Streaming - near sensor */}
              <g transform="translate(575, 185)">
                <rect x="-48" y="-10" width="96" height="20" rx="10" fill="rgba(10,20,50,0.92)" stroke="rgba(27,127,224,0.5)" strokeWidth="0.8" />
                {/* Blue status dot */}
                <circle cx="-32" cy="0" r="3" fill="#1B7FE0" opacity="0.95">
                  <animate attributeName="opacity" values="0.95;0.5;0.95" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <text x="4" y="3.5" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="600" fontFamily="sans-serif">Data Streaming</text>
              </g>

              {/* === Connection node dots at hub endpoints === */}
              {/* Hub top-right connection point */}
              <circle cx="450" cy="380" r="5" fill="#1B7FE0" opacity="0.8" filter="url(#iot-glow-sm)">
                <animate attributeName="opacity" values="0.8;0.35;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Hub top-left connection point */}
              <circle cx="350" cy="380" r="5" fill="#1B7FE0" opacity="0.8" filter="url(#iot-glow-sm)">
                <animate attributeName="opacity" values="0.8;0.35;0.8" dur="2.2s" repeatCount="indefinite" />
              </circle>
              {/* Hub bottom-left connection point */}
              <circle cx="360" cy="480" r="5" fill="#1B7FE0" opacity="0.7" filter="url(#iot-glow-sm)">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.4s" repeatCount="indefinite" />
              </circle>
              {/* Hub bottom-right connection point */}
              <circle cx="450" cy="480" r="5" fill="#F5A623" opacity="0.7" filter="url(#iot-glow-sm)">
                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.6s" repeatCount="indefinite" />
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
