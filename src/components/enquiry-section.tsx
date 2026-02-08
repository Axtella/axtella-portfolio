"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Arrow1 Icon (from arrow-1.svg with dynamic coloring)
const Arrow1Icon = () => (
  <svg className="w-5 h-7" viewBox="0 0 135 197" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.4802 40.691C27.1762 40.691 30.1724 37.6948 30.1724 33.9987C30.1724 30.3027 27.1762 27.3064 23.4802 27.3064C19.7841 27.3064 16.7879 30.3027 16.7879 33.9987C16.7879 37.6948 19.7841 40.691 23.4802 40.691Z" fill="currentColor"/>
    <path d="M43.3545 62.323C47.0506 62.323 50.0469 59.3268 50.0469 55.6308C50.0469 51.9347 47.0506 48.9385 43.3545 48.9385C39.6585 48.9385 36.6623 51.9347 36.6623 55.6308C36.6623 59.3268 39.6585 62.323 43.3545 62.323Z" fill="currentColor"/>
    <path d="M43.3545 40.691C47.0506 40.691 50.0469 37.6948 50.0469 33.9987C50.0469 30.3027 47.0506 27.3064 43.3545 27.3064C39.6585 27.3064 36.6623 30.3027 36.6623 33.9987C36.6623 37.6948 39.6585 40.691 43.3545 40.691Z" fill="currentColor"/>
    <path d="M63.229 62.323C66.925 62.323 69.9213 59.3268 69.9213 55.6308C69.9213 51.9347 66.925 48.9385 63.229 48.9385C59.533 48.9385 56.5367 51.9347 56.5367 55.6308C56.5367 59.3268 59.533 62.323 63.229 62.323Z" fill="currentColor"/>
    <path d="M63.229 83.522C66.925 83.522 69.9213 80.5258 69.9213 76.8297C69.9213 73.1337 66.925 70.1375 63.229 70.1375C59.533 70.1375 56.5367 73.1337 56.5367 76.8297C56.5367 80.5258 59.533 83.522 63.229 83.522Z" fill="currentColor"/>
    <path d="M63.2294 126.354C66.9257 126.354 69.9222 123.357 69.9222 119.661C69.9222 115.965 66.9257 112.969 63.2294 112.969C59.5331 112.969 56.5367 115.965 56.5367 119.661C56.5367 123.357 59.5331 126.354 63.2294 126.354Z" fill="currentColor"/>
    <path d="M43.3545 147.578C47.0506 147.578 50.0469 144.582 50.0469 140.886C50.0469 137.19 47.0506 134.194 43.3545 134.194C39.6585 134.194 36.6623 137.19 36.6623 140.886C36.6623 144.582 39.6585 147.578 43.3545 147.578Z" fill="currentColor"/>
    <path d="M63.229 147.578C66.925 147.578 69.9213 144.582 69.9213 140.886C69.9213 137.19 66.925 134.194 63.229 134.194C59.533 134.194 56.5367 137.19 56.5367 140.886C56.5367 144.582 59.533 147.578 63.229 147.578Z" fill="currentColor"/>
    <path d="M83.9405 83.522C87.6367 83.522 90.633 80.5258 90.633 76.8297C90.633 73.1337 87.6367 70.1375 83.9405 70.1375C80.2445 70.1375 77.2483 73.1337 77.2483 76.8297C77.2483 80.5258 80.2445 83.522 83.9405 83.522Z" fill="currentColor"/>
    <path d="M83.9405 104.722C87.6367 104.722 90.633 101.725 90.633 98.0288C90.633 94.3328 87.6367 91.3369 83.9405 91.3369C80.2445 91.3369 77.2483 94.3328 77.2483 98.0288C77.2483 101.725 80.2445 104.722 83.9405 104.722Z" fill="currentColor"/>
    <path d="M83.941 126.354C87.6374 126.354 90.6339 123.357 90.6339 119.661C90.6339 115.965 87.6374 112.969 83.941 112.969C80.2447 112.969 77.2483 115.965 77.2483 119.661C77.2483 123.357 80.2447 126.354 83.941 126.354Z" fill="currentColor"/>
    <path d="M23.4806 169.67C27.1769 169.67 30.1734 166.674 30.1734 162.978C30.1734 159.281 27.1769 156.285 23.4806 156.285C19.7844 156.285 16.7879 159.281 16.7879 162.978C16.7879 166.674 19.7844 169.67 23.4806 169.67Z" fill="currentColor"/>
    <path d="M43.355 169.67C47.0514 169.67 50.0478 166.674 50.0478 162.978C50.0478 159.281 47.0514 156.285 43.355 156.285C39.6587 156.285 36.6623 159.281 36.6623 162.978C36.6623 166.674 39.6587 169.67 43.355 169.67Z" fill="currentColor"/>
    <path d="M103.839 104.722C107.535 104.722 110.531 101.725 110.531 98.0288C110.531 94.3328 107.535 91.3369 103.839 91.3369C100.143 91.3369 97.1468 94.3328 97.1468 98.0288C97.1468 101.725 100.143 104.722 103.839 104.722Z" fill="currentColor"/>
  </svg>
);

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  course: string;
}

const courses = [
  "Master Power BI With Real Project",
  "Advanced Excel Mastery",
  "Data Analytics Fundamentals",
  "SQL for Business Intelligence",
  "Python for Data Analysis",
];

export function EnquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    course: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(leftContentRef.current, {
        x: -50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Form animation
      gsap.fromTo(formRef.current, {
        x: 50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCourseSelect = (course: string) => {
    setFormData((prev) => ({ ...prev, course }));
    setIsDropdownOpen(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#161616" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/home/enquiry-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 1.0,
        }}
      />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* Subtle glow effect */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(245, 166, 35, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Center brightening gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 30% at 50% 100%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vertical Separator Line with Gradient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 hidden lg:block"
          style={{
            width: "1px",
            height: "468px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.68) 53.12%, rgba(255, 255, 255, 0) 100%)",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-6 lg:pr-12">
            <h2
              className="text-white"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 66px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Ready to Grow your Business smarter?
            </h2>
            <p
              className="text-[#999999] max-w-md"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <a
              href="/discover"
              className="inline-flex items-center justify-center gap-2 text-[#080D1A] rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)] w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "14px",
                background: "#F5A623",
              }}
            >
              Discover More
              <Arrow1Icon />
            </a>
          </div>

          {/* Right Form */}
          <div ref={formRef} className="lg:pl-12">
            <div className="space-y-4">
              <div>
                <h3
                  className="text-white mb-2"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "clamp(24px, 2.1vw, 40px)",
                    lineHeight: "1.2",
                    color: "#FFFFFF",
                  }}
                >
                  Enquiry form
                </h3>
                <p
                  className="text-[#666666]"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "13px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "14px",
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-[#666666] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Course Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 bg-[#1E1E1E] border border-[#2A2A2A] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333] transition-all flex items-center justify-between"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "14px",
                    }}
                  >
                    <span className={formData.course ? "text-white" : "text-[#666666]"}>
                      {formData.course || "Select a Course"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg overflow-hidden">
                      {courses.map((course, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleCourseSelect(course)}
                          className="w-full px-4 py-3 text-left text-white hover:bg-[#2A2A2A] transition-colors"
                          style={{
                            fontFamily: "var(--font-plus-jakarta)",
                            fontSize: "14px",
                          }}
                        >
                          {course}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-8 py-3 text-[#080D1A] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(245,166,35,0.35)] flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontSize: "14px",
                    fontWeight: 600,
                    background: "#F5A623",
                  }}
                >
                  Submit
                  <svg
                    className="w-4 h-4 text-[#080D1A]"
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
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

