"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cable,
  Radio,
  Phone,
  Wifi,
  Network,
  Settings,
  Headphones,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const row1Features: Feature[] = [
  {
    id: 1,
    icon: Cable,
    title: "Fiber Optic Installation",
    description:
      "End-to-end fiber optic network design, splicing, termination, and testing. Single-mode and multi-mode solutions for high-speed, long-distance connectivity.",
  },
  {
    id: 2,
    icon: Radio,
    title: "Wireless Network Deployment",
    description:
      "Enterprise wireless infrastructure including 4G/5G small cells, point-to-point microwave links, and outdoor coverage solutions for any terrain.",
  },
  {
    id: 3,
    icon: Phone,
    title: "Unified Communications",
    description:
      "Integrated voice, video, messaging, and collaboration platforms. Microsoft Teams, Cisco Webex, and custom UC solutions for seamless business communication.",
  },
  {
    id: 4,
    icon: Wifi,
    title: "Enterprise Wi-Fi Solutions",
    description:
      "High-density Wi-Fi 6/6E deployments with centralized management, seamless roaming, and analytics for offices, warehouses, and public venues.",
  },
];

const row2Features: Feature[] = [
  {
    id: 5,
    icon: Network,
    title: "Network Design & Engineering",
    description:
      "Custom network topology design, capacity planning, equipment selection, and path engineering for reliable, scalable telecom infrastructure.",
  },
  {
    id: 6,
    icon: Settings,
    title: "Telecom Infrastructure Management",
    description:
      "Ongoing management of telecom assets including towers, cabinets, duct networks, and active equipment with preventive maintenance programs.",
  },
  {
    id: 7,
    icon: Headphones,
    title: "24/7 NOC Support",
    description:
      "Dedicated Network Operations Center with real-time monitoring, fault detection, escalation management, and guaranteed SLA response times.",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div
      data-feature-card
      className="group relative rounded-xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#F59E0B";
        el.style.boxShadow =
          "0 8px 30px rgba(0,0,0,0.08), 0 0 20px rgba(245,166,35,0.15)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#E5E7EB";
        el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
      }}
    >
      {/* Icon Circle */}
      <div
        data-icon-circle
        className="mx-auto flex items-center justify-center rounded-full"
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "#F59E0B",
        }}
      >
        <Icon size={24} color="#FFFFFF" strokeWidth={2} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "1.3",
          color: "#1F2937",
          marginTop: "16px",
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#6B7280",
          marginTop: "12px",
        }}
      >
        {feature.description}
      </p>
    </div>
  );
}

export function TelecomKeyFeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header fade in + slide up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Row 1 cards stagger from bottom
      const row1Cards = row1Ref.current?.querySelectorAll("[data-feature-card]");
      if (row1Cards) {
        gsap.fromTo(
          row1Cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Row 2 cards stagger from bottom
      const row2Cards = row2Ref.current?.querySelectorAll("[data-feature-card]");
      if (row2Cards) {
        gsap.fromTo(
          row2Cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Icon circles bounce
      const icons = sectionRef.current?.querySelectorAll("[data-icon-circle]");
      if (icons) {
        gsap.fromTo(
          icons,
          { scale: 0.8 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
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
      id="key-features"
      className="relative w-full overflow-hidden scroll-mt-16"
      style={{
        background: "linear-gradient(180deg, #0A2463 0%, #080D1A 100%)",
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
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#F59E0B",
              marginBottom: "12px",
            }}
          >
            Our Key Features
          </p>

          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: "1.15",
              color: "#FFFFFF",
            }}
          >
            Enterprise-Grade Telecom Solutions
          </h2>

          <p
            className=""
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.7",
              color: "#9CA3AF",
              marginTop: "16px",
              maxWidth: "600px",
            }}
          >
            Everything you need to design, deploy, and manage world-class
            telecommunication infrastructure — from a single trusted partner.
          </p>
        </div>

        {/* Row 1 — 4 cards */}
        <div
          ref={row1Ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {row1Features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Row 2 — 3 cards centered */}
        <div
          ref={row2Ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mt-5 lg:mt-6 lg:max-w-[75%] lg:mx-auto"
        >
          {row2Features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
