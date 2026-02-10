"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Truck,
  HardHat,
  Building2,
  Bus,
  Wrench,
  Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface IndustryCard {
  id: number;
  icon: LucideIcon;
  title: string;
  tagline: string;
  image: string;
  features: string[];
}

const industryCards: IndustryCard[] = [
  {
    id: 1,
    icon: Truck,
    title: "Logistics & Delivery",
    tagline: "Optimize every mile of your supply chain",
    image: "/images/fleet/fleet19.png",
    features: [
      "Route optimization & ETA tracking",
      "Proof of delivery with timestamps",
      "Multi-stop planning & load management",
    ],
  },
  {
    id: 2,
    icon: HardHat,
    title: "Construction",
    tagline: "Track heavy assets across every site",
    image: "/images/fleet/fleet20.png",
    features: [
      "Heavy equipment GPS tracking",
      "Geofencing for project sites",
      "Fuel consumption for machinery",
    ],
  },
  {
    id: 3,
    icon: Building2,
    title: "Corporate Fleets",
    tagline: "Full control over company vehicles",
    image: "/images/fleet/fleet21.png",
    features: [
      "Employee vehicle assignment & logs",
      "Trip-based cost allocation",
      "Unauthorized use detection",
    ],
  },
  {
    id: 4,
    icon: Bus,
    title: "Public Transport",
    tagline: "Safer, smarter public mobility",
    image: "/images/fleet/fleet22.png",
    features: [
      "Schedule adherence monitoring",
      "Passenger safety alerts",
      "Route compliance & deviation detection",
    ],
  },
  {
    id: 5,
    icon: Wrench,
    title: "Field Service",
    tagline: "Dispatch smarter, respond faster",
    image: "/images/fleet/fleet23.png",
    features: [
      "Nearest technician auto-dispatch",
      "Job completion tracking",
      "SLA monitoring & reporting",
    ],
  },
  {
    id: 6,
    icon: Landmark,
    title: "Government",
    tagline: "Secure, compliant fleet operations",
    image: "/images/fleet/fleet24.png",
    features: [
      "Encrypted & secure tracking",
      "Full regulatory compliance",
      "Multi-department fleet auditing",
    ],
  },
];

export function FleetIndustriesSection() {
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

  const getCardWidth = () => {
    if (!isMounted) return 320;
    if (windowWidth < 768) return windowWidth - 48;
    if (windowWidth < 1024) return Math.min(320, (windowWidth - 72) / 2.5);
    return Math.min(340, (windowWidth - 120) / 3.5);
  };

  const getGap = () => {
    if (!isMounted) return 24;
    if (windowWidth < 768) return 16;
    return 24;
  };

  const getVisibleCards = () => {
    if (!isMounted) return 3;
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const cardWidth = getCardWidth();
  const gap = getGap();
  const totalSlides = industryCards.length;
  const visibleCards = getVisibleCards();
  const maxSlide = Math.max(0, totalSlides - visibleCards);

  // Mount + resize
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header text stagger
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Nav arrows fade in from right
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

      // Cards stagger from right
      const cards = sectionRef.current?.querySelectorAll(
        "[data-industry-card]"
      );
      if (cards) {
        gsap.fromTo(
          cards,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Icon circles bounce
      const icons = sectionRef.current?.querySelectorAll(
        "[data-industry-icon]"
      );
      if (icons) {
        gsap.fromTo(
          icons,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
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

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, maxSlide]);

  // Drag handlers
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

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();
  const handleTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        paddingTop: "clamp(60px, 7vw, 100px)",
        paddingBottom: "clamp(60px, 7vw, 100px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-14">
          {/* Left: Text */}
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
              Built For Every Fleet
            </h2>

            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.6)",
                marginTop: "12px",
                maxWidth: "520px",
              }}
            >
              Our fleet management solutions are trusted across multiple
              industries — from logistics and construction to government and
              public transport.
            </p>
          </div>

          {/* Right: Arrow Buttons — desktop only */}
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
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
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

        {/* Carousel */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex cursor-grab active:cursor-grabbing select-none"
            style={{
              transform: `translateX(${-currentSlide * (cardWidth + gap)}px)`,
              transition: isDragging ? "none" : "transform 500ms ease-out",
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
            {industryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  data-industry-card
                  className="flex-shrink-0 group"
                  style={{ width: `${cardWidth}px` }}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      "transition-all duration-300",
                      "hover:-translate-y-2"
                    )}
                    style={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      minHeight: "480px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#F59E0B";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(245,158,11,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#334155";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Card Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ height: "200px" }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Bottom gradient blend */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-12"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(30,41,59,0.6), transparent)",
                        }}
                      />
                    </div>

                    {/* Icon Circle — overlapping image bottom */}
                    <div
                      data-industry-icon
                      className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
                      style={{
                        width: "48px",
                        height: "48px",
                        top: "176px",
                        backgroundColor: "#F59E0B",
                        border: "3px solid #1E293B",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      <Icon size={22} color="#FFFFFF" strokeWidth={2} />
                    </div>

                    {/* Card Content */}
                    <div className="pt-10 pb-6 px-5">
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
                        {card.title}
                      </h3>

                      {/* Tagline */}
                      <p
                        style={{
                          fontFamily: "var(--font-plus-jakarta)",
                          fontSize: "14px",
                          fontStyle: "italic",
                          color: "#F59E0B",
                          textAlign: "center",
                          marginTop: "6px",
                        }}
                      >
                        {card.tagline}
                      </p>

                      {/* Feature list */}
                      <ul
                        style={{
                          marginTop: "16px",
                          listStyle: "none",
                          padding: 0,
                        }}
                      >
                        {card.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2"
                            style={{ marginBottom: "10px" }}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#22C55E"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="flex-shrink-0 mt-0.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span
                              style={{
                                fontFamily: "var(--font-plus-jakarta)",
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

                      {/* Learn More */}
                      <div
                        className="text-center"
                        style={{ marginTop: "16px" }}
                      >
                        <span
                          className={cn(
                            "inline-flex items-center gap-1",
                            "transition-all duration-300",
                            "group-hover:gap-2"
                          )}
                          style={{
                            fontFamily: "var(--font-plus-jakarta)",
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#F59E0B",
                            cursor: "pointer",
                          }}
                        >
                          Learn More
                          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            &rarr;
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators — mobile/tablet */}
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
