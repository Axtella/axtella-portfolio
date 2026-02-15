"use client";

import { useRef, useEffect } from "react";
import { Radio, Monitor, Cpu, Truck, Building, Sun, ClipboardList } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Telecom: Radio,
  IT: Monitor,
  IoT: Cpu,
  Fleet: Truck,
  Civil: Building,
  Solar: Sun,
  Admin: ClipboardList,
};

const defaultDepartments = ["Telecom", "IT", "IoT", "Fleet", "Civil", "Solar", "Admin"];

interface CareerDepartmentsData {
  label?: string;
  title?: string;
  departments?: string[];
}

export function CareerDepartmentsSection({ data }: { data?: CareerDepartmentsData | null }) {
  const sectionLabel = data?.label || "Our Teams";
  const sectionTitle = data?.title || "Departments";
  const departments = (data?.departments || defaultDepartments).map((label) => ({
    icon: iconMap[label] || Radio,
    label,
  }));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".dept-heading", {
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

      gsap.fromTo(".dept-card", {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="dept-heading text-center mb-14 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#F5A623]" />
            <span
              className="text-[#F5A623] uppercase text-xs tracking-[2px] font-medium"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {sectionLabel}
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
            {sectionTitle}
          </h2>
        </div>

        {/* Departments Grid — scrollable on mobile */}
        <div className="flex lg:justify-center gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide lg:flex-wrap max-w-[1200px] mx-auto">
          {departments.map((dept) => {
            const IconComp = dept.icon;
            return (
              <div
                key={dept.label}
                className="dept-card flex-shrink-0 flex flex-col items-center gap-3 rounded-2xl border border-[#1F2937] px-8 py-6 min-w-[130px] transition-all duration-300 hover:border-[#F5A623]/60 hover:shadow-[0_0_25px_rgba(245,166,35,0.08)] cursor-default"
                style={{ backgroundColor: "#111827" }}
              >
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/15 flex items-center justify-center">
                  <IconComp className="w-6 h-6 text-[#F5A623]" />
                </div>
                <span
                  className="text-white font-medium text-sm whitespace-nowrap"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  {dept.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
