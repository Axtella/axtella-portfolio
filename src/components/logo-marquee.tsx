"use client";

import Image from "next/image";

interface Logo {
  name: string;
  src?: string;
}

const logos: Logo[] = [
  { name: "TCS" },
  { name: "IBM" },
  { name: "Accenture" },
  { name: "Cargill" },
  { name: "DHL" },
  { name: "Microsoft" },
  { name: "Deloitte" },
  { name: "Infosys" },
  { name: "Wipro" },
  { name: "SAP" },
  { name: "Oracle" },
  { name: "PwC" },
];

export function LogoMarquee() {
  return (
    <section
      className="bg-white overflow-hidden min-h-[250px] md:min-h-[280px] lg:min-h-[300px] py-12 md:py-14 lg:py-16"
    >
      {/* Container matching other sections */}
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <p
          className="text-gray-700 mb-8"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            fontWeight: 400,
          }}
        >
          Be part of the 100+ businesses transforming their presence.
        </p>

        {/* Logo row with auto-scroll */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee items-center">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: "clamp(100px, 12vw, 129px)",
                  height: "clamp(100px, 12vw, 129px)",
                  marginRight: "clamp(32px, 5vw, 64px)",
                }}
              >
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={129}
                    height={129}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-full rounded-lg border border-gray-200 bg-gray-50 px-3"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    <span className="text-gray-400 font-semibold whitespace-nowrap" style={{ fontSize: "clamp(12px, 1.5vw, 18px)", letterSpacing: "0.05em" }}>
                      {logo.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: "clamp(100px, 12vw, 129px)",
                  height: "clamp(100px, 12vw, 129px)",
                  marginRight: "clamp(32px, 5vw, 64px)",
                }}
              >
                {logo.src ? (
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={129}
                    height={129}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-full rounded-lg border border-gray-200 bg-gray-50 px-3"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    <span className="text-gray-400 font-semibold whitespace-nowrap" style={{ fontSize: "clamp(12px, 1.5vw, 18px)", letterSpacing: "0.05em" }}>
                      {logo.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
