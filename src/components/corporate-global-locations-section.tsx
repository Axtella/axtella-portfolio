"use client";

import Image from "next/image";

export function CorporateGlobalLocationsSection() {
  return (
    <section className="relative w-full bg-[#080D1A] py-16 lg:py-24">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Side - Text Content */}
          <div className="flex-1">
            {/* Title */}
            <h2
              className="text-white font-extrabold uppercase"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(32px, 5vw, 62px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              GLOBAL
              <br />
              TRAINING LOCATIONS
            </h2>

            {/* Subtitle */}
            <p
              className="text-white font-semibold mt-6 lg:mt-8"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(16px, 2vw, 22px)",
                lineHeight: "42px",
                letterSpacing: "-0.02em",
              }}
            >
              We offer corporate training at your preferred locations across the globe:
            </p>

            {/* Location Details */}
            <div
              className="mt-4 sm:mt-6 lg:mt-8 space-y-1 sm:space-y-2"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(14px, 2vw, 26px)",
                lineHeight: "1.7",
                letterSpacing: "0.02em",
              }}
            >
              <p className="text-white">
                <span className="font-bold">Middle East:</span>{" "}
                <span className="font-normal">UAE, Saudi Arabia, Qatar, Oman, Kuwait</span>
              </p>
              <p className="text-white">
                <span className="font-bold">Europe:</span>{" "}
                <span className="font-normal">UK, Germany, France, and other major countries</span>
              </p>
              <p className="text-white font-bold">
                Flexible virtual training options for remote teams anywhere
              </p>
            </div>

            {/* Bottom Text */}
            <p
              className="text-white font-medium italic mt-6 sm:mt-8 lg:mt-12"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "clamp(16px, 2.5vw, 30px)",
                lineHeight: "1.5",
                letterSpacing: "-0.02em",
              }}
            >
              This ensures consistent, high-quality training no matter
              <br className="hidden lg:block" />
              where your teams are located.
            </p>
          </div>

          {/* Right Side - Flags Image */}
          <div className="w-full lg:w-auto flex-shrink-0 mt-8 lg:mt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:w-[450px] xl:w-[500px] mx-auto lg:mx-0 h-auto">
              <Image
                src="/images/corporate/flags.png"
                alt="Global Training Locations - Country Flags"
                width={500}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="mt-16 lg:mt-20 w-full h-1 rounded-full"
          style={{ background: "#1F1F1F" }}
        />
      </div>
    </section>
  );
}
