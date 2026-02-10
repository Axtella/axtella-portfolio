"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wrench,
  Laptop,
  Link as LinkIcon,
  Cloud,
  MapPin,
  Plug,
  Video,
  Fuel,
  Thermometer,
  Radio,
  Globe,
  Smartphone,
  Code,
  FileText,
  Bell,
  Database,
  Users,
  Truck,
  Landmark,
  TrendingUp,
  RefreshCw,
  Lock,
  ShieldCheck,
  ScrollText,
  ClipboardCheck,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  icon: LucideIcon;
  text: string;
}

interface TechCard {
  icon: LucideIcon;
  category: string;
  image: string;
  description: string;
  items: TechItem[];
}

const techCards: TechCard[] = [
  {
    icon: Wrench,
    category: "HARDWARE",
    image: "/images/fleet/fleet25.png",
    description:
      "Enterprise-grade tracking devices and sensors built for harsh environments, extreme temperatures, and 24/7 operation.",
    items: [
      { icon: MapPin, text: "GPS Trackers" },
      { icon: Plug, text: "OBD-II Adapters" },
      { icon: Video, text: "Dual-Lens Dashcams" },
      { icon: Fuel, text: "Fuel Level Sensors" },
      { icon: Thermometer, text: "Temperature Sensors" },
      { icon: Radio, text: "4G/LTE Communication Modules" },
    ],
  },
  {
    icon: Laptop,
    category: "SOFTWARE",
    image: "/images/fleet/fleet26.png",
    description:
      "Intelligent fleet management platform with real-time analytics, custom dashboards, and multi-device access.",
    items: [
      { icon: Globe, text: "Web Dashboard" },
      { icon: Smartphone, text: "iOS App" },
      { icon: Smartphone, text: "Android App" },
      { icon: Code, text: "REST API Gateway" },
      { icon: FileText, text: "Automated Reports" },
      { icon: Bell, text: "Smart Alert Engine" },
    ],
  },
  {
    icon: LinkIcon,
    category: "INTEGRATIONS",
    image: "/images/fleet/fleet27.png",
    description:
      "Connects seamlessly with your existing business systems, third-party tools, and government portals.",
    items: [
      { icon: Database, text: "ERP Systems (SAP, Oracle)" },
      { icon: Users, text: "CRM Platforms" },
      { icon: Fuel, text: "Fuel Card Providers" },
      { icon: Truck, text: "Logistics Software" },
      { icon: Landmark, text: "Government APIs & Portals" },
      { icon: Radio, text: "Third-Party Telematics" },
    ],
  },
  {
    icon: Cloud,
    category: "CLOUD & SECURITY",
    image: "/images/fleet/fleet28.png",
    description:
      "Secure, scalable cloud infrastructure hosted on AWS/Azure with 99.9% uptime guarantee and enterprise-grade encryption.",
    items: [
      { icon: Cloud, text: "AWS / Azure Hosted" },
      { icon: TrendingUp, text: "99.9% Uptime SLA" },
      { icon: RefreshCw, text: "Auto-Scaling Architecture" },
      { icon: Lock, text: "End-to-End Encryption" },
      { icon: ShieldCheck, text: "Role-Based Access Control" },
      { icon: ScrollText, text: "Data Privacy Compliance" },
    ],
  },
];

interface ComplianceBadge {
  icon: LucideIcon;
  text: string;
}

const complianceBadges: ComplianceBadge[] = [
  { icon: Radio, text: "CITC" },
  { icon: ClipboardCheck, text: "SASO" },
  { icon: Landmark, text: "MOT" },
  { icon: CheckCircle, text: "ISO 9001" },
  { icon: Lock, text: "ISO 27001" },
  { icon: Truck, text: "STA" },
];

export function FleetTechSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const complianceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(0);

  // GSAP entrance animations
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
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards stagger from bottom
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-tech-card]");
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

        // Icon circles bounce
        const icons = cardsRef.current.querySelectorAll("[data-tech-icon]");
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
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Compliance bar
      if (complianceRef.current) {
        gsap.fromTo(
          complianceRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: complianceRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        const badges =
          complianceRef.current.querySelectorAll("[data-badge]");
        gsap.fromTo(
          badges,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: complianceRef.current,
              start: "top 90%",
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
              start: "top 95%",
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
      className="relative w-full"
      style={{
        backgroundColor: "#F9FAFB",
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(60px, 7vw, 100px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-14">
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
            Technology & Integrations
          </p>

          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              lineHeight: "1.2",
              color: "#111827",
            }}
          >
            Powered By Industry-Leading Technology
          </h2>

          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: "1.7",
              color: "#6B7280",
              marginTop: "16px",
              maxWidth: "650px",
            }}
          >
            Enterprise-grade hardware, intelligent software, and seamless
            integrations — built for reliability, security, and scale.
          </p>
        </div>

        {/* Cards — Desktop/Tablet Grid */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {techCards.map((card, index) => {
            const CardIcon = card.icon;
            return (
              <div
                key={index}
                data-tech-card
                className={cn(
                  "group relative rounded-2xl overflow-hidden",
                  "transition-all duration-300",
                  "hover:-translate-y-1.5"
                )}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#F59E0B";
                  e.currentTarget.style.boxShadow =
                    "0 16px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.06)";
                }}
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: "180px" }}
                >
                  <Image
                    src={card.image}
                    alt={card.category}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Icon circle overlapping image */}
                <div
                  data-tech-icon
                  className="relative z-10 flex items-center justify-center rounded-full mx-7"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginTop: "-20px",
                    backgroundColor: "rgba(245,158,11,0.12)",
                  }}
                >
                  <CardIcon size={20} color="#F59E0B" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="px-7 pb-7 pt-4">
                  <h3
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "14px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#111827",
                    }}
                  >
                    {card.category}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: "#6B7280",
                      marginTop: "8px",
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#E5E7EB",
                      margin: "16px 0",
                    }}
                  />

                  {/* Item list */}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {card.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5"
                          style={{ marginBottom: "10px" }}
                        >
                          <ItemIcon
                            size={16}
                            color="#F59E0B"
                            strokeWidth={2}
                            className="flex-shrink-0"
                          />
                          <span
                            style={{
                              fontFamily: "var(--font-plus-jakarta)",
                              fontSize: "13px",
                              color: "#374151",
                              lineHeight: "1.4",
                            }}
                          >
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cards — Mobile Accordion */}
        <div className="md:hidden flex flex-col gap-3">
          {techCards.map((card, index) => {
            const CardIcon = card.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                data-tech-card
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: isOpen
                    ? "1px solid #F59E0B"
                    : "1px solid #E5E7EB",
                  boxShadow: isOpen
                    ? "0 8px 24px rgba(0,0,0,0.08)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="w-full flex items-center gap-3 p-4"
                >
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "rgba(245,158,11,0.12)",
                    }}
                  >
                    <CardIcon size={18} color="#F59E0B" strokeWidth={2} />
                  </div>
                  <span
                    className="flex-1 text-left"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "14px",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "#111827",
                    }}
                  >
                    {card.category}
                  </span>
                  <ChevronDown
                    size={20}
                    color="#6B7280"
                    className={cn(
                      "transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Accordion Body */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: isOpen ? "800px" : "0",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-4 pb-5">
                    {/* Image */}
                    <div
                      className="relative w-full rounded-lg overflow-hidden"
                      style={{ height: "160px" }}
                    >
                      <Image
                        src={card.image}
                        alt={card.category}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontSize: "13px",
                        lineHeight: "1.6",
                        color: "#6B7280",
                        marginTop: "14px",
                      }}
                    >
                      {card.description}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#E5E7EB",
                        margin: "14px 0",
                      }}
                    />

                    {/* Items */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {card.items.map((item, idx) => {
                        const ItemIcon = item.icon;
                        return (
                          <li
                            key={idx}
                            className="flex items-center gap-2.5"
                            style={{ marginBottom: "8px" }}
                          >
                            <ItemIcon
                              size={16}
                              color="#F59E0B"
                              strokeWidth={2}
                              className="flex-shrink-0"
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-plus-jakarta)",
                                fontSize: "13px",
                                color: "#374151",
                                lineHeight: "1.4",
                              }}
                            >
                              {item.text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Bar */}
        <div
          ref={complianceRef}
          className="mt-12 lg:mt-16"
          style={{
            backgroundColor: "#F3F4F6",
            borderRadius: "16px",
            padding: "24px 32px",
          }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#6B7280",
              marginBottom: "16px",
            }}
          >
            Certified & Compliant With:
          </p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 justify-items-center">
            {complianceBadges.map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={index}
                  data-badge
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5",
                    "rounded-lg transition-all duration-300",
                    "grayscale hover:grayscale-0"
                  )}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    padding: "12px 16px",
                    minWidth: "80px",
                    width: "100%",
                  }}
                >
                  <BadgeIcon size={20} color="#F59E0B" strokeWidth={2} />
                  <span
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 700,
                      fontSize: "11px",
                      color: "#374151",
                      textAlign: "center",
                    }}
                  >
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-10">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-1.5",
              "transition-all duration-300",
              "hover:gap-2.5 hover:underline"
            )}
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 700,
              fontSize: "16px",
              color: "#F59E0B",
            }}
          >
            View Full Tech Specifications
            <span className="transition-transform duration-300">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
