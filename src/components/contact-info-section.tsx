"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactCard {
  icon: "phone" | "chat" | "email";
  title: string;
  details: {
    label: string;
    value: string;
  }[];
  hasUnderline?: boolean;
}

const contactCards: ContactCard[] = [
  {
    icon: "phone",
    title: "Talk to Experts",
    details: [
      { label: "INDIA", value: "+91 789456123" },
      { label: "UAE", value: "+971 558 55 855, 589 589 352" },
      { label: "MAIL", value: "support@axtella.com" },
    ],
    hasUnderline: true,
  },
  {
    icon: "chat",
    title: "Course Support",
    details: [
      { label: "INDIA", value: "+91 789456123" },
      { label: "UAE", value: "+971 558 55 855, 589 589 352" },
      { label: "MAIL", value: "support@axtella.com" },
    ],
    hasUnderline: true,
  },
  {
    icon: "email",
    title: "Corporate Support",
    details: [
      { label: "INDIA", value: "+91 789456123" },
      { label: "UAE", value: "+971 558 55 855, 589 589 352" },
      { label: "MAIL", value: "support@axtella.com" },
    ],
    hasUnderline: true,
  },
];

const PhoneIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconComponent = ({ type }: { type: "phone" | "chat" | "email" }) => {
  switch (type) {
    case "phone":
      return <PhoneIcon />;
    case "chat":
      return <ChatIcon />;
    case "email":
      return <EmailIcon />;
  }
};

export function ContactInfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      if (cards) {
        gsap.fromTo(cards, {
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "#080D1A" }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {contactCards.map((card, index) => (
            <div key={index} className="contact-card group space-y-6 cursor-pointer">
              {/* Icon Circle */}
              <div
                className="flex items-center justify-center text-white transition-all duration-300 border border-transparent group-hover:border-[#F5A623]"
                style={{
                  width: "82px",
                  height: "82px",
                  background: "#1D1D1D",
                  borderRadius: "50%",
                }}
              >
                <IconComponent type={card.icon} />
              </div>

              {/* Title */}
              <h3
                className="text-white"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 500,
                  fontSize: "clamp(18px, 1.05vw, 20px)",
                  lineHeight: "1.4",
                }}
              >
                {card.title}
              </h3>

              {/* Contact Details */}
              <div className="space-y-2">
                {card.details.map((detail, detailIndex) => (
                  <p
                    key={detailIndex}
                    className="text-[#9CA3AF]"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    <span className="text-[#6B7280]">{detail.label}</span>{" "}
                    {detail.value}
                  </p>
                ))}
              </div>

              {/* Green Underline (only on first card, shows on hover) */}
              {card.hasUnderline && (
                <div
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    width: "100%",
                    maxWidth: "351px",
                    height: "2px",
                    background: "#F5A623",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
