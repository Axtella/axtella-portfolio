"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Verena Monichi",
    title: "Finance Head",
    company: "Technogym \u2013 UAE",
    quote:
      "The session was interesting and useful. I learned some new features that will help me work faster and create more effective reports. The trainer maintained a good flow and delivered an interactive class, which helped sustain a high level of attention throughout the four-hour training.",
    image: "/images/testimonials/verena-monichi.jpg",
    bg: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)",
  },
  {
    id: 2,
    name: "Jafar Kuruniyan",
    title: "CFO for Middle East and Africa",
    company: "NTT Data",
    quote:
      "Alfan delivered an outstanding Advanced Excel and Power BI training program for our finance and business teams. His deep technical knowledge, practical teaching style, and ability to simplify complex concepts made the sessions highly impactful. The tools, models, and techniques he introduced have already improved our team\u2019s efficiency, analytical capability, and reporting quality.",
    image: "/images/testimonials/jafar-kuruniyan.jpg",
    bg: "linear-gradient(135deg, #4a4a4a 0%, #2d2d2d 100%)",
  },
  {
    id: 3,
    name: "Aaliya Ashraf",
    title: "Manager \u2013 HR & Executive Management",
    company: "Bridgeway Medical Systems, UAE",
    quote:
      "His teaching style was exceptionally clear, simple, and practical, making complex data concepts easy to understand and highly engaging for participants at all levels. The sessions were well-structured, interactive, and aligned with real business scenarios, enabling our team to immediately apply their learning.",
    image: "/images/testimonials/aaliya-ashraf.jpg",
    bg: "linear-gradient(135deg, #5a5a5a 0%, #3d3d3d 100%)",
  },
  {
    id: 4,
    name: "Muhammad Sadikul Faras",
    title: "HR Administration",
    company: "NBTC-Saudi Arabia",
    quote:
      "The sessions were well-structured and highly informative, and each module greatly helped me improve my report presentation and data visualization skills. The training approach was very practical, with real-time examples and hands-on exercises that made complex concepts easy to understand.",
    image: "/images/testimonials/muhammad-faras.jpg",
    bg: "linear-gradient(135deg, #555555 0%, #333333 100%)",
  },
  {
    id: 5,
    name: "Sameer Koombayil",
    title: "CFO - Middle East",
    company: "DHL",
    quote:
      "We truly appreciate the Excel training provided by Alfan from Axtella, a Microsoft MVP. Even within a limited time, the sessions were well-structured and tailored to our logistics business needs. The training has helped boost our productivity and improve efficiency.",
    image: "/images/testimonials/sameer-koombayil.jpg",
    bg: "linear-gradient(135deg, #4a4a4a 0%, #2d2d2d 100%)",
  },
  {
    id: 6,
    name: "Prof. Riaz Ahmed Moosa",
    title: "",
    company: "Ajman University",
    quote:
      "Mr Alfan added significant value through his strong command of analytical thinking and Excel-based reporting techniques. The program enhanced participants\u2019 confidence in handling, analysing, and presenting data efficiently, and it provided practical tools that can be applied immediately in day-to-day operations.",
    image: "/images/testimonials/riaz-moosa.jpg",
    bg: "linear-gradient(135deg, #6a6a6a 0%, #4d4d4d 100%)",
  },
  {
    id: 7,
    name: "Mahesh Miditala",
    title: "Finance Manager",
    company: "ESAD - Saudi Arabia",
    quote:
      "The Excel training session was engaging and informative, covering both fundamental and advanced features in a clear, practical manner. The hands-on exercises ensured that everyone, regardless of prior knowledge, could follow along and apply formulas, pivot tables, and data visualization techniques with confidence.",
    image: "/images/testimonials/mahesh-miditala.jpg",
    bg: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)",
  },
];

export function VoicesTrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  const getCardWidth = () => {
    if (!isMounted) return 581;
    if (windowWidth < 640) return windowWidth - 48;
    if (windowWidth < 1024) return Math.min(420, windowWidth * 0.55);
    return Math.min(581, windowWidth * 0.3242);
  };

  const getCardHeight = () => {
    if (!isMounted) return 738;
    if (windowWidth < 640) return Math.max(450, (windowWidth - 48) * 1.27);
    if (windowWidth < 1024) return Math.min(550, getCardWidth() * 1.27);
    return Math.min(738, getCardWidth() * 1.27);
  };

  const getGap = () => {
    if (!isMounted) return 24;
    if (windowWidth < 640) return 16;
    return Math.min(24, windowWidth * 0.0134);
  };

  const cardWidth = getCardWidth();
  const cardHeight = getCardHeight();
  const gap = getGap();
  const totalSlides = testimonials.length;

  // Calculate left padding here so maxSlide can use it
  const leftPadding = isMounted ? Math.max(24, windowWidth * 0.055) : 99;

  // Cap max slide so last position always fills the viewport
  const visibleCards = Math.max(1, Math.floor((windowWidth - leftPadding) / (cardWidth + gap)));
  const maxSlide = Math.max(0, totalSlides - visibleCards);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
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

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 5000);
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{
        paddingTop: "clamp(48px, 5vw, 90px)",
        paddingBottom: "clamp(48px, 5vw, 90px)",
      }}
    >
      {/* Title & Subtitle */}
      <div
        ref={titleRef}
        style={{ paddingLeft: "clamp(24px, 5.5vw, 99px)" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-montserrat)",
            fontWeight: 800,
            fontSize: "clamp(28px, 3.35vw, 60px)",
            lineHeight: "1.03",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#0E150E",
          }}
        >
          Voices That Trust
          <br />
          Axtella
        </h2>
        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.12vw, 20px)",
            lineHeight: "1.4",
            color: "#525252",
            marginTop: "clamp(8px, 0.8vw, 14px)",
          }}
        >
          Vestibulum ante ipsum primis orci luctustrices
        </p>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        style={{ marginTop: "clamp(24px, 2.5vw, 48px)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cards track */}
        <div className="overflow-hidden">
          <div
            className="flex cursor-grab active:cursor-grabbing select-none"
            style={{
              transform: `translateX(${-currentSlide * (cardWidth + gap) + leftPadding}px)`,
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
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 relative overflow-hidden"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: "clamp(20px, 2.01vw, 36px)",
                  border: "6px solid rgba(227, 227, 227, 0.1)",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.11)",
                  background: t.bg,
                }}
              >
                {/* Background image */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Hide broken image, gradient bg shows through
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180.05deg, rgba(0, 0, 0, 0) 43.77%, rgba(0, 0, 0, 0.84) 99.95%)",
                  }}
                />

                {/* Card content - bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 flex flex-col"
                >
                  <p
                    className="line-clamp-5"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontWeight: 400,
                      fontSize: "clamp(14px, 1.23vw, 22px)",
                      lineHeight: "1.32",
                      color: "rgba(255, 242, 242, 0.91)",
                    }}
                  >
                    {t.quote}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontWeight: 700,
                      fontSize: "clamp(16px, 1.51vw, 27px)",
                      lineHeight: "1.07",
                      color: "rgba(255, 242, 242, 0.91)",
                      marginTop: "clamp(12px, 1.2vw, 22px)",
                    }}
                  >
                    {t.name}
                  </p>
                  {(t.title || t.company) && (
                    <p
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontWeight: 400,
                        fontSize: "clamp(12px, 0.84vw, 15px)",
                        lineHeight: "1.4",
                        color: "rgba(255, 242, 242, 0.6)",
                        marginTop: "4px",
                      }}
                    >
                      {t.title}{t.title && t.company ? ", " : ""}{t.company}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute z-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          style={{
            width: "clamp(48px, 4.69vw, 84px)",
            height: "clamp(48px, 4.69vw, 84px)",
            right: "clamp(16px, 3vw, 54px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          aria-label="Next slide"
        >
          <img
            src="/arrow-1.svg"
            alt=""
            className="w-[40%] h-[40%] object-contain"
            style={{ transform: "scaleX(-1)" }}
          />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
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
    </section>
  );
}
