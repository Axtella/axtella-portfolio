"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Camera,
  Fingerprint,
  Flame,
  Volume2,
  Cable,
  Phone,
  Monitor,
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
    icon: Camera,
    title: "HD IP Camera Systems",
    description:
      "Multi-megapixel IP cameras with night vision, wide dynamic range, video analytics, and centralized recording for complete facility surveillance.",
  },
  {
    id: 2,
    icon: Fingerprint,
    title: "Biometric Access Solutions",
    description:
      "Fingerprint, facial recognition, and card-based access control systems with audit trails, time attendance, and visitor management integration.",
  },
  {
    id: 3,
    icon: Flame,
    title: "Intelligent Fire Detection",
    description:
      "Addressable fire alarm panels, smoke/heat detectors, beam detectors, and aspirating systems compliant with NFPA and local regulations.",
  },
  {
    id: 4,
    icon: Volume2,
    title: "Emergency Voice Systems",
    description:
      "Public address and voice evacuation systems with zone control, pre-recorded messages, and emergency override for safety compliance.",
  },
];

const row2Features: Feature[] = [
  {
    id: 5,
    icon: Cable,
    title: "Cat6A/Fiber Infrastructure",
    description:
      "Structured cabling design and installation including Cat6A copper, single/multi-mode fiber optic, patch panels, and cable management systems.",
  },
  {
    id: 6,
    icon: Phone,
    title: "Integrated Intercom",
    description:
      "IP-based intercom and door entry systems with video calling, remote unlock, and integration with access control for seamless communication.",
  },
  {
    id: 7,
    icon: Monitor,
    title: "Centralized Control Room",
    description:
      "Unified command center design with video walls, workstation layout, operator interfaces, and integrated alarm management across all ELV subsystems.",
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

export function ELVKeyFeaturesSection() {
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
            Integrated ELV Solutions
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
            Everything you need to secure, monitor, and connect your facility
            — from a single trusted ELV partner.
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
