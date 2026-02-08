"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [videosPerSlide, setVideosPerSlide] = useState(2); // Default to desktop view
  const [isMounted, setIsMounted] = useState(false);

  const featuredItems = [
    {
      id: 1,
      episode: "EP-29",
      title: "Salesman to Microsoft MVP: Mohammad Ali's Inspiring Excel Journey",
      videoId: "dQw4w9WgXcQ", // Placeholder - replace with real YouTube video ID
    },
    {
      id: 2,
      episode: "EP-28",
      title: "Excel Tips and Tricks for Beginners",
      videoId: "dQw4w9WgXcQ", // Placeholder - replace with real YouTube video ID
    },
    {
      id: 3,
      episode: "EP-27",
      title: "Power BI Dashboard Creation Guide",
      videoId: "dQw4w9WgXcQ", // Placeholder - replace with real YouTube video ID
    },
    {
      id: 4,
      episode: "EP-26",
      title: "Data Analysis with Excel: Complete Guide",
      videoId: "dQw4w9WgXcQ", // Placeholder - replace with real YouTube video ID
    },
  ];

  const totalSlides = Math.ceil(featuredItems.length / videosPerSlide);

  // Handle responsive videos per slide
  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      setVideosPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
        nextSlide();
      } else {
        prevSlide();
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
      className="w-full bg-white py-12 md:py-16 lg:py-24"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="flex items-start justify-between mb-16">
          <div className="space-y-2">
            <h2
              className="font-bold uppercase text-black"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
              }}
            >
              FEATURED IN
            </h2>
            <p className="text-black/60 text-sm lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2 mt-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-300",
                  currentSlide === index ? "bg-gray-400" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slider Container */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full md:w-1/2 px-3"
              >
                <div className="featured-card group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                  {/* YouTube Embed */}
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      loading="lazy"
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 pointer-events-none"
                    />

                    {/* Episode Badge */}
                    <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg z-10">
                      <span className="text-white text-xs font-bold">{item.episode}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-black font-semibold text-base lg:text-lg leading-snug group-hover:text-[#F5A623] transition-colors duration-300">
                      {item.title}
                    </h3>
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
