"use client";

import Image from "next/image";

interface ExpertiseCard {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  gradient: string;
  image: string;
}

const expertiseCards: ExpertiseCard[] = [
  {
    id: "power-apps",
    title: "POWER APPS",
    description:
      "Microsoft Power Apps helps organizations create custom business applications quickly without complex coding. It allows teams to replace manual work, spreadsheets, and paper based processes with simple, easy to use digital apps that can be accessed anytime, anywhere. Power Apps helps organizations work faster and smarter by improving how data is collected, shared, and managed. Employees can update information in real time, managers get better visibility, and business processes become more efficient and reliable. As a Microsoft Power Platform services provider, we build user friendly Power Apps solutions tailored to your business needs. Our apps work smoothly across mobile, tablet, and web devices and integrate easily with your existing systems.",
    bulletPoints: [
      "Rapid app development using low code",
      "Expertise in both Canvas Apps and Model Driven Apps",
      "Access across web, mobile, and tablet platforms",
      "Consistent, responsive, and user friendly interface",
      "Integration with multiple connectors and enterprise systems",
      "Built in data integration and import capabilities",
      "Cost effective alternative to traditional application development",
    ],
    gradient: "linear-gradient(89.81deg, #8F2D87 0.18%, #DF80C3 97.2%)",
    image: "/images/powerbi/Mask group.png",
  },
  {
    id: "power-automate",
    title: "POWER AUTOMATE",
    description:
      "Microsoft Power Automate is a workflow automation platform that enables organizations to automate repetitive tasks, approvals, and business processes with ease. It helps teams reduce manual effort, improve process accuracy, and connect workflows across Microsoft 365, third party applications, and enterprise systems. As a trusted Microsoft Power Platform services provider, we design and implement intelligent automation solutions using Power Automate. Our experts help businesses streamline operations by automating end to end processes, improving productivity, and ensuring seamless integration across systems.",
    bulletPoints: [
      "Automate repetitive and manual business processes",
      "Build workflows using low code and prebuilt templates",
      "Create cloud flows, desktop flows, and approval workflows",
      "Seamless integration with Microsoft 365 and multiple connectors",
      "Real time notifications and automated approvals",
      "Secure, scalable, and compliant automation solutions",
      "Reduce operational costs and human errors",
      "Faster process execution and improved efficiency",
    ],
    gradient: "linear-gradient(89.81deg, #D4920F 0.18%, #F5B642 97.2%)",
    image: "/images/powerbi/microsoft-power-automate 1.png",
  },
  {
    id: "power-bi",
    title: "POWER BI",
    description:
      "Microsoft Power BI is a business intelligence and analytics platform that transforms raw data into meaningful insights through interactive dashboards and reports. It enables organizations to monitor performance, identify trends, and make data driven decisions by connecting to data from multiple sources in real time. As a trusted Microsoft Power Platform services provider, we help businesses design and deploy impactful Power BI solutions tailored to their needs. Our experts deliver visually compelling, scalable, and secure analytics that empower stakeholders with actionable insights across the organization.",
    bulletPoints: [
      "Interactive dashboards and dynamic reports",
      "Real time and scheduled data refresh",
      "Integration with multiple data sources and enterprise systems",
      "Advanced data modeling and DAX calculations",
      "Secure data access with role based security",
      "Mobile friendly and cross platform accessibility",
      "Enterprise grade performance and scalability",
      "Faster insights with reduced reporting effort",
    ],
    gradient: "linear-gradient(89.81deg, #1047C2 0.18%, #3588F3 97.2%)",
    image: "/images/powerbi/Mask group (1).png",
  },
];

export function CorporateExpertiseSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2
            className="font-extrabold uppercase mb-4 sm:mb-6 md:mb-8"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(24px, 2.4vw, 46px)",
              lineHeight: "1.24",
              letterSpacing: "-0.02em",
              color: "#303030",
            }}
          >
            Our Expertise
          </h2>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(15px, 1.15vw, 22px)",
              lineHeight: "1.5",
              color: "#000000",
            }}
          >
            As a trusted Microsoft Power Platform services provider, we help organizations transform and modernize their business processes. Our team delivers tailored solutions that align with each organization&apos;s goals and operational needs. We enable faster digital transformation through low-code and scalable solutions. Our approach helps reduce manual work and improve overall efficiency. We support better decision-making through connected, data-driven processes. Our solutions are designed with a strong focus on security, performance, and ease of use. We work closely with businesses at every stage of their transformation journey. By leveraging the Power Platform, we help organizations operate smarter, faster, and more efficiently.
          </p>
        </div>

        {/* Expertise Cards */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {expertiseCards.map((card) => (
            <div
              key={card.id}
              className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
              style={{
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-10">
                {/* Left Side - 30% on desktop, full width on mobile */}
                <div
                  className="lg:col-span-3 min-h-[300px] sm:min-h-[350px] relative flex flex-col p-6 sm:p-8"
                  style={{
                    background: card.gradient,
                  }}
                >
                  {/* Title at top */}
                  <h3
                    className="font-extrabold uppercase mb-4 sm:mb-6 lg:mb-8"
                    style={{
                      fontFamily: "var(--font-montserrat)",
                      fontSize: "clamp(22px, 2.1vw, 40px)",
                      lineHeight: "1.2",
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Image in center */}
                  <div className="flex-1 flex items-center justify-center relative py-4 sm:py-6">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={400}
                      height={400}
                      className="object-contain w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] h-auto max-h-[200px] sm:max-h-[250px] lg:max-h-[300px]"
                    />
                  </div>

                  {/* Contact info at bottom */}
                  <div className="mt-auto pt-4 sm:pt-6 lg:pt-8">
                    <p
                      className="text-white/90 mb-3 sm:mb-4"
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontSize: "clamp(14px, 1.5vw, 16px)",
                        lineHeight: "1.5",
                      }}
                    >
                      For further information,
                      <br />
                      please feel free to reach out to us.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors w-full"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        fontSize: "clamp(12px, 1.2vw, 14px)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      CONTACT US
                    </a>
                  </div>
                </div>

                {/* Right Side - 70% on desktop, full width on mobile */}
                <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 bg-white">
                  {/* Description */}
                  <p
                    className="mb-6 sm:mb-8"
                    style={{
                      fontFamily: "var(--font-plus-jakarta)",
                      fontSize: "clamp(14px, 1.05vw, 20px)",
                      lineHeight: "1.5",
                      color: "#000000",
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-1 sm:space-y-2">
                    {card.bulletPoints.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start sm:items-center gap-2 sm:gap-3"
                        style={{
                          fontFamily: "var(--font-plus-jakarta)",
                          fontWeight: 600,
                          fontSize: "clamp(14px, 1.1vw, 21px)",
                          lineHeight: "1.6",
                          letterSpacing: "-0.01em",
                          color: "#000000",
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#F5A623] flex-shrink-0 mt-2 sm:mt-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
