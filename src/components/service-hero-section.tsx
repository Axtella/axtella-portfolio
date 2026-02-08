"use client";

interface ServiceHeroSectionProps {
  title: string;
  description: string;
}

export function ServiceHeroSection({ title, description }: ServiceHeroSectionProps) {
  return (
    <section
      className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{ background: "#080D1A" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(20, 48, 90, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/images/home/dot paatern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "150px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-32 md:py-40">
        <div className="max-w-3xl">
          <span
            className="inline-block mb-4 font-semibold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(11px, 1.2vw, 14px)",
              color: "#F5A623",
            }}
          >
            OUR SERVICES
          </span>

          <h1
            className="font-bold text-white mb-6 uppercase leading-tight"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(32px, 5vw, 64px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
            }}
          >
            {title}
          </h1>

          <p
            className="text-white/60 max-w-xl"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              lineHeight: "1.7",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #F5A623 50%, transparent 100%)",
        }}
      />
    </section>
  );
}
