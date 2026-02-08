"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function WhyBusinessLoveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  // Responsive card width helpers
  const getCardWidth = () => {
    if (!isMounted) return 478; // Default for SSR
    if (windowWidth < 640) return windowWidth - 48; // Mobile: full width minus padding
    if (windowWidth < 1024) return 400; // Tablet
    return 478; // Desktop
  };

  const getGap = () => {
    if (!isMounted) return 24; // Default for SSR
    if (windowWidth < 640) return 16; // Mobile
    return 24; // Desktop
  };

  const getMinHeight = () => {
    if (!isMounted) return "480px"; // Default for SSR
    if (windowWidth < 640) return "380px";
    if (windowWidth < 1024) return "420px";
    return "480px";
  };

  const cardWidth = getCardWidth();
  const gap = getGap();
  const minHeight = getMinHeight();

  // Initialize on mount and handle resize
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      companyLogo: "/images/about/Ajman.png",
      quote: "Training with Mr. Mohammed Alfan elevated my Excel skills to new heights. I'm now a proficient Excel user, all thanks to the expert guidance!",
      profileImage: "/images/testimonials/ronald-richards.jpg",
      name: "Ronald Richards",
      title: "President",
      isDark: true,
    },
    {
      id: 2,
      companyLogo: "/images/about/Aus.png",
      quote: "The Excel training program transformed how our team handles data. Highly recommended!",
      profileImage: "/images/testimonials/profile-2.jpg",
      name: "Jane Cooper",
      title: "CEO",
      isDark: false,
    },
    {
      id: 3,
      companyLogo: "/images/about/DHL.png",
      quote: "Outstanding training that delivers real-world results. Our productivity increased significantly!",
      profileImage: "/images/testimonials/profile-3.jpg",
      name: "Robert Fox",
      title: "Director",
      isDark: false,
    },
    {
      id: 4,
      companyLogo: "/images/about/slb.png",
      quote: "Mohammed Alfan's expertise in Excel is unmatched. The training sessions were incredibly valuable for our entire organization.",
      profileImage: "/images/testimonials/profile-4.jpg",
      name: "Sarah Johnson",
      title: "Manager",
      isDark: false,
    },
  ];

  // Calculate how many cards are visible at once, then limit max slide
  const getVisibleCards = () => {
    if (!isMounted) return 3;
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return Math.floor((windowWidth - 64) / (cardWidth + gap)) || 3;
  };
  const visibleCards = getVisibleCards();
  const totalSlides = Math.max(1, testimonials.length - visibleCards + 1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isHovered, totalSlides]);

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
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      } else {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
    }

    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32"
      style={{ background: "#F7F7F7" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <h2
            className="font-bold uppercase text-black"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
            }}
          >
            WHY BUSINESS LOVE
            <br />
            AXTELLA
          </h2>
          <p className="text-black/60 text-sm lg:text-base max-w-2xl mx-auto">
            Kind words from my people means a lot
          </p>
        </div>

        {/* Slider Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${currentSlide === 0 ? '0px' : `-${currentSlide * (cardWidth + gap)}px`})`,
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
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <div
                  className="testimonial-card group relative p-6 md:p-8 transition-all duration-300 flex flex-col items-center text-center rounded-xl md:rounded-2xl"
                  style={{
                    width: `${cardWidth}px`,
                    minHeight: minHeight,
                    background: "#FFFFFF",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                    border: "2px solid #f3f4f6",
                  }}
                >
                  {/* Hover background overlay */}
                  <div
                    className="absolute inset-0 bg-[#202020] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-xl md:rounded-2xl"
                    style={{
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08), inset -1px 4px 54px 3px #000000"
                    }}
                  />

                  {/* Company Logo */}
                  <div className="mb-6 md:mb-8 h-12 md:h-16 flex items-center justify-center relative z-10">
                    <img
                      src={testimonial.companyLogo}
                      alt={`${testimonial.name} company logo`}
                      className="h-12 md:h-16 w-auto object-contain"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="font-bold text-2xl text-black group-hover:text-white" style="font-family: var(--font-montserrat)">${testimonial.name.split(' ')[0].toUpperCase()}</div>`;
                        }
                      }}
                    />
                  </div>

                  {/* Quote */}
                  <p
                    className="relative z-10 leading-relaxed mb-6 md:mb-8 flex-grow text-black/80 group-hover:text-white/90 transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "clamp(14px, 1.5vw, 18px)",
                    }}
                  >
                    {testimonial.quote}
                  </p>

                  {/* Profile Section */}
                  <div className="relative z-10 flex flex-col items-center gap-3 mt-auto">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold bg-black/10 text-black group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "clamp(16px, 1.5vw, 18px)",
                      }}
                    >
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-black group-hover:text-white transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          fontSize: "clamp(14px, 1.5vw, 16px)",
                        }}
                      >
                        {testimonial.name}
                      </h4>
                      <p
                        className="text-black/60 group-hover:text-white/60 transition-colors duration-300"
                        style={{
                          fontSize: "clamp(12px, 1.2vw, 14px)",
                        }}
                      >
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-black w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
