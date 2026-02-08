"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services does Axtella offer?",
    answer:
      "Lorem ipsum dolor sit amet consectetur. Tellus ultricies lectus eleifend elementum ultrices sed. Vitae auctor diam tristique parturient sociis id tempor phasellus. Magna laoreet tincidunt nunc mauris sed",
  },
  {
    question: "Which Courses does Axtella offer?",
    answer:
      "We offer comprehensive courses in Power BI, Advanced Excel, Data Analytics, SQL for Business Intelligence, and Python for Data Analysis. Each course is designed with real-world projects and hands-on experience.",
  },
  {
    question: "Do you have any certifications?",
    answer:
      "Yes, we provide industry-recognized certifications upon successful completion of our courses. Our certifications are valued by employers worldwide and demonstrate your expertise in data analytics and business intelligence.",
  },
  {
    question: "How to contact Axtella?",
    answer:
      "You can reach us through multiple channels: email us at support@axtella.com, call us at +91 789456123 (India) or +971 558 55 855 (UAE), or fill out the contact form on this page. Our team responds within 24 hours.",
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(leftContentRef.current, {
        x: -30,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Right FAQ list animation
      gsap.fromTo(faqListRef.current, {
        x: 30,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div ref={leftContentRef} className="lg:pr-8">
            <h2
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "clamp(28px, 2.7vw, 52px)",
                lineHeight: "1.19",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#0E150E",
                marginBottom: "24px",
              }}
            >
              Answers to
              <br />
              all your questions
            </h2>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.05vw, 20px)",
                lineHeight: "1.4",
                color: "#525252",
                maxWidth: "523px",
              }}
            >
              Explore our innovative projects, where creativity meets strategy
              to deliver results every single time.
            </p>
          </div>

          {/* Right FAQ List */}
          <div ref={faqListRef} className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="faq-item overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: isOpen ? "#1D1D1D" : "#FFFFFF",
                    borderRadius: "8px",
                    border: isOpen ? "none" : "1px solid #E5E5E5",
                  }}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between text-left transition-all duration-300 p-4 sm:p-6 lg:px-8 lg:py-6"
                  >
                    <span
                      className="pr-3 sm:pr-4"
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "clamp(16px, 1.56vw, 30px)",
                        lineHeight: "1.4",
                        letterSpacing: "-0.02em",
                        color: isOpen ? "#FFFFFF" : "#0E150E",
                      }}
                    >
                      {item.question}
                    </span>
                    {/* Plus/Minus Icon */}
                    <div
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      {isOpen ? (
                        // Minus icon (horizontal line)
                        <div
                          style={{
                            width: "24px",
                            height: "3px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "2px",
                          }}
                        />
                      ) : (
                        // Plus icon
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#838383"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* Answer Content */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "500px" : "0",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p
                      className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 text-sm sm:text-base"
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "1.6",
                        color: isOpen ? "rgba(255, 255, 255, 0.8)" : "#666666",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
