"use client";

import Image from "next/image";

interface Stat {
  number: string;
  title: string;
  description: string;
}

const defaultStats: Stat[] = [
  {
    number: "2K+",
    title: "Businesses Trust Us",
    description: "Lorem ipsum dolor sit amet consectetur cillum",
  },
  {
    number: "+75%",
    title: "Increased Productivity",
    description: "Lorem ipsum dolor sit amet consectetur cillum",
  },
  {
    number: "98%",
    title: "Customer Satisfaction",
    description: "Lorem ipsum dolor sit amet consectetur cillum",
  },
  {
    number: "4.8/5",
    title: "Star Rating",
    description: "Lorem ipsum dolor sit amet consectetur cillum",
  },
];

interface MentorSectionData {
  title?: string;
  stats?: Stat[];
}

export function MentorSection({ data }: { data?: MentorSectionData | null }) {
  const stats = data?.stats || defaultStats;
  const title = data?.title || "EMPOWERING BUSINESSES THROUGH TECHNOLOGY";
  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden mx-auto border-2 md:border-4 lg:border-[6px] rounded-2xl md:rounded-3xl lg:rounded-[36px]"
          style={{
            background: "#181614",
            borderColor: "rgba(227, 227, 227, 0.1)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.11)",
          }}
        >
        {/* Responsive Grid Layout */}
        <div className="w-full h-full p-4 md:p-5 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_3fr] gap-4 md:gap-6 lg:gap-8 h-full">
            {/* Mentor Card - Full width on mobile, left column on desktop */}
            <div className="w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[500px]">
              <div
                className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden"
                style={{ background: "#1a1a1a" }}
              >
                {/* Gradient bars - descending pattern */}
                <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                  {[
                    { height: '75%', left: '0%' },
                    { height: '60%', left: '25%' },
                    { height: '46%', left: '50%' },
                    { height: '33%', left: '75%' },
                  ].map((bar, i) => (
                    <div
                      key={i}
                      className="absolute bottom-0"
                      style={{
                        width: '25%',
                        height: bar.height,
                        left: bar.left,
                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 48, 90, 0.5) 54.81%, #14305A 100%)',
                      }}
                    />
                  ))}
                </div>
                <div className="relative w-full h-full flex flex-col justify-start px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8">
                  <h2
                    className="font-bold text-white mb-3 md:mb-6 uppercase leading-tight"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontWeight: 800,
                      fontSize: "clamp(16px, 3.5vw, 42px)",
                      lineHeight: "clamp(20px, 4vw, 46px)",
                      letterSpacing: "-0.02em",
                      color: "rgba(255, 255, 255, 0.62)",
                    }}
                  >
                    {title.split(" ").map((word, i, arr) => (
                      <span key={i}>
                        {word}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>

                  {/* Mentor Image */}
                  <div className="relative w-full flex-1 min-h-[120px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[220px] mt-auto">
                    <Image
                      src="/images/home/company.png"
                      alt="Axtella - Data & Technology Solutions"
                      fill
                      className="object-cover"
                      style={{ zIndex: 1 }}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Cards - Stack on mobile, 2x2 grid on tablet/desktop */}
            <div className="grid grid-cols-2 gap-3 md:gap-3 lg:gap-4 pr-0 lg:pr-4">
              {stats.map((stat, index) => {
                return (
                  <div
                    key={index}
                    className="group rounded-xl md:rounded-2xl border border-white/10 transition-all duration-300 cursor-pointer p-3 md:p-4 lg:p-6 w-full min-h-[90px] sm:min-h-[110px] md:min-h-[150px] lg:min-h-[180px] bg-transparent hover:bg-white hover:border-transparent"
                    style={{
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {/* Number - Gray for all cards, Green on hover */}
                    <div
                      className="font-bold mb-2 md:mb-3 transition-colors duration-300 text-[#7B7B7B] group-hover:text-[#F5A623]"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontWeight: 600,
                        fontSize: "clamp(20px, 3vw, 44px)",
                        lineHeight: "1.1",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.number}
                    </div>

                    {/* Title - White for all cards, Black on hover */}
                    <div
                      className="font-semibold mb-1 md:mb-2 transition-colors duration-300 text-white group-hover:text-black"
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontSize: "clamp(13px, 1.5vw, 20px)",
                        lineHeight: "1.3",
                      }}
                    >
                      {stat.title}
                    </div>

                    {/* Description - Semi-transparent white for all cards */}
                    <div
                      className="transition-colors duration-300 text-white/60 group-hover:text-gray-600 hidden md:block"
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontWeight: 400,
                        fontSize: "clamp(12px, 1.5vw, 18px)",
                        lineHeight: "1.5",
                      }}
                    >
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

          {/* Dotted Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "url('/images/home/dot paatern.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "150px",
              mixBlendMode: "overlay",
            }}
          />
        </div>
      </div>
    </section>
  );
}
