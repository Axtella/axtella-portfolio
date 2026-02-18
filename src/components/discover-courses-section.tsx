"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { getLucideIcon } from "@/lib/icon-map";

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  isNew?: boolean;
  bulletPoints?: string[];
}

interface DiscoverServicesData {
  label?: string;
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  cards?: ServiceCard[];
}

const defaultCards: ServiceCard[] = [
  {
    title: "FLEET MANAGEMENT SOLUTIONS",
    description:
      "GPS tracking, route optimization, driver monitoring, fuel management, AI dashcams, and real-time fleet analytics for fleets of all sizes across Saudi Arabia.",
    icon: "Truck",
    color: "#F59E0B",
    link: "/services/fleet-management",
    isNew: true,
    bulletPoints: [
      "Real-Time GPS Tracking",
      "Driver Behavior Monitoring",
      "Fuel Monitoring & Theft Detection",
      "AI Video Telematics",
      "Custom Dashboards & API",
    ],
  },
  {
    title: "TELECOMMUNICATION SOLUTIONS",
    description:
      "End-to-end telecom infrastructure from fiber optic networks to wireless deployment and 24/7 network operations support.",
    icon: "Radio",
    color: "#1B7FE0",
    link: "/services/telecommunication-solutions",
    bulletPoints: [
      "Fiber Optic Installation & Splicing",
      "4G/5G Wireless Deployment",
      "Enterprise Wi-Fi 6/6E",
      "Network Design & Engineering",
      "24/7 NOC Monitoring & Support",
    ],
  },
  {
    title: "INFORMATION TECHNOLOGY",
    description:
      "Enterprise IT solutions including ERP systems, cloud migration, cybersecurity, and managed services for digital transformation.",
    icon: "Monitor",
    color: "#7C3AED",
    link: "/services/information-technology",
    bulletPoints: [
      "ERP Systems (SAP, Oracle)",
      "Cloud Infrastructure & Migration",
      "Cybersecurity Solutions",
      "Managed IT Services",
      "Custom Software Development",
    ],
  },
  {
    title: "INTERNET OF THINGS (IoT)",
    description:
      "Connected devices, smart sensors, and IoT platforms enabling intelligent automation for industries and infrastructure.",
    icon: "Globe",
    color: "#10B981",
    link: "/services/internet-of-things",
    bulletPoints: [
      "Industrial IoT Solutions",
      "Smart Sensors & Metering",
      "IoT Platform Integration",
      "Remote Monitoring Systems",
      "Predictive Analytics",
    ],
  },
  {
    title: "ELV SYSTEMS",
    description:
      "Complete extra low voltage systems for commercial, industrial, and government facilities across Saudi Arabia.",
    icon: "ShieldCheck",
    color: "#EF4444",
    link: "/services/elv-systems",
    bulletPoints: [
      "CCTV & Video Surveillance",
      "Access Control Systems",
      "Fire Alarm & Detection",
      "Public Address & PA Systems",
      "Structured Cabling",
    ],
  },
  {
    title: "BMS & SMART BUILDING",
    description:
      "Intelligent building management systems that optimize energy, comfort, and operational efficiency for modern facilities.",
    icon: "Building2",
    color: "#EAB308",
    link: "/services/bms-smart-building",
    bulletPoints: [
      "Building Management Systems (BMS)",
      "HVAC Automation & Control",
      "Energy Management & Optimization",
      "Lighting Control Systems",
      "Integrated Smart Platforms",
    ],
  },
  {
    title: "ELECTRO MECHANICAL WORKS",
    description:
      "Complete MEP solutions including electrical, plumbing, HVAC, and fire fighting systems for commercial and industrial projects.",
    icon: "Zap",
    color: "#D97706",
    link: "/services/electro-mechanical-works",
    bulletPoints: [
      "HV/LV Electrical Systems",
      "Plumbing & Drainage",
      "HVAC Installation & Ducting",
      "Fire Fighting Systems",
      "Complete MEP Solutions",
    ],
  },
  {
    title: "CIVIL & GENERAL CONSTRUCTION",
    description:
      "Road construction, site development, earthwork, and utility infrastructure for mega projects across the Kingdom.",
    icon: "HardHat",
    color: "#92400E",
    link: "/services/civil-general-construction",
    bulletPoints: [
      "Road & Highway Construction",
      "Site Development & Grading",
      "Utility Infrastructure",
      "Earthwork & Excavation",
      "Project Management",
    ],
  },
  {
    title: "MANAGED SERVICES",
    description:
      "Technical staffing, operations and maintenance support, and workforce solutions for telecom, IT, and infrastructure projects.",
    icon: "Users",
    color: "#6B7280",
    link: "/services/managed-services",
    bulletPoints: [
      "Technical Staffing & Outsourcing",
      "Operations & Maintenance (O&M)",
      "Facility Management",
      "Project-Based Manpower",
      "Training & Development",
    ],
  },
];

export function DiscoverCoursesSection({
  data,
}: {
  data?: DiscoverServicesData | null;
}) {
  const label = data?.label || "OUR SERVICES";
  const heading = data?.heading || "DISCOVER\nOUR SOLUTIONS";
  const subtext =
    data?.subtext ||
    "9 specialized service verticals delivering end-to-end technology and infrastructure solutions across the Kingdom.";
  const ctaLabel = data?.ctaLabel || "Explore All Services";
  const ctaHref = data?.ctaHref || "/services";
  const cards = data?.cards?.length ? data.cards : defaultCards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    }

    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) =>
    handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) =>
    handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  const handleTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, cards.length]);

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full min-h-[340px] md:min-h-[420px] lg:min-h-[520px] overflow-hidden mx-auto border-2 md:border-4 lg:border-[6px] rounded-2xl md:rounded-3xl lg:rounded-[36px] flex flex-col"
          style={{
            boxSizing: "border-box",
            background: "#181614",
            borderColor: "rgba(227, 227, 227, 0.1)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.11)",
          }}
        >
          {/* Responsive Flexbox Layout */}
          <div className="w-full flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
            {/* Left Side - Text Content */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <div className="mb-6 md:mb-8">
                <span
                  className="inline-block mb-3 md:mb-4 font-semibold uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(11px, 1.2vw, 14px)",
                    color: "#F5A623",
                  }}
                >
                  {label}
                </span>

                <h2
                  className="font-bold text-white mb-4 uppercase leading-tight"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(28px, 5vw, 56px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {heading.split("\n").map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h2>

                <p
                  className="text-white/60 max-w-md"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(13px, 1.3vw, 16px)",
                    lineHeight: "1.6",
                  }}
                >
                  {subtext}
                </p>
              </div>

              <a
                href={ctaHref}
                className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#D4910A] rounded-full px-5 py-2.5 md:px-7 md:py-3 transition-all duration-300 w-fit"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(12px, 1.5vw, 14px)",
                  fontWeight: 600,
                }}
              >
                <span className="text-white">{ctaLabel}</span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>

            {/* Right Side - Stacked Service Cards Slider */}
            <div
              className="relative w-full lg:w-3/5 flex items-center justify-start min-h-[260px] sm:min-h-[300px] md:min-h-[340px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div
                className="relative w-full h-full flex items-center justify-start"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              >
                {cards.map((card, index) => {
                  const offset =
                    (index - currentIndex + cards.length) % cards.length;
                  const isActive = offset === 0;
                  const isNext = offset === 1;

                  const IconComp = getLucideIcon(card.icon);

                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-700 ease-out rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-[80vw] sm:max-w-[70vw] md:max-w-[480px] lg:max-w-[520px]"
                      style={{
                        minHeight: "clamp(320px, 45vw, 480px)",
                        left: "0px",
                        transform: isActive
                          ? "translateX(0) scale(1)"
                          : isNext
                            ? "translateX(clamp(20px, 8vw, 120px)) scale(0.93)"
                            : "translateX(clamp(40px, 12vw, 200px)) scale(0.87)",
                        opacity: 1,
                        zIndex: isActive ? 30 : isNext ? 20 : 10,
                        pointerEvents: isActive ? "auto" : "none",
                        background: isActive
                          ? "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)"
                          : card.color,
                        userSelect: "none",
                      }}
                    >
                      <div className="relative w-full h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                        {isActive && (
                          <>
                            {/* Top Content */}
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div
                                  className="text-xs font-bold uppercase"
                                  style={{
                                    fontFamily: "var(--font-plus-jakarta)",
                                    color: card.color,
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  AXTELLA
                                </div>
                                {card.isNew && (
                                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-[#F5A623] text-[#080D1A] leading-none">
                                    NEW
                                  </span>
                                )}
                              </div>

                              <h3
                                className="font-bold text-black mb-3"
                                style={{
                                  fontFamily: "var(--font-montserrat)",
                                  fontSize: "clamp(18px, 2.5vw, 26px)",
                                  lineHeight: "1.1",
                                  letterSpacing: "-0.02em",
                                }}
                              >
                                {card.title}
                              </h3>

                              <p
                                className="text-gray-600"
                                style={{
                                  fontFamily: "var(--font-plus-jakarta)",
                                  fontSize: "clamp(12px, 1.3vw, 14px)",
                                  lineHeight: "1.5",
                                }}
                              >
                                {card.description}
                              </p>

                              {/* Bullet Points */}
                              {card.bulletPoints &&
                                card.bulletPoints.length > 0 && (
                                  <ul className="mt-3 space-y-1">
                                    {card.bulletPoints.map((point, i) => (
                                      <li
                                        key={i}
                                        className="flex items-start gap-2 text-gray-500"
                                        style={{
                                          fontSize: "clamp(11px, 1.1vw, 13px)",
                                        }}
                                      >
                                        <CheckCircle2
                                          size={14}
                                          className="mt-0.5 flex-shrink-0"
                                          style={{ color: card.color }}
                                        />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </div>

                            {/* Bottom Content */}
                            <div className="flex items-end justify-between mt-4">
                              <a
                                href={card.link}
                                className="rounded-xl sm:rounded-2xl text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:shadow-lg hover:opacity-90 inline-block"
                                style={{
                                  background: card.color,
                                  fontFamily: "var(--font-plus-jakarta)",
                                  fontSize: "clamp(12px, 2vw, 14px)",
                                }}
                              >
                                Learn More
                              </a>

                              {IconComp ? (
                                <div
                                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center"
                                  style={{
                                    background: `linear-gradient(135deg, ${card.color}40 0%, ${card.color}20 100%)`,
                                  }}
                                >
                                  <IconComp
                                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                                    style={{ color: card.color }}
                                  />
                                </div>
                              ) : (
                                <div
                                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold"
                                  style={{
                                    background: `linear-gradient(135deg, ${card.color}40 0%, ${card.color}20 100%)`,
                                    color: card.color,
                                    fontFamily: "var(--font-montserrat)",
                                  }}
                                >
                                  {card.title.charAt(0)}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Dotted Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "url('/images/home/dot paatern.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "150px",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>
    </section>
  );
}
