"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpCircle, ShieldCheck, Camera, Clock, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface StatCard {
  icon: LucideIcon;
  targetNumber: number | null;
  prefix?: string;
  suffix: string;
  displayValue: string;
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  progressPercent: number;
}

const stats: StatCard[] = [
  {
    icon: ArrowUpCircle,
    targetNumber: 1000,
    suffix: "+",
    displayValue: "1000+",
    title: "Installations Completed",
    description:
      "Over 1,000 ELV system installations across commercial, healthcare, hospitality, and industrial facilities in Saudi Arabia.",
    accentColor: "#F59E0B",
    accentBg: "rgba(245,158,11,0.15)",
    progressPercent: 85,
  },
  {
    icon: ShieldCheck,
    targetNumber: 99,
    suffix: ".9%",
    displayValue: "99.9%",
    title: "System Reliability",
    description:
      "Enterprise-grade ELV systems with redundant controllers, backup power, and proactive monitoring for maximum uptime.",
    accentColor: "#1B7FE0",
    accentBg: "rgba(27,127,224,0.15)",
    progressPercent: 99,
  },
  {
    icon: Camera,
    targetNumber: 500,
    suffix: "+",
    displayValue: "500+",
    title: "Camera Deployments",
    description:
      "Hundreds of CCTV surveillance projects with IP cameras, video analytics, and centralized monitoring solutions.",
    accentColor: "#10B981",
    accentBg: "rgba(16,185,129,0.15)",
    progressPercent: 70,
  },
  {
    icon: Clock,
    targetNumber: 30,
    prefix: "<",
    suffix: "min",
    displayValue: "<30min",
    title: "Response Time",
    description:
      "Guaranteed rapid on-site support with regional service teams and remote diagnostic capabilities for minimal downtime.",
    accentColor: "#F59E0B",
    accentBg: "rgba(245,158,11,0.15)",
    progressPercent: 90,
  },
  {
    icon: Zap,
    targetNumber: null,
    suffix: "",
    displayValue: "24/7",
    title: "Technical Support",
    description:
      "Round-the-clock monitoring, remote diagnostics, and emergency support for all installed ELV systems.",
    accentColor: "#1B7FE0",
    accentBg: "rgba(27,127,224,0.15)",
    progressPercent: 100,
  },
];

// Eased count-up hook
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start || target === 0) return;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

function StatCardComponent({
  stat,
  animated,
  index,
}: {
  stat: StatCard;
  animated: boolean;
  index: number;
}) {
  const Icon = stat.icon;
  const countValue = useCountUp(
    stat.targetNumber ?? 0,
    stat.targetNumber === 100 ? 2000 : 1500,
    animated
  );

  const displayNumber =
    stat.targetNumber === null
      ? "24/7"
      : `${stat.prefix ?? ""}${countValue}${stat.suffix}`;

  return (
    <div
      data-stat-card
      className="group relative rounded-[14px] text-center transition-all duration-300 hover:-translate-y-2"
      style={{
        backgroundColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.10)",
        padding: "32px 24px",
        minHeight: "280px",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "rgba(255,255,255,0.12)";
        el.style.borderColor = stat.accentColor + "66";
        el.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.backgroundColor = "rgba(255,255,255,0.06)";
        el.style.borderColor = "rgba(255,255,255,0.10)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <div
        data-stat-icon
        className="mx-auto flex items-center justify-center rounded-full"
        style={{
          width: "52px",
          height: "52px",
          backgroundColor: stat.accentBg,
        }}
      >
        <Icon size={24} color={stat.accentColor} strokeWidth={2} />
      </div>

      {/* Stat Number */}
      <p
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 800,
          fontSize: "clamp(36px, 3vw, 48px)",
          color: stat.accentColor,
          marginTop: "16px",
          lineHeight: "1.1",
        }}
      >
        {displayNumber}
      </p>

      {/* Divider */}
      <div
        className="mx-auto"
        style={{
          width: animated ? "40px" : "0px",
          height: "3px",
          backgroundColor: stat.accentColor,
          margin: "12px auto",
          transition: "width 0.6s ease",
          transitionDelay: `${0.3 + index * 0.15}s`,
        }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "18px",
          color: "#FFFFFF",
          marginTop: "8px",
        }}
      >
        {stat.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "13px",
          lineHeight: "1.6",
          color: "rgba(255,255,255,0.6)",
          marginTop: "12px",
        }}
      >
        {stat.description}
      </p>

      {/* Progress Bar */}
      <div
        className="mx-auto mt-4"
        style={{
          width: "80%",
          height: "4px",
          borderRadius: "2px",
          backgroundColor: "rgba(255,255,255,0.10)",
        }}
      >
        <div
          style={{
            width: animated ? `${stat.progressPercent}%` : "0%",
            height: "100%",
            borderRadius: "2px",
            backgroundColor: stat.accentColor,
            transition: "width 1.5s ease",
            transitionDelay: `${0.5 + index * 0.15}s`,
          }}
        />
      </div>
    </div>
  );
}

export function ELVStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [animated, setAnimated] = useState(false);

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

      // Cards stagger + trigger count-up
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-stat-card]");
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              onEnter: () => {
                if (!hasAnimated.current) {
                  hasAnimated.current = true;
                  setAnimated(true);
                }
              },
            },
          }
        );

        // Icon bounce
        const icons = cardsRef.current.querySelectorAll("[data-stat-icon]");
        gsap.fromTo(
          icons,
          { scale: 0.5 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA
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
      style={{ minHeight: "500px" }}
    >
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/fleet/fleet18.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,36,99,0.82) 0%, rgba(13,27,62,0.90) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16"
        style={{
          paddingTop: "clamp(60px, 7vw, 100px)",
          paddingBottom: "clamp(60px, 7vw, 100px)",
        }}
      >
        {/* Header */}
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
            Measurable Results
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
            Results That Speak For Themselves
          </h2>

          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.7)",
              marginTop: "16px",
              maxWidth: "650px",
            }}
          >
            Real impact from real installations — here&apos;s what our ELV
            solutions deliver for facilities across Saudi Arabia.
          </p>
        </div>

        {/* Stat Cards */}
        <div ref={cardsRef}>
          {/* Desktop: 5 in a row */}
          <div className="hidden lg:grid grid-cols-5 gap-5">
            {stats.map((stat, i) => (
              <StatCardComponent
                key={i}
                stat={stat}
                animated={animated}
                index={i}
              />
            ))}
          </div>

          {/* Tablet: 3+2 */}
          <div className="hidden md:grid lg:hidden gap-5">
            <div className="grid grid-cols-3 gap-5">
              {stats.slice(0, 3).map((stat, i) => (
                <StatCardComponent
                  key={i}
                  stat={stat}
                  animated={animated}
                  index={i}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-5 max-w-[66%] mx-auto">
              {stats.slice(3).map((stat, i) => (
                <StatCardComponent
                  key={i + 3}
                  stat={stat}
                  animated={animated}
                  index={i + 3}
                />
              ))}
            </div>
          </div>

          {/* Mobile: single column */}
          <div className="grid md:hidden grid-cols-1 gap-4">
            {stats.map((stat, i) => (
              <StatCardComponent
                key={i}
                stat={stat}
                animated={animated}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-12">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-base",
              "bg-[#F59E0B] text-white",
              "hover:bg-[#D97706] hover:-translate-y-0.5",
              "transition-all duration-300"
            )}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Upgrade Your Facility Today
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
