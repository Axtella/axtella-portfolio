"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface TabContent {
  id: string;
  title: string;
  heading: string;
  description: string;
  bulletPoints: string[];
  conclusion: string;
  conclusionHighlight: string;
}

const tabs: TabContent[] = [
  {
    id: "complex",
    title: "Complex SAP Data Structures",
    heading: "COMPLEX SAP DATA STRUCTURES",
    description:
      "SAP ERP systems use highly normalized tables and complex relationships, which can be difficult to interpret without SAP expertise. Improper data modeling can lead to inaccurate insights and performance issues.",
    bulletPoints: [
      "Understand SAP table relationships and business logic",
      "Design optimized data models in Power BI",
      "Ensure data accuracy and consistency across reports",
    ],
    conclusion: "By making analytics accessible, organizations foster a culture of",
    conclusionHighlight: "data-driven decision-making at every level.",
  },
  {
    id: "security",
    title: "Security, Compliance, & Data Governance",
    heading: "SECURITY, COMPLIANCE, & DATA GOVERNANCE",
    description:
      "Integrating SAP data with Power BI requires careful attention to security protocols, compliance requirements, and data governance policies to protect sensitive business information.",
    bulletPoints: [
      "Implement row-level security in Power BI",
      "Ensure compliance with industry regulations",
      "Maintain data lineage and audit trails",
    ],
    conclusion: "With proper governance, organizations can",
    conclusionHighlight: "confidently share insights while protecting sensitive data.",
  },
  {
    id: "performance",
    title: "Performance & Scalability",
    heading: "PERFORMANCE & SCALABILITY",
    description:
      "Large SAP datasets can impact Power BI performance if not properly optimized. Query performance, data refresh times, and report loading speeds require careful attention.",
    bulletPoints: [
      "Optimize data extraction and transformation",
      "Implement incremental refresh strategies",
      "Design efficient DAX calculations",
    ],
    conclusion: "Through optimization, organizations achieve",
    conclusionHighlight: "fast, responsive analytics at enterprise scale.",
  },
  {
    id: "adoption",
    title: "User Adoption & Training",
    heading: "USER ADOPTION & TRAINING",
    description:
      "The success of any BI implementation depends on user adoption. Without proper training, organizations may not realize the full value of their SAP-Power BI integration.",
    bulletPoints: [
      "Provide role-based training programs",
      "Create intuitive, self-service dashboards",
      "Establish a center of excellence for ongoing support",
    ],
    conclusion: "With the right training, organizations",
    conclusionHighlight: "empower every user to make data-driven decisions.",
  },
];

export function SapChallengesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const currentTab = tabs[activeTab];

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-[#f8f8f8]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Title */}
        <h2
          className="font-extrabold uppercase text-center mb-12"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(24px, 2.5vw, 48px)",
            lineHeight: "1.29",
            letterSpacing: "-0.02em",
            color: "#303030",
          }}
        >
          Key Challenges in SAP–Power BI Integration
        </h2>

        <p
          className="text-black/60 text-center mt-4 mb-8 max-w-2xl mx-auto"
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            lineHeight: "1.7",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Tabbed Content Container */}
        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "flex-1 min-w-[200px] px-4 py-4 uppercase transition-all duration-300",
                  activeTab === index
                    ? "bg-[#F5A623] text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                )}
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 800,
                  fontSize: "clamp(12px, 1vw, 20px)",
                  lineHeight: "1.45",
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div ref={contentRef} className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left Column - 60% */}
              <div className="lg:col-span-3">
                {/* Content Heading - Montserrat 40px */}
                <h4
                  className="uppercase mb-6"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    fontWeight: 800,
                    fontSize: "clamp(22px, 2.1vw, 40px)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    color: "#000000",
                  }}
                >
                  {currentTab.heading}
                </h4>

                {/* Description - Plus Jakarta Sans 20px */}
                <p
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.05vw, 20px)",
                    lineHeight: "1.5",
                    color: "#000000",
                  }}
                >
                  {currentTab.description}
                </p>

                {/* "At Axtella, we:" + Bullets - Plus Jakarta Sans 24px, 800 weight */}
                <div
                  className="mb-8"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 800,
                    fontSize: "clamp(16px, 1.25vw, 24px)",
                    lineHeight: "1.8",
                    letterSpacing: "-0.01em",
                    color: "#000000",
                  }}
                >
                  <p className="mb-2">At Axtella, we:</p>
                  <ul className="space-y-1">
                    {currentTab.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#F5A623] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Conclusion - Plus Jakarta Sans 20px */}
                <p
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.05vw, 20px)",
                    lineHeight: "1.5",
                    color: "#000000",
                  }}
                >
                  {currentTab.conclusion}{" "}
                  <span className="font-bold">
                    {currentTab.conclusionHighlight}
                  </span>
                </p>
              </div>

              {/* Right Column - 40% */}
              <div className="lg:col-span-2 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-[#F5A623]/10 blur-3xl rounded-full transform scale-75" />

                  {/* Illustration */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
                    {activeTab === 0 && <ComplexDataIllustration />}
                    {activeTab === 1 && <SecurityIllustration />}
                    {activeTab === 2 && <PerformanceIllustration />}
                    {activeTab === 3 && <AdoptionIllustration />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SVG Illustrations for each tab
function ComplexDataIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* SAP Logo box */}
      <rect x="180" y="20" width="100" height="60" rx="8" fill="#0070C0" />
      <text x="230" y="58" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
        SAP
      </text>

      {/* Connected nodes representing complex data structures */}
      <circle cx="80" cy="50" r="25" fill="#F5A623" opacity="0.9" />
      <circle cx="80" cy="50" r="15" fill="white" />

      {/* Network connections */}
      <line x1="80" y1="75" x2="80" y2="110" stroke="#F5A623" strokeWidth="2" />
      <line x1="80" y1="50" x2="140" y2="50" stroke="#F5A623" strokeWidth="2" strokeDasharray="4,4" />

      {/* Data nodes */}
      <circle cx="80" cy="130" r="20" fill="#00B4D8" />
      <circle cx="40" cy="170" r="15" fill="#F2C811" />
      <circle cx="120" cy="170" r="15" fill="#E74856" />

      {/* Connecting lines */}
      <line x1="80" y1="150" x2="40" y2="155" stroke="#666" strokeWidth="1.5" />
      <line x1="80" y1="150" x2="120" y2="155" stroke="#666" strokeWidth="1.5" />

      {/* Color blocks representing data */}
      <rect x="200" y="100" width="30" height="80" rx="4" fill="#F5A623" />
      <rect x="240" y="120" width="30" height="60" rx="4" fill="#F2C811" />
      <rect x="200" y="140" width="30" height="40" rx="4" fill="#00B4D8" opacity="0.7" />
    </svg>
  );
}

function SecurityIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* Shield */}
      <path
        d="M 150 20 L 220 50 L 220 110 C 220 150 150 180 150 180 C 150 180 80 150 80 110 L 80 50 Z"
        fill="#F5A623"
        opacity="0.9"
      />
      <path
        d="M 150 35 L 205 60 L 205 105 C 205 135 150 160 150 160 C 150 160 95 135 95 105 L 95 60 Z"
        fill="white"
      />

      {/* Lock icon */}
      <rect x="130" y="90" width="40" height="35" rx="4" fill="#F5A623" />
      <path
        d="M 135 90 L 135 75 C 135 60 165 60 165 75 L 165 90"
        stroke="#F5A623"
        strokeWidth="6"
        fill="none"
      />
      <circle cx="150" cy="105" r="5" fill="white" />
      <rect x="148" y="105" width="4" height="10" fill="white" />

      {/* Compliance checkmarks */}
      <circle cx="50" cy="60" r="20" fill="#f3f4f6" stroke="#F5A623" strokeWidth="2" />
      <path d="M 40 60 L 47 67 L 60 54" stroke="#F5A623" strokeWidth="3" fill="none" />

      <circle cx="250" cy="60" r="20" fill="#f3f4f6" stroke="#F5A623" strokeWidth="2" />
      <path d="M 240 60 L 247 67 L 260 54" stroke="#F5A623" strokeWidth="3" fill="none" />

      <circle cx="50" cy="140" r="20" fill="#f3f4f6" stroke="#F5A623" strokeWidth="2" />
      <path d="M 40 140 L 47 147 L 60 134" stroke="#F5A623" strokeWidth="3" fill="none" />

      <circle cx="250" cy="140" r="20" fill="#f3f4f6" stroke="#F5A623" strokeWidth="2" />
      <path d="M 240 140 L 247 147 L 260 134" stroke="#F5A623" strokeWidth="3" fill="none" />
    </svg>
  );
}

function PerformanceIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* Speedometer */}
      <path
        d="M 150 160 A 80 80 0 1 1 230 160"
        stroke="#e5e7eb"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 150 160 A 80 80 0 0 1 70 160"
        stroke="#F5A623"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 70 160 A 80 80 0 0 1 110 95"
        stroke="#F5A623"
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />

      {/* Needle */}
      <line x1="150" y1="160" x2="115" y2="100" stroke="#303030" strokeWidth="4" strokeLinecap="round" />
      <circle cx="150" cy="160" r="10" fill="#303030" />

      {/* Speed labels */}
      <text x="60" y="175" fontSize="12" fill="#666">Slow</text>
      <text x="225" y="175" fontSize="12" fill="#666">Fast</text>

      {/* Performance metrics */}
      <rect x="30" y="20" width="70" height="40" rx="4" fill="#f3f4f6" />
      <text x="65" y="38" textAnchor="middle" fontSize="10" fill="#666">Refresh</text>
      <text x="65" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#F5A623">2.3s</text>

      <rect x="200" y="20" width="70" height="40" rx="4" fill="#f3f4f6" />
      <text x="235" y="38" textAnchor="middle" fontSize="10" fill="#666">Query</text>
      <text x="235" y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#F5A623">0.8s</text>
    </svg>
  );
}

function AdoptionIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* People icons */}
      <circle cx="80" cy="50" r="20" fill="#F5A623" />
      <rect x="60" y="75" width="40" height="50" rx="8" fill="#F5A623" />

      <circle cx="150" cy="50" r="20" fill="#00B4D8" />
      <rect x="130" y="75" width="40" height="50" rx="8" fill="#00B4D8" />

      <circle cx="220" cy="50" r="20" fill="#F2C811" />
      <rect x="200" y="75" width="40" height="50" rx="8" fill="#F2C811" />

      {/* Connecting lines to dashboard */}
      <line x1="80" y1="125" x2="150" y2="155" stroke="#F5A623" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="150" y1="125" x2="150" y2="155" stroke="#00B4D8" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="220" y1="125" x2="150" y2="155" stroke="#F2C811" strokeWidth="2" strokeDasharray="4,4" />

      {/* Dashboard */}
      <rect x="90" y="155" width="120" height="35" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="100" y="162" width="25" height="20" rx="2" fill="#F5A623" />
      <rect x="130" y="167" width="25" height="15" rx="2" fill="#00B4D8" />
      <rect x="160" y="165" width="25" height="17" rx="2" fill="#F2C811" />

      {/* Training/knowledge icon */}
      <circle cx="150" cy="170" r="3" fill="#F5A623" />
    </svg>
  );
}
