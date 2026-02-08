"use client";

import Image from "next/image";

interface ClientLogo {
  name: string;
  src: string;
  alt: string;
}

const row1Logos: ClientLogo[] = [
  {
    name: "dhl",
    src: "/images/about/DHL.png",
    alt: "DHL Logo",
  },
  {
    name: "ajman",
    src: "/images/about/Ajman.png",
    alt: "Ajman University Logo",
  },
  {
    name: "vallourec",
    src: "/images/about/callource.png",
    alt: "Vallourec Logo",
  },
  {
    name: "technogym",
    src: "/images/about/technogym.png",
    alt: "TechnoGym Logo",
  },
  {
    name: "aus",
    src: "/images/about/Aus.png",
    alt: "American University of Sharjah Logo",
  },
];

const row2Logos: ClientLogo[] = [
  {
    name: "slb",
    src: "/images/about/slb.png",
    alt: "SLB Logo",
  },
  {
    name: "university",
    src: "/images/about/image 68.png",
    alt: "University Logo",
  },
  {
    name: "bhim",
    src: "/images/about/image 69.png",
    alt: "Lulu Group International Logo",
  },
  {
    name: "lulu",
    src: "/images/about/image 70.png",
    alt: "Ellington Properties Logo",
  },
  {
    name: "ellington",
    src: "/images/about/image 71.png",
    alt: "IMA Logo",
  },
  {
    name: "ima",
    src: "/images/about/image 72.png",
    alt: "BHIM AI Logo",
  },
];

export function ClientLogosSection() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          className="text-center mb-8 md:mb-12 lg:mb-16"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: "1.5",
            textAlign: "center",
            letterSpacing: "-0.03em",
            color: "#272727",
          }}
        >
          Be part of the 100+ businesses transforming their presence.
        </h2>

        {/* First Row - 5 Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {row1Logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-4"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                className="object-contain w-full h-auto max-h-[60px] transition-opacity duration-300 hover:opacity-70"
              />
            </div>
          ))}
        </div>

        {/* Second Row - 6 Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {row2Logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center p-4"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                className="object-contain w-full h-auto max-h-[60px] transition-opacity duration-300 hover:opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
