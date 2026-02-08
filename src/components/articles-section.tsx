"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";
import { getPublishedBlogs } from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

// Get published blogs from data file
const articles = getPublishedBlogs();

export function ArticlesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const totalCards = articles.length;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, {
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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const getPrevIndex = () => (currentIndex - 1 + totalCards) % totalCards;
  const getNextIndex = () => (currentIndex + 1) % totalCards;

  // Drag handlers for touch/swipe support
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
        handleNext();
      } else {
        handlePrevious();
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

  // Card height
  const cardHeight = "clamp(320px, 38vw, 420px)";

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 lg:py-24"
    >
      {/* Header */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div
            ref={headerRef}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12 mb-12 lg:mb-16"
          >
            {/* Left - Main Heading */}
            <div className="flex-shrink-0">
              <h2
                className="font-extrabold uppercase leading-none tracking-tight text-[#0E150E]"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 42px)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                }}
              >
                READ ARTICLES WRITTEN
                <br />
                BY PROFESSIONALS.
              </h2>
            </div>

            {/* Right - Description & CTA */}
            <div className="lg:max-w-[280px] lg:pt-1">
              <p
                className="text-[#666666] mb-2 leading-relaxed"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "13px",
                  lineHeight: "1.6",
                }}
              >
                Dive into our curated feed for the freshest insights and essential
                industry developments.
              </p>
              <a
                href="/blogs"
                className="inline-flex items-center gap-2 text-black font-semibold text-sm hover:gap-3 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                }}
              >
                Read All Articles
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Container - Full width overflow hidden */}
      <div className="relative w-full overflow-hidden">
        <div
          className="relative w-screen left-1/2 -translate-x-1/2 touch-pan-y cursor-grab active:cursor-grabbing"
          style={{ height: cardHeight }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* All cards positioned absolutely with SAME height */}
          
          {/* Left Card - From left edge to gap before center */}
          <div
            className="absolute top-0 bottom-0 left-0 hidden lg:block transition-all duration-500 ease-out"
            style={{
              right: "calc(50% + 27.5vw + 16px)",
              opacity: 0.5,
            }}
          >
            <ArticleCard
              article={articles[getPrevIndex()]}
              isCenter={false}
            />
          </div>

          {/* Center Card - Centered, 55vw wide */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-10"
            style={{
              width: "clamp(500px, 55vw, 780px)",
            }}
          >
            <ArticleCard article={articles[currentIndex]} isCenter={true} />
          </div>

          {/* Right Card - From gap after center to right edge */}
          <div
            className="absolute top-0 bottom-0 right-0 hidden lg:block transition-all duration-500 ease-out"
            style={{
              left: "calc(50% + 27.5vw + 16px)",
              opacity: 0.5,
            }}
          >
            <ArticleCard
              article={articles[getNextIndex()]}
              isCenter={false}
            />
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-2 mt-8 md:mt-10">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-xl bg-[#F3F3F3] hover:bg-[#E8E8E8] flex items-center justify-center transition-all duration-300"
            aria-label="Previous article"
          >
            <svg className="w-4 h-4" width="16" height="14" viewBox="0 0 16 14" fill="none">
              <rect x="0" y="6" width="2" height="2" rx="0.5" fill="#1a1a1a" />
              <rect x="4" y="2" width="2" height="2" rx="0.5" fill="#1a1a1a" />
              <rect x="4" y="6" width="2" height="2" rx="0.5" fill="#1a1a1a" />
              <rect x="4" y="10" width="2" height="2" rx="0.5" fill="#1a1a1a" />
              <rect x="8" y="6" width="2" height="2" rx="0.5" fill="#1a1a1a" />
              <rect x="12" y="6" width="2" height="2" rx="0.5" fill="#1a1a1a" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-xl bg-[#1a1a1a] hover:bg-[#333] flex items-center justify-center transition-all duration-300"
            aria-label="Next article"
          >
            <svg className="w-4 h-4" width="16" height="14" viewBox="0 0 16 14" fill="none">
              <rect x="0" y="6" width="2" height="2" rx="0.5" fill="white" />
              <rect x="4" y="6" width="2" height="2" rx="0.5" fill="white" />
              <rect x="8" y="2" width="2" height="2" rx="0.5" fill="white" />
              <rect x="8" y="6" width="2" height="2" rx="0.5" fill="white" />
              <rect x="8" y="10" width="2" height="2" rx="0.5" fill="white" />
              <rect x="12" y="6" width="2" height="2" rx="0.5" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// Article Card Component
function ArticleCard({
  article,
  isCenter,
}: {
  article: BlogPost;
  isCenter: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden group rounded-2xl",
        isCenter && "cursor-pointer"
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url('${article.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#d1d5db",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 lg:p-8">
        <h3
          className="text-white font-bold mb-2 leading-tight"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: isCenter ? "clamp(18px, 2.2vw, 24px)" : "clamp(14px, 1.6vw, 18px)",
          }}
        >
          {article.title}
        </h3>
        {isCenter && (
          <p
            className="text-white/80 mb-3 max-w-lg"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(12px, 1.2vw, 14px)",
              lineHeight: "1.6",
            }}
          >
            {article.description}
          </p>
        )}
        <a
          href={`/blogs/${article.slug}`}
          className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all duration-300"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: isCenter ? "clamp(12px, 1.2vw, 14px)" : "clamp(11px, 1vw, 13px)",
          }}
        >
          Read Article
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}