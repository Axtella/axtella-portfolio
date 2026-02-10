"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactFormSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current || !formCardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(formCardRef.current, {
        y: 60,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
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

  const handleInputChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {/* Form Card - Positioned to overlap map */}
      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={formCardRef}
          className="relative mx-auto mb-[-150px] sm:mb-[-250px] lg:mb-[-400px]"
          style={{
            maxWidth: "1063px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.12)",
          }}
        >
          <div className="px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16">
            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "clamp(28px, 2.2vw, 42px)",
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              Send Message
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.05vw, 20px)",
                lineHeight: "1.6",
                color: "rgba(0, 0, 0, 0.85)",
                maxWidth: "803px",
                marginBottom: "48px",
              }}
            >
              Feel free to reach out with any other questions or ideas you&apos;d like to explore. I&apos;m
              excited to learn more about your project and how we can make it happen!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-0">
              {/* Name */}
              <div
                className="py-4 sm:py-5"
                style={{ borderBottom: "1px solid #EBEBEB" }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-transparent outline-none text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "0.005em",
                    color: "#1F1F1F",
                  }}
                />
              </div>

              {/* Email ID */}
              <div
                className="py-4 sm:py-5"
                style={{ borderBottom: "1px solid #EBEBEB" }}
              >
                <input
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full bg-transparent outline-none text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "0.005em",
                    color: "#1F1F1F",
                  }}
                />
              </div>

              {/* Phone Number */}
              <div
                className="py-4 sm:py-5"
                style={{ borderBottom: "1px solid #EBEBEB" }}
              >
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full bg-transparent outline-none text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "0.005em",
                    color: "#1F1F1F",
                  }}
                />
              </div>

              {/* Subject */}
              <div
                className="py-4 sm:py-5"
                style={{ borderBottom: "1px solid #EBEBEB" }}
              >
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full bg-transparent outline-none text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "0.005em",
                    color: "#1F1F1F",
                  }}
                />
              </div>

              {/* Message */}
              <div className="py-4 sm:py-5">
                <textarea
                  placeholder="How can we help you? Feel free to get in touch!"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={4}
                  className="w-full bg-transparent outline-none resize-none text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 500,
                    lineHeight: "150%",
                    letterSpacing: "0.005em",
                    color: "#1F1F1F",
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 sm:pt-8">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 sm:gap-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg w-full sm:w-auto justify-center"
                  style={{
                    background: "#F5A623",
                    padding: "14px 32px",
                    fontFamily: "var(--font-plus-jakarta)",
                  }}
                >
                  <span
                    className="text-lg sm:text-xl lg:text-[22px]"
                    style={{
                      fontWeight: 600,
                      lineHeight: "1.5",
                      letterSpacing: "-0.02em",
                      color: "#080D1A",
                    }}
                  >
                    Send Message
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#080D1A] sm:w-6 sm:h-6"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Background */}
      <div
        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[816px] pt-[100px] sm:pt-[150px] lg:pt-[200px]"
      >
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.123456789!2d75.8!3d11.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE1JzAwLjAiTiA3NcKwNDgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        />
      </div>
    </section>
  );
}
