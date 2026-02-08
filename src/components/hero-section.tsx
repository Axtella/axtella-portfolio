"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

import { AvatarStack } from "./avatar-stack";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const particleIndex = useRef(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation - word by word
      const words = headlineRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.fromTo(words, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.2,
          ease: "power4.out",
        });
      }

      // Subtext animation
      gsap.fromTo(subtextRef.current, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.5,
        ease: "power3.out",
      });

      // Button animation
      gsap.fromTo(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 0.7,
        ease: "back.out(1.7)",
      });

      // Hero visual animation - slide in from right
      gsap.fromTo(imageRef.current, {
        x: 100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // IoT Devices fade-in
      const devices = sectionRef.current?.querySelectorAll(".iot-device");
      if (devices) {
        gsap.fromTo(devices, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.8,
          ease: "power2.out",
        });
      }

      // Connection pipes fade-in
      const pipes = sectionRef.current?.querySelectorAll(".connection-pipe");
      if (pipes) {
        gsap.fromTo(pipes, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          delay: 0.6,
          ease: "power2.inOut",
        });
      }

      // Junction dots fade-in
      const junctions = sectionRef.current?.querySelectorAll(".junction-dot");
      if (junctions) {
        gsap.fromTo(junctions, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          delay: 1.0,
          ease: "power2.out",
        });
      }

      // Sparkle decorations entrance + continuous pulse
      const sparkles = sectionRef.current?.querySelectorAll(".sparkle-decoration");
      if (sparkles) {
        gsap.fromTo(sparkles, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 1.5,
          ease: "power2.out",
        });
        gsap.to(sparkles, {
          opacity: 0.6,
          duration: 1.5,
          stagger: 0.15,
          delay: 2.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastSpawn.current < 60) return;
    lastSpawn.current = now;

    const svg = e.currentTarget.querySelector("svg");
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const x = ((e.clientX - svgRect.left) / svgRect.width) * 900;
    const y = ((e.clientY - svgRect.top) / svgRect.height) * 700;

    for (let i = 0; i < 4; i++) {
      const p = particlesRef.current[particleIndex.current % particlesRef.current.length];
      particleIndex.current++;
      if (!p) continue;

      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 50;
      const tx = x + Math.cos(angle) * dist;
      const ty = y + Math.sin(angle) * dist;
      const isGold = Math.random() > 0.3;

      gsap.killTweensOf(p);
      gsap.set(p, { attr: { cx: x, cy: y, r: 1.5 + Math.random() * 2 }, opacity: 0.7, fill: isGold ? "#F5A623" : "#D4232F" });
      gsap.to(p, {
        attr: { cx: tx, cy: ty },
        opacity: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power2.out",
      });
    }
  };

  // Arrow1 Icon (from arrow-1.svg with dynamic coloring)
  const Arrow1Icon = () => (
    <svg className="w-5 h-7" viewBox="0 0 135 197" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.4802 40.691C27.1762 40.691 30.1724 37.6948 30.1724 33.9987C30.1724 30.3027 27.1762 27.3064 23.4802 27.3064C19.7841 27.3064 16.7879 30.3027 16.7879 33.9987C16.7879 37.6948 19.7841 40.691 23.4802 40.691Z" fill="currentColor"/>
      <path d="M43.3545 62.323C47.0506 62.323 50.0469 59.3268 50.0469 55.6308C50.0469 51.9347 47.0506 48.9385 43.3545 48.9385C39.6585 48.9385 36.6623 51.9347 36.6623 55.6308C36.6623 59.3268 39.6585 62.323 43.3545 62.323Z" fill="currentColor"/>
      <path d="M43.3545 40.691C47.0506 40.691 50.0469 37.6948 50.0469 33.9987C50.0469 30.3027 47.0506 27.3064 43.3545 27.3064C39.6585 27.3064 36.6623 30.3027 36.6623 33.9987C36.6623 37.6948 39.6585 40.691 43.3545 40.691Z" fill="currentColor"/>
      <path d="M63.229 62.323C66.925 62.323 69.9213 59.3268 69.9213 55.6308C69.9213 51.9347 66.925 48.9385 63.229 48.9385C59.533 48.9385 56.5367 51.9347 56.5367 55.6308C56.5367 59.3268 59.533 62.323 63.229 62.323Z" fill="currentColor"/>
      <path d="M63.229 83.522C66.925 83.522 69.9213 80.5258 69.9213 76.8297C69.9213 73.1337 66.925 70.1375 63.229 70.1375C59.533 70.1375 56.5367 73.1337 56.5367 76.8297C56.5367 80.5258 59.533 83.522 63.229 83.522Z" fill="currentColor"/>
      <path d="M63.2294 126.354C66.9257 126.354 69.9222 123.357 69.9222 119.661C69.9222 115.965 66.9257 112.969 63.2294 112.969C59.5331 112.969 56.5367 115.965 56.5367 119.661C56.5367 123.357 59.5331 126.354 63.2294 126.354Z" fill="currentColor"/>
      <path d="M43.3545 147.578C47.0506 147.578 50.0469 144.582 50.0469 140.886C50.0469 137.19 47.0506 134.194 43.3545 134.194C39.6585 134.194 36.6623 137.19 36.6623 140.886C36.6623 144.582 39.6585 147.578 43.3545 147.578Z" fill="currentColor"/>
      <path d="M63.229 147.578C66.925 147.578 69.9213 144.582 69.9213 140.886C69.9213 137.19 66.925 134.194 63.229 134.194C59.533 134.194 56.5367 137.19 56.5367 140.886C56.5367 144.582 59.533 147.578 63.229 147.578Z" fill="currentColor"/>
      <path d="M83.9405 83.522C87.6367 83.522 90.633 80.5258 90.633 76.8297C90.633 73.1337 87.6367 70.1375 83.9405 70.1375C80.2445 70.1375 77.2483 73.1337 77.2483 76.8297C77.2483 80.5258 80.2445 83.522 83.9405 83.522Z" fill="currentColor"/>
      <path d="M83.9405 104.722C87.6367 104.722 90.633 101.725 90.633 98.0288C90.633 94.3328 87.6367 91.3369 83.9405 91.3369C80.2445 91.3369 77.2483 94.3328 77.2483 98.0288C77.2483 101.725 80.2445 104.722 83.9405 104.722Z" fill="currentColor"/>
      <path d="M83.941 126.354C87.6374 126.354 90.6339 123.357 90.6339 119.661C90.6339 115.965 87.6374 112.969 83.941 112.969C80.2447 112.969 77.2483 115.965 77.2483 119.661C77.2483 123.357 80.2447 126.354 83.941 126.354Z" fill="currentColor"/>
      <path d="M23.4806 169.67C27.1769 169.67 30.1734 166.674 30.1734 162.978C30.1734 159.281 27.1769 156.285 23.4806 156.285C19.7844 156.285 16.7879 159.281 16.7879 162.978C16.7879 166.674 19.7844 169.67 23.4806 169.67Z" fill="currentColor"/>
      <path d="M43.355 169.67C47.0514 169.67 50.0478 166.674 50.0478 162.978C50.0478 159.281 47.0514 156.285 43.355 156.285C39.6587 156.285 36.6623 159.281 36.6623 162.978C36.6623 166.674 39.6587 169.67 43.355 169.67Z" fill="currentColor"/>
      <path d="M103.839 104.722C107.535 104.722 110.531 101.725 110.531 98.0288C110.531 94.3328 107.535 91.3369 103.839 91.3369C100.143 91.3369 97.1468 94.3328 97.1468 98.0288C97.1468 101.725 100.143 104.722 103.839 104.722Z" fill="currentColor"/>
    </svg>
  );


  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden lg:h-screen pb-6 sm:pb-8 lg:pb-0"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient bars - full width stair-step pattern */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[
            { height: '20%', left: '0%' },
            { height: '35%', left: '20%' },
            { height: '50%', left: '40%' },
            { height: '65%', left: '60%' },
            { height: '80%', left: '80%' },
          ].map((bar, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                width: '20%',
                height: bar.height,
                left: bar.left,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(20, 48, 90, 0.4) 54.81%, #14305A 100%)',
              }}
            />
          ))}
        </div>
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            backgroundImage: `url('/images/home/dot paatern.png')`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 lg:h-full">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-12 lg:h-full">
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-[45%] pt-28 sm:pt-32 md:pt-36 lg:pt-24 xl:pt-20 relative z-20 lg:flex lg:items-center">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
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
                <span className="word inline-block text-white">ENGINEERING</span>
                <br />
                <span className="word inline-block text-[#F5A623]">SMARTER</span>
                <br />
                <span className="word inline-block text-white">SOLUTIONS</span>
              </h1>

              {/* Subtext */}
              <p
                ref={subtextRef}
                className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed"
              >
                From telecommunications and IoT to smart buildings and construction
                — Axtella delivers end-to-end technology solutions across the Kingdom.
              </p>

              {/* CTA Button - With arrow-1 icon */}
              <button
                ref={buttonRef}
                className={cn(
                  "group flex items-center gap-4 bg-transparent text-white",
                  "px-6 py-3 rounded-full font-medium text-sm",
                  "border border-white/30 hover:border-[#F5A623] hover:bg-[#F5A623]/10",
                  "transition-all duration-300"
                )}
              >
                Discover More
                <Arrow1Icon />
              </button>

              {/* Trust Indicator */}
              <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-16">
                <AvatarStack delay={0.9} />
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual & Floating Cards */}
          <div
            ref={imageRef}
            className="relative w-full lg:w-[55%] h-[280px] sm:h-[320px] md:h-[400px] lg:h-[calc(100vh-80px)] lg:absolute lg:bottom-0 lg:right-0"
          >
            {/* Connected IoT Devices Illustration */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              onMouseMove={handleMouseMove}
            >
              <svg
                viewBox="0 0 900 700"
                className="w-full h-full"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                fill="none"
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* === Central Glow === */}
                <circle cx="440" cy="340" r="120" fill="#F5A623" opacity="0.08" filter="url(#glow)" />
                <circle cx="440" cy="340" r="50" fill="#F5A623" opacity="0.15" filter="url(#glow)" />
                <circle cx="440" cy="340" r="20" fill="#F5A623" opacity="0.3" />

                {/* === Particle burst pool === */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <circle
                    key={`bp-${i}`}
                    ref={(el) => { particlesRef.current[i] = el; }}
                    cx="0"
                    cy="0"
                    r="2.5"
                    fill="#F5A623"
                    opacity="0"
                  />
                ))}

                {/* === Connection Pipes (curved bezier paths with flowing dash animation) === */}
                <g>
                  {/* Router → Center */}
                  <path className="connection-pipe" d="M 220 168 C 300 200, 370 270, 440 340" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 3s linear infinite" }} />
                  {/* Dashboard → Center */}
                  <path className="connection-pipe" d="M 560 175 C 520 220, 480 280, 440 340" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 3.5s linear infinite" }} />
                  {/* Camera → Center */}
                  <path className="connection-pipe" d="M 322 377 C 360 367, 400 353, 440 340" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 2.5s linear infinite" }} />
                  {/* Server → Center */}
                  <path className="connection-pipe" d="M 690 400 C 620 387, 530 363, 440 340" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 4s linear infinite" }} />
                  {/* Phone → Center */}
                  <path className="connection-pipe" d="M 430 490 C 433 440, 437 395, 440 350" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 3.2s linear infinite" }} />
                  {/* Sensor → Center */}
                  <path className="connection-pipe" d="M 175 478 C 260 450, 350 395, 440 340" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 3.8s linear infinite" }} />
                  {/* Router → Dashboard (top arc) */}
                  <path className="connection-pipe" d="M 220 145 C 340 70, 480 70, 560 130" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 4.5s linear infinite" }} />
                  {/* Sensor → Phone (bottom arc) */}
                  <path className="connection-pipe" d="M 170 520 C 250 555, 340 555, 400 540" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 5s linear infinite" }} />
                  {/* Server → Dashboard (right side) */}
                  <path className="connection-pipe" d="M 730 360 C 738 300, 720 240, 700 190" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 4.2s linear infinite" }} />
                  {/* Camera → Sensor */}
                  <path className="connection-pipe" d="M 272 390 C 240 420, 200 450, 165 470" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="8 6" style={{ animation: "dash-flow 4.8s linear infinite" }} />
                </g>

                {/* === Junction Dots (at pipe midpoints and bends) === */}
                <g>
                  <circle className="junction-dot" cx="330" cy="233" r="3.5" fill="#F5A623" opacity="0.9" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="500" cy="255" r="3" fill="#F5A623" opacity="0.85" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="380" cy="358" r="3" fill="rgba(255,255,255,0.85)" />
                  <circle className="junction-dot" cx="565" cy="373" r="3.5" fill="#F5A623" opacity="0.85" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="436" cy="418" r="3" fill="rgba(255,255,255,0.8)" />
                  <circle className="junction-dot" cx="308" cy="418" r="3" fill="#F5A623" opacity="0.85" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="400" cy="85" r="3.5" fill="#F5A623" opacity="0.9" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="290" cy="548" r="3" fill="rgba(255,255,255,0.8)" />
                  <circle className="junction-dot" cx="730" cy="275" r="3" fill="#D4232F" opacity="0.85" filter="url(#glow-sm)" />
                  <circle className="junction-dot" cx="218" cy="435" r="3" fill="rgba(255,255,255,0.8)" />
                  <circle className="junction-dot" cx="440" cy="340" r="6" fill="#F5A623" opacity="0.9" filter="url(#glow)" />
                </g>

                {/* === Device: Router/Modem (top-left) === */}
                <g className="iot-device">
                  {/* Body */}
                  <rect x="130" y="140" width="90" height="40" rx="6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
                  {/* Left antenna */}
                  <line x1="155" y1="140" x2="148" y2="112" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="148" cy="109" r="3.5" fill="#F5A623" opacity="1" filter="url(#glow-sm)" />
                  {/* Right antenna */}
                  <line x1="195" y1="140" x2="202" y2="112" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="202" cy="109" r="3.5" fill="#F5A623" opacity="1" filter="url(#glow-sm)" />
                  {/* LED indicator dots */}
                  <circle cx="150" cy="164" r="2.5" fill="#F5A623">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="163" cy="164" r="2.5" fill="#D4232F">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="176" cy="164" r="2.5" fill="rgba(255,255,255,0.6)" />
                  {/* Ventilation lines */}
                  <line x1="195" y1="150" x2="210" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  <line x1="195" y1="155" x2="210" y2="155" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  <line x1="195" y1="160" x2="210" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                </g>

                {/* === Device: Dashboard/Monitor (top-right, largest) === */}
                <g className="iot-device">
                  {/* Screen frame */}
                  <rect x="560" y="80" width="160" height="110" rx="8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
                  {/* Inner screen */}
                  <rect x="572" y="92" width="136" height="82" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" fill="rgba(255,255,255,0.05)" />
                  {/* Bar charts (left half) */}
                  <rect x="582" y="104" width="38" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
                  <rect x="582" y="118" width="55" height="8" rx="2" fill="#F5A623" opacity="0.75" />
                  <rect x="582" y="132" width="45" height="8" rx="2" fill="#F5A623" opacity="0.9" />
                  <rect x="582" y="146" width="30" height="8" rx="2" fill="#D4232F" opacity="0.75" />
                  {/* Donut chart (right half) */}
                  <circle cx="670" cy="128" r="22" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
                  <circle cx="670" cy="128" r="22" stroke="#F5A623" strokeWidth="3.5" fill="none" strokeDasharray="55 138" strokeDashoffset="0" opacity="0.9" />
                  <circle cx="670" cy="128" r="22" stroke="#D4232F" strokeWidth="3.5" fill="none" strokeDasharray="28 138" strokeDashoffset="-62" opacity="0.75" />
                  {/* Percentage text hint */}
                  <text x="670" y="132" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontWeight="bold">72%</text>
                  {/* Stand */}
                  <line x1="640" y1="190" x2="640" y2="212" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
                  <line x1="618" y1="212" x2="662" y2="212" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* === Device: Security Camera (center-left) === */}
                <g className="iot-device">
                  {/* Wall mount bracket */}
                  <line x1="248" y1="342" x2="248" y2="368" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="248" y1="368" x2="278" y2="377" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
                  {/* Camera body */}
                  <rect x="272" y="363" width="52" height="28" rx="6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
                  {/* Lens outer ring */}
                  <circle cx="314" cy="377" r="11" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" />
                  {/* Lens inner */}
                  <circle cx="314" cy="377" r="5.5" fill="#F5A623" opacity="0.85" filter="url(#glow-sm)" />
                  {/* Recording LED */}
                  <circle cx="280" cy="370" r="2" fill="#D4232F">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Mounting plate */}
                  <rect x="242" y="336" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" />
                </g>

                {/* === Device: Smartphone (bottom-center) === */}
                <g className="iot-device">
                  {/* Phone body */}
                  <rect x="400" y="490" width="60" height="100" rx="10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
                  {/* Screen area */}
                  <rect x="407" y="503" width="46" height="68" rx="4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" fill="rgba(255,255,255,0.05)" />
                  {/* GPS Pin */}
                  <path d="M 430 522 c-6 0-10.5 4.5-10.5 10.5 c0 8.5 10.5 17 10.5 17 s10.5-8.5 10.5-17 c0-6-4.5-10.5-10.5-10.5z" fill="#D4232F" opacity="0.8" />
                  <circle cx="430" cy="532" r="4" fill="rgba(255,255,255,0.8)" />
                  {/* Map grid lines inside screen */}
                  <line x1="410" y1="520" x2="450" y2="520" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <line x1="410" y1="540" x2="450" y2="540" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <line x1="410" y1="555" x2="450" y2="555" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <line x1="425" y1="505" x2="425" y2="568" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  <line x1="440" y1="505" x2="440" y2="568" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
                  {/* Notch */}
                  <line x1="420" y1="496" x2="440" y2="496" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Home indicator */}
                  <line x1="420" y1="582" x2="440" y2="582" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* === Device: Server/IoT Hub (right) === */}
                <g className="iot-device">
                  {/* Server body */}
                  <rect x="690" y="360" width="80" height="85" rx="6" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
                  {/* Rack divider lines */}
                  <line x1="690" y1="388" x2="770" y2="388" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
                  <line x1="690" y1="416" x2="770" y2="416" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
                  {/* LED activity bars - slot 1 */}
                  <rect x="700" y="369" width="36" height="5" rx="2" fill="#F5A623" opacity="0.85">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="755" cy="372" r="2.5" fill="#F5A623" opacity="0.9" />
                  {/* LED activity bars - slot 2 */}
                  <rect x="700" y="397" width="26" height="5" rx="2" fill="#F5A623" opacity="0.7">
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" begin="0.3s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="755" cy="400" r="2.5" fill="#F5A623" opacity="0.8" />
                  {/* LED activity bars - slot 3 */}
                  <rect x="700" y="425" width="30" height="5" rx="2" fill="#D4232F" opacity="0.65">
                    <animate attributeName="opacity" values="0.4;0.85;0.4" dur="3s" begin="0.6s" repeatCount="indefinite" />
                  </rect>
                  <circle cx="755" cy="428" r="2.5" fill="#D4232F" opacity="0.75" />
                </g>

                {/* === Device: Sensor/Antenna Dish (bottom-left) === */}
                <g className="iot-device">
                  {/* Pole */}
                  <line x1="150" y1="470" x2="150" y2="535" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
                  {/* Base */}
                  <line x1="130" y1="535" x2="170" y2="535" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Dish (parabolic curve) */}
                  <path d="M 122 492 Q 150 455, 178 492" stroke="rgba(255,255,255,0.85)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Feed horn (center of dish) */}
                  <circle cx="150" cy="477" r="4.5" fill="#F5A623" opacity="0.95" filter="url(#glow-sm)" />
                  {/* Signal waves radiating right */}
                  <path d="M 178 478 Q 198 468, 198 488" stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 185 470 Q 213 458, 213 492" stroke="#F5A623" strokeWidth="1.2" fill="none" opacity="0.5">
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" begin="0.3s" repeatCount="indefinite" />
                  </path>
                  <path d="M 192 462 Q 228 448, 228 496" stroke="#F5A623" strokeWidth="1" fill="none" opacity="0.4">
                    <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2s" begin="0.6s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* === Sparkle Decorations (4-pointed stars + lightning bolts) === */}
                <g>
                  {/* Sparkle - between router and dashboard */}
                  <g className="sparkle-decoration" transform="translate(350, 120)">
                    <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#F5A623" opacity="0.9" />
                  </g>
                  {/* Sparkle - below center */}
                  <g className="sparkle-decoration" transform="translate(500, 460)">
                    <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#F5A623" opacity="0.85" />
                  </g>
                  {/* Sparkle - right of center, crimson */}
                  <g className="sparkle-decoration" transform="translate(630, 295)">
                    <path d="M 0 -7 L 2 -2 L 7 0 L 2 2 L 0 7 L -2 2 L -7 0 L -2 -2 Z" fill="#D4232F" opacity="0.85" />
                  </g>
                  {/* Sparkle - left area */}
                  <g className="sparkle-decoration" transform="translate(190, 310)">
                    <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#F5A623" opacity="0.8" />
                  </g>
                  {/* Sparkle - bottom right */}
                  <g className="sparkle-decoration" transform="translate(580, 530)">
                    <path d="M 0 -5 L 1.2 -1.2 L 5 0 L 1.2 1.2 L 0 5 L -1.2 1.2 L -5 0 L -1.2 -1.2 Z" fill="#F5A623" opacity="0.8" />
                  </g>
                  {/* Sparkle - far right, crimson */}
                  <g className="sparkle-decoration" transform="translate(780, 240)">
                    <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#D4232F" opacity="0.8" />
                  </g>
                  {/* Lightning bolt - upper center */}
                  <g className="sparkle-decoration" transform="translate(475, 195)">
                    <path d="M 0 0 L 3.5 7 L 0.5 6 L 4.5 14" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
                  </g>
                  {/* Lightning bolt - far left */}
                  <g className="sparkle-decoration" transform="translate(95, 410)">
                    <path d="M 0 0 L 3 6 L 0.5 5 L 3.5 11" stroke="#D4232F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
                  </g>
                </g>

                {/* === Ambient Particles (subtle life in empty areas) === */}
                <g>
                  {[
                    { cx: 95, cy: 75 },
                    { cx: 810, cy: 115 },
                    { cx: 845, cy: 510 },
                    { cx: 55, cy: 610 },
                    { cx: 490, cy: 650 },
                    { cx: 340, cy: 620 },
                    { cx: 780, cy: 550 },
                  ].map((p, i) => (
                    <circle
                      key={`particle-${i}`}
                      cx={p.cx}
                      cy={p.cy}
                      r="1.5"
                      fill="white"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.15;0.45;0.15"
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              </svg>


            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-t from-[#080D1A] to-transparent" />
    </section>
  );
}
