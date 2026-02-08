"use client";

import { cn } from "@/lib/utils";

// Icon Components using Heroicons-style SVG paths
const LightbulbIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const GrowthIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LightningIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  large?: boolean;
  className?: string;
}

const ValueCard = ({
  icon,
  title,
  description,
  large,
  className,
}: ValueCardProps) => (
  <div
    className={cn(
      "bg-black rounded-2xl lg:rounded-3xl p-6 lg:p-8",
      large && "lg:flex lg:flex-col lg:justify-between lg:h-[480px] xl:h-[550px] 2xl:h-[625px]",
      !large && "lg:h-[220px] xl:h-[260px] 2xl:h-[300px]",
      className
    )}
  >
    {/* Icon container */}
    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center mb-4 lg:mb-6">
      <div className="text-black">{icon}</div>
    </div>

    {/* Text Content Group */}
    <div className={cn(large && "lg:mt-auto")}>
      {/* Title */}
      <h3 className="text-white font-semibold text-xl lg:text-2xl mb-2 lg:mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export function CoreValuesSection() {
  const coreValues = [
    {
      id: 1,
      title: "Excellence",
      description:
        "Delivering high-quality training, consulting, and solutions every time.",
      icon: <LightbulbIcon />,
    },
    {
      id: 2,
      title: "Growth Mindset",
      description:
        "Continuously learning, evolving, and pushing boundaries to stay future-ready.",
      icon: <GrowthIcon />,
      large: true,
    },
    {
      id: 3,
      title: "Integrity",
      description:
        "Acting with honesty, transparency, and accountability.",
      icon: <ShieldIcon />,
    },
    {
      id: 4,
      title: "Innovation",
      description:
        "Embracing new technologies and ideas to stay ahead in a fast-changing world.",
      icon: <LightbulbIcon />,
    },
    {
      id: 5,
      title: "Impact",
      description:
        "Creating meaningful, measurable outcomes for every learner and client.",
      icon: <LightningIcon />,
    },
  ];

  return (
    <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 lg:mb-12 text-center">
          <h2
            className="mb-2 lg:mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "clamp(32px, 6vw, 48px)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
              textTransform: "uppercase",
            }}
          >
            OUR CORE VALUES
          </h2>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "clamp(14px, 3vw, 16px)",
              lineHeight: "1.5",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            Vestibulum ante ipsum primis orci luctustrices
          </p>
        </div>

        {/* Bento-box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 lg:max-w-[1600px] lg:mx-auto">
          {/* Column 1: Excellence + Innovation */}
          <div
            className="flex flex-col gap-4 lg:gap-[25px] 2xl:max-w-[519px]"
          >
            <ValueCard
              icon={coreValues[0].icon}
              title={coreValues[0].title}
              description={coreValues[0].description}
            />
            <ValueCard
              icon={coreValues[3].icon}
              title={coreValues[3].title}
              description={coreValues[3].description}
            />
          </div>

          {/* Column 2: Growth Mindset (large card - spans full height) */}
          <div className="flex 2xl:max-w-[514.21px]">
            <ValueCard
              icon={coreValues[1].icon}
              title={coreValues[1].title}
              description={coreValues[1].description}
              large
            />
          </div>

          {/* Column 3: Integrity + Impact */}
          <div
            className="flex flex-col gap-4 lg:gap-[25px] 2xl:max-w-[519px]"
          >
            <ValueCard
              icon={coreValues[2].icon}
              title={coreValues[2].title}
              description={coreValues[2].description}
            />
            <ValueCard
              icon={coreValues[4].icon}
              title={coreValues[4].title}
              description={coreValues[4].description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
