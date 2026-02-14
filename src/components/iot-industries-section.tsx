"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Factory,
  Building2,
  Heart,
  Sprout,
  Truck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Industry {
  id: number;
  icon: LucideIcon;
  title: string;
  tagline: string;
  features: string[];
  image: string;
}

const industries: Industry[] = [
  {
    id: 1,
    icon: Factory,
    title: "Manufacturing",
    tagline: "Smart factory automation and predictive maintenance",
    features: [
      "Production line monitoring",
      "Predictive equipment maintenance",
      "Quality control sensors",
    ],
    image: "/images/fleet/fleet1.png",
  },
  {
    id: 2,
    icon: Building2,
    title: "Smart Cities",
    tagline: "Connected urban infrastructure for sustainable cities",
    features: [
      "Smart street lighting systems",
      "Environmental monitoring",
      "Traffic & parking sensors",
    ],
    image: "/images/fleet/fleet2.png",
  },
  {
    id: 3,
    icon: Heart,
    title: "Healthcare",
    tagline: "IoT-enabled patient monitoring and asset tracking",
    features: [
      "Remote patient monitoring",
      "Medical asset tracking",
      "Cold chain management",
    ],
    image: "/images/fleet/fleet3.png",
  },
  {
    id: 4,
    icon: Sprout,
    title: "Agriculture",
    tagline: "Precision farming with sensor-driven insights",
    features: [
      "Soil & moisture monitoring",
      "Automated irrigation systems",
      "Crop health analytics",
    ],
    image: "/images/fleet/fleet4.png",
  },
  {
    id: 5,
    icon: Truck,
    title: "Logistics & Supply Chain",
    tagline: "Real-time tracking and warehouse optimization",
    features: [
      "Fleet & asset tracking",
      "Warehouse environmental monitoring",
      "Supply chain visibility",
    ],
    image: "/images/fleet/fleet5.png",
  },
  {
    id: 6,
    icon: Zap,
    title: "Oil & Gas",
    tagline: "Industrial IoT for energy sector operations",
    features: [
      "Pipeline monitoring sensors",
      "Remote site telemetry",
      "Hazardous area monitoring",
    ],
    image: "/images/fleet/fleet6.png",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function IoTIndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  /* ---- responsive helpers ---- */

  const getVisibleCards = () => {
    if (!isMounted) return 3;
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const getCardWidth = () => {
    if (!isMounted) return 380;
    if (windowWidth < 768) return windowWidth - 48;
    if (windowWidth < 1024)
      return Math.min(340, (windowWidth - 48 - 24) / 2);
    return Math.min(380, (windowWidth * 0.85 - 64) / 3);
  };

  const getGap = () => {
    if (!isMounted) return 24;
    if (windowWidth < 768) return 16;
    return 24;
  };

  const cardWidth = getCardWidth();
  const gap = getGap();
  const totalSlides = industries.length;
  const visibleCards = getVisibleCards();
  const maxSlide = Math.max(0, totalSlides - visibleCards);

  /* ---- mount + resize ---- */

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---- GSAP entrance animations ---- */

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Header text — slide in from left, stagger 0.12 */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { x: -40, opacity: 0 },
          {
            x: 0,
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

      /* Nav arrows fade in from right */
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* Cards — rise from below, stagger 0.12 */
      const cards = sectionRef.current?.querySelectorAll(
        "[data-industry-card]"
      );
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* Icon circles — scale bounce */
      const icons = sectionRef.current?.querySelectorAll(
        "[data-icon-circle]"
      );
      if (icons) {
        gsap.fromTo(
          icons,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.4,
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

  /* ---- auto-advance every 5 s (pause on hover) ---- */

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, maxSlide]);

  /* ---- drag / swipe handlers ---- */

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
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
      } else {
        setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
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

  /* ---- slide navigation ---- */

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #080D1A 0%, #0A2463 50%, #080D1A 100%)",
        paddingTop: "clamp(48px, 6vw, 96px)",
        paddingBottom: "clamp(48px, 6vw, 96px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* -------------------------------------------------------- */}
        {/*  Header Row                                               */}
        {/* -------------------------------------------------------- */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          {/* Left — text */}
          <div ref={headerRef}>
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
              Industries We Serve
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
              IoT Solutions For Every Industry
            </h2>

            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.6)",
                marginTop: "12px",
                maxWidth: "560px",
              }}
            >
              From manufacturing to smart cities — we deliver specialized IoT
              solutions tailored to the unique challenges of each sector.
            </p>
          </div>

          {/* Right — arrow buttons (desktop only) */}
          <div
            ref={navRef}
            className="hidden lg:flex items-center gap-3 opacity-0"
          >
            <button
              onClick={prevSlide}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300"
              )}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F59E0B";
                e.currentTarget.style.borderColor = "#F59E0B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.15)";
              }}
              aria-label="Previous industry"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "transition-all duration-300"
              )}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F59E0B";
                e.currentTarget.style.borderColor = "#F59E0B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.15)";
              }}
              aria-label="Next industry"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Carousel                                                  */}
        {/* -------------------------------------------------------- */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex cursor-grab active:cursor-grabbing select-none"
            style={{
              transform: `translateX(${-currentSlide * (cardWidth + gap)}px)`,
              transition: isDragging
                ? "none"
                : "transform 500ms ease-out",
              gap: `${gap}px`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.id}
                  data-industry-card
                  className="flex-shrink-0 group"
                  style={{ width: `${cardWidth}px` }}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-xl",
                      "transition-all duration-300",
                      "hover:-translate-y-2"
                    )}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.10)";
                      e.currentTarget.style.borderColor =
                        "rgba(245,166,35,0.33)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                    }}
                  >
                    {/* Card Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        height: "200px",
                        borderTopLeftRadius: "0.75rem",
                        borderTopRightRadius: "0.75rem",
                      }}
                    >
                      <Image
                        src={industry.image}
                        alt={industry.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Overlapping icon circle */}
                    <div
                      data-icon-circle
                      className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
                      style={{
                        width: "48px",
                        height: "48px",
                        top: "176px",
                        backgroundColor: "#F59E0B",
                        border: "4px solid #FFFFFF",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                        zIndex: 10,
                      }}
                    >
                      <Icon
                        size={20}
                        color="#FFFFFF"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Card Content */}
                    <div
                      style={{
                        paddingTop: "2rem",
                        paddingBottom: "1.5rem",
                        paddingLeft: "1.25rem",
                        paddingRight: "1.25rem",
                      }}
                    >
                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "18px",
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        {industry.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta)",
                          fontSize: "13px",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.5)",
                          textAlign: "center",
                          marginTop: "6px",
                          lineHeight: "1.5",
                        }}
                      >
                        {industry.tagline}
                      </p>

                      {/* Feature list */}
                      <ul
                        style={{
                          marginTop: "16px",
                          listStyle: "none",
                          padding: 0,
                        }}
                      >
                        {industry.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2"
                            style={{ marginBottom: "10px" }}
                          >
                            <span
                              style={{
                                color: "#F59E0B",
                                fontWeight: 700,
                                fontSize: "14px",
                                lineHeight: "1.4",
                                flexShrink: 0,
                              }}
                            >
                              &#10003;
                            </span>
                            <span
                              style={{
                                fontFamily:
                                  "var(--font-plus-jakarta)",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.7)",
                                lineHeight: "1.5",
                              }}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Mobile dot indicators                                     */}
        {/* -------------------------------------------------------- */}
        <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-[#F59E0B] w-8"
                  : "bg-gray-600 hover:bg-gray-500 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
