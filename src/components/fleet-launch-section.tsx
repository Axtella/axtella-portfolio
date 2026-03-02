"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FleetLaunchSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll("[data-card]");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#080D1A] py-12 md:py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Card 1 — Fleet Tracking */}
          <Link href="/services/fleet-management" data-card className="opacity-0">
            <div
              className="flex flex-row items-center gap-5 md:gap-6 lg:gap-8 rounded-2xl md:rounded-3xl p-5 md:p-7 lg:p-8 transition-all duration-300 hover:border-[#F5A623]/40 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Icons */}
              <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
                {/* GPS Icon */}
                <div
                  className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-xl md:rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {/* Map Icon */}
                <div
                  className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-xl md:rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                {/* Vehicle Icon */}
                <div
                  className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] rounded-xl md:rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <svg className="w-7 h-7 md:w-8 md:h-8 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h.01M16 17h.01M3 11l1.5-5A2 2 0 016.4 4h11.2a2 2 0 011.9 1.4L21 11M3 11v5a1 1 0 001 1h1m16-6v5a1 1 0 01-1 1h-1M3 11h18" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div>
                <span
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "#F5A623" }}
                >
                  Axtella
                </span>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  FLEET
                  <br />
                  TRACKING
                </h3>
              </div>
            </div>
          </Link>

          {/* Card 2 — Route Optimization */}
          <Link href="/services/fleet-management" data-card className="opacity-0">
            <div
              className="flex flex-row items-center gap-5 md:gap-6 lg:gap-8 rounded-2xl md:rounded-3xl p-5 md:p-7 lg:p-8 transition-all duration-300 hover:border-[#F5A623]/40 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Dashboard Mockup */}
              <div
                className="shrink-0 w-[140px] h-[90px] md:w-[180px] md:h-[110px] lg:w-[220px] lg:h-[130px] rounded-xl md:rounded-2xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                }}
              >
                <div className="absolute inset-0 p-2.5 md:p-3 flex flex-col gap-1.5">
                  {/* Mini stats row */}
                  <div className="flex gap-1.5">
                    <div className="flex-1 rounded bg-white/[0.06] px-1.5 py-1">
                      <p className="text-[7px] md:text-[8px] text-white/40 leading-none">Vehicles</p>
                      <p className="text-[10px] md:text-xs font-bold text-white leading-tight">127</p>
                    </div>
                    <div className="flex-1 rounded bg-white/[0.06] px-1.5 py-1">
                      <p className="text-[7px] md:text-[8px] text-white/40 leading-none">Routes</p>
                      <p className="text-[10px] md:text-xs font-bold text-white leading-tight">34</p>
                    </div>
                  </div>
                  {/* Mini chart area */}
                  <div className="flex-1 rounded bg-white/[0.04] relative overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                      <path d="M0 60 Q30 30 60 45 T120 25 T200 35" fill="none" stroke="rgba(245,166,35,0.4)" strokeWidth="1.5" />
                      <path d="M0 50 Q40 55 80 35 T160 45 T200 30" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
                    </svg>
                    {/* Bar chart */}
                    <div className="absolute bottom-1 left-2 right-2 flex items-end gap-[3px] h-[40%]">
                      {[60, 80, 45, 90, 70, 55, 85, 40, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-[1px]"
                          style={{
                            height: `${h}%`,
                            background: i === 3 ? "rgba(34,197,94,0.6)" : "rgba(255,255,255,0.08)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <span
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "#F5A623" }}
                >
                  Axtella
                </span>
                <h3
                  className="font-bold text-white leading-tight"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ROUTE
                  <br />
                  OPTIMIZATION
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
