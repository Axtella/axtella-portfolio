"use client";

export function MissionVisionSection() {
  const cards = [
    {
      id: 1,
      title: "Our Mission",
      description:
        "We transform brands by combining strategic thinking, creative design, and impactful digital experiences that resonate, inspire, and produce real-world results.",
    },
    {
      id: 2,
      title: "Our Vision",
      description:
        "We transform brands by combining strategic thinking, creative design, and impactful digital experiences that resonate, inspire, and produce real-world results.",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="bg-white">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className="group relative bg-white transition-all duration-300 cursor-pointer"
              >
                {/* Title */}
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "clamp(20px, 5vw, 30px)",
                    lineHeight: "1.3",
                    letterSpacing: "-0.02em",
                    color: "#000000",
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "clamp(16px, 4.5vw, 24px)",
                    lineHeight: "1.4",
                    color: "rgba(0, 0, 0, 0.61)",
                  }}
                >
                  {card.description}
                </p>

                {/* Underline - gray by default, green on hover */}
                <div
                  className="h-1 bg-gray-300 group-hover:bg-[#F5A623] transition-all duration-300"
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
