"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  BarChart3,
  Rocket,
  Landmark,
  TrendingDown,
  ChevronDown,
  Check,
  X,
  Radio,
  Video,
  Eye,
  Thermometer,
  Scale,
  Banknote,
  Bus,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ───────── DATA ───────── */

interface PriceTier {
  range: string;
  price: string;
  isLowest?: boolean;
}

interface PricingPlan {
  icon: LucideIcon;
  name: string;
  subtitle: string;
  description: string;
  startingFrom: string | null;
  tiers: PriceTier[] | null;
  features: string[];
  ctaText: string;
  ctaStyle: "ghost" | "filled" | "ghost-orange";
  isPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    icon: MapPin,
    name: "BASIC",
    subtitle: "Essential Tracking",
    description: "For small fleets needing core visibility",
    startingFrom: "SAR 30",
    tiers: [
      { range: "1-20", price: "SAR 36" },
      { range: "21-50", price: "SAR 34" },
      { range: "51-100", price: "SAR 32" },
      { range: "100+", price: "SAR 30", isLowest: true },
    ],
    features: [
      "Real-time vehicle tracking",
      "Live location & movement status",
      "Ignition ON/OFF monitoring",
      "Basic alerts (overspeed, stop, offline)",
      "Web and mobile access",
      "Standard reports (PDF / Excel)",
    ],
    ctaText: "Get Started",
    ctaStyle: "ghost",
  },
  {
    icon: BarChart3,
    name: "STANDARD",
    subtitle: "Fleet Management",
    description: "For growing fleets needing intelligence",
    startingFrom: "SAR 34",
    tiers: [
      { range: "1-20", price: "SAR 40" },
      { range: "21-50", price: "SAR 38" },
      { range: "51-100", price: "SAR 36" },
      { range: "100+", price: "SAR 34", isLowest: true },
    ],
    features: [
      "All Basic features",
      "Trip history & route playback",
      "Geo-fencing with alerts",
      "Driver behavior monitoring",
      "Idle time & utilization reports",
      "Email & system notifications",
    ],
    ctaText: "Get Started",
    ctaStyle: "ghost",
  },
  {
    icon: Rocket,
    name: "ADVANCED",
    subtitle: "Enterprise Control",
    description: "For fleets that need full operational control",
    startingFrom: "SAR 50",
    tiers: [
      { range: "1-20", price: "SAR 56" },
      { range: "21-50", price: "SAR 54" },
      { range: "51-100", price: "SAR 52" },
      { range: "100+", price: "SAR 50", isLowest: true },
    ],
    features: [
      "All Standard features",
      "Driver performance scoring",
      "Maintenance & service reminders",
      "Fuel monitoring (device dependent)",
      "Custom dashboards & reports",
      "API integration support",
    ],
    ctaText: "Get Started",
    ctaStyle: "filled",
    isPopular: true,
  },
  {
    icon: Landmark,
    name: "ENTERPRISE",
    subtitle: "/ Government",
    description: "For large-scale & government operations",
    startingFrom: null,
    tiers: null,
    features: [
      "All Advanced features",
      "Dedicated account manager",
      "SLA-based support",
      "Multi-branch & role-based access",
      "Custom workflows & integrations",
      "Government & enterprise compliance readiness",
    ],
    ctaText: "Contact Sales",
    ctaStyle: "ghost-orange",
  },
];

interface HardwareAddon {
  icon: LucideIcon;
  name: string;
  description: string;
  oneTime: string;
  monthly: string;
}

const hardwareAddons: HardwareAddon[] = [
  {
    icon: Radio,
    name: "Standard GPS Tracker",
    description: "4G-enabled, CST Approved for Saudi market.",
    oneTime: "SAR 180 – 250",
    monthly: "SAR 30 – 36",
  },
  {
    icon: Video,
    name: "Front Facing Dashcam",
    description: "HD recording of the road ahead for safety and liability.",
    oneTime: "SAR 650 – 900",
    monthly: "SAR 40 – 55",
  },
  {
    icon: Eye,
    name: "Dual Facing Dashcam (AI)",
    description: "Driver + road. AI driver monitoring for safety & compliance.",
    oneTime: "SAR 1,200 – 1,600",
    monthly: "SAR 60 – 80",
  },
  {
    icon: Thermometer,
    name: "Temperature Sensor",
    description: "Cold chain logistics — real-time cargo temperature monitoring.",
    oneTime: "SAR 180 – 280",
    monthly: "SAR 25 – 35",
  },
  {
    icon: Scale,
    name: "Load Sensor",
    description: "Measures vehicle load per axle. Prevents overloading.",
    oneTime: "SAR 2,500 – 3,500",
    monthly: "SAR 60 – 80",
  },
  {
    icon: Banknote,
    name: "ATM Tracking Kit",
    description: "High-security assets. Tamper alerts & power monitoring.",
    oneTime: "SAR 450 – 650",
    monthly: "SAR 45 – 65",
  },
  {
    icon: Bus,
    name: "School Bus Solution",
    description: "GPS tracking + Parent App for real-time student safety.",
    oneTime: "SAR 280 – 350",
    monthly: "SAR 35 – 45",
  },
];

interface ComparisonRow {
  feature: string;
  basic: boolean;
  standard: boolean;
  advanced: boolean;
  enterprise: boolean;
  isCategory?: boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: "TRACKING", basic: false, standard: false, advanced: false, enterprise: false, isCategory: true },
  { feature: "Real-time vehicle tracking", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Live location & movement", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Ignition ON/OFF monitoring", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Trip history & route playback", basic: false, standard: true, advanced: true, enterprise: true },
  { feature: "Geo-fencing with alerts", basic: false, standard: true, advanced: true, enterprise: true },
  { feature: "MONITORING", basic: false, standard: false, advanced: false, enterprise: false, isCategory: true },
  { feature: "Basic alerts (overspeed, stop, offline)", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Driver behavior monitoring", basic: false, standard: true, advanced: true, enterprise: true },
  { feature: "Driver performance scoring", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "Idle time & utilization reports", basic: false, standard: true, advanced: true, enterprise: true },
  { feature: "Fuel monitoring (device dependent)", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "Maintenance & service reminders", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "PLATFORM", basic: false, standard: false, advanced: false, enterprise: false, isCategory: true },
  { feature: "Web and mobile access", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Standard reports (PDF/Excel)", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Email & system notifications", basic: false, standard: true, advanced: true, enterprise: true },
  { feature: "Custom dashboards & reports", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "API integration support", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "Custom workflows & integrations", basic: false, standard: false, advanced: false, enterprise: true },
  { feature: "SUPPORT", basic: false, standard: false, advanced: false, enterprise: false, isCategory: true },
  { feature: "Standard support", basic: true, standard: true, advanced: true, enterprise: true },
  { feature: "Priority support", basic: false, standard: false, advanced: true, enterprise: true },
  { feature: "Dedicated account manager", basic: false, standard: false, advanced: false, enterprise: true },
  { feature: "SLA-based support", basic: false, standard: false, advanced: false, enterprise: true },
  { feature: "Multi-branch & role-based access", basic: false, standard: false, advanced: false, enterprise: true },
  { feature: "Government compliance readiness", basic: false, standard: false, advanced: false, enterprise: true },
];

/* ───────── COMPONENT ───────── */

export function FleetPricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const hardwareHeaderRef = useRef<HTMLDivElement>(null);
  const hardwareRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showComparison, setShowComparison] = useState(false);

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header
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

      // Pricing cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-pricing-card]");
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
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Volume note
      if (volumeRef.current) {
        gsap.fromTo(
          volumeRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: volumeRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Hardware header
      if (hardwareHeaderRef.current) {
        gsap.fromTo(
          hardwareHeaderRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hardwareHeaderRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Hardware cards
      if (hardwareRef.current) {
        const hwCards = hardwareRef.current.querySelectorAll("[data-hw-card]");
        gsap.fromTo(
          hwCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hardwareRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
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
      className="relative w-full"
      style={{
        background: "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(60px, 7vw, 100px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* ═══ HEADER ═══ */}
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
            Pricing & Packages
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
            Scalable Plans For Every Fleet Size
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
            Volume-based discounted pricing designed to deliver greater value as
            your fleet expands. From small fleets to 10,000+ vehicles.
          </p>
        </div>

        {/* ═══ PRICING CARDS — Desktop/Tablet ═══ */}
        <div ref={cardsRef}>
          {/* Desktop: 4 in row */}
          <div className="hidden lg:grid grid-cols-4 gap-5 items-start">
            {plans.map((plan, i) => (
              <PricingCard key={i} plan={plan} />
            ))}
          </div>

          {/* Tablet: 2x2 */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
            {plans.map((plan, i) => (
              <PricingCard key={i} plan={plan} />
            ))}
          </div>

          {/* Mobile: single col, Advanced first */}
          <div className="md:hidden flex flex-col gap-5">
            {[plans[2], plans[1], plans[0], plans[3]].map((plan, i) => (
              <PricingCard key={i} plan={plan} />
            ))}
          </div>
        </div>

        {/* ═══ VOLUME DISCOUNT NOTE ═══ */}
        <div
          ref={volumeRef}
          className="flex items-center gap-4 mx-auto mt-10"
          style={{
            backgroundColor: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.20)",
            borderRadius: "12px",
            padding: "20px 32px",
            maxWidth: "700px",
          }}
        >
          <TrendingDown
            size={24}
            color="#F59E0B"
            strokeWidth={2}
            className="flex-shrink-0"
          />
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                fontSize: "15px",
                color: "#FFFFFF",
              }}
            >
              Volume discounts apply automatically
            </p>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "13px",
                color: "#9CA3AF",
                marginTop: "4px",
              }}
            >
              The more vehicles you add, the less you pay per unit. All plans
              support scaling from small fleets to 10,000+.
            </p>
          </div>
        </div>

        {/* ═══ HARDWARE ADD-ONS ═══ */}
        <div
          ref={hardwareHeaderRef}
          className="text-center mt-16 lg:mt-20 mb-10"
        >
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
            Specialized Hardware Add-Ons
          </p>

          <h3
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 28px)",
              lineHeight: "1.2",
              color: "#FFFFFF",
            }}
          >
            Enhance Your Fleet With Purpose-Built Devices
          </h3>

          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              lineHeight: "1.7",
              color: "#9CA3AF",
              marginTop: "12px",
              maxWidth: "580px",
            }}
          >
            Add dashcams, sensors, and industry-specific kits to any plan.
            One-time device cost + optional monthly service fee.
          </p>
        </div>

        <div ref={hardwareRef}>
          {/* Desktop: 4+3 */}
          <div className="hidden lg:grid gap-5">
            <div className="grid grid-cols-4 gap-5">
              {hardwareAddons.slice(0, 4).map((addon, i) => (
                <HardwareCard key={i} addon={addon} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-5 max-w-[75%] mx-auto">
              {hardwareAddons.slice(4).map((addon, i) => (
                <HardwareCard key={i + 4} addon={addon} />
              ))}
            </div>
          </div>

          {/* Tablet: 2 cols */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
            {hardwareAddons.map((addon, i) => (
              <HardwareCard key={i} addon={addon} />
            ))}
          </div>

          {/* Mobile: single col */}
          <div className="md:hidden flex flex-col gap-4">
            {hardwareAddons.map((addon, i) => (
              <HardwareCard key={i} addon={addon} />
            ))}
          </div>
        </div>

        {/* ═══ COMPARISON TABLE TOGGLE ═══ */}
        <div className="mt-14 lg:mt-16">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={cn(
              "mx-auto flex items-center gap-2 px-8 py-3 rounded-lg",
              "transition-all duration-300"
            )}
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "var(--font-montserrat)",
              fontWeight: 600,
              fontSize: "15px",
              color: "#FFFFFF",
            }}
          >
            Compare All Plans
            <ChevronDown
              size={18}
              className={cn(
                "transition-transform duration-300",
                showComparison && "rotate-180"
              )}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxHeight: showComparison ? "2000px" : "0",
              opacity: showComparison ? 1 : 0,
              marginTop: showComparison ? "24px" : "0",
            }}
          >
            <div className="overflow-x-auto">
              <table
                className="w-full"
                style={{
                  minWidth: "640px",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(245,158,11,0.10)",
                    }}
                  >
                    <th
                      className="text-left"
                      style={{
                        padding: "14px 20px",
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "#F59E0B",
                        width: "40%",
                      }}
                    >
                      Feature
                    </th>
                    {["Basic", "Standard", "Advanced", "Ent."].map((h) => (
                      <th
                        key={h}
                        className="text-center"
                        style={{
                          padding: "14px 12px",
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "#F59E0B",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) =>
                    row.isCategory ? (
                      <tr
                        key={i}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                        }}
                      >
                        <td
                          colSpan={5}
                          style={{
                            padding: "10px 20px",
                            fontFamily: "var(--font-montserrat)",
                            fontWeight: 700,
                            fontSize: "12px",
                            letterSpacing: "2px",
                            color: "rgba(255,255,255,0.5)",
                            textTransform: "uppercase",
                          }}
                        >
                          {row.feature}
                        </td>
                      </tr>
                    ) : (
                      <tr
                        key={i}
                        style={{
                          backgroundColor:
                            i % 2 === 0
                              ? "rgba(255,255,255,0.02)"
                              : "transparent",
                        }}
                      >
                        <td
                          style={{
                            padding: "10px 20px",
                            fontFamily: "var(--font-plus-jakarta)",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.8)",
                          }}
                        >
                          {row.feature}
                        </td>
                        {(
                          [
                            row.basic,
                            row.standard,
                            row.advanced,
                            row.enterprise,
                          ] as boolean[]
                        ).map((val, j) => (
                          <td key={j} className="text-center" style={{ padding: "10px 12px" }}>
                            {val ? (
                              <Check
                                size={16}
                                color="#10B981"
                                strokeWidth={3}
                                className="inline-block"
                              />
                            ) : (
                              <X
                                size={16}
                                color="#EF4444"
                                strokeWidth={2.5}
                                className="inline-block opacity-40"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM CTA ═══ */}
        <div
          ref={ctaRef}
          className="text-center mt-14 lg:mt-16"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "40px 32px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "clamp(20px, 2vw, 24px)",
              color: "#FFFFFF",
            }}
          >
            Need a custom quotation?
          </h3>
          <p
            className="mx-auto"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: "1.7",
              color: "#9CA3AF",
              marginTop: "8px",
              maxWidth: "550px",
            }}
          >
            We&apos;d be happy to arrange a live demo or provide a custom quote
            based on your fleet size and operational needs.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base",
                "bg-[#F59E0B] text-white hover:bg-[#D97706]",
                "transition-all duration-300 hover:-translate-y-0.5"
              )}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Request Custom Quote
              <span>&rarr;</span>
            </Link>

            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-base",
                "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
                "transition-all duration-300"
              )}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Schedule Live Demo
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <a
              href="mailto:sales@axtellaglobal.com"
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[#F59E0B]"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Mail size={16} />
              sales@axtellaglobal.com
            </a>
            <a
              href="tel:+966557323274"
              className="flex items-center gap-2 transition-colors duration-300 hover:text-[#F59E0B]"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <Phone size={16} />
              +966 55 732 3274
            </a>
          </div>

          {/* Trust Points */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            <span className="flex items-center gap-1.5">
              <Shield size={14} color="#10B981" /> CST-compliant devices
            </span>
            <span>·</span>
            <span>Secure cloud platform</span>
            <span>·</span>
            <span>Local technical support</span>
            <span>·</span>
            <span>Fast onboarding</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── SUB-COMPONENTS ───────── */

function PricingCard({ plan }: { plan: PricingPlan }) {
  const Icon = plan.icon;

  return (
    <div
      data-pricing-card
      className={cn(
        "relative rounded-2xl transition-all duration-300 flex flex-col",
        plan.isPopular && "lg:scale-105 lg:z-10"
      )}
      style={{
        backgroundColor: "#1E293B",
        border: plan.isPopular
          ? "2px solid #F59E0B"
          : "1px solid #334155",
        boxShadow: plan.isPopular
          ? "0 20px 60px rgba(245,158,11,0.2)"
          : "none",
        padding: "0",
      }}
      onMouseEnter={(e) => {
        if (!plan.isPopular) {
          e.currentTarget.style.borderColor = "#F59E0B";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(0,0,0,0.3)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!plan.isPopular) {
          e.currentTarget.style.borderColor = "#334155";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "none";
        }
      }}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div
          className="text-center py-2.5"
          style={{
            backgroundColor: "#F59E0B",
            borderRadius: "14px 14px 0 0",
            fontFamily: "var(--font-montserrat)",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "2px",
            color: "#FFFFFF",
            textTransform: "uppercase",
          }}
        >
          Most Popular
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Icon + Name */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "rgba(245,158,11,0.12)",
            }}
          >
            <Icon size={20} color="#F59E0B" strokeWidth={2} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                fontSize: "20px",
                color: "#FFFFFF",
              }}
            >
              {plan.name}
            </h3>
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#F59E0B",
            marginTop: "4px",
          }}
        >
          {plan.subtitle}
        </p>

        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "13px",
            color: "#9CA3AF",
            marginTop: "8px",
            lineHeight: "1.5",
          }}
        >
          {plan.description}
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.08)",
            margin: "16px 0",
          }}
        />

        {/* Price */}
        {plan.startingFrom ? (
          <div>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#6B7280",
              }}
            >
              Starting from
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "32px",
                color: "#FFFFFF",
                marginTop: "4px",
                lineHeight: "1",
              }}
            >
              {plan.startingFrom}
            </p>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "13px",
                color: "#9CA3AF",
                marginTop: "2px",
              }}
            >
              /vehicle/month
            </p>
          </div>
        ) : (
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "28px",
                color: "#FFFFFF",
                lineHeight: "1.1",
              }}
            >
              Custom
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
                fontSize: "28px",
                color: "#FFFFFF",
                lineHeight: "1.1",
              }}
            >
              Pricing
            </p>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "13px",
                color: "#9CA3AF",
                marginTop: "6px",
                lineHeight: "1.5",
              }}
            >
              Based on fleet size, SLA, integrations, and support level
            </p>
          </div>
        )}

        {/* Mini Pricing Table */}
        {plan.tiers && (
          <div
            className="mt-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              className="flex justify-between"
              style={{
                backgroundColor: "rgba(245,158,11,0.10)",
                padding: "6px 12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                }}
              >
                Fleet Size
              </span>
              <span
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#F59E0B",
                }}
              >
                Price
              </span>
            </div>
            {plan.tiers.map((tier, i) => (
              <div
                key={i}
                className="flex justify-between"
                style={{
                  padding: "8px 12px",
                  borderTop:
                    i > 0
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {tier.range}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: tier.isLowest ? "#10B981" : "#FFFFFF",
                  }}
                >
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.08)",
            margin: "16px 0",
          }}
        />

        {/* Features */}
        <ul
          className="flex-1"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {plan.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2"
              style={{ marginBottom: "10px" }}
            >
              <Check
                size={16}
                color="#10B981"
                strokeWidth={2.5}
                className="flex-shrink-0 mt-0.5"
              />
              <span
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: "1.4",
                }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={cn(
            "mt-6 w-full text-center py-3 rounded-lg font-semibold text-sm",
            "transition-all duration-300 inline-block",
            plan.ctaStyle === "filled" &&
              "bg-[#F59E0B] text-white hover:bg-[#D97706]",
            plan.ctaStyle === "ghost" &&
              "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
            plan.ctaStyle === "ghost-orange" &&
              "border border-[#F59E0B]/40 text-[#F59E0B] hover:border-[#F59E0B] hover:bg-[#F59E0B]/10"
          )}
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {plan.ctaText} &rarr;
        </Link>
      </div>
    </div>
  );
}

function HardwareCard({ addon }: { addon: HardwareAddon }) {
  const Icon = addon.icon;

  return (
    <div
      data-hw-card
      className={cn(
        "rounded-xl transition-all duration-300",
        "hover:-translate-y-1"
      )}
      style={{
        backgroundColor: "#1E293B",
        border: "1px solid #334155",
        padding: "24px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1B7FE0";
        e.currentTarget.style.boxShadow =
          "0 8px 24px rgba(27,127,224,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#334155";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: "rgba(27,127,224,0.15)",
        }}
      >
        <Icon size={22} color="#1B7FE0" strokeWidth={2} />
      </div>

      {/* Name */}
      <h4
        style={{
          fontFamily: "var(--font-montserrat)",
          fontWeight: 700,
          fontSize: "16px",
          color: "#FFFFFF",
          marginTop: "14px",
        }}
      >
        {addon.name}
      </h4>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-plus-jakarta)",
          fontSize: "13px",
          color: "#9CA3AF",
          lineHeight: "1.5",
          marginTop: "6px",
        }}
      >
        {addon.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "#334155",
          margin: "14px 0",
        }}
      />

      {/* Pricing */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#6B7280",
            }}
          >
            One-Time
          </span>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
            }}
          >
            {addon.oneTime}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#6B7280",
            }}
          >
            Monthly
          </span>
          <span
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 700,
              fontSize: "14px",
              color: "#FFFFFF",
            }}
          >
            {addon.monthly}
          </span>
        </div>
      </div>
    </div>
  );
}
