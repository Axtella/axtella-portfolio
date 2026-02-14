"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const offerCards = [
  {
    id: 1,
    title: "Site Development & Earthworks",
    icon: "⛰️",
    image: "/images/fleet/fleet1.png",
  },
  {
    id: 2,
    title: "Structural Engineering",
    icon: "🏗️",
    image: "/images/fleet/fleet2.png",
  },
  {
    id: 3,
    title: "Concrete & Steel Works",
    icon: "🔨",
    image: "/images/fleet/fleet3.png",
  },
  {
    id: 4,
    title: "Road & Infrastructure",
    icon: "🛣️",
    image: "/images/fleet/fleet4.png",
  },
  {
    id: 5,
    title: "Interior Fit-Out",
    icon: "🖌️",
    image: "/images/fleet/fleet5.png",
  },
  {
    id: 6,
    title: "Renovation & Restoration",
    icon: "🔄",
    image: "/images/fleet/fleet6.png",
  },
  {
    id: 7,
    title: "Project Management",
    icon: "📋",
    image: "/images/fleet/fleet7.png",
  },
];

export function CGCOffersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const getVisibleCards = () => {
    if (!isMounted) return 3;
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const getCardWidth = () => {
    if (!isMounted) return 320;
    if (windowWidth < 640) return windowWidth - 48;
    if (windowWidth < 1024) return Math.min(300, (windowWidth * 0.6 - 48) / 2);
    return Math.min(340, (windowWidth * 0.55 - 64) / 3);
  };

  const getGap = () => {
    if (!isMounted) return 24;
    if (windowWidth < 640) return 16;
    return 24;
  };

  const cardWidth = getCardWidth();
  const gap = getGap();
  const totalSlides = offerCards.length;
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
      // Left column text stagger
      gsap.fromTo(
        [labelRef.current, headingRef.current, subtextRef.current, navRef.current],
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

      // Cards stagger from right
      const cards = sectionRef.current?.querySelectorAll("[data-offer-card]");
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
      const icons = sectionRef.current?.querySelectorAll("[data-icon-circle]");
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

  const displaySlide = String(currentSlide + 1).padStart(2, "0");
  const displayTotal = String(totalSlides).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{
        paddingTop: "clamp(48px, 5vw, 96px)",
        paddingBottom: "clamp(48px, 5vw, 96px)",
      }}
    >
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* Left Column — Text */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-32 flex-shrink-0">
            <p
              ref={labelRef}
              className="opacity-0"
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
              Civil &amp; General Construction
            </p>

            <h2
              ref={headingRef}
              className="opacity-0"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 36px)",
                lineHeight: "1.15",
                color: "#111827",
              }}
            >
              What We Offer
            </h2>

            <p
              ref={subtextRef}
              className="opacity-0"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                lineHeight: "1.7",
                color: "#6B7280",
                marginTop: "16px",
                maxWidth: "460px",
              }}
            >
              End-to-end construction services from site development and
              structural engineering to interior fit-out — delivering quality
              projects across Saudi Arabia.
            </p>

            {/* Navigation */}
            <div
              ref={navRef}
              className="flex items-center gap-4 opacity-0"
              style={{ marginTop: "clamp(24px, 2.5vw, 40px)" }}
            >
              <button
                onClick={prevSlide}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center",
                  "transition-all duration-300",
                  "border-gray-200 hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-white text-gray-600"
                )}
                aria-label="Previous slide"
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

              <span
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#111827",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                {displaySlide} / {displayTotal}
              </span>

              <button
                onClick={nextSlide}
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center",
                  "transition-all duration-300",
                  "border-gray-200 hover:border-[#F59E0B] hover:bg-[#F59E0B] hover:text-white text-gray-600"
                )}
                aria-label="Next slide"
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

            {/* Dot indicators — mobile/tablet */}
            <div className="flex items-center gap-2 mt-6 lg:hidden">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentSlide === index
                      ? "bg-[#F59E0B] w-8"
                      : "bg-gray-300 hover:bg-gray-400 w-2"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column — Carousel */}
          <div
            className="w-full lg:w-[65%] overflow-hidden"
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
              {offerCards.map((card) => (
                <div
                  key={card.id}
                  data-offer-card
                  className="flex-shrink-0 group"
                  style={{ width: `${cardWidth}px` }}
                >
                  <div
                    className={cn(
                      "relative bg-white rounded-xl overflow-visible",
                      "transition-all duration-300",
                      "hover:-translate-y-1"
                    )}
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 30px rgba(0,0,0,0.14)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 20px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Card Image */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        height: "200px",
                        borderRadius: "12px 12px 0 0",
                      }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    {/* Icon Circle — overlapping image bottom */}
                    <div
                      data-icon-circle
                      className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
                      style={{
                        width: "48px",
                        height: "48px",
                        top: "176px",
                        backgroundColor: "#F59E0B",
                        border: "4px solid #FFFFFF",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        fontSize: "20px",
                      }}
                    >
                      {card.icon}
                    </div>

                    {/* Card Content */}
                    <div className="pt-10 pb-6 px-5 text-center">
                      <h3
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontWeight: 700,
                          fontSize: "clamp(15px, 1.2vw, 18px)",
                          lineHeight: "1.3",
                          color: "#111827",
                        }}
                      >
                        {card.title}
                      </h3>

                      <button
                        onClick={() => {
                          document
                            .getElementById("key-features")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={cn(
                          "inline-flex items-center gap-1 mt-4",
                          "transition-all duration-300",
                          "hover:gap-2"
                        )}
                        style={{
                          fontFamily: "var(--font-plus-jakarta)",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#F59E0B",
                        }}
                      >
                        Read More
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
