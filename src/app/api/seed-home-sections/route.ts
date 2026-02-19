import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Default section data matching hardcoded defaults in components
const discoverServicesSection = {
  type: "discover-services",
  label: "OUR SERVICES",
  heading: "DISCOVER\nOUR SOLUTIONS",
  subtext:
    "9 specialized service verticals delivering end-to-end technology and infrastructure solutions across the Kingdom.",
  ctaLabel: "Explore All Services",
  ctaHref: "/services",
  cards: [
    {
      title: "FLEET MANAGEMENT SOLUTIONS",
      description:
        "GPS tracking, route optimization, driver monitoring, fuel management, AI dashcams, and real-time fleet analytics for fleets of all sizes across Saudi Arabia.",
      icon: "Truck",
      color: "#F59E0B",
      link: "/services/fleet-management",
      isNew: true,
      bulletPoints: [
        "Real-Time GPS Tracking",
        "Driver Behavior Monitoring",
        "Fuel Monitoring & Theft Detection",
        "AI Video Telematics",
        "Custom Dashboards & API",
      ],
    },
    {
      title: "TELECOMMUNICATION SOLUTIONS",
      description:
        "End-to-end telecom infrastructure from fiber optic networks to wireless deployment and 24/7 network operations support.",
      icon: "Radio",
      color: "#1B7FE0",
      link: "/services/telecommunication-solutions",
      bulletPoints: [
        "Fiber Optic Installation & Splicing",
        "4G/5G Wireless Deployment",
        "Enterprise Wi-Fi 6/6E",
        "Network Design & Engineering",
        "24/7 NOC Monitoring & Support",
      ],
    },
    {
      title: "INFORMATION TECHNOLOGY",
      description:
        "Enterprise IT solutions including ERP systems, cloud migration, cybersecurity, and managed services for digital transformation.",
      icon: "Monitor",
      color: "#7C3AED",
      link: "/services/information-technology",
      bulletPoints: [
        "ERP Systems (SAP, Oracle)",
        "Cloud Infrastructure & Migration",
        "Cybersecurity Solutions",
        "Managed IT Services",
        "Custom Software Development",
      ],
    },
    {
      title: "INTERNET OF THINGS (IoT)",
      description:
        "Connected devices, smart sensors, and IoT platforms enabling intelligent automation for industries and infrastructure.",
      icon: "Globe",
      color: "#10B981",
      link: "/services/internet-of-things",
      bulletPoints: [
        "Industrial IoT Solutions",
        "Smart Sensors & Metering",
        "IoT Platform Integration",
        "Remote Monitoring Systems",
        "Predictive Analytics",
      ],
    },
    {
      title: "ELV SYSTEMS",
      description:
        "Complete extra low voltage systems for commercial, industrial, and government facilities across Saudi Arabia.",
      icon: "ShieldCheck",
      color: "#EF4444",
      link: "/services/elv-systems",
      bulletPoints: [
        "CCTV & Video Surveillance",
        "Access Control Systems",
        "Fire Alarm & Detection",
        "Public Address & PA Systems",
        "Structured Cabling",
      ],
    },
    {
      title: "BMS & SMART BUILDING",
      description:
        "Intelligent building management systems that optimize energy, comfort, and operational efficiency for modern facilities.",
      icon: "Building2",
      color: "#EAB308",
      link: "/services/bms-smart-building",
      bulletPoints: [
        "Building Management Systems (BMS)",
        "HVAC Automation & Control",
        "Energy Management & Optimization",
        "Lighting Control Systems",
        "Integrated Smart Platforms",
      ],
    },
    {
      title: "ELECTRO MECHANICAL WORKS",
      description:
        "Complete MEP solutions including electrical, plumbing, HVAC, and fire fighting systems for commercial and industrial projects.",
      icon: "Zap",
      color: "#D97706",
      link: "/services/electro-mechanical-works",
      bulletPoints: [
        "HV/LV Electrical Systems",
        "Plumbing & Drainage",
        "HVAC Installation & Ducting",
        "Fire Fighting Systems",
        "Complete MEP Solutions",
      ],
    },
    {
      title: "CIVIL & GENERAL CONSTRUCTION",
      description:
        "Road construction, site development, earthwork, and utility infrastructure for mega projects across the Kingdom.",
      icon: "HardHat",
      color: "#92400E",
      link: "/services/civil-general-construction",
      bulletPoints: [
        "Road & Highway Construction",
        "Site Development & Grading",
        "Utility Infrastructure",
        "Earthwork & Excavation",
        "Project Management",
      ],
    },
    {
      title: "MANAGED SERVICES",
      description:
        "Technical staffing, operations and maintenance support, and workforce solutions for telecom, IT, and infrastructure projects.",
      icon: "Users",
      color: "#6B7280",
      link: "/services/managed-services",
      bulletPoints: [
        "Technical Staffing & Outsourcing",
        "Operations & Maintenance (O&M)",
        "Facility Management",
        "Project-Based Manpower",
        "Training & Development",
      ],
    },
  ],
};

const featuredSection = {
  type: "featured",
  heading: "FEATURED IN",
  subtext:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  items: [
    {
      episode: "EP-29",
      title:
        "Salesman to Microsoft MVP: Mohammad Ali's Inspiring Excel Journey",
      videoId: "dQw4w9WgXcQ",
    },
    {
      episode: "EP-28",
      title: "Excel Tips and Tricks for Beginners",
      videoId: "dQw4w9WgXcQ",
    },
    {
      episode: "EP-27",
      title: "Power BI Dashboard Creation Guide",
      videoId: "dQw4w9WgXcQ",
    },
    {
      episode: "EP-26",
      title: "Data Analysis with Excel: Complete Guide",
      videoId: "dQw4w9WgXcQ",
    },
  ],
};

const whyBusinessLoveSection = {
  type: "why-business-love",
  heading: "WHY BUSINESS LOVE\nAXTELLA",
  subtext: "Kind words from my people means a lot",
  testimonials: [
    {
      companyLogo: "/images/about/Ajman.png",
      quote:
        "Training with Mr. Mohammed Alfan elevated my Excel skills to new heights. I'm now a proficient Excel user, all thanks to the expert guidance!",
      profileImage: "/images/testimonials/ronald-richards.jpg",
      name: "Ronald Richards",
      title: "President",
      isDark: true,
    },
    {
      companyLogo: "/images/about/Aus.png",
      quote:
        "The Excel training program transformed how our team handles data. Highly recommended!",
      profileImage: "/images/testimonials/profile-2.jpg",
      name: "Jane Cooper",
      title: "CEO",
      isDark: false,
    },
    {
      companyLogo: "/images/about/DHL.png",
      quote:
        "Outstanding training that delivers real-world results. Our productivity increased significantly!",
      profileImage: "/images/testimonials/profile-3.jpg",
      name: "Robert Fox",
      title: "Director",
      isDark: false,
    },
    {
      companyLogo: "/images/about/slb.png",
      quote:
        "Mohammed Alfan's expertise in Excel is unmatched. The training sessions were incredibly valuable for our entire organization.",
      profileImage: "/images/testimonials/profile-4.jpg",
      name: "Sarah Johnson",
      title: "Manager",
      isDark: false,
    },
  ],
};

const logoMarqueeSection = {
  type: "logo-marquee",
  headline: "Be part of the 100+ businesses transforming their presence.",
  logos: [
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
  ],
};

const newSections = [
  discoverServicesSection,
  featuredSection,
  whyBusinessLoveSection,
  logoMarqueeSection,
];

export async function POST(request: NextRequest) {
  // Simple secret protection
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.SEED_SECRET && secret !== "axtella-seed-2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = await prisma.page.findUnique({ where: { slug: "home" } });
  if (!page) {
    return NextResponse.json({ error: "Home page not found" }, { status: 404 });
  }

  const existingSections = Array.isArray(page.sections)
    ? (page.sections as Record<string, unknown>[])
    : [];

  const existingTypes = new Set(
    existingSections.map((s) => s.type as string)
  );

  const toInsert = newSections.filter((s) => !existingTypes.has(s.type));

  if (toInsert.length === 0) {
    return NextResponse.json({
      message: "All sections already exist",
      existingTypes: Array.from(existingTypes),
      totalSections: existingSections.length,
    });
  }

  const updatedSections = [...existingSections, ...toInsert];

  await prisma.page.update({
    where: { slug: "home" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { sections: JSON.parse(JSON.stringify(updatedSections)) as any },
  });

  return NextResponse.json({
    message: `Inserted ${toInsert.length} section(s)`,
    inserted: toInsert.map((s) => s.type),
    totalSections: updatedSections.length,
  });
}
