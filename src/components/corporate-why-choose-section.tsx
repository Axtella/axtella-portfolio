"use client";

const features = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <circle cx="12" cy="10" r="4" />
        <circle cx="28" cy="10" r="4" />
        <circle cx="12" cy="30" r="4" />
        <circle cx="28" cy="30" r="4" />
        <path d="M12 14v12M28 14v12M16 10h8M16 30h8" />
      </svg>
    ),
    text: "Experienced trainers with real-world industry expertise",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <rect x="6" y="6" width="28" height="28" rx="3" />
        <path d="M6 14h28M20 6v28" />
      </svg>
    ),
    text: "Customized content aligned with your business objectives",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <path d="M20 4l16 10v12l-16 10-16-10V14l16-10z" />
        <path d="M20 14v8M16 18h8" />
      </svg>
    ),
    text: "Practical, hands-on learning for immediate application",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4M9 9l3 3M28 28l3 3M9 31l3-3M28 12l3-3" />
      </svg>
    ),
    text: "Flexible delivery across multiple regions and time zones",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <circle cx="14" cy="12" r="7" />
        <path d="M28 18h6M31 15v6" />
        <circle cx="30" cy="28" r="5" />
      </svg>
    ),
    text: "Proven track record of successful corporate training engagements",
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F5A623" strokeWidth="1.5">
        <circle cx="20" cy="12" r="7" />
        <circle cx="10" cy="30" r="5" />
        <circle cx="30" cy="30" r="5" />
        <path d="M15 17l-3 8M25 17l3 8" />
      </svg>
    ),
    text: "Focus on building in-house capabilities to reduce reliance on external consultants",
  },
];

export function CorporateWhyChooseSection() {
  return (
    <section className="relative w-full bg-[#080D1A] py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2
          className="text-white font-extrabold uppercase"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(32px, 5vw, 62px)",
            lineHeight: "1.24",
            letterSpacing: "-0.02em",
          }}
        >
          WHY CHOOSE US
        </h2>

        <p
          className="text-[#999999] text-center mt-4 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "1.7",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Cards Grid */}
        <div className="mt-8 sm:mt-10 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl sm:rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center text-center py-8 sm:py-0"
              style={{
                aspectRatio: "513 / 469",
                minHeight: "220px",
              }}
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border border-[#3a3a3a] flex items-center justify-center mb-4 sm:mb-6 lg:mb-10">
                <div className="scale-[0.6] sm:scale-90 lg:scale-100">
                  {feature.icon}
                </div>
              </div>

              {/* Text */}
              <p
                className="text-white font-medium px-4 sm:px-6 lg:px-10 max-w-[90%]"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontSize: "clamp(13px, 1.8vw, 22px)",
                  lineHeight: "1.5",
                  letterSpacing: "-0.01em",
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
