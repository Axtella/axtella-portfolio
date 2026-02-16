"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardList, PenTool, Rocket, ShieldCheck, Headphones,
  MessageCircle, Plug, Settings, Radio, Wrench, CheckCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  icon: LucideIcon;
  emoji: string;
  title: string;
  description: string;
  image: string;
}

const iconMapHIW: Record<string, LucideIcon> = {
  ClipboardList, PenTool, Rocket, ShieldCheck, Headphones,
  MessageCircle, Plug, Settings, Radio, Wrench, CheckCircle,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface HowItWorksData { label?: string; heading?: string; subtext?: string; steps?: any[] }

const defaultSteps: Step[] = [
  {
    number: "01",
    icon: ClipboardList,
    emoji: "📋",
    title: "Site Survey & Assessment",
    description:
      "We evaluate your existing telecom infrastructure, identify coverage gaps, assess capacity requirements, and map out the optimal network architecture for your operations.",
    image: "/images/fleet/fleet11.png",
  },
  {
    number: "02",
    icon: PenTool,
    emoji: "✏️",
    title: "Network Architecture Design",
    description:
      "Our engineers design custom network topology, select optimal equipment, plan fiber routes, and create detailed deployment blueprints aligned with your business needs.",
    image: "/images/fleet/fleet12.png",
  },
  {
    number: "03",
    icon: Rocket,
    emoji: "🚀",
    title: "Installation & Deployment",
    description:
      "Professional fiber laying, tower installation, structured cabling, equipment rack setup, and network configuration — all executed with minimal disruption to your operations.",
    image: "/images/fleet/fleet13.png",
  },
  {
    number: "04",
    icon: ShieldCheck,
    emoji: "🛡️",
    title: "Testing & Commissioning",
    description:
      "Comprehensive signal testing, load testing, failover validation, OTDR fiber testing, and full network certification before handover to ensure flawless performance.",
    image: "/images/fleet/fleet14.png",
  },
  {
    number: "05",
    icon: Headphones,
    emoji: "🎧",
    title: "Monitoring & Support",
    description:
      "24/7 NOC monitoring, preventive maintenance schedules, SLA management, performance optimization, and dedicated support to keep your network running at peak reliability.",
    image: "/images/fleet/fleet15.png",
  },
];

export function TelecomHowItWorksSection({ data }: { data?: HowItWorksData | null }) {
  const steps: Step[] = data?.steps
    ? data.steps.map((s: Record<string, string>, i: number) => ({
        number: s.number || String(i + 1).padStart(2, "0"),
        icon: iconMapHIW[s.icon] || defaultSteps[i]?.icon || ClipboardList,
        emoji: s.emoji || defaultSteps[i]?.emoji || "📋",
        title: s.title || defaultSteps[i]?.title || "",
        description: s.description || defaultSteps[i]?.description || "",
        image: s.image || defaultSteps[i]?.image || "/images/fleet/fleet11.png",
      }))
    : defaultSteps;
  const sectionLabel = data?.label || "How It Works";
  const sectionHeading = data?.heading || "From Survey to Optimization in 5 Steps";
  const sectionSubtext = data?.subtext || "We handle everything — from initial site survey to 24/7 network monitoring and ongoing optimization.";

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  // Header entrance animation
  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ScrollTrigger for each step
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((stepEl, index) => {
        if (!stepEl) return;

        ScrollTrigger.create({
          trigger: stepEl,
          start: "top 70%",
          end: "bottom 30%",
          onToggle: (self) => {
            if (self.isActive) setActiveStep(index);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: "#F9FAFB",
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
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
            {sectionLabel}
          </p>

          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: "1.15",
              color: "#111827",
            }}
          >
            {sectionHeading}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.7",
              color: "#6B7280",
              marginTop: "16px",
              maxWidth: "600px",
            }}
          >
            {sectionSubtext}
          </p>
        </div>

        {/* Main Content: Left Steps + Right Image */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12">
          {/* Left Column — Steps Timeline */}
          <div className="relative">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isCompleted = activeStep > index;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className="relative flex gap-5"
                  style={{
                    paddingBottom: index < steps.length - 1 ? "clamp(24px, 3vw, 48px)" : "0",
                  }}
                >
                  {/* Timeline Line + Dot */}
                  <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: "40px" }}>
                    {/* Number Circle */}
                    <div
                      className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: isActive || isCompleted ? "#F59E0B" : "#E5E7EB",
                        boxShadow: isActive ? "0 0 0 8px rgba(245,158,11,0.15)" : "none",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: isActive || isCompleted ? "#FFFFFF" : "#9CA3AF",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div
                        className="flex-1 transition-colors duration-300"
                        style={{
                          width: "2px",
                          backgroundColor: isCompleted ? "#F59E0B" : "#E5E7EB",
                          marginTop: "8px",
                        }}
                      />
                    )}
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={cn(
                      "flex-1 rounded-xl transition-all duration-400 pb-2",
                      isActive
                        ? "bg-white shadow-lg"
                        : "bg-transparent"
                    )}
                    style={{
                      padding: isActive ? "24px" : "24px 24px 24px 0",
                      borderLeft: isActive ? "3px solid #F59E0B" : "3px solid transparent",
                    }}
                  >
                    {/* Icon + Title Row */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: isActive || isCompleted ? "rgba(245,158,11,0.12)" : "rgba(229,231,235,0.5)",
                        }}
                      >
                        <Icon
                          size={18}
                          className="transition-colors duration-300"
                          color={isActive || isCompleted ? "#F59E0B" : "#9CA3AF"}
                          strokeWidth={2}
                        />
                      </div>

                      <h3
                        className="transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "clamp(16px, 1.3vw, 20px)",
                          lineHeight: "1.3",
                          color: isActive ? "#111827" : "#6B7280",
                        }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{
                        maxHeight: isActive ? "200px" : "60px",
                        opacity: isActive ? 1 : 0.4,
                        marginTop: "12px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta)",
                          fontSize: "clamp(13px, 1vw, 15px)",
                          lineHeight: "1.6",
                          color: "#374151",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Mobile inline image */}
                    <div
                      className={cn(
                        "lg:hidden mt-4 rounded-xl overflow-hidden transition-all duration-400",
                        isActive ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column — Sticky Image */}
          <div className="hidden lg:block">
            <div className="sticky" style={{ top: "120px" }}>
              {/* Image Container */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  aspectRatio: "16/10",
                }}
              >
                {steps.map((step, index) => (
                  <Image
                    key={step.number}
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-opacity duration-500 ease-in-out"
                    style={{ opacity: activeStep === index ? 1 : 0 }}
                    sizes="55vw"
                    priority={index === 0}
                  />
                ))}
              </div>

              {/* Step Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeStep === index ? "32px" : "8px",
                      height: "8px",
                      backgroundColor: activeStep === index ? "#F59E0B" : "#D1D5DB",
                    }}
                  />
                ))}
              </div>

              {/* Step Counter */}
              <p
                className="text-center mt-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                Step{" "}
                <span style={{ fontWeight: 600, color: "#111827" }}>
                  {steps[activeStep].number}
                </span>{" "}
                of 05 —{" "}
                <span style={{ fontWeight: 600, color: "#F59E0B" }}>
                  {steps[activeStep].title}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
