"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Briefcase, MapPin, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

interface CareerPositionsSectionProps {
  positions: Position[];
}

export function CareerPositionsSection({ positions }: CareerPositionsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDept, setActiveDept] = useState("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [locationOpen, setLocationOpen] = useState(false);

  // Derive filter options dynamically from positions data
  const departmentFilters = useMemo(
    () => ["All", ...Array.from(new Set(positions.map((p) => p.department)))],
    [positions]
  );
  const locationFilters = useMemo(
    () => ["All Locations", ...Array.from(new Set(positions.map((p) => p.location)))],
    [positions]
  );

  const filtered = positions.filter((p) => {
    const deptMatch = activeDept === "All" || p.department === activeDept;
    const locMatch = activeLocation === "All Locations" || p.location === activeLocation;
    return deptMatch && locMatch;
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".positions-heading", {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.7,
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

  // Animate cards when filter changes
  useEffect(() => {
    const cards = document.querySelectorAll(".position-card");
    if (cards.length === 0) return;
    gsap.fromTo(cards, { y: 20, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
    });
  }, [activeDept, activeLocation]);

  return (
    <section
      ref={sectionRef}
      id="open-positions"
      className="relative w-full py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: "#080D1A" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="positions-heading text-center mb-14 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#F5A623]" />
            <span
              className="text-[#F5A623] uppercase text-xs tracking-[2px] font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Careers
            </span>
            <div className="w-8 h-[2px] bg-[#F5A623]" />
          </div>
          <h2
            className="text-white font-bold"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            Open Positions
          </h2>
        </div>

        {/* Filter Bar */}
        {positions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            {/* Department Tabs */}
            <div className="flex flex-wrap gap-2">
              {departmentFilters.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                    activeDept === dept
                      ? "bg-[#F5A623] text-[#080D1A] border-[#F5A623]"
                      : "bg-transparent text-white/60 border-[#1F2937] hover:border-[#F5A623]/40 hover:text-white"
                  )}
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1F2937] text-white/70 text-sm transition-all hover:border-[#F5A623]/40"
                style={{ fontFamily: "var(--font-plus-jakarta)", backgroundColor: "#111827" }}
              >
                <MapPin className="w-4 h-4 text-[#F5A623]" />
                {activeLocation}
                <ChevronDown className={cn("w-4 h-4 transition-transform", locationOpen && "rotate-180")} />
              </button>
              {locationOpen && (
                <div className="absolute right-0 top-full mt-1 z-20 min-w-[180px] rounded-lg border border-[#1F2937] overflow-hidden shadow-xl" style={{ backgroundColor: "#111827" }}>
                  {locationFilters.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => { setActiveLocation(loc); setLocationOpen(false); }}
                      className={cn(
                        "block w-full px-4 py-2.5 text-left text-sm transition-colors",
                        activeLocation === loc ? "text-[#F5A623] bg-white/5" : "text-white/70 hover:text-[#F5A623] hover:bg-white/5"
                      )}
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-3">
          {positions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                No open positions at the moment. Check back soon!
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                No positions match your filters. Try adjusting your criteria.
              </p>
            </div>
          ) : (
            filtered.map((pos) => (
              <div
                key={pos.id}
                className="position-card group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#1F2937] p-5 sm:p-6 transition-all duration-300 hover:border-[#F5A623]/40 hover:shadow-[0_0_20px_rgba(245,166,35,0.06)]"
                style={{ backgroundColor: "#111827" }}
              >
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5A623]/15 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <div>
                    <h3
                      className="text-white font-semibold text-[15px]"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {pos.title}
                    </h3>
                    <p
                      className="text-white/40 text-xs mt-0.5"
                      style={{ fontFamily: "var(--font-plus-jakarta)" }}
                    >
                      {pos.department}
                    </p>
                  </div>
                </div>

                {/* Right: Location + Type + Apply */}
                <div className="flex items-center gap-4 sm:gap-6 ml-14 sm:ml-0">
                  <div className="flex items-center gap-1.5 text-white/50 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>{pos.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>{pos.type}</span>
                  </div>
                  <Link
                    href={`/careers/apply?jobId=${pos.id}`}
                    className="px-5 py-2 rounded-full text-sm font-semibold border border-[#F5A623] text-[#F5A623] transition-all duration-300 hover:bg-[#F5A623] hover:text-[#080D1A]"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
