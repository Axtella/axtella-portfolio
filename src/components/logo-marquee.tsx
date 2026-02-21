"use client";

import Image from "next/image";

interface LogoItem {
  name: string;
  src?: string;
}

interface LogoMarqueeData {
  headline?: string;
  logos?: LogoItem[];
}

const defaultLogos: LogoItem[] = [
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

export function LogoGrid({ data }: { data?: LogoMarqueeData | null }) {
  const headline = data?.headline || "Be part of the 100+ businesses transforming their presence.";
  const logos = data?.logos?.length ? data.logos : defaultLogos;

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-center mb-8 md:mb-12 lg:mb-16"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontWeight: 500,
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: "1.5",
            letterSpacing: "-0.03em",
            color: "#272727",
          }}
        >
          {headline}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={60}
                  className="object-contain w-full h-auto max-h-[60px] transition-opacity duration-300 hover:opacity-70"
                />
              ) : (
                <div
                  className="flex items-center justify-center w-full h-[60px] rounded-lg border border-gray-200 bg-gray-50 px-3"
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
    </section>
  );
}

export function LogoMarquee({ data }: { data?: LogoMarqueeData | null }) {
  const headline = data?.headline || "Be part of the 100+ businesses transforming their presence.";
  const logos = data?.logos?.length ? data.logos : defaultLogos;

  // Ensure enough logos to fill the viewport for a seamless marquee
  const MIN_ITEMS = 10;
  const repeatCount = logos.length >= MIN_ITEMS ? 1 : Math.ceil(MIN_ITEMS / logos.length);
  const extendedLogos = Array.from({ length: repeatCount }, () => logos).flat();

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
          {headline}
        </p>

        {/* Logo row with auto-scroll */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee items-center">
            {/* First set of logos */}
            {extendedLogos.map((logo, index) => (
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
            {extendedLogos.map((logo, index) => (
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
