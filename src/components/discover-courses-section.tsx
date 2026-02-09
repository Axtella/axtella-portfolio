"use client";

import { useState, useEffect } from "react";

interface Service {
  id: number;
  tag: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    tag: "AXTELLA",
    title: "TELECOMMUNICATION SOLUTIONS",
    description: "Network design, fiber optics, unified communications",
    color: "#F5A623",
    icon: "T",
  },
  {
    id: 2,
    tag: "AXTELLA",
    title: "IOT & SMART SYSTEMS",
    description: "Connected devices, sensor networks, real-time monitoring",
    color: "#3b82f6",
    icon: "I",
  },
  {
    id: 3,
    tag: "AXTELLA",
    title: "FLEET MANAGEMENT",
    description: "GPS tracking, route optimization, fleet analytics",
    color: "#D4232F",
    icon: "F",
  },
];

export function DiscoverCoursesSection() {
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
        setCurrentIndex((prev) => (prev + 1) % services.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
      }
    }

    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();

  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

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
                  OUR SERVICES
                </span>

                <h2
                  className="font-bold text-white mb-4 uppercase leading-tight"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(28px, 5vw, 56px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  DISCOVER
                  <br />
                  OUR SOLUTIONS
                </h2>

                <p
                  className="text-white/60 max-w-md"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "clamp(13px, 1.3vw, 16px)",
                    lineHeight: "1.6",
                  }}
                >
                  9 specialized service verticals delivering end-to-end technology and infrastructure solutions across the Kingdom.
                </p>
              </div>

              <a
                href="#"
                className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#D4910A] rounded-full px-5 py-2.5 md:px-7 md:py-3 transition-all duration-300 w-fit"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(12px, 1.5vw, 14px)",
                  fontWeight: 600,
                }}
              >
                <span className="text-white">Explore All Services</span>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
                {services.map((service, index) => {
                  const offset = (index - currentIndex + services.length) % services.length;
                  const isActive = offset === 0;
                  const isNext = offset === 1;

                  return (
                    <div
                      key={service.id}
                      className="absolute transition-all duration-700 ease-out rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-[80vw] sm:max-w-[70vw] md:max-w-[480px] lg:max-w-[520px]"
                      style={{
                        aspectRatio: "580 / 480",
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
                          : service.color,
                        userSelect: "none",
                      }}
                    >
                      <div className="relative w-full h-full p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                        {isActive && (
                          <>
                            {/* Top Content */}
                            <div>
                              <div
                                className="text-xs font-bold mb-2 uppercase"
                                style={{
                                  fontFamily: "var(--font-plus-jakarta)",
                                  color: service.color,
                                  letterSpacing: "0.05em",
                                }}
                              >
                                {service.tag}
                              </div>

                              <h3
                                className="font-bold text-black mb-4"
                                style={{
                                  fontFamily: "var(--font-montserrat)",
                                  fontSize: "clamp(20px, 3vw, 28px)",
                                  lineHeight: "1.1",
                                  letterSpacing: "-0.02em",
                                }}
                              >
                                {service.title}
                              </h3>

                              <p
                                className="text-gray-600"
                                style={{
                                  fontFamily: "var(--font-plus-jakarta)",
                                  fontSize: "clamp(13px, 1.5vw, 16px)",
                                  lineHeight: "1.5",
                                }}
                              >
                                {service.description}
                              </p>
                            </div>

                            {/* Bottom Content */}
                            <div className="flex items-end justify-between">
                              <button
                                className="rounded-xl sm:rounded-2xl text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 transition-all duration-300 hover:shadow-lg hover:opacity-90"
                                style={{
                                  background: service.color,
                                  fontFamily: "var(--font-plus-jakarta)",
                                  fontSize: "clamp(12px, 2vw, 14px)",
                                }}
                              >
                                Learn More
                              </button>

                              <div
                                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-bold"
                                style={{
                                  background: `linear-gradient(135deg, ${service.color}40 0%, ${service.color}20 100%)`,
                                  color: service.color,
                                  fontFamily: "var(--font-montserrat)",
                                }}
                              >
                                {service.icon}
                              </div>
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
