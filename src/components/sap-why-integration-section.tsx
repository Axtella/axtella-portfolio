"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
  image: string;
}

const tabs: TabContent[] = [
  {
    id: "seamless",
    title: "Seamless SAP Data Connectivity",
    heading: "SEAMLESS SAP DATA CONNECTIVITY",
    description:
      "Power BI offers native and certified connectors for SAP systems, including SAP HANA, SAP BW, and SAP BW/4HANA. These connectors enable secure, real-time or scheduled data extraction without the need for complex middleware.",
    bulletPoints: [
      "Direct connectivity to SAP HANA and BW",
      "Secure data transfer with SSO support",
      "Real-time and scheduled refresh options",
    ],
    conclusion: "By enabling seamless connectivity, organizations can",
    conclusionHighlight: "accelerate time-to-insight and reduce IT overhead.",
    image: "/images/sap/seamless-connectivity.png",
  },
  {
    id: "unified",
    title: "Unified, Enterprise-Wide Reporting",
    heading: "UNIFIED, ENTERPRISE-WIDE REPORTING",
    description:
      "Power BI enables organizations to consolidate data from SAP and non-SAP sources into a single reporting platform. This unified approach eliminates silos and provides a comprehensive view of business performance.",
    bulletPoints: [
      "Combine SAP data with CRM, HR, and external sources",
      "Single source of truth for all stakeholders",
      "Consistent metrics and KPIs across departments",
    ],
    conclusion: "With unified reporting, organizations achieve",
    conclusionHighlight: "greater alignment and faster strategic decisions.",
    image: "/images/sap/unified-reporting.png",
  },
  {
    id: "interactive",
    title: "Interactive and Insight-Driven Dashboards",
    heading: "INTERACTIVE AND INSIGHT-DRIVEN DASHBOARDS",
    description:
      "Power BI transforms traditional static reports into interactive dashboards that allow users to explore data dynamically. Business users can drill down from high-level KPIs into detailed transactions, apply filters, and analyze trends with minimal effort.",
    bulletPoints: [
      "Faster root-cause analysis",
      "Reduced dependency on IT teams for reporting",
      "Empowerment of non-technical users",
    ],
    conclusion: "By making analytics accessible, organizations foster a culture of",
    conclusionHighlight: "data-driven decision-making at every level.",
    image: "/images/sap/interactive-dashboards.png",
  },
  {
    id: "scalable",
    title: "Scalable and Flexible Analytics Platform",
    heading: "SCALABLE AND FLEXIBLE ANALYTICS PLATFORM",
    description:
      "Power BI's cloud-native architecture ensures that your analytics platform can scale with your business. Whether you're a mid-sized company or a global enterprise, Power BI adapts to your needs.",
    bulletPoints: [
      "Cloud and on-premises deployment options",
      "Enterprise-grade security and compliance",
      "Seamless integration with Microsoft 365 ecosystem",
    ],
    conclusion: "With a scalable platform, organizations can",
    conclusionHighlight: "future-proof their analytics investments.",
    image: "/images/sap/scalable-platform.png",
  },
];

export function SapWhyIntegrationSection() {
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
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-white">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main Heading Section */}
        <div className="mb-16 md:mb-20">
          <h2
            className="font-extrabold uppercase mb-8"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(28px, 2.8vw, 52px)",
              lineHeight: "1.19",
              letterSpacing: "-0.02em",
              color: "#303030",
            }}
          >
            Empowering Smarter, Faster,
            <br />
            and More Confident Decision-Making
          </h2>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(16px, 1.3vw, 24px)",
              lineHeight: "1.5",
              color: "#000000",
            }}
          >
            At Axtella, we help organizations transform enterprise data into meaningful
            business intelligence. Integrating SAP ERP with Microsoft Power BI enables enterprises
            to move beyond operational reporting and into strategic, insight-driven decision-making.
          </p>
          <p
            className="mt-6"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "clamp(16px, 1.3vw, 24px)",
              lineHeight: "1.5",
              color: "#000000",
            }}
          >
            SAP ERP systems manage critical business operations such as finance, procurement,
            inventory, production, and sales. However, the true value of this data is realized only
            when it can be analyzed holistically and presented in a clear, actionable manner. Power
            BI bridges this gap by converting complex SAP data into intuitive, interactive
            dashboards that support real-time decisions across the organization.
          </p>
        </div>

        {/* Why Integration Matters Section */}
        <div className="mt-16">
          <h3
            className="font-extrabold uppercase text-center mb-12"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(24px, 2.5vw, 48px)",
              lineHeight: "1.29",
              letterSpacing: "-0.02em",
              color: "#303030",
            }}
          >
            Why SAP ERP and Power BI Integration Matters
          </h3>

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

                    {/* Placeholder illustration - can be replaced with actual images */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
                      {activeTab === 0 && <SeamlessConnectivityIllustration />}
                      {activeTab === 1 && <UnifiedReportingIllustration />}
                      {activeTab === 2 && <InteractiveDashboardIllustration />}
                      {activeTab === 3 && <ScalablePlatformIllustration />}
                    </div>
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

// Placeholder SVG illustrations for each tab
function SeamlessConnectivityIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* SAP Logo representation */}
      <rect x="30" y="60" width="80" height="80" rx="8" fill="#0070C0" />
      <text x="70" y="108" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
        SAP
      </text>

      {/* Connection lines */}
      <path d="M 110 100 Q 150 100 150 60" stroke="#F5A623" strokeWidth="3" fill="none" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M 110 100 Q 150 100 150 100" stroke="#F5A623" strokeWidth="3" fill="none" />
      <path d="M 110 100 Q 150 100 150 140" stroke="#F5A623" strokeWidth="3" fill="none" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
      </path>

      {/* Power BI representation */}
      <rect x="190" y="30" width="70" height="40" rx="4" fill="#F2C811" />
      <rect x="190" y="80" width="70" height="40" rx="4" fill="#F5A623" />
      <rect x="190" y="130" width="70" height="40" rx="4" fill="#E74856" />

      {/* Connecting dots */}
      <circle cx="150" cy="60" r="6" fill="#F5A623" />
      <circle cx="150" cy="100" r="6" fill="#F5A623" />
      <circle cx="150" cy="140" r="6" fill="#F5A623" />
    </svg>
  );
}

function UnifiedReportingIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* Multiple data sources */}
      <rect x="20" y="20" width="50" height="40" rx="4" fill="#0070C0" />
      <text x="45" y="45" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SAP</text>

      <rect x="20" y="80" width="50" height="40" rx="4" fill="#FF6B35" />
      <text x="45" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CRM</text>

      <rect x="20" y="140" width="50" height="40" rx="4" fill="#7B68EE" />
      <text x="45" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HR</text>

      {/* Arrows converging */}
      <path d="M 70 40 L 120 100" stroke="#F5A623" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M 70 100 L 120 100" stroke="#F5A623" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
      <path d="M 70 160 L 120 100" stroke="#F5A623" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

      {/* Central hub */}
      <circle cx="140" cy="100" r="25" fill="#F5A623" />
      <text x="140" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">BI</text>

      {/* Unified dashboard */}
      <rect x="180" y="50" width="100" height="100" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="190" y="60" width="35" height="25" rx="2" fill="#F5A623" />
      <rect x="235" y="60" width="35" height="25" rx="2" fill="#F2C811" />
      <rect x="190" y="95" width="80" height="8" rx="2" fill="#e5e7eb" />
      <rect x="190" y="110" width="60" height="8" rx="2" fill="#e5e7eb" />
      <rect x="190" y="125" width="70" height="8" rx="2" fill="#e5e7eb" />

      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#F5A623" />
        </marker>
      </defs>
    </svg>
  );
}

function InteractiveDashboardIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* Dashboard frame */}
      <rect x="30" y="20" width="240" height="160" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="2" />

      {/* Header bar */}
      <rect x="30" y="20" width="240" height="30" rx="12" fill="#F5A623" />
      <text x="150" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">INTERACTIVE INSIGHT</text>

      {/* Chart 1 - Bar chart */}
      <rect x="45" y="65" width="15" height="40" rx="2" fill="#F5A623" />
      <rect x="65" y="75" width="15" height="30" rx="2" fill="#F5A623" opacity="0.7" />
      <rect x="85" y="60" width="15" height="45" rx="2" fill="#F5A623" />
      <rect x="105" y="70" width="15" height="35" rx="2" fill="#F5A623" opacity="0.7" />

      {/* Chart 2 - Line chart */}
      <polyline points="150,95 170,80 190,90 210,70 230,75 250,65" stroke="#F2C811" strokeWidth="3" fill="none" />
      <circle cx="150" cy="95" r="4" fill="#F2C811" />
      <circle cx="170" cy="80" r="4" fill="#F2C811" />
      <circle cx="190" cy="90" r="4" fill="#F2C811" />
      <circle cx="210" cy="70" r="4" fill="#F2C811" />
      <circle cx="230" cy="75" r="4" fill="#F2C811" />
      <circle cx="250" cy="65" r="4" fill="#F2C811" />

      {/* KPI cards */}
      <rect x="45" y="120" width="60" height="45" rx="4" fill="#f3f4f6" />
      <text x="75" y="140" textAnchor="middle" fill="#F5A623" fontSize="14" fontWeight="bold">+24%</text>
      <text x="75" y="155" textAnchor="middle" fill="#666" fontSize="8">Growth</text>

      <rect x="115" y="120" width="60" height="45" rx="4" fill="#f3f4f6" />
      <text x="145" y="140" textAnchor="middle" fill="#E74856" fontSize="14" fontWeight="bold">$1.2M</text>
      <text x="145" y="155" textAnchor="middle" fill="#666" fontSize="8">Revenue</text>

      <rect x="185" y="120" width="60" height="45" rx="4" fill="#f3f4f6" />
      <text x="215" y="140" textAnchor="middle" fill="#0070C0" fontSize="14" fontWeight="bold">847</text>
      <text x="215" y="155" textAnchor="middle" fill="#666" fontSize="8">Orders</text>

      {/* Cursor icon */}
      <path d="M 255 145 L 265 160 L 258 162 L 262 175 L 258 177 L 254 164 L 248 168 Z" fill="#303030" />
    </svg>
  );
}

function ScalablePlatformIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-auto">
      {/* Cloud shape */}
      <ellipse cx="150" cy="50" rx="80" ry="35" fill="#F5A623" opacity="0.2" />
      <ellipse cx="100" cy="55" rx="40" ry="25" fill="#F5A623" opacity="0.2" />
      <ellipse cx="200" cy="55" rx="40" ry="25" fill="#F5A623" opacity="0.2" />

      {/* Cloud icon */}
      <path d="M 130 45 Q 130 30 150 30 Q 170 30 170 45 Q 185 45 185 60 Q 185 75 170 75 L 130 75 Q 115 75 115 60 Q 115 45 130 45" fill="#F5A623" />

      {/* Connection lines */}
      <line x1="150" y1="75" x2="80" y2="130" stroke="#F5A623" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="150" y1="75" x2="150" y2="130" stroke="#F5A623" strokeWidth="2" strokeDasharray="4,4" />
      <line x1="150" y1="75" x2="220" y2="130" stroke="#F5A623" strokeWidth="2" strokeDasharray="4,4" />

      {/* Server/Device icons */}
      <rect x="55" y="130" width="50" height="50" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="65" y="145" width="30" height="5" rx="1" fill="#F5A623" />
      <rect x="65" y="155" width="30" height="5" rx="1" fill="#F5A623" opacity="0.6" />
      <rect x="65" y="165" width="30" height="5" rx="1" fill="#F5A623" opacity="0.3" />

      <rect x="125" y="130" width="50" height="50" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <circle cx="150" cy="150" r="12" fill="none" stroke="#F5A623" strokeWidth="3" />
      <circle cx="150" cy="150" r="5" fill="#F5A623" />

      <rect x="195" y="130" width="50" height="50" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      <rect x="205" y="140" width="30" height="20" rx="2" fill="#f3f4f6" />
      <rect x="210" y="165" width="20" height="8" rx="1" fill="#e5e7eb" />

      {/* Microsoft 365 label */}
      <text x="150" y="195" textAnchor="middle" fill="#666" fontSize="10">Microsoft 365 Ecosystem</text>
    </svg>
  );
}
