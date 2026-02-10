"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map, Truck, Bell, BarChart3, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Callout {
  icon: LucideIcon;
  title: string;
  description: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const callouts: Callout[] = [
  {
    icon: Map,
    title: "Live Map View",
    description:
      "Real-time vehicle positions on interactive map with route tracking",
    position: "top-left",
  },
  {
    icon: Truck,
    title: "Fleet Status Panel",
    description:
      "Every vehicle's speed, location, driver, and status at a glance",
    position: "top-right",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Instant notifications for speed violations, fuel drops, and zone breaches",
    position: "bottom-left",
  },
  {
    icon: BarChart3,
    title: "Analytics Engine",
    description:
      "AI-powered insights on fuel, routes, driver performance, and utilization",
    position: "bottom-right",
  },
];

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const featureCards: FeatureCard[] = [
  {
    icon: Map,
    title: "Live Map View",
    description:
      "Interactive map with real-time vehicle positions, route history playback, and geofence zones — all on one screen.",
  },
  {
    icon: Truck,
    title: "Fleet Status Panel",
    description:
      "Monitor every vehicle's speed, location, driver, fuel level, and online status — updated in real-time, at a glance.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "AI-powered insights on fuel consumption trends, route efficiency, driver scorecards, and fleet utilization reports.",
  },
  {
    icon: Smartphone,
    title: "Mobile Access 24/7",
    description:
      "Full dashboard access from iOS and Android apps — manage your fleet from anywhere, anytime, on any device.",
  },
];

// Callout position styles
const calloutPositions: Record<
  Callout["position"],
  { card: string; dot: string; line: { x1: string; y1: string; x2: string; y2: string } }
> = {
  "top-left": {
    card: "top-[5%] -left-[2%] xl:-left-[5%]",
    dot: "top-[18%] left-[18%]",
    line: { x1: "22%", y1: "12%", x2: "28%", y2: "22%" },
  },
  "top-right": {
    card: "top-[5%] -right-[2%] xl:-right-[5%]",
    dot: "top-[18%] right-[18%]",
    line: { x1: "78%", y1: "12%", x2: "72%", y2: "22%" },
  },
  "bottom-left": {
    card: "bottom-[5%] -left-[2%] xl:-left-[5%]",
    dot: "bottom-[22%] left-[18%]",
    line: { x1: "22%", y1: "88%", x2: "28%", y2: "78%" },
  },
  "bottom-right": {
    card: "bottom-[5%] -right-[2%] xl:-right-[5%]",
    dot: "bottom-[22%] right-[18%]",
    line: { x1: "78%", y1: "88%", x2: "72%", y2: "78%" },
  },
};

export function FleetDashboardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header stagger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Laptop mockup: scale + fade
      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { scale: 0.92, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mockupRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Callout cards stagger
      const calloutEls =
        calloutsRef.current?.querySelectorAll("[data-callout]");
      if (calloutEls) {
        gsap.fromTo(
          calloutEls,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mockupRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // SVG connector lines draw
      const lines =
        calloutsRef.current?.querySelectorAll("[data-connector-line]");
      if (lines) {
        lines.forEach((line, i) => {
          const el = line as SVGLineElement;
          const length = 200;
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 0.6,
            delay: 0.7 + i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mockupRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      // Feature cards stagger from bottom
      const cards = cardsRef.current?.querySelectorAll("[data-feature]");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#080D1A",
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* LAYER 1 — Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: "12px",
            }}
          >
            See It In Action
          </p>

          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: "1.2",
              color: "#FFFFFF",
            }}
          >
            Your Entire Fleet, One Powerful Dashboard
          </h2>

          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.7",
              color: "#9CA3AF",
              marginTop: "16px",
              maxWidth: "650px",
            }}
          >
            Track every vehicle, monitor driver behavior, manage fuel
            consumption, and receive smart alerts — all from a single intuitive
            platform.
          </p>
        </div>

        {/* LAYER 2 — Dashboard Mockup + Callouts */}
        <div className="relative mx-auto" style={{ maxWidth: "1100px" }}>
          {/* Blue glow behind mockup */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "80%",
              height: "80%",
              background:
                "radial-gradient(circle, #1B7FE0 0%, transparent 70%)",
              opacity: 0.12,
              animation: "glow-pulse 3s ease-in-out infinite",
            }}
          />

          {/* Desktop: Laptop image */}
          <div
            ref={mockupRef}
            className="relative mx-auto"
            style={{ width: "80%", maxWidth: "900px" }}
          >
            {/* Desktop laptop */}
            <div
              className="hidden md:block relative rounded-xl overflow-hidden"
              style={{
                transform: "perspective(1000px) rotateY(-3deg)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
                aspectRatio: "16/10",
              }}
            >
              <Image
                src="/images/fleet/fleet16.png"
                alt="Fleet management dashboard on laptop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 900px"
                priority
              />
            </div>

            {/* Mobile phone */}
            <div
              className="md:hidden relative mx-auto rounded-2xl overflow-hidden"
              style={{
                maxWidth: "300px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                aspectRatio: "9/16",
              }}
            >
              <Image
                src="/images/fleet/fleet17.png"
                alt="Fleet management dashboard on mobile"
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
          </div>

          {/* Callout cards + SVG connectors (desktop only) */}
          <div
            ref={calloutsRef}
            className="hidden lg:block absolute inset-0 pointer-events-none"
          >
            {/* SVG connector lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {callouts.map((callout, i) => {
                const pos = calloutPositions[callout.position];
                return (
                  <line
                    key={i}
                    data-connector-line
                    x1={pos.line.x1}
                    y1={pos.line.y1}
                    x2={pos.line.x2}
                    y2={pos.line.y2}
                    stroke="#F59E0B"
                    strokeWidth="0.15"
                    strokeDasharray="1 0.8"
                    opacity="0.3"
                  />
                );
              })}
            </svg>

            {/* Orange dots at dashboard edge */}
            {callouts.map((callout, i) => {
              const pos = calloutPositions[callout.position];
              return (
                <div
                  key={`dot-${i}`}
                  className={cn("absolute w-1.5 h-1.5 rounded-full", pos.dot)}
                  style={{ backgroundColor: "#F59E0B" }}
                />
              );
            })}

            {/* Callout cards */}
            {callouts.map((callout, i) => {
              const Icon = callout.icon;
              const pos = calloutPositions[callout.position];
              return (
                <div
                  key={i}
                  data-callout
                  className={cn(
                    "absolute pointer-events-auto",
                    pos.card
                  )}
                  style={{ width: "200px" }}
                >
                  <div
                    className="rounded-[10px] p-4"
                    style={{
                      backgroundColor: "rgba(17,24,39,0.9)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid #1F2937",
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-full mb-3"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#F59E0B",
                      }}
                    >
                      <Icon size={16} color="#FFFFFF" strokeWidth={2} />
                    </div>
                    <h4
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#FFFFFF",
                        marginBottom: "4px",
                      }}
                    >
                      {callout.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontSize: "12px",
                        lineHeight: "1.5",
                        color: "#9CA3AF",
                      }}
                    >
                      {callout.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LAYER 3 — Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 lg:mt-16"
        >
          {featureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                data-feature
                className="group rounded-xl transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  backgroundColor: "#111827",
                  border: "1px solid #1F2937",
                  padding: "28px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#F59E0B";
                  el.style.boxShadow =
                    "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(245,166,35,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#1F2937";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "#F59E0B",
                  }}
                >
                  <Icon size={22} color="#FFFFFF" strokeWidth={2} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 700,
                    fontSize: "17px",
                    color: "#FFFFFF",
                    marginTop: "16px",
                    lineHeight: "1.3",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#9CA3AF",
                    marginTop: "8px",
                  }}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* LAYER 4 — CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base",
              "bg-[#F59E0B] text-white",
              "hover:bg-[#D97706] hover:-translate-y-0.5",
              "transition-all duration-300"
            )}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Request a Demo
            <span>→</span>
          </Link>

          <button
            className={cn(
              "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base",
              "bg-transparent text-white border border-white/50",
              "hover:bg-white/10 hover:border-white",
              "transition-all duration-300"
            )}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Watch Video
            <span>▶</span>
          </button>
        </div>
      </div>

      {/* Glow pulse animation */}
      <style jsx>{`
        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.18;
          }
        }
      `}</style>
    </section>
  );
}
