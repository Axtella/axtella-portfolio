import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@axtella.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@axtella.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Created admin user:", admin.email);

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Axtella",
      contactEmail: "info@axtella.com",
      contactPhone: "+966 50 000 0000",
      address: "Riyadh, Saudi Arabia",
      socialLinks: {
        linkedin: "https://linkedin.com/company/axtella",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      footerText: "Axtella Global - Technology & Infrastructure Solutions",
    },
  });

  console.log("Created default site settings");

  // Create blog categories
  const categories = [
    { name: "Fleet Management", slug: "fleet-management" },
    { name: "Smart Cities & Vision 2030", slug: "smart-cities-vision-2030" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("Created blog categories");

  // Create pages
  const pages = [
    {
      slug: "home",
      title: "Home",
      sections: [
        {
          type: "hero",
          headline: ["ENGINEERING", "SMARTER", "SOLUTIONS"],
          highlightIndex: 1,
          subtext:
            "From telecommunications and IoT to smart buildings and construction — Axtella delivers end-to-end technology solutions across the Kingdom.",
          cta: { label: "Discover More", href: "/about" },
        },
        {
          type: "scroll-highlight",
          paragraphs: [
            "Axtella was founded by Hassan AbdulShukkur lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
            "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ],
        },
        {
          type: "mentor",
          title: "EMPOWERING BUSINESSES THROUGH TECHNOLOGY",
          stats: [
            { number: "2K+", title: "Businesses Trust Us", description: "Lorem ipsum dolor sit amet consectetur cillum" },
            { number: "+75%", title: "Increased Productivity", description: "Lorem ipsum dolor sit amet consectetur cillum" },
            { number: "98%", title: "Customer Satisfaction", description: "Lorem ipsum dolor sit amet consectetur cillum" },
            { number: "4.8/5", title: "Star Rating", description: "Lorem ipsum dolor sit amet consectetur cillum" },
          ],
        },
        {
          type: "what-sets-apart",
          heading: "What Sets Axtella Apart",
          description:
            "Delivering integrated technology and infrastructure solutions with precision, reliability, and scale.",
          cards: [
            { title: "End-to-End Delivery", description: "From planning and procurement to installation and post-deployment support — we manage every phase." },
            { title: "250+ Skilled Professionals", description: "Engineers, technicians, and project managers delivering excellence across the Kingdom." },
            { title: "9 Integrated Verticals", description: "Telecom, IT, Civil, IoT, ELV, Renewable Energy, MEP, Security, and Smart Solutions." },
            { title: "Vision 2030 Aligned", description: "Every project we deliver supports Saudi Arabia's digital transformation goals." },
          ],
        },
      ],
      metaTitle: "Axtella Global - Technology & Infrastructure Solutions",
      metaDescription:
        "Axtella delivers end-to-end technology solutions across telecom, IT, IoT, smart buildings, and construction in Saudi Arabia.",
    },
    {
      slug: "about",
      title: "About",
      sections: [
        {
          type: "hero",
          headline: ["WE'RE AXTELLA"],
          subtext:
            "Lorem ipsum dolor sit amet consectetur. Nisl risus lacus nulla. Laoreet in nulla risus et met adipiscing.",
        },
        {
          type: "core-values",
          label: "WHO WE ARE",
          heading: "About Axtella Global",
          paragraphs: [
            "Established in 2019, Axtella Global Information Technology Company is a Saudi-based LLC operating at the intersection of technology, infrastructure, and service excellence. With our corporate headquarters in Riyadh and strategic branches in Bahrain and India, we have emerged as a trusted partner in delivering comprehensive solutions across Telecom, IT, Civil, IoT, ELV, and Renewable Energy sectors.",
            "Backed by a team of over 250 skilled professionals and decades of leadership experience, we deliver end-to-end project execution built to meet the growing demands of smart cities, connected infrastructure, and digitally-driven industries — fully aligned with Saudi Vision 2030.",
          ],
        },
        {
          type: "mission-vision",
          cards: [
            {
              title: "Our Mission",
              text: "To deliver integrated, reliable, and innovative technology and infrastructure solutions that empower businesses across Saudi Arabia and the GCC. We combine engineering excellence with cutting-edge technology to build systems that perform, scale, and last.",
            },
            {
              title: "Our Vision",
              text: "To become the Kingdom's most trusted technology partner — leading the way in smart infrastructure, digital transformation, and connected solutions aligned with Saudi Vision 2030.",
            },
          ],
        },
      ],
      metaTitle: "About Axtella Global - Our Story & Mission",
      metaDescription:
        "Learn about Axtella Global, a Saudi-based technology company delivering integrated solutions across Telecom, IT, IoT, and Smart Infrastructure since 2019.",
    },
    {
      slug: "contact",
      title: "Contact",
      sections: [
        {
          type: "hero",
          headline: ["LET'S BUILD", "SOMETHING", "GREAT TOGETHER"],
          subtext:
            "Lorem ipsum dolor sit amet consectetur. Nisl risus lacus nulla. Laoreet in nulla risus et met adipiscing.",
        },
        {
          type: "contact-info",
          cards: [
            {
              title: "Talk to Experts",
              india: "+91 789456123",
              uae: ["+971 558 55 855", "589 589 352"],
              email: "support@axtella.com",
            },
            {
              title: "Course Support",
              india: "+91 789456123",
              uae: ["+971 558 55 855", "589 589 352"],
              email: "support@axtella.com",
            },
            {
              title: "Corporate Support",
              india: "+91 789456123",
              uae: ["+971 558 55 855", "589 589 352"],
              email: "support@axtella.com",
            },
          ],
        },
      ],
      metaTitle: "Contact Axtella Global - Get In Touch",
      metaDescription:
        "Contact Axtella for technology and infrastructure solutions. Offices in Riyadh, Bahrain, and India.",
    },
    {
      slug: "careers",
      title: "Careers",
      sections: [
        {
          type: "hero",
          headline: ["BUILD THE FUTURE", "OF SAUDI ARABIA", "WITH US"],
          highlightIndex: 1,
          subtext: "Join 250+ professionals shaping Vision 2030",
          cta: { label: "View Open Positions", href: "#positions" },
        },
        {
          type: "why-join",
          label: "Why Join Us",
          title: "Why Axtella",
          cards: [
            { title: "Growth", description: "Fast-track your career with hands-on projects across telecom, IoT, fleet management, and smart building technologies in one of the world's fastest-growing markets." },
            { title: "Impact", description: "Work on projects that directly contribute to Saudi Vision 2030 — from smart city infrastructure to enterprise digital transformation across the Kingdom." },
            { title: "Culture", description: "Join a diverse, collaborative team that values innovation and initiative. We foster an environment where every voice is heard and ideas turn into action." },
            { title: "Benefits", description: "Competitive compensation, health insurance, annual leave, professional development allowances, and relocation support for international hires." },
          ],
        },
        {
          type: "departments",
          label: "Our Teams",
          title: "Departments",
          departments: ["Telecom", "IT", "IoT", "Fleet", "Civil", "Solar", "Admin"],
        },
      ],
      metaTitle: "Careers at Axtella Global - Join Our Team",
      metaDescription:
        "Join 250+ professionals at Axtella Global. Explore career opportunities in telecom, IT, IoT, and smart infrastructure in Saudi Arabia.",
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { sections: page.sections, metaTitle: page.metaTitle, metaDescription: page.metaDescription },
      create: page,
    });
  }

  console.log("Created pages: Home, About, Contact, Careers");

  // ─── Seed Services ──────────────────────────────────────────
  const services = [
    // 1. Fleet Management
    {
      slug: "fleet-management",
      title: "Fleet Management",
      heroTitle: "Track. Optimize.|Manage.|In Real-Time.",
      heroSubtitle:
        "End-to-end AVL and fleet management solutions powered by GPS, IoT, and cloud technology — designed for government and private fleet operators across Saudi Arabia.",
      order: 1,
      published: true,
      offers: [
        { title: "Real-Time GPS Tracking", icon: "📍", image: "/images/fleet/fleet1.png" },
        { title: "Driver Behavior Monitoring", icon: "🚗", image: "/images/fleet/fleet2.png" },
        { title: "Fuel Monitoring & Theft Detection", icon: "⛽", image: "/images/fleet/fleet3.png" },
        { title: "Maintenance & Diagnostics", icon: "🔧", image: "/images/fleet/fleet4.png" },
        { title: "Video Telematics", icon: "🎥", image: "/images/fleet/fleet5.png" },
        { title: "Custom Dashboards & Mobile App", icon: "📊", image: "/images/fleet/fleet6.png" },
        { title: "Scalable SaaS Platform", icon: "☁️", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "MapPin", title: "Real-Time GPS Tracking", description: "Live vehicle location on interactive map with route history, geofencing, and movement dashboards. Track every asset 24/7." },
        { icon: "Car", title: "Driver Behavior Monitoring", description: "Monitor speeding, harsh braking, acceleration, and idle time. AI-powered driver scorecards to improve safety and fuel economy." },
        { icon: "Fuel", title: "Fuel Monitoring & Theft Detection", description: "Sensor-based fuel level tracking, consumption analysis, and instant alerts for fuel theft or abnormal drops." },
        { icon: "Wrench", title: "Maintenance & Diagnostics", description: "OBD/ECU integration for preventive maintenance. Automated alerts for engine faults, battery health, and tire pressure." },
        { icon: "Video", title: "Video Telematics", description: "In-vehicle dashcams with live streaming and cloud storage. AI-based detection for driver distraction, drowsiness, and events." },
        { icon: "LayoutDashboard", title: "Dashboards & Mobile App", description: "Intuitive web portal and mobile apps (iOS/Android) with role-based access, custom analytics, alerts, and reports." },
        { icon: "Cloud", title: "Scalable SaaS Platform", description: "Cloud-hosted with on-demand scaling and multi-fleet support. API integration with ERPs, logistics, and law enforcement." },
      ],
      howItWorks: [
        { number: "01", icon: "MessageCircle", emoji: "💬", title: "Consultation & Assessment", description: "We analyze your fleet size, vehicle types, operational routes, and business goals to design the perfect tracking solution for your operation.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "Plug", emoji: "🔌", title: "Device Installation", description: "Our certified technicians professionally install GPS trackers, OBD devices, dashcams, and fuel sensors across your entire fleet — with zero downtime.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Settings", emoji: "⚙️", title: "Platform Configuration", description: "Custom dashboard setup with your fleet data, user roles, geofence zones, alert rules, and automated reporting preferences — all tailored to your workflow.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "Radio", emoji: "📡", title: "Go Live", description: "Real-time tracking, driver analytics, and automated reporting activated across all vehicles. Your entire fleet becomes visible 24/7 from any device.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Rocket", emoji: "🚀", title: "Optimization & Support", description: "Ongoing route optimization, fuel analysis, performance reviews, and dedicated 24/7 technical support to keep your fleet running at peak efficiency.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "Fuel", targetNumber: 30, prefix: "20-", suffix: "%", displayValue: "20-30%", title: "Fuel Savings", description: "Reduce fuel waste through real-time monitoring, smart route optimization, and instant theft detection alerts.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 30 },
        { icon: "Timer", targetNumber: 60, suffix: "%", displayValue: "60%", title: "Less Downtime", description: "Predictive maintenance powered by OBD diagnostics prevents breakdowns before they happen — keeping your fleet on the road.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 60 },
        { icon: "Shield", targetNumber: 40, suffix: "%", displayValue: "40%", title: "Fewer Accidents", description: "Driver behavior monitoring, real-time speed alerts, and AI-powered safety scores reduce incidents dramatically.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 40 },
        { icon: "ClipboardCheck", targetNumber: 100, suffix: "%", displayValue: "100%", title: "Compliance", description: "Automated documentation, geofence logging, and reporting ensure full compliance with Saudi transport regulations.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 100 },
        { icon: "Eye", targetNumber: null, suffix: "", displayValue: "24/7", title: "Full Visibility", description: "Real-time tracking of every vehicle, asset, and driver in your fleet — from any device, anywhere, anytime.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Truck", title: "Logistics & Delivery", tagline: "Optimize every mile of your supply chain", image: "/images/fleet/fleet19.png", features: ["Route optimization & ETA tracking", "Proof of delivery with timestamps", "Multi-stop planning & load management"] },
        { icon: "HardHat", title: "Construction", tagline: "Track heavy assets across every site", image: "/images/fleet/fleet20.png", features: ["Heavy equipment GPS tracking", "Geofencing for project sites", "Fuel consumption for machinery"] },
        { icon: "Building2", title: "Corporate Fleets", tagline: "Full control over company vehicles", image: "/images/fleet/fleet21.png", features: ["Employee vehicle assignment & logs", "Trip-based cost allocation", "Unauthorized use detection"] },
        { icon: "Bus", title: "Public Transport", tagline: "Safer, smarter public mobility", image: "/images/fleet/fleet22.png", features: ["Schedule adherence monitoring", "Passenger safety alerts", "Route compliance & deviation detection"] },
        { icon: "Wrench", title: "Field Service", tagline: "Dispatch smarter, respond faster", image: "/images/fleet/fleet23.png", features: ["Nearest technician auto-dispatch", "Job completion tracking", "SLA monitoring & reporting"] },
        { icon: "Landmark", title: "Government", tagline: "Secure, compliant fleet operations", image: "/images/fleet/fleet24.png", features: ["Encrypted & secure tracking", "Full regulatory compliance", "Multi-department fleet auditing"] },
      ],
      metaTitle: "Fleet Management Solutions - Axtella",
      metaDescription: "End-to-end AVL and fleet management solutions powered by GPS, IoT, and cloud technology for fleet operators across Saudi Arabia.",
    },

    // 2. Telecommunication Solutions
    {
      slug: "telecommunication-solutions",
      title: "Telecommunication Solutions",
      heroTitle: "Connecting Your|World. Seamlessly.",
      heroSubtitle:
        "End-to-end telecommunication infrastructure — fiber optics, unified communications, and network solutions for enterprises across Saudi Arabia.",
      order: 2,
      published: true,
      offers: [
        { title: "Fiber Optic Networks", icon: "🔌", image: "/images/fleet/fleet1.png" },
        { title: "Unified Communications", icon: "📞", image: "/images/fleet/fleet2.png" },
        { title: "Structured Cabling", icon: "🔗", image: "/images/fleet/fleet3.png" },
        { title: "Wireless Network Solutions", icon: "📡", image: "/images/fleet/fleet4.png" },
        { title: "IP Telephony & VoIP", icon: "☎️", image: "/images/fleet/fleet5.png" },
        { title: "Network Design & Engineering", icon: "🗺️", image: "/images/fleet/fleet6.png" },
        { title: "Telecom Infrastructure Management", icon: "⚙️", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Cable", title: "Fiber Optic Installation", description: "End-to-end fiber optic network design, splicing, termination, and testing. Single-mode and multi-mode solutions for high-speed, long-distance connectivity." },
        { icon: "Radio", title: "Wireless Network Deployment", description: "Enterprise wireless infrastructure including 4G/5G small cells, point-to-point microwave links, and outdoor coverage solutions for any terrain." },
        { icon: "Phone", title: "Unified Communications", description: "Integrated voice, video, messaging, and collaboration platforms. Microsoft Teams, Cisco Webex, and custom UC solutions for seamless business communication." },
        { icon: "Wifi", title: "Enterprise Wi-Fi Solutions", description: "High-density Wi-Fi 6/6E deployments with centralized management, seamless roaming, and analytics for offices, warehouses, and public venues." },
        { icon: "Network", title: "Network Design & Engineering", description: "Custom network topology design, capacity planning, equipment selection, and path engineering for reliable, scalable telecom infrastructure." },
        { icon: "Settings", title: "Telecom Infrastructure Management", description: "Ongoing management of telecom assets including towers, cabinets, duct networks, and active equipment with preventive maintenance programs." },
        { icon: "Headphones", title: "24/7 NOC Support", description: "Dedicated Network Operations Center with real-time monitoring, fault detection, escalation management, and guaranteed SLA response times." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "Site Survey & Assessment", description: "We evaluate your existing telecom infrastructure, identify coverage gaps, assess capacity requirements, and map out the optimal network architecture for your operations.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "Network Architecture Design", description: "Our engineers design custom network topology, select optimal equipment, plan fiber routes, and create detailed deployment blueprints aligned with your business needs.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Installation & Deployment", description: "Professional fiber laying, tower installation, structured cabling, equipment rack setup, and network configuration — all executed with minimal disruption to your operations.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Testing & Commissioning", description: "Comprehensive signal testing, load testing, failover validation, OTDR fiber testing, and full network certification before handover to ensure flawless performance.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Monitoring & Support", description: "24/7 NOC monitoring, preventive maintenance schedules, SLA management, performance optimization, and dedicated support to keep your network running at peak reliability.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "ArrowUpCircle", targetNumber: 99, suffix: ".99%", displayValue: "99.99%", title: "Network Uptime", description: "Carrier-grade infrastructure with redundant paths, automatic failover, and 24/7 NOC monitoring ensures maximum network availability.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 99 },
        { icon: "Cable", targetNumber: 500, suffix: "+", displayValue: "500+", title: "Km Fiber Deployed", description: "Over 500 kilometers of fiber optic cable installed across Saudi Arabia — connecting cities, campuses, and enterprises.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 80 },
        { icon: "Clock", targetNumber: null, suffix: "", displayValue: "24/7", title: "NOC Monitoring", description: "Round-the-clock Network Operations Center with real-time fault detection, automated alerts, and rapid incident resolution.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 100 },
        { icon: "Users", targetNumber: 50, suffix: "+", displayValue: "50+", title: "Enterprise Networks", description: "Trusted by over 50 enterprise clients across government, banking, healthcare, and energy sectors for mission-critical connectivity.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 75 },
        { icon: "Zap", targetNumber: 4, prefix: "<", suffix: "hr", displayValue: "<4hr", title: "SLA Response Time", description: "Guaranteed rapid response with on-call field engineers, spare equipment pools, and escalation protocols for critical network issues.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 85 },
      ],
      industries: [
        { icon: "Landmark", title: "Government & Defense", tagline: "Secure, sovereign communication infrastructure", image: "/images/fleet/fleet1.png", features: ["Encrypted communication networks", "National fiber backbone deployment", "Emergency communication systems"] },
        { icon: "Building2", title: "Banking & Finance", tagline: "Ultra-low latency connectivity for financial operations", image: "/images/fleet/fleet2.png", features: ["Trading floor network infrastructure", "Branch-to-HQ secure connectivity", "Disaster recovery network design"] },
        { icon: "Heart", title: "Healthcare", tagline: "Reliable connectivity for life-critical systems", image: "/images/fleet/fleet3.png", features: ["Hospital campus networking", "Telemedicine infrastructure setup", "Emergency communication backbone"] },
        { icon: "GraduationCap", title: "Education", tagline: "Campus-wide connectivity for modern learning", image: "/images/fleet/fleet4.png", features: ["University network infrastructure", "Smart classroom connectivity", "Research network high-bandwidth links"] },
        { icon: "Hotel", title: "Hospitality", tagline: "Seamless guest and operational connectivity", image: "/images/fleet/fleet5.png", features: ["High-density guest Wi-Fi networks", "In-room communication systems", "Property-wide coverage solutions"] },
        { icon: "Zap", title: "Oil & Energy", tagline: "Industrial-grade connectivity for remote operations", image: "/images/fleet/fleet6.png", features: ["Remote site satellite connectivity", "SCADA & industrial network setup", "Offshore communication systems"] },
      ],
      metaTitle: "Telecommunication Solutions - Axtella",
      metaDescription: "End-to-end telecom infrastructure — fiber optics, unified communications, and network solutions for enterprises across Saudi Arabia.",
    },

    // 3. Information Technology
    {
      slug: "information-technology",
      title: "Information Technology",
      heroTitle: "Powering Your|Digital Future.",
      heroSubtitle:
        "Enterprise IT infrastructure, cloud solutions, cybersecurity, and digital transformation — designed for businesses across Saudi Arabia.",
      order: 3,
      published: true,
      offers: [
        { title: "IT Infrastructure Setup", icon: "🖥️", image: "/images/fleet/fleet1.png" },
        { title: "Cloud Solutions", icon: "☁️", image: "/images/fleet/fleet2.png" },
        { title: "Cybersecurity", icon: "🛡️", image: "/images/fleet/fleet3.png" },
        { title: "Enterprise Software", icon: "💼", image: "/images/fleet/fleet4.png" },
        { title: "Managed IT Services", icon: "🔧", image: "/images/fleet/fleet5.png" },
        { title: "Data Center Solutions", icon: "🏢", image: "/images/fleet/fleet6.png" },
        { title: "Digital Transformation", icon: "🚀", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Server", title: "Infrastructure Design & Deployment", description: "Enterprise-grade server setup, networking, structured cabling, and data center infrastructure designed for maximum uptime and performance." },
        { icon: "Cloud", title: "Cloud Migration & Management", description: "Seamless migration to AWS, Azure, or hybrid cloud environments. Ongoing optimization, cost management, and SaaS deployment." },
        { icon: "ShieldCheck", title: "Cybersecurity & Compliance", description: "Advanced threat detection, SIEM integration, firewall management, and regulatory compliance — protecting your business 24/7." },
        { icon: "Monitor", title: "24/7 Network Monitoring", description: "Real-time infrastructure monitoring with automated alerting, performance dashboards, and rapid incident response across your entire network." },
        { icon: "Database", title: "Data Backup & Recovery", description: "Automated backup strategies with geo-redundant storage, disaster recovery planning, and guaranteed data restoration SLAs." },
        { icon: "Code", title: "Custom Software Development", description: "Bespoke enterprise applications, API integrations, workflow automation, and legacy system modernization tailored to your business." },
        { icon: "Headphones", title: "IT Helpdesk & Support", description: "Dedicated L1/L2/L3 support teams, ticketing systems, remote assistance, and on-site technicians — keeping your operations running smoothly." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "IT Assessment & Audit", description: "We evaluate your current infrastructure, identify security vulnerabilities, performance bottlenecks, and compliance gaps to build a clear roadmap for improvement.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "Solution Architecture", description: "Our architects design a tailored IT strategy covering infrastructure, cloud, security, and software — aligned with your business goals and budget.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Implementation & Migration", description: "We deploy infrastructure, migrate systems to the cloud, integrate enterprise software, and configure networks — all with minimal disruption to your operations.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Testing & Security Hardening", description: "Comprehensive penetration testing, vulnerability scanning, compliance validation, and security hardening to ensure your systems are bulletproof.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Ongoing Support & Optimization", description: "24/7 monitoring, proactive maintenance, regular security updates, performance tuning, and dedicated support to keep your IT running at peak efficiency.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "ArrowUpCircle", targetNumber: 99, suffix: ".9%", displayValue: "99.9%", title: "Uptime Guarantee", description: "Enterprise-grade infrastructure with redundant systems, load balancing, and 24/7 monitoring ensures maximum availability.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 99 },
        { icon: "Users", targetNumber: 50, suffix: "+", displayValue: "50+", title: "Enterprise Clients", description: "Trusted by over 50 enterprises across banking, healthcare, government, and energy sectors in Saudi Arabia.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 75 },
        { icon: "Clock", targetNumber: null, suffix: "", displayValue: "24/7", title: "Support & Monitoring", description: "Round-the-clock NOC monitoring, dedicated helpdesk, and rapid incident response — your IT never sleeps.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 100 },
        { icon: "TrendingDown", targetNumber: 70, suffix: "%", displayValue: "70%", title: "Cost Reduction via Cloud", description: "Cloud migration and optimization strategies that dramatically reduce IT infrastructure costs while improving performance.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 70 },
        { icon: "Zap", targetNumber: 2, prefix: "<", suffix: "hr", displayValue: "<2hr", title: "Incident Response Time", description: "Guaranteed rapid response with automated alerts, escalation protocols, and on-call engineering teams ready 24/7.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 90 },
      ],
      industries: [
        { icon: "Building2", title: "Banking & Finance", tagline: "Secure, compliant, and scalable IT for financial institutions", image: "/images/fleet/fleet1.png", features: ["Core banking system integration", "PCI-DSS compliance & security", "High-availability infrastructure"] },
        { icon: "Heart", title: "Healthcare", tagline: "HIPAA-ready IT infrastructure for hospitals and clinics", image: "/images/fleet/fleet2.png", features: ["Electronic health record systems", "Telemedicine platform setup", "Medical data security & backup"] },
        { icon: "Landmark", title: "Government", tagline: "Sovereign cloud and e-government solutions", image: "/images/fleet/fleet3.png", features: ["E-government portal development", "Data residency compliance", "Citizen service digitization"] },
        { icon: "ShoppingCart", title: "Retail & E-Commerce", tagline: "Omnichannel technology for modern retail", image: "/images/fleet/fleet4.png", features: ["E-commerce platform deployment", "POS & inventory integration", "Customer data analytics"] },
        { icon: "GraduationCap", title: "Education", tagline: "Digital learning infrastructure for schools and universities", image: "/images/fleet/fleet5.png", features: ["LMS deployment & management", "Campus network infrastructure", "EdTech platform integration"] },
        { icon: "Zap", title: "Oil & Energy", tagline: "Industrial-grade IT for energy sector operations", image: "/images/fleet/fleet6.png", features: ["SCADA & IoT integration", "Remote site connectivity", "Industrial cybersecurity"] },
      ],
      metaTitle: "Information Technology Solutions - Axtella",
      metaDescription: "Enterprise IT infrastructure, cloud solutions, cybersecurity, and digital transformation for businesses across Saudi Arabia.",
    },

    // 4. Internet of Things
    {
      slug: "internet-of-things",
      title: "Internet of Things",
      heroTitle: "Connected Intelligence|Everywhere.",
      heroSubtitle:
        "Smart IoT ecosystems that connect devices, collect data, and deliver actionable insights — designed for businesses across Saudi Arabia.",
      order: 4,
      published: true,
      offers: [
        { title: "Smart Sensor Networks", icon: "🔌", image: "/images/fleet/fleet1.png" },
        { title: "Industrial IoT (IIoT)", icon: "🏭", image: "/images/fleet/fleet2.png" },
        { title: "Asset Tracking & Monitoring", icon: "📍", image: "/images/fleet/fleet3.png" },
        { title: "IoT Data Analytics", icon: "📊", image: "/images/fleet/fleet4.png" },
        { title: "Edge Computing Solutions", icon: "⚡", image: "/images/fleet/fleet5.png" },
        { title: "IoT Security & Management", icon: "🔒", image: "/images/fleet/fleet6.png" },
        { title: "Smart Environment Solutions", icon: "🌿", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Radio", title: "Real-Time Data Collection", description: "Deploy thousands of IoT sensors to collect environmental, operational, and telemetry data in real time across distributed locations." },
        { icon: "Cloud", title: "Edge-to-Cloud Architecture", description: "Process data at the edge for low-latency decisions while syncing to cloud platforms for deep analytics and long-term storage." },
        { icon: "BrainCircuit", title: "Predictive Analytics & AI", description: "Machine learning models that analyze sensor data to predict equipment failures, optimize processes, and uncover hidden patterns." },
        { icon: "Wifi", title: "Scalable Sensor Networks", description: "LoRaWAN, NB-IoT, and 5G-enabled sensor meshes that scale from dozens to tens of thousands of connected devices." },
        { icon: "ShieldCheck", title: "Secure Device Management", description: "End-to-end encryption, OTA firmware updates, device provisioning, and zero-trust security for your entire IoT fleet." },
        { icon: "BarChart3", title: "Custom IoT Dashboards", description: "Real-time monitoring dashboards with customizable widgets, alerts, and KPIs tailored to your operational needs." },
        { icon: "Plug", title: "Seamless API Integration", description: "RESTful APIs and MQTT brokers that integrate your IoT platform with ERP, CRM, BMS, and third-party systems." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "IoT Readiness Assessment", description: "We evaluate your infrastructure, connectivity, and data needs to identify the best IoT use cases and create a deployment roadmap tailored to your operations.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "Solution Architecture & Design", description: "Our engineers design the IoT ecosystem — selecting sensors, gateways, communication protocols, and cloud platforms to match your performance and budget requirements.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Device Deployment & Integration", description: "We install and configure IoT sensors, edge gateways, and connectivity modules — integrating them with your existing systems and network infrastructure.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Platform Configuration & Testing", description: "End-to-end platform setup including data pipelines, dashboards, alerts, and security testing to ensure reliable and secure data flow from device to cloud.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Continuous Monitoring & Optimization", description: "24/7 device health monitoring, firmware updates, performance tuning, and data analytics optimization to maximize the value of your IoT investment.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "Cpu", targetNumber: 10, suffix: "K+", displayValue: "10K+", title: "Devices Connected", description: "Over 10,000 IoT sensors and devices deployed across industrial, commercial, and environmental monitoring networks.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 85 },
        { icon: "ArrowUpCircle", targetNumber: 99, suffix: ".8%", displayValue: "99.8%", title: "Network Uptime", description: "Enterprise-grade IoT infrastructure with redundant gateways, failover protocols, and 24/7 network monitoring.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 99 },
        { icon: "TrendingUp", targetNumber: 60, suffix: "%", displayValue: "60%", title: "Efficiency Gains", description: "IoT-driven automation and predictive analytics that dramatically improve operational efficiency and reduce waste.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 60 },
        { icon: "Zap", targetNumber: 5, prefix: "<", suffix: "sec", displayValue: "<5sec", title: "Data Latency", description: "Near real-time data processing with edge computing and optimized communication protocols for instant insights.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 95 },
        { icon: "Clock", targetNumber: null, suffix: "", displayValue: "24/7", title: "Device Monitoring", description: "Round-the-clock IoT device health monitoring, automated alerts, and remote diagnostics for your entire fleet.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Factory", title: "Manufacturing", tagline: "Smart factory automation and predictive maintenance", image: "/images/fleet/fleet1.png", features: ["Production line monitoring", "Predictive equipment maintenance", "Quality control sensors"] },
        { icon: "Building2", title: "Smart Cities", tagline: "Connected urban infrastructure for sustainable cities", image: "/images/fleet/fleet2.png", features: ["Smart street lighting systems", "Environmental monitoring", "Traffic & parking sensors"] },
        { icon: "Heart", title: "Healthcare", tagline: "IoT-enabled patient monitoring and asset tracking", image: "/images/fleet/fleet3.png", features: ["Remote patient monitoring", "Medical asset tracking", "Cold chain management"] },
        { icon: "Sprout", title: "Agriculture", tagline: "Precision farming with sensor-driven insights", image: "/images/fleet/fleet4.png", features: ["Soil & moisture monitoring", "Automated irrigation systems", "Crop health analytics"] },
        { icon: "Truck", title: "Logistics & Supply Chain", tagline: "Real-time tracking and warehouse optimization", image: "/images/fleet/fleet5.png", features: ["Fleet & asset tracking", "Warehouse environmental monitoring", "Supply chain visibility"] },
        { icon: "Zap", title: "Oil & Gas", tagline: "Industrial IoT for energy sector operations", image: "/images/fleet/fleet6.png", features: ["Pipeline monitoring sensors", "Remote site telemetry", "Hazardous area monitoring"] },
      ],
      metaTitle: "Internet of Things Solutions - Axtella",
      metaDescription: "Smart IoT ecosystems that connect devices, collect data, and deliver actionable insights for businesses across Saudi Arabia.",
    },

    // 5. BMS & Smart Building
    {
      slug: "bms-smart-building",
      title: "BMS & Smart Building",
      heroTitle: "Intelligent Building|Management.",
      heroSubtitle:
        "End-to-end BMS and smart building automation — from HVAC control and energy management to integrated safety systems for projects across Saudi Arabia.",
      order: 5,
      published: true,
      offers: [
        { title: "HVAC Control Systems", icon: "❄️", image: "/images/fleet/fleet1.png" },
        { title: "Lighting Automation", icon: "💡", image: "/images/fleet/fleet1.png" },
        { title: "Energy Management", icon: "⚡", image: "/images/fleet/fleet1.png" },
        { title: "Fire Detection & Alarm", icon: "🔥", image: "/images/fleet/fleet1.png" },
        { title: "Access Control & Security", icon: "🔒", image: "/images/fleet/fleet1.png" },
        { title: "Building Analytics & Reporting", icon: "📊", image: "/images/fleet/fleet1.png" },
        { title: "IoT Sensor Integration", icon: "📡", image: "/images/fleet/fleet1.png" },
      ],
      features: [
        { icon: "Monitor", title: "Centralized Monitoring & Control", description: "Single-pane-of-glass view for all building systems — HVAC, lighting, fire, and security — with real-time status and remote override." },
        { icon: "Zap", title: "Energy Optimization", description: "AI-driven algorithms that analyze consumption patterns and automatically adjust systems to minimize energy waste." },
        { icon: "Settings", title: "Predictive Maintenance", description: "Sensor-driven diagnostics that detect anomalies early, schedule maintenance proactively, and prevent costly breakdowns." },
        { icon: "ShieldCheck", title: "Integrated Safety Systems", description: "Unified fire, smoke, gas detection, and emergency protocols with automated alerts and compliance logging." },
        { icon: "Users", title: "Occupancy-Based Automation", description: "People-counting and zone detection that adjusts HVAC, lighting, and ventilation based on real-time occupancy levels." },
        { icon: "BarChart3", title: "Real-Time Analytics Dashboard", description: "Live KPIs, historical trend analysis, energy benchmarking, and automated reporting for facility managers." },
        { icon: "Smartphone", title: "Remote Access & Mobile Control", description: "Full BMS control from any device — adjust setpoints, view alarms, and manage schedules on the go." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "🏢", title: "Building Assessment & Audit", description: "We evaluate your building's existing systems, infrastructure, and energy profile to identify automation opportunities and define project scope.", image: "/images/fleet/fleet1.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "System Design & Engineering", description: "Our engineers design a tailored BMS architecture — selecting controllers, sensors, protocols, and integration points for maximum efficiency.", image: "/images/fleet/fleet1.png" },
        { number: "03", icon: "Wrench", emoji: "🔧", title: "Installation & Integration", description: "Professional installation of BMS hardware, wiring, and software with seamless integration into existing HVAC, lighting, fire, and security systems.", image: "/images/fleet/fleet1.png" },
        { number: "04", icon: "CheckCircle", emoji: "✅", title: "Commissioning & Testing", description: "Rigorous end-to-end testing of all automation sequences, fail-safes, alarm routing, and energy optimization logic before handover.", image: "/images/fleet/fleet1.png" },
        { number: "05", icon: "Headphones", emoji: "📊", title: "Ongoing Monitoring & Support", description: "24/7 remote monitoring, preventive maintenance, software updates, and dedicated support to keep your building running at peak performance.", image: "/images/fleet/fleet1.png" },
      ],
      stats: [
        { icon: "Zap", targetNumber: 40, suffix: "%", displayValue: "40%", title: "Energy Savings", description: "Average energy cost reduction achieved through intelligent automation", accentColor: "#22c55e", accentBg: "rgba(34,197,94,0.15)", progressPercent: 85 },
        { icon: "ArrowUpCircle", targetNumber: 99, suffix: ".9%", displayValue: "99.9%", title: "System Uptime", description: "Guaranteed uptime with redundant controllers and 24/7 monitoring", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 99 },
        { icon: "Building2", targetNumber: 500, suffix: "+", displayValue: "500+", title: "Buildings Managed", description: "Smart buildings across Saudi Arabia operating on our BMS platform", accentColor: "#3B82F6", accentBg: "rgba(59,130,246,0.15)", progressPercent: 78 },
        { icon: "Clock", targetNumber: 15, prefix: "<", suffix: "min", displayValue: "<15min", title: "Response Time", description: "Average alarm acknowledgment and first-response time", accentColor: "#8B5CF6", accentBg: "rgba(139,92,246,0.15)", progressPercent: 92 },
        { icon: "Shield", targetNumber: null, suffix: "", displayValue: "24/7", title: "Monitoring", description: "Round-the-clock remote monitoring and incident management", accentColor: "#EF4444", accentBg: "rgba(239,68,68,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Building2", title: "Commercial Offices", tagline: "Create productive, energy-efficient workspaces", image: "/images/fleet/fleet1.png", features: ["Zone-based HVAC & lighting control", "Occupancy-driven automation", "Energy benchmarking & reporting"] },
        { icon: "Heart", title: "Healthcare Facilities", tagline: "Maintain critical environments for patient safety", image: "/images/fleet/fleet1.png", features: ["Precision temperature & humidity control", "Air quality & pressure monitoring", "Emergency system integration"] },
        { icon: "Hotel", title: "Hotels & Hospitality", tagline: "Deliver guest comfort while optimizing costs", image: "/images/fleet/fleet1.png", features: ["Room-level climate automation", "Guest presence-based controls", "Central energy management"] },
        { icon: "ShoppingCart", title: "Retail & Malls", tagline: "Optimize large-scale environments for shoppers", image: "/images/fleet/fleet1.png", features: ["Multi-zone HVAC scheduling", "Lighting automation & scenes", "Escalator & elevator monitoring"] },
        { icon: "GraduationCap", title: "Educational Campuses", tagline: "Smart environments for learning institutions", image: "/images/fleet/fleet1.png", features: ["Classroom comfort automation", "Campus-wide energy monitoring", "Scheduling-based system control"] },
        { icon: "Factory", title: "Industrial Facilities", tagline: "Reliable automation for manufacturing environments", image: "/images/fleet/fleet1.png", features: ["Process cooling & ventilation", "Equipment health monitoring", "Safety system integration"] },
      ],
      metaTitle: "BMS & Smart Building Solutions - Axtella",
      metaDescription: "End-to-end BMS and smart building automation — HVAC control, energy management, and integrated safety systems for projects across Saudi Arabia.",
    },

    // 6. Electro-Mechanical Works
    {
      slug: "electro-mechanical-works",
      title: "Electro-Mechanical Works",
      heroTitle: "Engineering Excellence.|Built to Last.",
      heroSubtitle:
        "Complete electro-mechanical engineering — HVAC, electrical systems, plumbing, and fire protection for commercial and industrial projects across Saudi Arabia.",
      order: 6,
      published: true,
      offers: [
        { title: "HVAC Systems", icon: "❄️", image: "/images/fleet/fleet1.png" },
        { title: "Electrical Power Distribution", icon: "⚡", image: "/images/fleet/fleet2.png" },
        { title: "Plumbing & Drainage", icon: "💧", image: "/images/fleet/fleet3.png" },
        { title: "Fire Fighting Systems", icon: "🔥", image: "/images/fleet/fleet4.png" },
        { title: "Building Automation", icon: "⚙️", image: "/images/fleet/fleet5.png" },
        { title: "Preventive Maintenance", icon: "🔧", image: "/images/fleet/fleet6.png" },
        { title: "Energy Management", icon: "🔋", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Snowflake", title: "HVAC Design & Installation", description: "Complete heating, ventilation, and air conditioning solutions — from load calculation and duct design to installation and commissioning for optimal climate control." },
        { icon: "Zap", title: "Electrical Systems", description: "Power distribution, switchgear installation, cable management, and backup power solutions — engineered for safety, efficiency, and regulatory compliance." },
        { icon: "Droplets", title: "Plumbing & Drainage", description: "Water supply, drainage, and sewage systems designed and installed to international standards — ensuring reliability and code compliance." },
        { icon: "Flame", title: "Fire Protection", description: "Fire alarm, detection, suppression, and sprinkler systems — designed and installed to meet Saudi Civil Defense requirements and international standards." },
        { icon: "Settings", title: "Building Automation", description: "Integrated BMS solutions that connect HVAC, lighting, and security systems — enabling centralized monitoring and energy optimization." },
        { icon: "Wrench", title: "Preventive Maintenance", description: "Scheduled maintenance programs for all MEP systems — reducing downtime, extending equipment life, and ensuring peak performance." },
        { icon: "ShieldCheck", title: "Safety & Compliance", description: "Full compliance with Saudi building codes, SASO standards, and international safety regulations — from design through final certification." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "Site Assessment & Planning", description: "We evaluate site conditions, assess mechanical and electrical load requirements, review existing infrastructure, and ensure full regulatory compliance before any work begins.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "Engineering Design", description: "Our engineers create detailed MEP drawings, equipment specifications, bill of quantities, and coordination plans — ensuring every system works together seamlessly.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Procurement & Installation", description: "We source quality equipment from trusted manufacturers, manage fabrication and logistics, and execute professional installation with strict quality control.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Testing & Commissioning", description: "Comprehensive system testing, load balancing, performance verification, and third-party certification — ensuring every system meets design specifications.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Maintenance & Support", description: "Preventive maintenance programs, 24/7 emergency response, performance monitoring, and continuous optimization to maximize system lifespan.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "Award", targetNumber: 200, suffix: "+", displayValue: "200+", title: "Projects Delivered", description: "Successfully completed MEP projects across commercial, industrial, and residential sectors throughout Saudi Arabia.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 80 },
        { icon: "Clock", targetNumber: 98, suffix: "%", displayValue: "98%", title: "On-Time Completion", description: "Industry-leading project delivery rate — powered by meticulous planning, coordination, and experienced execution teams.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 98 },
        { icon: "Headphones", targetNumber: null, suffix: "", displayValue: "24/7", title: "Emergency Support", description: "Round-the-clock emergency response for critical MEP systems — minimizing downtime and protecting your operations.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 100 },
        { icon: "Calendar", targetNumber: 15, suffix: "+", displayValue: "15+", title: "Years Experience", description: "Over a decade of MEP engineering expertise — delivering reliable infrastructure for the Kingdom's most demanding projects.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 60 },
        { icon: "ShieldCheck", targetNumber: 100, suffix: "%", displayValue: "100%", title: "Safety Record", description: "Zero major safety incidents across all projects — achieved through rigorous safety protocols and continuous training programs.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Building2", title: "Commercial Buildings", tagline: "Office towers, retail centers, and mixed-use developments", image: "/images/fleet/fleet1.png", features: ["Central HVAC & chiller plant systems", "High-voltage power distribution", "Fire alarm & suppression systems", "Plumbing & sanitary systems"] },
        { icon: "Heart", title: "Healthcare Facilities", tagline: "Hospitals, clinics, and medical centers", image: "/images/fleet/fleet2.png", features: ["Medical gas piping systems", "Clean room HVAC solutions", "Emergency power & UPS systems", "Fire safety & code compliance"] },
        { icon: "Factory", title: "Industrial & Manufacturing", tagline: "Production facilities, warehouses, and cold storage", image: "/images/fleet/fleet3.png", features: ["Industrial ventilation & exhaust", "Heavy-duty electrical distribution", "Process piping & drainage", "Dust collection & filtration"] },
        { icon: "Hotel", title: "Hospitality", tagline: "Hotels, resorts, restaurants, and entertainment venues", image: "/images/fleet/fleet4.png", features: ["Guest room HVAC & controls", "Kitchen ventilation & exhaust", "Hot water & laundry systems", "Pool & spa mechanical systems"] },
        { icon: "GraduationCap", title: "Education", tagline: "Schools, universities, and research laboratories", image: "/images/fleet/fleet5.png", features: ["Classroom climate control", "Laboratory ventilation systems", "Campus electrical infrastructure", "Sports facility MEP systems"] },
        { icon: "Landmark", title: "Government & Public", tagline: "Government buildings, airports, and public infrastructure", image: "/images/fleet/fleet6.png", features: ["Large-scale HVAC systems", "Standby power generation", "Public safety fire systems", "Water treatment & pumping"] },
      ],
      metaTitle: "Electro-Mechanical Works - Axtella",
      metaDescription: "Complete electro-mechanical engineering — HVAC, electrical systems, plumbing, and fire protection for projects across Saudi Arabia.",
    },

    // 7. Civil & General Construction
    {
      slug: "civil-general-construction",
      title: "Civil & General Construction",
      heroTitle: "Building Tomorrow\u2019s|Infrastructure.",
      heroSubtitle:
        "Professional civil engineering and general construction — from site preparation and structural works to finishing and handover for projects across Saudi Arabia.",
      order: 7,
      published: true,
      offers: [
        { title: "Site Development & Earthworks", icon: "⛰️", image: "/images/fleet/fleet1.png" },
        { title: "Structural Engineering", icon: "🏗️", image: "/images/fleet/fleet2.png" },
        { title: "Concrete & Steel Works", icon: "🔨", image: "/images/fleet/fleet3.png" },
        { title: "Road & Infrastructure", icon: "🛣️", image: "/images/fleet/fleet4.png" },
        { title: "Interior Fit-Out", icon: "🖌️", image: "/images/fleet/fleet5.png" },
        { title: "Renovation & Restoration", icon: "🔄", image: "/images/fleet/fleet6.png" },
        { title: "Project Management", icon: "📋", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Mountain", title: "Site Development & Earthworks", description: "Complete site preparation including excavation, grading, compaction, and drainage — transforming raw land into construction-ready sites." },
        { icon: "Building2", title: "Structural Engineering", description: "Reinforced concrete and steel structural design and construction — engineered for strength, durability, and seismic compliance." },
        { icon: "Hammer", title: "Concrete & Steel Works", description: "Expert concrete pouring, steel fabrication, rebar installation, and formwork — delivered with precision and strict quality control." },
        { icon: "Route", title: "Road & Infrastructure", description: "Road construction, utility networks, drainage systems, and landscaping — building the infrastructure that connects communities." },
        { icon: "Paintbrush", title: "Interior Fit-Out & Finishing", description: "Complete interior finishing including flooring, painting, ceiling systems, and joinery — transforming structures into functional spaces." },
        { icon: "RefreshCw", title: "Renovation & Restoration", description: "Building renovation, structural repair, facade restoration, and modernization — breathing new life into existing structures." },
        { icon: "ShieldCheck", title: "Quality & Safety Assurance", description: "Rigorous quality control, safety management, and compliance with Saudi building codes and international construction standards." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "Site Survey & Planning", description: "We conduct topographic surveys, soil testing, feasibility studies, and detailed project planning — ensuring every project starts on solid ground.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "Design & Engineering", description: "Our engineers create structural designs, coordinate with architects, prepare material specifications, and develop comprehensive BOQ documentation.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Construction & Execution", description: "Foundation works, structural framing, concrete pouring, and systematic construction phases — executed with precision and strict timeline adherence.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Quality Inspection", description: "Material testing, structural integrity checks, code compliance verification, and thorough punch-list resolution — ensuring every detail meets specifications.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Handover & Support", description: "Final inspection, as-built documentation, warranty support, and post-construction maintenance — ensuring a smooth transition to operations.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "Award", targetNumber: 150, suffix: "+", displayValue: "150+", title: "Projects Completed", description: "Successfully delivered construction projects across commercial, industrial, and residential sectors throughout Saudi Arabia.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 75 },
        { icon: "Clock", targetNumber: 96, suffix: "%", displayValue: "96%", title: "On-Time Delivery", description: "Industry-leading project completion rate — powered by meticulous planning, resource management, and experienced site teams.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 96 },
        { icon: "Ruler", targetNumber: 500, suffix: "K+", displayValue: "500K+", title: "Sq.M Built", description: "Over half a million square meters of construction completed — from commercial towers to industrial facilities and residential compounds.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 85 },
        { icon: "Calendar", targetNumber: 20, suffix: "+", displayValue: "20+", title: "Years Experience", description: "Two decades of civil engineering and construction expertise — building the Kingdom's most demanding infrastructure projects.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 80 },
        { icon: "ShieldCheck", targetNumber: 100, suffix: "%", displayValue: "100%", title: "Safety Compliance", description: "Perfect safety record across all active sites — achieved through rigorous protocols, continuous training, and zero-tolerance safety culture.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Building2", title: "Commercial & Office", tagline: "Office towers, retail complexes, and mixed-use developments", image: "/images/fleet/fleet1.png", features: ["High-rise structural engineering", "Commercial facade systems", "Parking structure construction", "Tenant fit-out coordination"] },
        { icon: "Home", title: "Residential", tagline: "Villas, apartment buildings, and residential compounds", image: "/images/fleet/fleet2.png", features: ["Villa and townhouse construction", "Multi-story apartment buildings", "Compound infrastructure works", "Landscape and hardscape finishing"] },
        { icon: "Factory", title: "Industrial", tagline: "Factories, warehouses, logistics centers, and industrial parks", image: "/images/fleet/fleet3.png", features: ["Pre-engineered metal buildings", "Heavy foundation works", "Industrial floor systems", "Loading dock construction"] },
        { icon: "Route", title: "Infrastructure", tagline: "Roads, bridges, utilities, and drainage systems", image: "/images/fleet/fleet4.png", features: ["Road and highway construction", "Bridge and culvert works", "Storm water drainage systems", "Underground utility networks"] },
        { icon: "GraduationCap", title: "Healthcare & Education", tagline: "Hospitals, schools, universities, and research centers", image: "/images/fleet/fleet5.png", features: ["Hospital building construction", "School and campus development", "Laboratory facility build-out", "Sports and recreation facilities"] },
        { icon: "Landmark", title: "Government & Public", tagline: "Government buildings, public facilities, and civic structures", image: "/images/fleet/fleet6.png", features: ["Government office complexes", "Public facility construction", "Monument and civic structures", "Security infrastructure works"] },
      ],
      metaTitle: "Civil & General Construction - Axtella",
      metaDescription: "Professional civil engineering and general construction — from site preparation and structural works to finishing for projects across Saudi Arabia.",
    },

    // 8. ELV Systems
    {
      slug: "elv-systems",
      title: "ELV Systems",
      heroTitle: "Intelligent Low Voltage|Solutions.",
      heroSubtitle:
        "Complete ELV systems including CCTV, access control, fire alarm, public address, and structured cabling — designed for facilities across Saudi Arabia.",
      order: 8,
      published: true,
      offers: [
        { title: "CCTV & Video Surveillance", icon: "📹", image: "/images/fleet/fleet1.png" },
        { title: "Access Control & Biometrics", icon: "🔐", image: "/images/fleet/fleet2.png" },
        { title: "Fire Alarm & Detection", icon: "🔥", image: "/images/fleet/fleet3.png" },
        { title: "Public Address Systems", icon: "📢", image: "/images/fleet/fleet4.png" },
        { title: "Structured Cabling", icon: "🔌", image: "/images/fleet/fleet5.png" },
        { title: "Intercom & Communication", icon: "📞", image: "/images/fleet/fleet6.png" },
        { title: "Nurse Call Systems", icon: "🏥", image: "/images/fleet/fleet7.png" },
      ],
      features: [
        { icon: "Camera", title: "HD IP Camera Systems", description: "Multi-megapixel IP cameras with night vision, wide dynamic range, video analytics, and centralized recording for complete facility surveillance." },
        { icon: "Fingerprint", title: "Biometric Access Solutions", description: "Fingerprint, facial recognition, and card-based access control systems with audit trails, time attendance, and visitor management integration." },
        { icon: "Flame", title: "Intelligent Fire Detection", description: "Addressable fire alarm panels, smoke/heat detectors, beam detectors, and aspirating systems compliant with NFPA and local regulations." },
        { icon: "Volume2", title: "Emergency Voice Systems", description: "Public address and voice evacuation systems with zone control, pre-recorded messages, and emergency override for safety compliance." },
        { icon: "Cable", title: "Cat6A/Fiber Infrastructure", description: "Structured cabling design and installation including Cat6A copper, single/multi-mode fiber optic, patch panels, and cable management systems." },
        { icon: "Phone", title: "Integrated Intercom", description: "IP-based intercom and door entry systems with video calling, remote unlock, and integration with access control for seamless communication." },
        { icon: "Monitor", title: "Centralized Control Room", description: "Unified command center design with video walls, workstation layout, operator interfaces, and integrated alarm management across all ELV subsystems." },
      ],
      howItWorks: [
        { number: "01", icon: "ClipboardList", emoji: "📋", title: "Site Survey & Needs Assessment", description: "Our engineers conduct a thorough site survey, assess your security and communication requirements, and identify the optimal ELV system design for your facility.", image: "/images/fleet/fleet11.png" },
        { number: "02", icon: "PenTool", emoji: "✏️", title: "System Design & Engineering", description: "We create detailed system architecture, equipment specifications, cable routing plans, and integration schematics — all compliant with local and international standards.", image: "/images/fleet/fleet12.png" },
        { number: "03", icon: "Rocket", emoji: "🚀", title: "Installation & Cabling", description: "Professional installation of all ELV equipment, structured cabling, conduit routing, termination, and labeling — with minimal disruption to your ongoing operations.", image: "/images/fleet/fleet13.png" },
        { number: "04", icon: "ShieldCheck", emoji: "🛡️", title: "Testing & Commissioning", description: "Comprehensive system testing including camera coverage verification, access point validation, fire alarm loop testing, and PA intelligibility assessment.", image: "/images/fleet/fleet14.png" },
        { number: "05", icon: "Headphones", emoji: "🎧", title: "Maintenance & Support", description: "Scheduled preventive maintenance, 24/7 remote monitoring, rapid on-site support, firmware updates, and system health reporting to ensure continuous operation.", image: "/images/fleet/fleet15.png" },
      ],
      stats: [
        { icon: "ArrowUpCircle", targetNumber: 1000, suffix: "+", displayValue: "1000+", title: "Installations Completed", description: "Over 1,000 ELV system installations across commercial, healthcare, hospitality, and industrial facilities in Saudi Arabia.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 85 },
        { icon: "ShieldCheck", targetNumber: 99, suffix: ".9%", displayValue: "99.9%", title: "System Reliability", description: "Enterprise-grade ELV systems with redundant controllers, backup power, and proactive monitoring for maximum uptime.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 99 },
        { icon: "Camera", targetNumber: 500, suffix: "+", displayValue: "500+", title: "Camera Deployments", description: "Hundreds of CCTV surveillance projects with IP cameras, video analytics, and centralized monitoring solutions.", accentColor: "#10B981", accentBg: "rgba(16,185,129,0.15)", progressPercent: 70 },
        { icon: "Clock", targetNumber: 30, prefix: "<", suffix: "min", displayValue: "<30min", title: "Response Time", description: "Guaranteed rapid on-site support with regional service teams and remote diagnostic capabilities for minimal downtime.", accentColor: "#F59E0B", accentBg: "rgba(245,158,11,0.15)", progressPercent: 90 },
        { icon: "Zap", targetNumber: null, suffix: "", displayValue: "24/7", title: "Technical Support", description: "Round-the-clock monitoring, remote diagnostics, and emergency support for all installed ELV systems.", accentColor: "#1B7FE0", accentBg: "rgba(27,127,224,0.15)", progressPercent: 100 },
      ],
      industries: [
        { icon: "Building2", title: "Commercial Buildings", tagline: "Integrated security and communication for modern offices", image: "/images/fleet/fleet1.png", features: ["IP surveillance & access control", "Visitor management systems", "Structured cabling infrastructure"] },
        { icon: "Heart", title: "Healthcare Facilities", tagline: "Life-safety and communication systems for hospitals", image: "/images/fleet/fleet2.png", features: ["Nurse call & patient monitoring", "Fire alarm & suppression", "Medical gas alarm integration"] },
        { icon: "GraduationCap", title: "Educational Campuses", tagline: "Smart campus security and PA systems", image: "/images/fleet/fleet3.png", features: ["Campus-wide CCTV coverage", "Public address & bell systems", "Emergency lockdown integration"] },
        { icon: "Hotel", title: "Hospitality", tagline: "Guest safety and operational efficiency", image: "/images/fleet/fleet4.png", features: ["Room access control systems", "Fire detection & evacuation", "Background music & PA"] },
        { icon: "ShoppingCart", title: "Retail & Malls", tagline: "Security and customer experience systems", image: "/images/fleet/fleet5.png", features: ["Video analytics & loss prevention", "Public address & emergency", "Parking management systems"] },
        { icon: "Zap", title: "Industrial Facilities", tagline: "Heavy-duty ELV for manufacturing and warehouses", image: "/images/fleet/fleet6.png", features: ["Explosion-proof CCTV systems", "Industrial intercom networks", "Perimeter intrusion detection"] },
      ],
      metaTitle: "ELV Systems - Axtella",
      metaDescription: "Complete ELV systems including CCTV, access control, fire alarm, public address, and structured cabling for facilities across Saudi Arabia.",
    },

    // 9. Managed Services (stub)
    {
      slug: "managed-services",
      title: "Managed Services",
      heroTitle: "Comprehensive Managed|Services.",
      heroSubtitle:
        "End-to-end managed IT, telecom, and infrastructure services — proactive monitoring, maintenance, and support for businesses across Saudi Arabia.",
      order: 9,
      published: true,
      offers: [],
      features: [],
      howItWorks: [],
      stats: [],
      industries: [],
      metaTitle: "Managed Services - Axtella",
      metaDescription: "End-to-end managed IT, telecom, and infrastructure services for businesses across Saudi Arabia.",
    },
  ];

  for (const svc of services) {
    await prisma.service.upsert({
      where: { slug: svc.slug },
      update: {
        title: svc.title,
        heroTitle: svc.heroTitle,
        heroSubtitle: svc.heroSubtitle,
        offers: svc.offers,
        features: svc.features,
        howItWorks: svc.howItWorks,
        stats: svc.stats,
        industries: svc.industries,
        published: svc.published,
        order: svc.order,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDescription,
      },
      create: {
        slug: svc.slug,
        title: svc.title,
        heroTitle: svc.heroTitle,
        heroSubtitle: svc.heroSubtitle,
        offers: svc.offers,
        features: svc.features,
        howItWorks: svc.howItWorks,
        stats: svc.stats,
        industries: svc.industries,
        published: svc.published,
        order: svc.order,
        metaTitle: svc.metaTitle,
        metaDescription: svc.metaDescription,
      },
    });
  }

  console.log(
    "Created services:",
    services.map((s) => s.slug).join(", ")
  );

  // ─── Seed Fleet Author ──────────────────────────────────────
  let fleetAuthor = await prisma.author.findFirst({
    where: { name: "Axtella Fleet Team" },
  });

  if (!fleetAuthor) {
    fleetAuthor = await prisma.author.create({
      data: {
        name: "Axtella Fleet Team",
        role: "Fleet Management Specialists",
        avatar: "/images/authors/axtella-fleet.png",
      },
    });
  }

  console.log("Created/found fleet author:", fleetAuthor.name);

  // ─── Seed Blog Posts ──────────────────────────────────────
  const categoryMap: Record<string, string> = {
    "Fleet Management": "fleet-management",
    "Smart Cities & Vision 2030": "smart-cities-vision-2030",
  };

  const blogPostsData = [
    // Fleet Blog 1
    {
      slug: "what-is-avl-automatic-vehicle-location-saudi-arabia",
      title: "What is AVL? A Complete Guide to Automatic Vehicle Location Systems in Saudi Arabia",
      description: "Learn what AVL (Automatic Vehicle Location) systems are, how they work, and why Saudi businesses need them for fleet management.",
      excerpt: "AVL technology uses GPS, cellular networks, and cloud platforms to automatically determine and transmit vehicle locations in real-time. Discover how modern AVL systems go far beyond simple GPS tracking to deliver complete fleet intelligence for Saudi businesses.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "AVL automatic vehicle location system dashboard showing fleet tracking in Saudi Arabia",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["AVL System", "GPS Tracking", "Vehicle Tracking", "Fleet Management", "CST Compliance"],
      publishedDate: "2026-02-01",
      readTime: "9 min read",
      featured: true,
      metaTitle: "What is AVL? Complete Guide to Automatic Vehicle Location Systems in Saudi Arabia | Axtella",
      metaDescription: "Learn what AVL (Automatic Vehicle Location) systems are, how they work, and why Saudi businesses need them. Discover GPS tracking, telematics, and CST-compliant fleet solutions from Axtella.",
      content: [
        {
          text: "In an era where real-time data drives business decisions, knowing exactly where your vehicles are at any given moment is no longer a luxury — it is a necessity. Automatic Vehicle Location, commonly known as AVL, is the technology that makes this possible. For businesses operating fleets across Saudi Arabia's vast 2.15 million square kilometers, AVL systems have become the backbone of efficient fleet operations, regulatory compliance, and cost optimization.\n\nWhether you manage a logistics company delivering goods between Riyadh and Jeddah, a construction firm operating heavy equipment across remote mega-project sites, or a school transport service ensuring student safety, understanding AVL technology is the first step toward transforming your fleet operations."
        },
        {
          heading: "What is AVL (Automatic Vehicle Location)?",
          text: "Automatic Vehicle Location is a technology system that uses GPS satellites, cellular communication networks, and cloud-based software platforms to automatically determine and transmit the geographic location of a vehicle in real-time. Unlike basic GPS tracking that simply shows a pin on a map, modern AVL systems are comprehensive fleet intelligence platforms that combine location data with vehicle diagnostics, driver behavior analysis, fuel monitoring, and predictive analytics.\n\nThe evolution of AVL has been remarkable. Early systems in the 1990s provided basic latitude and longitude coordinates updated every few minutes. Today's AVL platforms deliver real-time updates every 10 seconds, complete with speed data, engine diagnostics, fuel levels, driver behavior scores, and even AI-powered video analysis from onboard cameras. This transformation from simple location tracking to full fleet intelligence is what sets modern AVL apart from basic GPS tracking solutions."
        },
        {
          heading: "How Does an AVL System Work?",
          text: "A modern AVL system consists of four key components working together seamlessly. The first component is the GPS tracking device installed in the vehicle. This hardware unit receives signals from multiple GPS satellites to calculate the vehicle's precise position, speed, and heading. In Saudi Arabia, all tracking devices must be certified by the Communications, Space and Technology Commission (CST) to ensure they meet local regulatory standards.\n\nThe second component is the cellular communication module, typically using 4G LTE networks. This module transmits the GPS data along with vehicle diagnostic information from the device to the cloud servers. Modern devices use 4G rather than older 2G or 3G networks, which are being phased out across Saudi Arabia.\n\nThe third component is the cloud-based server infrastructure that receives, processes, and stores the data from thousands of vehicles simultaneously. Leading providers host their servers in Saudi Arabia to comply with the Personal Data Protection Law (PDPL) and ensure low-latency performance.\n\nThe fourth component is the user interface — a web dashboard and mobile application that fleet managers use to monitor vehicles, configure alerts, generate reports, and make data-driven decisions. The best platforms offer both Arabic and English interfaces to serve Saudi businesses effectively."
        },
        {
          heading: "Key Features of Modern AVL Systems",
          text: "Modern AVL platforms offer a comprehensive suite of features that go far beyond simple location tracking. Real-time GPS tracking with 10-second update intervals provides continuous visibility into your entire fleet. Route history and playback allows managers to review exactly where each vehicle has been, with detailed trip logs showing stops, idle times, and distances traveled.\n\nGeofencing is another powerful feature that lets you create virtual boundaries around specific locations such as warehouses, job sites, customer premises, or restricted zones. The system automatically alerts you when a vehicle enters or exits these defined areas. Speed and harsh driving alerts notify managers immediately when drivers exceed speed limits or engage in dangerous behaviors like hard braking, rapid acceleration, or sharp cornering.\n\nFuel level monitoring through connected sensors tracks consumption in real-time, detecting anomalies that could indicate theft or excessive waste. Maintenance scheduling uses engine hours and mileage data to send automated reminders for oil changes, tire rotations, and other preventive maintenance tasks. Driver behavior scoring aggregates multiple driving metrics into a single performance score, enabling fleet managers to identify drivers who need additional training."
        },
        {
          heading: "Why Saudi Businesses Need AVL Systems in 2026",
          text: "Saudi Arabia's Vision 2030 initiative is driving unprecedented digital transformation across every sector of the economy. The fleet management market in Saudi Arabia was valued at approximately 726 million dollars in 2024 and is growing at a compound annual growth rate of 16.47 percent, expected to exceed 2 billion dollars by 2032. This explosive growth is fueled by several factors unique to the Saudi market.\n\nGovernment mandates increasingly require GPS tracking for commercial vehicles. The Transport General Authority (TGA) mandates GPS for certain transport categories, and the WASL platform provides electronic monitoring for public land transport. CST compliance requirements mean that all tracking devices used commercially must be certified, creating a regulatory environment where fleet tracking technology is not optional but mandatory.\n\nThe extreme climate conditions in Saudi Arabia, with temperatures regularly exceeding 50 degrees Celsius, demand rugged and reliable hardware that can operate continuously in harsh environments. The growing logistics and delivery sector, driven by the e-commerce boom and mega-project supply chains, requires sophisticated fleet management tools to maintain competitiveness and efficiency."
        },
        {
          heading: "Industries Using AVL in Saudi Arabia",
          text: "AVL technology serves a wide range of industries across Saudi Arabia. Logistics and last-mile delivery companies rely on AVL for route optimization, delivery confirmation, and real-time customer ETAs. Construction and heavy equipment operators use AVL to track excavators, cranes, and trucks across remote project sites including NEOM, Red Sea Global, and Qiddiya developments.\n\nGovernment agencies and public transport operators use AVL systems integrated with the WASL platform for regulatory compliance and service monitoring. Oil and gas companies deploy AVL for field operations across remote desert locations where vehicle safety and fuel management are critical concerns. School bus operators implement AVL with parent-facing mobile apps to ensure student safety and provide real-time tracking to families.\n\nCorporate fleet managers use AVL to optimize vehicle utilization, reduce unauthorized usage, and control operating costs. Cold chain and pharmaceutical transport companies add temperature sensors to their AVL systems to ensure sensitive goods maintain required conditions throughout the delivery journey."
        },
        {
          heading: "AVL vs Basic GPS Tracking: What is the Difference?",
          text: "The distinction between basic GPS tracking and a full AVL system is significant. Basic GPS tracking answers a single question: where is my vehicle right now? It provides location coordinates on a map, simple speed data, and basic route history. This may suffice for personal vehicle tracking or very small fleets with minimal management needs.\n\nAVL, on the other hand, answers a comprehensive set of questions: where is the vehicle, how is it being driven, how much fuel is it consuming, when does it need maintenance, is the driver safe, and how can operations be optimized? AVL platforms include driver behavior monitoring, fuel analytics, predictive maintenance, video telematics, custom dashboards, automated reporting, and API integrations with business systems like ERP and CRM platforms.\n\nThe cost difference between basic GPS and AVL is often far less than the value difference. A basic tracker might save you the expense of one component, but without fuel monitoring, driver behavior analysis, and maintenance alerts, you continue losing thousands of riyals monthly to fuel waste, accidents, and unexpected breakdowns."
        },
        {
          heading: "Getting Started with AVL for Your Fleet",
          text: "Implementing AVL for your fleet follows a straightforward process. Begin by assessing your fleet size, vehicle types, and specific operational needs. A logistics company may prioritize route optimization and delivery tracking, while a construction firm needs equipment utilization and geofencing capabilities.\n\nNext, choose the right plan that matches your requirements. Most providers offer tiered pricing from basic tracking through advanced analytics and enterprise solutions. Professional device installation ensures reliable operation and proper wiring for features like fuel monitoring and ignition detection. Platform configuration and training prepare your team to use the system effectively from day one.\n\nOnce live, your fleet operates with 24/7 monitoring, automated alerts, and comprehensive analytics that drive continuous improvement in efficiency, safety, and cost management. Most fleets see measurable ROI within the first two to three months of implementation.\n\nReady to implement AVL for your fleet? Get a free consultation from Axtella's fleet specialists. Contact us at sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 2
    {
      slug: "benefits-gps-fleet-tracking-saudi-businesses-2026",
      title: "Top 10 Benefits of GPS Fleet Tracking for Saudi Businesses in 2026",
      description: "Discover the top 10 benefits of GPS fleet tracking for Saudi businesses, including fuel savings, safety improvements, and real-time visibility.",
      excerpt: "GPS fleet tracking delivers measurable ROI for Saudi businesses through fuel savings of 20-30%, accident reduction of up to 40%, and real-time visibility across your entire fleet. Here are the top 10 benefits every fleet operator should know.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "GPS fleet tracking dashboard showing vehicle locations across Saudi Arabia",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["GPS Fleet Tracking", "Fleet Benefits", "Vehicle Tracking", "ROI", "Fleet Management"],
      publishedDate: "2026-02-03",
      readTime: "8 min read",
      featured: true,
      metaTitle: "Top 10 Benefits of GPS Fleet Tracking for Saudi Businesses in 2026 | Axtella",
      metaDescription: "Discover the top 10 benefits of GPS fleet tracking for Saudi businesses in 2026, including 30% fuel savings, improved driver safety, and real-time visibility. Free consultation available.",
      content: [
        {
          text: "Fleet tracking technology has evolved from a nice-to-have into an essential business tool for companies operating vehicles in Saudi Arabia. With the kingdom's rapid economic transformation under Vision 2030, businesses that leverage GPS fleet tracking gain significant competitive advantages in efficiency, safety, and cost management. Whether you operate 10 vehicles or 10,000, the benefits of modern fleet tracking are both immediate and substantial.\n\nHere are the top 10 benefits that Saudi businesses are realizing from GPS fleet tracking in 2026, backed by industry data and real-world results."
        },
        {
          heading: "1. Reduce Fuel Costs by 20-30%",
          text: "Fuel is typically the largest variable cost for any fleet, accounting for 30 to 40 percent of total operating expenses. For a 100-vehicle fleet in Saudi Arabia, monthly fuel costs can easily exceed 200,000 SAR. GPS fleet tracking attacks fuel waste from multiple angles: idle time monitoring identifies vehicles running engines while parked, unauthorized vehicle use and route deviations are flagged immediately, and aggressive driving behaviors like hard acceleration and excessive speeding are tracked and corrected.\n\nFuel level sensors integrated with GPS trackers detect sudden drops that indicate siphoning or theft. AI-driven fuel optimization analyzes patterns across your fleet to identify the biggest waste sources and recommend specific improvements. Companies implementing comprehensive fuel monitoring through fleet tracking typically achieve 20 to 30 percent reduction in fuel costs within the first six months."
        },
        {
          heading: "2. Improve Driver Safety and Reduce Accidents by 40%",
          text: "Saudi Arabia's road network spans thousands of kilometers of highways connecting cities across vast distances, and the kingdom has historically faced significant road safety challenges. Fleet tracking systems with driver behavior monitoring detect dangerous patterns including harsh braking, rapid acceleration, sharp cornering, and excessive speeding in real-time.\n\nAdvanced systems add AI-powered dashcams that detect mobile phone usage, driver drowsiness, distraction, and seatbelt non-compliance. Driver performance scoring creates accountability and motivates safe driving through gamification and recognition programs. Industry data shows that AI-powered monitoring systems reduce fleet accident rates by 25 to 40 percent, translating into lower insurance premiums, reduced vehicle repair costs, and most importantly, saved lives."
        },
        {
          heading: "3. Real-Time Fleet Visibility 24/7",
          text: "Knowing exactly where every vehicle is at any moment transforms fleet management from reactive to proactive. Live maps with status indicators show whether each vehicle is moving, stopped, idle, or offline. Instant notifications alert managers when vehicles enter or leave geofenced zones, deviate from planned routes, or remain stationary for too long.\n\nFor Saudi operations spanning vast distances between Riyadh, Jeddah, Dammam, and remote project sites like NEOM and the Red Sea development, real-time visibility is not a convenience but a necessity. Dispatchers can make informed routing decisions, customer service teams can provide accurate delivery updates, and operations managers can identify and resolve issues before they escalate."
        },
        {
          heading: "4. Prevent Unauthorized Vehicle Use",
          text: "Unauthorized vehicle use is a persistent challenge for fleet operators worldwide, and Saudi Arabia is no exception. After-hours usage alerts detect when vehicles are driven outside of approved operating times. Geofencing restricts vehicles to approved routes and zones, triggering immediate alerts when boundaries are crossed. Ignition monitoring tracks exact engine-on and engine-off times, creating an auditable record of vehicle usage.\n\nThis is particularly important for corporate fleets and government vehicles where unauthorized use represents both a financial loss and a compliance concern. Companies implementing these controls typically discover that 5 to 15 percent of their fleet usage was previously unauthorized, and eliminating this waste generates immediate cost savings."
        },
        {
          heading: "5. Reduce Maintenance Costs with Predictive Alerts",
          text: "Unplanned vehicle breakdowns are expensive — not just for the repair itself, but for the lost productivity, towing costs, and operational disruption they cause. GPS fleet tracking systems connected to OBD-II diagnostic ports read engine codes in real-time, identifying potential problems before they become expensive failures.\n\nAutomated maintenance scheduling based on actual mileage or engine hours ensures that oil changes, filter replacements, and inspections happen on time. Early warning systems alert managers to developing issues like battery degradation, transmission problems, or cooling system inefficiencies. This predictive approach reduces unplanned downtime by up to 60 percent. In Saudi Arabia's extreme heat conditions, where temperatures regularly push engines and cooling systems to their limits, proactive maintenance is essential for vehicle longevity and reliability."
        },
        {
          heading: "6. Ensure Regulatory Compliance",
          text: "Saudi Arabia has established a comprehensive regulatory framework for commercial vehicle tracking. The Communications, Space and Technology Commission requires all GPS tracking devices to be CST-certified, ensuring they meet Saudi standards for radio frequency communication and data security. The Transport General Authority mandates GPS tracking for certain categories of commercial transport.\n\nThe WASL platform provides electronic monitoring for public land transport operations. Additionally, the Personal Data Protection Law requires fleet data to be handled in compliance with Saudi data privacy regulations, with strong preference for Saudi-hosted data storage. Fleet tracking systems that are designed for the Saudi market ensure compliance across all these regulatory requirements, protecting businesses from penalties and enabling participation in government contracts."
        },
        {
          heading: "7. Optimize Routes and Reduce Travel Time",
          text: "Route optimization is one of the most immediately impactful benefits of fleet tracking. AI-powered algorithms analyze traffic patterns, distances, delivery windows, and vehicle capacities to suggest the most efficient routes for each trip. Historical traffic data improves delivery time predictions, helping dispatchers plan more realistic schedules.\n\nMulti-stop planning for delivery and field service fleets ensures that drivers visit locations in the optimal sequence rather than following ad-hoc routes. The result is a 15 to 20 percent reduction in total kilometers driven across the fleet, which directly reduces fuel consumption, vehicle wear, and driver hours while increasing the number of stops each driver can complete per day."
        },
        {
          heading: "8. Enhance Customer Service with Accurate ETAs",
          text: "In the age of instant gratification, customers expect accurate delivery information. Fleet tracking enables businesses to share real-time delivery status with customers, providing live tracking links and accurate estimated arrival times based on actual vehicle positions and traffic conditions. Proof of delivery with timestamps, location data, and even photo confirmation builds trust and reduces disputes.\n\nFor logistics companies competing in Saudi Arabia's growing e-commerce delivery market, the ability to provide a premium customer experience through accurate ETAs and real-time visibility is a significant competitive differentiator that drives customer retention and positive reviews."
        },
        {
          heading: "9. Comprehensive Reporting and Analytics",
          text: "Data-driven fleet management requires comprehensive reporting capabilities. Modern fleet tracking platforms generate automated daily, weekly, and monthly reports covering every aspect of fleet operations. Fuel consumption trends and anomaly detection highlight vehicles or drivers that are outliers. Driver scorecards and performance rankings create transparency and accountability.\n\nVehicle utilization reports identify underused assets that can be redeployed or removed from the fleet, optimizing your capital investment. Custom dashboards tailored to specific KPIs allow different stakeholders to focus on the metrics that matter most to their role. All reports can be exported to PDF or Excel, or integrated directly into business systems via API for seamless workflow automation."
        },
        {
          heading: "10. Scalable from 10 to 10,000+ Vehicles",
          text: "Cloud-based fleet tracking platforms are designed to grow with your business. Whether you start with 10 vehicles or 10,000, the platform handles the load without performance degradation. Volume-based pricing means the cost per vehicle decreases as your fleet grows, making the solution increasingly cost-effective at scale.\n\nMulti-branch management capabilities allow enterprises with operations across multiple Saudi cities to manage everything from a single platform while providing location-specific views for local managers. Role-based access control ensures that managers, dispatchers, drivers, and executives each see the information relevant to their responsibilities. API integration with existing ERP and CRM systems eliminates data silos and enables automated workflows."
        },
        {
          heading: "ROI Calculator: What Fleet Tracking Saves You",
          text: "To put these benefits into concrete financial terms, consider a typical 50-vehicle fleet in Saudi Arabia. Fuel savings of 25 percent translate to approximately 15,000 SAR per month. Reduced accidents of 35 percent save roughly 8,000 SAR per month in insurance and repair costs. Eliminating unauthorized use recovers about 5,000 SAR per month, and maintenance savings through predictive alerts add another 4,000 SAR per month. The total estimated savings come to approximately 32,000 SAR per month.\n\nAn advanced fleet tracking plan for 50 vehicles costs approximately 2,700 SAR per month, or 54 SAR per vehicle. This represents a return on investment of more than 10 times the subscription cost. Most fleets achieve full payback within the first two to three months of implementation.\n\nWant to calculate your fleet's potential savings? Get a free ROI analysis from Axtella. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 3
    {
      slug: "fleet-management-reduce-fuel-costs-saudi-arabia",
      title: "How Fleet Management Solutions Reduce Fuel Costs by 30% in Saudi Arabia",
      description: "Learn how fleet management solutions cut fuel expenses by 20-30% for Saudi businesses through monitoring, optimization, and theft detection.",
      excerpt: "Fuel accounts for 30-40% of total fleet operating costs in Saudi Arabia. Discover the five proven strategies that fleet management solutions use to reduce fuel expenses by up to 30%, from idle time elimination to AI-powered route optimization.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "Fleet fuel monitoring dashboard showing consumption analytics and savings",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["Fuel Savings", "Fleet Management", "Fuel Monitoring", "Route Optimization", "Cost Reduction"],
      publishedDate: "2026-02-05",
      readTime: "8 min read",
      featured: false,
      metaTitle: "How Fleet Management Reduces Fuel Costs by 30% in Saudi Arabia | Axtella",
      metaDescription: "Learn how fleet management solutions cut fuel expenses by 20-30% for Saudi businesses through real-time monitoring, route optimization, and theft detection. Get a free fleet audit.",
      content: [
        {
          text: "For fleet operators in Saudi Arabia, fuel represents the single largest variable cost in their operations. Despite subsidized fuel prices in the kingdom, fuel expenses typically account for 30 to 40 percent of total fleet operating costs. For a 100-vehicle fleet, monthly fuel spending can easily exceed 200,000 SAR. As fleet sizes grow and distances increase across Saudi Arabia's massive 2.15 million square kilometer landscape, fuel optimization has become a critical business priority.\n\nVision 2030's sustainability goals add another dimension, pushing businesses to reduce both fuel waste and carbon emissions. The good news is that fleet management solutions provide proven strategies to cut fuel costs by 20 to 30 percent through a combination of monitoring, optimization, and behavioral change."
        },
        {
          heading: "The Five Strategies for Cutting Fleet Fuel Costs",
          text: "Reducing fuel costs is not about a single magic solution — it requires a multi-pronged approach that addresses every source of waste simultaneously. Fleet management platforms provide the data, analytics, and automation needed to implement five key strategies: eliminating excessive idling, optimizing routes, improving driver behavior, detecting and preventing fuel theft, and maintaining vehicles for peak efficiency. Each strategy independently delivers measurable savings, and together they compound to achieve the 20 to 30 percent reduction that leading fleets are realizing."
        },
        {
          heading: "1. Eliminate Excessive Idling",
          text: "Excessive idling is one of the most overlooked sources of fuel waste in Saudi fleets. The average fleet vehicle in Saudi Arabia idles 6 to 8 hours daily, largely because drivers keep engines running to power air conditioning in the extreme heat. Each hour of unnecessary idling wastes 3 to 4 liters of diesel, adding up to significant costs across a fleet.\n\nGPS tracking systems identify idle hotspots with exact timestamps and locations, revealing patterns that managers would never spot otherwise. Automated alerts notify fleet managers when vehicles idle beyond configurable thresholds — for example, more than 5 minutes with the engine running while stationary. This visibility enables managers to address idling through driver education, policy enforcement, and in some cases, auxiliary power units that provide cabin cooling without running the main engine.\n\nA logistics company operating 60 vehicles in the Riyadh area reported reducing idle time by 45 percent within three months of implementing GPS-based idle monitoring, saving approximately 18,000 SAR per month in fuel costs alone."
        },
        {
          heading: "2. Optimize Routes and Reduce Unnecessary Kilometers",
          text: "Every unnecessary kilometer driven is fuel wasted. AI-powered route optimization analyzes real-time traffic conditions, distances, delivery windows, and vehicle capacities to calculate the most efficient path for each trip. The system eliminates detours, unauthorized stops, and inefficient multi-stop sequences that drivers often follow out of habit.\n\nHistorical route analysis identifies recurring inefficiencies — perhaps a driver consistently takes a longer route to avoid a construction zone that was completed months ago, or delivery sequences that could be reordered to reduce backtracking. For delivery fleets operating in congested cities like Riyadh and Jeddah, optimized routing saves 30 to 45 minutes per driver per day.\n\nThe typical result is a 15 to 20 percent reduction in total kilometers driven across the fleet. With fuel consumption directly proportional to distance traveled, this translates into immediate and ongoing fuel savings that grow with fleet size."
        },
        {
          heading: "3. Improve Driver Behavior",
          text: "The way a vehicle is driven has a dramatic impact on fuel consumption. Aggressive driving behaviors including hard acceleration, excessive speeding, and sharp braking increase fuel consumption by 15 to 30 percent compared to smooth, steady driving. Most drivers are unaware of how much their habits cost the company in wasted fuel.\n\nFleet management systems monitor driver behavior continuously, scoring each driver on fuel-efficient driving metrics. Real-time alerts notify drivers when they accelerate too hard or exceed optimal speed ranges. Gamification through leaderboards and scorecards creates healthy competition among drivers, motivating them to improve their scores.\n\nTraining programs built on actual driving data target specific bad habits rather than delivering generic safety training. When a manager can show a driver that their hard acceleration habit costs an extra 200 SAR per month in fuel, the motivation to change becomes personal. Companies that implement comprehensive driver behavior programs report 10 to 15 percent fuel savings from behavior improvements alone."
        },
        {
          heading: "4. Detect and Prevent Fuel Theft",
          text: "Fuel theft is a significant and often underestimated problem, particularly in construction and logistics operations where vehicles operate in remote areas with limited oversight. Siphoning fuel from vehicle tanks, falsifying fuel card transactions, and unauthorized fueling are all common forms of theft that drain fleet budgets.\n\nFuel level sensors integrated with GPS tracking systems detect sudden drops in tank levels that indicate siphoning. The system compares actual fuel levels with fuel card transaction records, flagging discrepancies where a reported fill-up does not match the corresponding increase in tank level. Real-time alerts notify managers immediately when fuel levels drop unexpectedly outside of normal driving consumption.\n\nGeofence alerts for unauthorized fuel station visits add another layer of protection. When a vehicle visits a fuel station that is not on the approved list, or fills up when the tank is already above a certain level, the system flags it for investigation. Companies implementing fuel theft detection typically recover 5 to 10 percent of their total fuel budget by eliminating theft and fraud."
        },
        {
          heading: "5. Maintenance-Driven Fuel Efficiency",
          text: "Poorly maintained vehicles are fuel-hungry vehicles. A vehicle with underinflated tires wastes 3 to 5 percent more fuel than one with properly inflated tires. Dirty air filters reduce engine efficiency by up to 10 percent. Worn spark plugs, degraded oil, and misaligned wheels all contribute to increased fuel consumption that adds up across an entire fleet.\n\nFleet management platforms connected to OBD-II diagnostic ports monitor engine health in real-time, identifying issues that affect fuel efficiency before they become obvious mechanical problems. Automated maintenance scheduling ensures that oil changes, filter replacements, tire rotations, and other preventive tasks happen on time based on actual mileage or engine hours rather than arbitrary calendar dates.\n\nPredictive maintenance algorithms identify developing problems — such as a gradually failing fuel injector or a thermostat that is not maintaining optimal engine temperature — before they escalate into expensive repairs or significant fuel waste. In Saudi Arabia's extreme heat conditions, where engines, cooling systems, and tires are under constant stress, proactive maintenance is not just about fuel savings but about keeping vehicles operational and safe."
        },
        {
          heading: "Real ROI: Fuel Savings by Fleet Size",
          text: "The financial impact of fuel optimization scales directly with fleet size. A 20-vehicle fleet can expect monthly fuel savings of 6,000 to 9,000 SAR through comprehensive fleet management. A 50-vehicle fleet typically saves 15,000 to 22,000 SAR per month. A 100-vehicle fleet achieves savings of 30,000 to 45,000 SAR monthly, and a 500-vehicle fleet can save 150,000 to 225,000 SAR per month.\n\nWhen compared against fleet management subscription costs, the ROI is compelling. Most fleets achieve complete payback on their fleet management investment within two to three months, with ongoing savings accumulating month after month thereafter. The savings are not theoretical — they come from measurable reductions in fuel consumption that show up directly on fuel card statements and financial reports."
        },
        {
          heading: "How to Get Started with Fuel Optimization",
          text: "The path to fuel savings begins with understanding where your fuel is going today. A fleet fuel audit analyzes your current fuel spending patterns, identifies the biggest sources of waste, and quantifies the potential savings from each optimization strategy.\n\nFrom there, the implementation follows a clear roadmap: install GPS trackers and fuel sensors on your fleet, configure dashboards with fuel-specific KPIs and automated alerts, train fleet managers on fuel reporting and analysis tools, and begin monitoring and optimizing. The results start appearing within the first month and continue improving as driver behaviors change, routes are refined, and maintenance schedules are optimized.\n\nRequest a free fleet fuel audit from Axtella. We will analyze your fuel spending and show you exactly how much you can save. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 4
    {
      slug: "driver-behavior-monitoring-safety-saudi-fleets",
      title: "Driver Behavior Monitoring: How It Improves Safety and Reduces Accidents in Saudi Fleets",
      description: "Discover how driver behavior monitoring systems improve fleet safety in Saudi Arabia with AI dashcams, real-time alerts, and driver scoring.",
      excerpt: "AI-powered driver monitoring systems reduce fleet accident rates by 25-40%. Learn how behavior scoring, real-time alerts, and AI dashcams are transforming fleet safety for Saudi businesses operating across the kingdom's highways and urban roads.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "AI dashcam system monitoring driver behavior in a fleet vehicle",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["Driver Safety", "Behavior Monitoring", "AI Dashcam", "Fleet Safety", "Driver Scoring"],
      publishedDate: "2026-02-07",
      readTime: "8 min read",
      featured: false,
      metaTitle: "Driver Behavior Monitoring for Saudi Fleet Safety | Reduce Accidents by 40% | Axtella",
      metaDescription: "Discover how driver behavior monitoring systems improve fleet safety in Saudi Arabia. AI dashcams, real-time alerts, and driver scoring reduce accidents by 25-40%. Learn more from Axtella.",
      content: [
        {
          text: "Road safety is one of the most critical challenges facing fleet operators in Saudi Arabia. Long-distance highway driving between major cities creates fatigue risks, extreme heat conditions affect driver alertness and vehicle performance, and growing traffic density in urban centers demands constant attention. For fleet operators, each accident represents not just vehicle damage and repair costs, but insurance premium increases, legal liability, lost productivity, and potentially lost lives.\n\nDriver behavior monitoring technology offers a proven solution. By combining GPS telematics, accelerometer data, vehicle diagnostics, and AI video analysis, modern systems can detect dangerous driving patterns in real-time and intervene before accidents happen."
        },
        {
          heading: "What is Driver Behavior Monitoring?",
          text: "Driver behavior monitoring is a technology system that combines multiple data sources to analyze how a vehicle is being driven in real-time. GPS telematics provide speed data and location context. Accelerometer sensors detect harsh braking, rapid acceleration, and sharp cornering events. OBD-II connections read engine data including RPM, throttle position, and gear selection. Together, these inputs create a comprehensive picture of driving behavior that goes far beyond what a supervisor riding in the passenger seat could observe.\n\nAdvanced systems add AI-powered dashcams with computer vision capabilities. These cameras analyze the driver's face, eyes, and hands in real-time to detect mobile phone usage, drowsiness and fatigue patterns, distracted driving, smoking, and seatbelt non-compliance. All data feeds into a cloud platform where fleet managers see real-time alerts for critical events and historical trends for each driver across the fleet."
        },
        {
          heading: "How AI Dashcams Take Safety to the Next Level",
          text: "AI dashcams represent the most significant advancement in fleet safety technology in recent years. Dual-facing camera systems provide two perspectives simultaneously. The road-facing camera records high-definition video of the road ahead, capturing traffic incidents, near-misses, and road conditions for liability protection and incident investigation. The driver-facing camera uses AI computer vision to analyze the driver's behavior continuously.\n\nWhen the AI detects a safety event — such as a driver picking up their mobile phone — it triggers an immediate audible alert inside the cabin, giving the driver a chance to correct their behavior before a dangerous situation develops. Simultaneously, the system sends a real-time notification to the fleet manager's dashboard with a 10 to 15 second video clip of the event for review.\n\nFatigue detection is particularly valuable for Saudi fleets. The AI analyzes eye closure patterns, yawning frequency, and head position to identify drivers who are becoming drowsy. Given that many Saudi fleet routes involve long stretches of straight highway driving through monotonous desert landscapes, fatigue detection can literally save lives by alerting drivers and managers before a drowsiness-related incident occurs."
        },
        {
          heading: "Driver Performance Scoring: Gamifying Safe Driving",
          text: "One of the most effective approaches to improving driver behavior is performance scoring combined with gamification. Each driver receives a composite score from 0 to 100 based on their driving behavior across multiple categories: speeding, braking, acceleration, cornering, and idle time. These scores update continuously based on real-time driving data.\n\nLeaderboards rank drivers across the fleet, creating healthy competition where drivers strive to improve their scores and climb the rankings. Top-performing drivers receive recognition, and companies often implement incentive programs that reward safe driving with bonuses or prizes. Low-scoring drivers are identified for targeted coaching and training rather than punitive action.\n\nThis approach fundamentally shifts the culture from punitive monitoring — where drivers feel watched and resentful — to positive motivation where safe driving is recognized and rewarded. Weekly and monthly trend reports show improvement trajectories for individual drivers and the fleet overall, giving managers the data they need to demonstrate that their safety programs are delivering measurable results."
        },
        {
          heading: "Real Results: How Monitoring Reduces Accidents",
          text: "The evidence for driver behavior monitoring is compelling. Industry data shows that AI-powered monitoring systems reduce fleet accident rates by 25 to 40 percent. Speeding incidents typically drop by 60 to 70 percent within the first three months of implementation as drivers become aware that their speed is being tracked and scored. Harsh braking events decrease by approximately 50 percent as drivers develop smoother, more anticipatory driving habits.\n\nThe financial impact extends beyond accident reduction. Insurance companies increasingly offer premium discounts of 15 to 25 percent for fleets that demonstrate active safety monitoring programs with documented improvement trends. Fleet downtime from accidents reduces by up to 60 percent, keeping vehicles on the road and productive. When you factor in the reduced costs of vehicle repairs, insurance claims, legal proceedings, and lost productivity, the savings from a comprehensive driver safety program frequently exceed the cost of the entire fleet tracking system."
        },
        {
          heading: "Privacy and Trust: Monitoring Without Micromanaging",
          text: "The most common concern about driver monitoring technology is privacy. Drivers understandably do not want to feel like they are under constant surveillance. Addressing this concern transparently and proactively is essential for successful implementation.\n\nBest practices begin with clear communication before any cameras or monitoring devices are installed. Explain to all drivers that the system is a safety tool designed to protect them, not a surveillance system meant to catch them making mistakes. Share data transparently with drivers so they can see their own scores and understand how they are calculated. Focus coaching conversations on improvement rather than punishment.\n\nUse video review only for flagged safety events, not for continuous surveillance of driver activity. Comply fully with Saudi PDPL data protection requirements for employee data, including clear policies on data access, retention, and usage. When implemented with respect and transparency, driver monitoring programs consistently achieve high driver acceptance rates, especially once drivers see their own safety improvements reflected in their scores."
        },
        {
          heading: "Implementation: Getting Started",
          text: "Implementing driver behavior monitoring follows a structured process. Start by choosing the right monitoring level for your fleet — basic telematics monitoring through GPS data is available at lower cost, while AI dashcams provide the most comprehensive safety coverage. Professional installation ensures devices are properly positioned and calibrated for accurate monitoring.\n\nConfigure alert thresholds and scoring parameters to match your fleet's specific operating conditions. A delivery fleet in urban Riyadh will have different speed and braking thresholds than a logistics fleet operating primarily on intercity highways. Conduct a driver orientation session before going live — this step is critical for adoption and cannot be skipped.\n\nOnce operational, establish a weekly review cadence where fleet managers analyze safety data, identify trends, and deliver coaching to drivers who need support. Track improvement trends monthly and celebrate milestones with the team. Within three to six months, you will see measurable reductions in safety incidents, insurance costs, and fuel consumption.\n\nReady to improve your fleet's safety record? Contact Axtella for a free safety assessment and demo. Email sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 5
    {
      slug: "fleet-management-construction-companies-saudi-arabia",
      title: "Fleet Management for Construction Companies in Saudi Arabia: A Complete Guide",
      description: "Complete guide to fleet management solutions for construction companies in Saudi Arabia, covering heavy equipment tracking, fuel theft detection, and site security.",
      excerpt: "Saudi Arabia is experiencing the largest construction boom in its history with mega-projects like NEOM, Red Sea Global, and Qiddiya. Learn how fleet management solutions help construction companies track heavy equipment, prevent fuel theft, and optimize operations across remote job sites.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "Construction fleet with heavy equipment tracked by GPS on a Saudi Arabia job site",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["Construction Fleet", "Heavy Equipment", "GPS Tracking", "NEOM", "Construction Management"],
      publishedDate: "2026-02-09",
      readTime: "9 min read",
      featured: false,
      metaTitle: "Fleet Management for Construction Companies in Saudi Arabia | Axtella",
      metaDescription: "Complete guide to fleet management solutions for construction companies in Saudi Arabia. Track heavy equipment, prevent fuel theft, and ensure site safety. Free consultation from Axtella.",
      content: [
        {
          text: "Saudi Arabia is in the midst of the largest construction boom in its history. Mega-projects of unprecedented scale — NEOM at 500 billion dollars, Red Sea Global, Qiddiya, Diriyah Gate, and Jeddah Tower — are transforming the kingdom's landscape and economy. These projects demand massive fleets of heavy equipment, trucks, and support vehicles operating across vast and often remote sites.\n\nFor construction companies, managing these fleets presents unique challenges that standard corporate fleet management solutions were not designed to handle. Heavy equipment does not have standard OBD ports. Job sites span enormous areas in remote locations. Fuel theft on unmonitored sites drains budgets. And the extreme Saudi heat — regularly exceeding 50 degrees Celsius — tests both machines and the people who operate them. This guide covers everything construction fleet managers need to know about implementing effective fleet management."
        },
        {
          heading: "What Construction Fleets Need to Track",
          text: "Construction fleets are fundamentally different from standard vehicle fleets. While a logistics company primarily tracks trucks and vans with standard automotive systems, a construction company needs to monitor a diverse mix of assets. Heavy equipment including excavators, bulldozers, cranes, wheel loaders, and graders form the most valuable category. Cement mixers, dump trucks, and flatbed transporters handle materials. Pickup trucks and crew transport vehicles move people between sites.\n\nBeyond vehicles, construction companies also need to track generators, portable equipment, and specialized machinery that may move between sites. Each asset type requires different tracking hardware — hardwired GPS trackers for trucks with standard electrical systems, ruggedized asset trackers for heavy equipment that operates in harsh conditions, and portable trackers for movable machinery and temporary installations. A comprehensive fleet management solution must accommodate this diversity within a single platform."
        },
        {
          heading: "Geofencing for Construction Site Security",
          text: "Geofencing is perhaps the most critical fleet management feature for construction operations. By defining virtual boundaries around each job site, construction managers receive instant alerts when any tracked equipment leaves the designated zone. This protects against theft of high-value equipment, unauthorized after-hours use, and accidental misrouting of deliveries.\n\nThe system tracks entry and exit times for all vehicles and equipment at each site, creating a detailed log of site activity. Temporary geofences can be created for different project phases as work areas shift and expand. For mega-project sites in locations like NEOM and the Red Sea coast, where sites may cover hundreds of square kilometers in remote areas far from urban centers, geofencing provides a security layer that would be impossible to achieve with physical security alone.\n\nAdvanced geofencing features include speed zones within sites where heavy equipment must operate below specific limits, restricted areas where only authorized vehicles may enter, and corridor geofences along haul roads to ensure dump trucks follow approved routes."
        },
        {
          heading: "Fuel Monitoring on Construction Sites",
          text: "Fuel theft is a massive and persistent problem on construction sites, particularly in remote areas where oversight is limited. Diesel for heavy equipment represents one of the largest line items in any construction budget, and industry studies suggest that 8 to 15 percent of fuel expenditure on construction sites is lost to theft, fraud, or waste.\n\nFuel level sensors connected to GPS tracking devices monitor tank levels in real-time for each piece of equipment. The system detects sudden drops in fuel level that are inconsistent with normal consumption — a clear indicator of siphoning. Fill-up verification compares fuel card transaction records with actual tank level increases, catching discrepancies that indicate fraud or diversion.\n\nGenerator fuel monitoring is particularly important on construction sites, where large generators often consume significant quantities of diesel in remote areas with no grid power. By tracking generator fuel consumption against power output, managers can identify units that are running inefficiently or being fueled beyond their needs. Real-time alerts for unexpected fuel level drops ensure that theft is detected immediately rather than discovered during monthly reconciliation."
        },
        {
          heading: "Equipment Utilization and Maintenance",
          text: "Construction companies invest millions of riyals in heavy equipment, and maximizing the return on that investment requires accurate utilization data. Fleet management systems track engine hours for each piece of equipment, revealing exactly how much each asset is actually being used versus sitting idle.\n\nThis data is invaluable for multiple decisions. Underutilized assets can be redeployed from one site to another where they are needed, rather than renting additional equipment unnecessarily. Rental versus purchase decisions are informed by actual utilization rates across the fleet. Project cost allocation becomes accurate when equipment hours are tracked per site.\n\nMaintenance scheduling based on engine hours rather than calendar dates ensures that heavy equipment receives service when it actually needs it. A crane that runs 12 hours a day needs more frequent maintenance than one used intermittently, and engine-hour-based scheduling accounts for this automatically. Real-time diagnostic monitoring catches developing problems before they cause costly breakdowns that delay project timelines and require expensive field repairs."
        },
        {
          heading: "Driver and Operator Safety",
          text: "Safety on construction sites is paramount, both for regulatory compliance and for protecting workers. Fleet management systems contribute to safety by monitoring vehicle speeds both on and off site, ensuring dump trucks and cement mixers comply with speed limits in construction zones. Seatbelt usage and cabin door status monitoring add additional safety data points.\n\nAI dashcams detect operator fatigue during long shifts — a critical concern when operators are controlling heavy equipment that can cause serious harm if operated while drowsy. Safety zone alerts trigger when vehicles approach restricted areas, pedestrian zones, or active work areas on site. When incidents do occur, video evidence from dashcams provides objective documentation for investigation, learning, and training.\n\nCompliance with Saudi labor safety regulations requires documentation of safety practices, and fleet management systems automatically generate the records needed to demonstrate compliance during audits and inspections."
        },
        {
          heading: "Multi-Site and Sub-Contractor Management",
          text: "Construction companies typically operate across multiple project sites simultaneously, often with numerous sub-contractors contributing vehicles and equipment to each project. Fleet management platforms designed for construction provide dashboard views showing all sites on a single map, with the ability to drill down into any individual project.\n\nVehicles and equipment can be assigned to specific projects for accurate cost allocation, ensuring that fuel, maintenance, and utilization costs are attributed to the correct project budget. Sub-contractor vehicles can be given temporary access to tracking dashboards with limited permissions, allowing coordination without exposing proprietary fleet data.\n\nRole-based access ensures that project managers see only their sites, while operations directors have a fleet-wide view. API integration with project management and ERP software enables automated workflows — when a piece of equipment is reassigned between sites, the change is reflected in both the fleet management and project management systems simultaneously."
        },
        {
          heading: "Getting Started with Construction Fleet Management",
          text: "Implementing fleet management for a construction fleet requires a provider who understands the unique needs of the industry. Standard fleet tracking solutions designed for road vehicles often lack the ruggedized hardware, flexible tracking options, and construction-specific features that make the difference between a useful tool and a frustrating one.\n\nThe right solution includes CST-approved hardware that can withstand Saudi Arabia's extreme conditions, fuel sensors designed for heavy equipment tanks, asset trackers that operate on battery power for equipment without electrical systems, and a platform that handles the diversity of construction fleet assets.\n\nFor mega-project contractors working with NEOM, Red Sea Global, and other government-linked developments, enterprise solutions with dedicated account management, custom integrations, and SLA-based support ensure that fleet management meets the demanding requirements of these high-profile projects.\n\nManaging a construction fleet? Get a customized fleet solution for your project. Contact Axtella at sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 6
    {
      slug: "gps-tracking-vs-avl-difference-fleet-needs",
      title: "GPS Tracking vs AVL: What is the Difference and Which One Does Your Fleet Need?",
      description: "Understand the key differences between basic GPS tracking and full AVL fleet management systems to choose the right solution for your Saudi fleet.",
      excerpt: "Basic GPS tracking shows where your vehicle is. AVL tells you where it is, how it is being driven, how much fuel it uses, when it needs maintenance, and whether the driver is safe. Learn the key differences and which solution fits your fleet.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "Comparison of GPS tracking versus AVL fleet management system features",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["GPS Tracking", "AVL", "Fleet Comparison", "Vehicle Tracking", "Fleet Technology"],
      publishedDate: "2026-02-11",
      readTime: "7 min read",
      featured: false,
      metaTitle: "GPS Tracking vs AVL: Key Differences Explained | Which Does Your Fleet Need? | Axtella",
      metaDescription: "Understand the difference between basic GPS tracking and full AVL systems. Compare features, costs, and benefits to choose the right solution for your Saudi fleet.",
      content: [
        {
          text: "When businesses in Saudi Arabia begin exploring vehicle tracking solutions, they quickly encounter two terms that seem similar but represent very different levels of capability: GPS tracking and AVL. Understanding the distinction between these approaches is essential for making the right investment decision for your fleet. Choosing too little leaves money on the table through undetected waste and inefficiency. Choosing too much means paying for capabilities you may not need. This guide breaks down the differences clearly to help you make an informed decision."
        },
        {
          heading: "Understanding the Basics: GPS Tracking",
          text: "GPS tracking in its simplest form uses Global Positioning System satellites to determine a vehicle's location, then transmits those coordinates to a server via cellular network. Fleet managers see vehicle positions displayed as pins on a digital map. Basic GPS tracking answers one fundamental question: where is my vehicle right now?\n\nThe features of basic GPS tracking are typically limited to current location display, basic speed data, simple route history showing where the vehicle has traveled, and rudimentary geofencing with entry and exit alerts. This is what most people picture when they hear the term vehicle tracking — a dot on a map that moves in real-time. For some use cases, this level of visibility is sufficient and represents a meaningful improvement over having no tracking at all."
        },
        {
          heading: "Understanding AVL: The Complete Fleet Intelligence Platform",
          text: "Automatic Vehicle Location goes far beyond placing a pin on a map. AVL is a comprehensive fleet management ecosystem where GPS tracking is just one component among many. Modern AVL platforms combine location tracking with real-time driver behavior monitoring and performance scoring, fuel consumption tracking with theft and waste detection, OBD-II engine diagnostics and vehicle health monitoring, predictive maintenance scheduling with automated alerts, video telematics powered by AI dashcams, customizable analytics dashboards and automated reporting, and API integrations with ERP, CRM, and logistics systems.\n\nAVL answers a comprehensive set of business questions: where is my vehicle, how is it being driven, how much fuel is it consuming, when does it need maintenance, is the driver operating safely, and how can I optimize my entire fleet operation? The difference between basic GPS and AVL is analogous to the difference between a simple thermometer and a comprehensive health monitoring system. Both measure something useful, but one provides vastly more actionable intelligence."
        },
        {
          heading: "When Basic GPS Tracking is Enough",
          text: "Basic GPS tracking has its place in certain scenarios. For personal vehicle tracking — monitoring a family car for security purposes — a simple GPS tracker provides all the functionality needed at a low cost. Very small fleets of one to five vehicles with straightforward operational needs may find basic tracking sufficient, particularly if the primary concern is simply knowing vehicle locations.\n\nBudget-limited situations where any tracking is better than no tracking may warrant starting with basic GPS as a first step. However, it is important to understand the limitations: basic GPS provides no insight into driver behavior patterns that waste fuel and cause accidents, no predictive maintenance capabilities leaving you reactive to breakdowns, limited reporting that does not support data-driven management decisions, no integration capabilities with business systems, and minimal scalability for growing fleets."
        },
        {
          heading: "When You Need a Full AVL System",
          text: "For commercial fleet operations, the business case for AVL over basic GPS is typically overwhelming. AVL becomes essential for commercial fleets of 10 or more vehicles where the cost savings from fuel optimization, maintenance management, and driver safety improvements far exceed the incremental cost over basic GPS. Companies where fuel costs represent a significant expense benefit enormously from fuel monitoring and driver behavior analysis.\n\nOperations requiring regulatory compliance with CST, TGA, and other Saudi authorities need AVL-level capabilities to meet reporting and monitoring requirements. Safety-critical fleets in construction, public transport, and school bus operations need driver monitoring and video telematics to protect lives and manage liability. Any business wanting to make data-driven decisions about fleet operations needs the analytics and reporting capabilities that only AVL platforms provide."
        },
        {
          heading: "The Hidden Cost of Going Basic",
          text: "The most important comparison between GPS tracking and AVL is not the subscription price — it is the total cost including the money you lose by not having advanced capabilities. A basic GPS tracker might cost 15 to 25 SAR per vehicle per month, which appears cheaper than an AVL platform at 30 to 56 SAR per vehicle per month.\n\nBut without fuel monitoring, the average fleet vehicle wastes 500 to 1,500 SAR per month in fuel through idling, inefficient driving, and undetected theft. Without driver behavior monitoring, accident costs remain high and insurance premiums stay elevated. Without maintenance alerts, unexpected breakdowns cost 5,000 to 15,000 SAR per incident in repairs, towing, and lost productivity. The total cost of not having AVL capabilities can reach 2,000 to 5,000 SAR per vehicle per month in hidden losses.\n\nCompared against AVL subscription costs of 30 to 56 SAR per vehicle per month, the return on investment is typically 5 to 10 times the subscription cost. The cheapest option on the price list is rarely the cheapest option in practice."
        },
        {
          heading: "Start Basic, Scale to Advanced",
          text: "The best fleet management providers offer tiered approaches that let you start at the level that fits your current needs and scale up as your fleet and requirements grow. A basic plan provides real-time tracking, location history, basic alerts, and web and mobile access. A standard plan adds driver behavior monitoring, advanced geofencing, trip history, and utilization reports. An advanced plan adds fuel monitoring, driver scoring, maintenance management, custom dashboards, and API access. Enterprise plans include everything plus dedicated support, custom SLAs, and tailored integrations.\n\nThis tiered approach means you do not need to commit to the most advanced and expensive option from day one. Start with the level that addresses your most pressing needs, prove the ROI, and then upgrade as you see the value and identify additional optimization opportunities.\n\nNot sure which level is right for your fleet? Get a free assessment from Axtella. We will recommend the perfect plan based on your fleet size, industry, and operational needs. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 7
    {
      slug: "choose-fleet-management-provider-saudi-arabia",
      title: "How to Choose the Right Fleet Management Provider in Saudi Arabia",
      description: "A comprehensive buyer's guide to selecting the best fleet management provider in Saudi Arabia, covering CST compliance, local support, pricing, and scalability.",
      excerpt: "Choosing the wrong fleet management provider means device removal, data migration, and costly retraining. This buyer's guide covers the 8 essential criteria every Saudi business should evaluate before signing a contract.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "Fleet management provider evaluation checklist for Saudi Arabia businesses",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["Fleet Provider", "Buying Guide", "Fleet Management", "CST Compliance", "Saudi Arabia"],
      publishedDate: "2026-02-13",
      readTime: "9 min read",
      featured: false,
      metaTitle: "How to Choose the Right Fleet Management Provider in Saudi Arabia | Axtella Guide",
      metaDescription: "A comprehensive buyer's guide to selecting the best fleet management provider in Saudi Arabia. Key criteria: CST compliance, local support, pricing, scalability, and data security.",
      content: [
        {
          text: "Choosing a fleet management provider is one of the most consequential technology decisions a fleet operator can make. Unlike software that can be swapped with minimal disruption, fleet management involves physical hardware installed in every vehicle, trained staff who depend on the platform daily, and historical data that informs ongoing operational decisions. Switching providers later means device removal and reinstallation, data migration, staff retraining, and weeks of operational disruption.\n\nThe Saudi market offers a wide range of providers — from global telematics companies to regional specialists and local startups — each with different strengths, limitations, and pricing models. This guide provides a structured framework for evaluating providers objectively across the criteria that matter most for Saudi fleet operations."
        },
        {
          heading: "Criterion 1: CST Device Certification",
          text: "All GPS tracking and telematics devices used commercially in Saudi Arabia must be certified by the Communications, Space and Technology Commission, formerly known as CITC. CST certification ensures that devices meet Saudi standards for radio frequency communication, electromagnetic compatibility, and data security.\n\nWhen evaluating providers, ask specific questions: which device models are CST-approved, and can you provide the certification numbers? Are the certified devices the same models that will be installed in your vehicles, or are they different from what was tested? A provider using uncertified devices puts your business at legal risk, regardless of how good their software platform may be. This is a non-negotiable requirement that should be verified before any other evaluation criteria are considered."
        },
        {
          heading: "Criterion 2: Saudi-Based Data Hosting",
          text: "Saudi Arabia's Personal Data Protection Law establishes clear requirements for how personal data must be handled, and fleet data — which includes driver locations, behaviors, and identities — falls squarely within PDPL scope. Government and public sector data must remain within Saudi borders under CST Cloud regulations.\n\nEven for private companies, Saudi-hosted data provides practical advantages beyond compliance: lower latency means faster dashboard loading and real-time alert delivery, data sovereignty protects against foreign government data requests, and local hosting demonstrates commitment to the Saudi market. Ask providers where their servers are physically hosted, whether they use Saudi-based cloud providers such as AWS Riyadh, Azure Saudi, or STC Cloud, and what their backup and disaster recovery strategy involves."
        },
        {
          heading: "Criterion 3: Scalability and Flexibility",
          text: "Your fleet today is not necessarily your fleet tomorrow. A provider that works well for 30 vehicles must also perform seamlessly when your fleet grows to 300 or 3,000 vehicles. Evaluate whether the platform architecture can handle significant scale without performance degradation.\n\nFlexibility is equally important. Can you start with basic tracking and add advanced features like fuel monitoring, video telematics, and API integrations later without migrating to a different platform or replacing hardware? Multi-branch support is essential for companies operating across multiple Saudi cities — can the platform manage different locations with separate dashboards while providing a consolidated view for executives? Role-based access control should allow granular permissions so managers, dispatchers, and drivers each see only what is relevant to their responsibilities."
        },
        {
          heading: "Criterion 4: Hardware Quality and Variety",
          text: "Fleet management is only as reliable as the hardware collecting and transmitting data. Evaluate the quality and variety of devices offered. Standard GPS trackers should use 4G LTE connectivity since 2G and 3G networks are being phased out across Saudi Arabia. Devices must be rated for extreme temperatures — Saudi Arabia's vehicle cabins can reach 70 degrees Celsius when parked in direct sunlight, and devices must operate reliably in these conditions.\n\nConsider the variety of hardware needed for your fleet. Do you need standard hardwired trackers, OBD plug-in devices for easy installation, portable trackers for temporary monitoring, dashcams, fuel sensors, temperature sensors, or asset trackers? Does the provider supply and professionally install all hardware, or will you need to coordinate with third-party installers? A provider with a comprehensive hardware portfolio and in-house installation capability delivers a smoother experience."
        },
        {
          heading: "Criterion 5: Software Platform and User Experience",
          text: "The software platform is where fleet managers spend their working hours, so its quality directly affects productivity and adoption. Always request a live demo before signing any contract — marketing materials and screenshots cannot substitute for hands-on evaluation.\n\nDuring the demo, evaluate whether the dashboard is intuitive or cluttered, whether it loads quickly with large numbers of vehicles displayed, and whether it works smoothly in both Arabic and English. Test the mobile app on both iOS and Android to ensure it provides meaningful functionality beyond basic location viewing. Ask about report customization capabilities, real-time alert speed which should be under 30 seconds, and uptime SLA which should be at least 99.9 percent. If your business requires integration with other systems, review the API documentation for completeness and quality."
        },
        {
          heading: "Criterion 6: Local Support and Installation",
          text: "Technical support quality can make or break a fleet management implementation. For Saudi operations, local presence is critical. Does the provider have installation technicians in your cities — Riyadh, Jeddah, Dammam, and wherever else you operate? What is the installation timeline for your fleet size — can they handle 100 vehicles in a reasonable timeframe?\n\nPost-installation support is equally important. What are the SLA response times for technical issues? Is 24/7 support available for fleet operations that run around the clock? Is there an Arabic-speaking support team for drivers and field managers who may not be comfortable communicating in English? Is training provided for fleet managers and drivers during implementation? A provider with strong local support infrastructure resolves issues quickly and ensures high system uptime."
        },
        {
          heading: "Criterion 7: Pricing Transparency",
          text: "Hidden costs are one of the most common complaints about fleet management providers. Before committing, get clear written answers on every cost component. Understand the per-vehicle monthly subscription cost and what it includes. Clarify hardware costs — are devices purchased outright, leased, or included in the subscription? What are installation fees per vehicle? Are SIM card and data costs included in the subscription or billed separately?\n\nAsk about platform fees, setup fees, and any one-time onboarding charges. Understand the contract terms including minimum commitment period and early termination penalties. Are there additional charges for features like API access, additional users, or premium reports? Legitimate providers publish transparent pricing with clear volume discounts and no hidden fees. If a provider is reluctant to provide a detailed written breakdown of all costs, consider it a warning sign."
        },
        {
          heading: "Criterion 8: Integration Capabilities",
          text: "Fleet management systems do not operate in isolation. Your tracking data should flow seamlessly into your existing business tools to maximize its value. Key integration capabilities to evaluate include connections to ERP systems like SAP and Oracle, CRM platforms for customer-facing delivery tracking, fuel card providers for automated reconciliation, logistics and transportation management systems, government portals including WASL and TGA, and accounting and HR systems for cost allocation and compliance.\n\nAsk providers about REST API availability and documentation quality, webhook support for real-time event notifications, pre-built integrations with common Saudi business systems, and custom integration development services. A well-integrated fleet management system eliminates manual data entry, reduces errors, and enables automated workflows that save hours of administrative work every week.\n\nReady to evaluate Axtella? Request a free demo, transparent pricing, and a customized proposal with no obligations. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 8
    {
      slug: "video-telematics-ai-dashcams-fleet-safety-saudi-arabia",
      title: "Video Telematics and AI Dashcams: The Future of Fleet Safety in Saudi Arabia",
      description: "Explore how AI-powered dashcams and video telematics are transforming fleet safety in Saudi Arabia with phone detection, fatigue alerts, and HD evidence recording.",
      excerpt: "AI-powered dashcams detect phone usage, drowsiness, and distraction in real-time — reducing fleet accident rates by 25-40%. Discover how video telematics technology is transforming fleet safety for Saudi businesses operating in extreme conditions.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "AI-powered dual-facing dashcam system for fleet safety monitoring",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["AI Dashcam", "Video Telematics", "Fleet Safety", "Driver Monitoring", "Computer Vision"],
      publishedDate: "2026-02-15",
      readTime: "8 min read",
      featured: false,
      metaTitle: "AI Dashcams and Video Telematics for Fleet Safety in Saudi Arabia | Axtella",
      metaDescription: "Explore how AI-powered dashcams and video telematics are transforming fleet safety in Saudi Arabia. Phone detection, fatigue alerts, and HD evidence recording. Learn more from Axtella.",
      content: [
        {
          text: "Video telematics represents the convergence of two powerful technologies: fleet tracking and intelligent camera systems. Unlike basic dashcams that passively record video for later review, modern video telematics platforms use artificial intelligence to analyze footage in real-time, detecting dangerous driving behaviors as they happen and intervening before accidents occur. For fleet operators in Saudi Arabia, where long highway distances, extreme heat, and growing traffic density create significant safety challenges, video telematics is rapidly becoming an essential component of fleet management."
        },
        {
          heading: "What is Video Telematics?",
          text: "A video telematics system consists of four integrated components working together. The road-facing camera captures high-definition video of the road ahead, recording traffic conditions, other vehicles, lane markings, and road signs. The driver-facing camera monitors the driver's face, eyes, hands, and body position using computer vision algorithms. An onboard AI processor — essentially a small edge computing device — analyzes the video feeds locally in real-time without needing to stream everything to the cloud.\n\nWhen the AI detects a safety event, it triggers an in-cabin alert to the driver and uploads a short video clip of the event to the cloud platform for fleet manager review. This event-based approach is fundamentally different from continuous recording systems — it generates actionable safety intelligence rather than terabytes of unwatched footage."
        },
        {
          heading: "How AI Dashcams Detect Dangerous Driving",
          text: "The detection capabilities of modern AI dashcams are remarkably sophisticated. Mobile phone usage detection identifies when a driver's hand is holding a phone near their face, triggering an immediate audible warning. Drowsiness and fatigue detection analyzes eye closure patterns, yawning frequency, and head nodding to identify drivers who are becoming dangerously tired.\n\nDistracted driving detection monitors head and eye position, alerting when a driver looks away from the road for extended periods. Additional detections include smoking while driving, seatbelt non-compliance, and unauthorized driver identification through facial recognition. Road-facing cameras add forward collision warnings when following too closely, lane departure alerts when the vehicle drifts without signaling, and pedestrian detection in urban environments.\n\nEach detection event triggers a multi-layered response: an audible in-cabin alert gives the driver an immediate opportunity to correct their behavior, a real-time notification appears on the fleet manager's dashboard, and a 10 to 15 second video clip is saved and tagged for later review, coaching, and training."
        },
        {
          heading: "Front-Facing vs Dual-Facing Dashcams",
          text: "Fleet operators can choose between two main dashcam configurations based on their safety priorities and budget. Front-facing dashcams record high-definition video of the road ahead, providing excellent liability protection and incident documentation. When an accident occurs, video evidence from a front-facing camera often resolves disputes quickly and favorably, saving thousands in insurance claims. These cameras are the more affordable option, typically costing 650 to 900 SAR for the hardware plus 40 to 55 SAR per month for cloud storage and management.\n\nDual-facing AI dashcams include everything a front-facing camera provides, plus a driver-facing camera with full AI analysis capabilities. This configuration delivers both road evidence and driver behavior intelligence — detecting phone use, fatigue, distraction, smoking, and seatbelt compliance. The cost is higher at 1,200 to 1,600 SAR for hardware plus 60 to 80 SAR per month, but the safety impact is substantially greater. For fleets where driver behavior is a significant safety concern, the dual-facing configuration typically pays for itself through reduced accident costs within the first year."
        },
        {
          heading: "Real-World Impact: Safety Statistics",
          text: "The evidence supporting video telematics is compelling and growing. Industry data consistently shows that AI-powered monitoring systems reduce fleet accident rates by 25 to 40 percent. Distracted driving incidents drop by more than 70 percent after dashcam installation — the combination of awareness that AI is monitoring and immediate audible alerts when unsafe behavior is detected creates a powerful behavioral change.\n\nInsurance companies are taking notice. Fleets with documented video telematics programs increasingly qualify for premium discounts of 15 to 25 percent, reflecting the actuarially demonstrated reduction in claims. Video evidence resolves more than 90 percent of disputed insurance claims quickly and favorably, eliminating the costly and time-consuming process of accident reconstruction based solely on witness statements.\n\nPerhaps most importantly, fatal accident rates in monitored fleets drop by up to 60 percent over 12 months. Behind every statistic is a driver who went home safely to their family because an AI system detected their fatigue or distraction and intervened in time."
        },
        {
          heading: "Video Telematics for Saudi Arabia's Unique Conditions",
          text: "Saudi Arabia's operating environment presents specific challenges that video telematics must be designed to handle. Extreme heat exceeding 50 degrees Celsius requires dashcams rated for high-temperature operation — consumer-grade devices will fail within weeks in a Saudi vehicle cabin that can reach 70 degrees when parked in the sun. Commercial fleet dashcams must use automotive-grade components and sealed enclosures.\n\nLong highway stretches between Saudi cities — Riyadh to Jeddah is over 900 kilometers, Riyadh to Dammam is 400 kilometers — create significant fatigue risks for drivers. AI drowsiness detection is not a luxury feature in this environment but a critical safety necessity. Night driving on desert highways with limited lighting demands cameras with excellent HD night vision capabilities.\n\nSandstorms and harsh environmental conditions require ruggedized and sealed camera units that maintain clear optics despite dust exposure. All camera devices used commercially in Saudi Arabia must be CST-certified, ensuring they meet the kingdom's regulatory standards for electronic equipment."
        },
        {
          heading: "Privacy, Data Protection, and PDPL Compliance",
          text: "Driver privacy is a legitimate concern that must be addressed transparently for successful implementation. Under Saudi Arabia's Personal Data Protection Law, drivers must be informed about camera monitoring before it begins. Data access should be limited to authorized fleet managers through role-based access controls.\n\nVideo footage should be stored on Saudi-hosted servers to comply with data localization requirements. Clear retention policies — typically 30 to 90 days for event clips — should be established and communicated. The event-based recording approach used by modern systems helps address privacy concerns significantly: cameras are always recording locally but only upload clips when a safety event is detected, meaning fleet managers see targeted safety-relevant footage rather than continuous surveillance of every moment.\n\nBest practice is to have drivers sign acknowledgment forms during the installation process and frame the monitoring explicitly as a safety tool designed to protect them. When implemented with transparency and respect, video telematics programs consistently achieve high driver acceptance and even appreciation, particularly among drivers who recognize that the technology protects them from false accident blame."
        },
        {
          heading: "Implementation Guide: Adding Dashcams to Your Fleet",
          text: "Implementing video telematics follows a structured process that balances technical installation with human change management. Start by deciding between front-facing and dual-facing cameras based on your safety priorities, budget, and the specific risks your fleet faces. Professional installation by certified technicians ensures cameras are properly positioned for optimal AI detection accuracy.\n\nConfigure AI detection sensitivity and alert thresholds to match your fleet's operating conditions — highway fleets and urban delivery fleets have different baseline behaviors. Before going live, conduct a mandatory driver orientation session that explains the technology, its safety purpose, how data is used, and how drivers can view their own safety scores. This step is critical for adoption and cannot be rushed.\n\nEstablish a weekly video review workflow where fleet managers review flagged events, identify coaching opportunities, and track safety trends. Create structured coaching programs that use specific video examples to help drivers improve. Track safety metrics monthly — event frequency, severity trends, and driver score improvements — to measure and demonstrate the program's impact.\n\nWant to see AI dashcams in action? Request a free live demo from Axtella. We will show you real-time driver monitoring, AI alerts, and cloud video review. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 9
    {
      slug: "school-bus-tracking-parent-app-saudi-arabia",
      title: "School Bus Tracking Solutions in Saudi Arabia: GPS + Parent App for Student Safety",
      description: "Complete school bus tracking solution for Saudi Arabia with GPS monitoring, real-time parent app, and driver behavior alerts for student safety.",
      excerpt: "Parents demand real-time visibility into their children's school transport. Discover how GPS tracking with parent mobile apps, driver monitoring, and route optimization are setting new standards for school bus safety across Saudi Arabia.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "School bus tracking app showing real-time bus location and estimated arrival time",
      category: "Fleet Management",
      authorId: "fleet",
      tags: ["School Bus Tracking", "Student Safety", "Parent App", "GPS Tracking", "School Transport"],
      publishedDate: "2026-02-17",
      readTime: "7 min read",
      featured: false,
      metaTitle: "School Bus Tracking with GPS and Parent App in Saudi Arabia | Axtella",
      metaDescription: "Complete school bus tracking solution for Saudi Arabia with GPS monitoring, real-time parent app, driver behavior alerts, and route optimization. Ensure student safety with Axtella.",
      content: [
        {
          text: "School bus safety is a top priority for parents, schools, and regulators across Saudi Arabia. With millions of students relying on school bus transportation daily, and a growing number of international and private schools operating across Riyadh, Jeddah, Dammam, and other cities, the demand for transparent, technology-driven student transport has never been higher. Parents want to know exactly where the bus is, when it will arrive, and that their child is safe throughout the journey.\n\nModern school bus tracking solutions combine GPS fleet management with parent-facing mobile applications to deliver real-time visibility, driver safety monitoring, and route optimization — giving parents peace of mind and schools a powerful management tool."
        },
        {
          heading: "How School Bus Tracking Works",
          text: "A complete school bus tracking system integrates several components into a seamless experience. A GPS tracking device installed on each school bus provides real-time location data updated every 10 seconds. A parent mobile application for iOS and Android shows live bus location, estimated arrival time, and push notifications. A driver monitoring system tracks speed, route compliance, and driving behavior. A school admin dashboard provides fleet management, route planning, and reporting capabilities.\n\nOptional enhancements include student boarding verification through RFID cards or app-based check-in, panic or SOS buttons for driver emergencies, and door sensors that log boarding and alighting events. Together, these components create a transparent transport ecosystem where parents, school administrators, and transport managers all have the visibility they need."
        },
        {
          heading: "The Parent App: Real-Time Peace of Mind",
          text: "The parent-facing mobile application is the centerpiece of any school bus tracking solution, because it is where the value is most directly felt by the families your school serves. Parents open the app and immediately see their child's bus displayed on a live map, moving along its route in real-time. The estimated arrival time at their specific stop updates dynamically based on the bus's actual position and current traffic conditions.\n\nPush notifications keep parents informed without requiring them to constantly watch the app. A notification arrives when the bus is approaching — typically 5 minutes before reaching their stop — giving parents time to prepare their child or meet the bus. Additional notifications confirm when the bus has reached the stop and when it departs. For schools using boarding verification, parents receive confirmation when their child boards and alights the bus.\n\nThe app displays the planned route and the actual route taken, providing transparency if a bus deviates from its normal path. Contact information for the school transport coordinator is accessible directly from the app. Parents with multiple children on different routes can manage all of them from a single account. Historical trip data provides a record for any parent who wants to review past journeys."
        },
        {
          heading: "School Administrator Dashboard",
          text: "School transport managers need tools that go beyond what parents see. The administrator dashboard provides a comprehensive fleet management interface designed specifically for school transport operations. A live overview shows all buses on a single map with color-coded status indicators for on-route, delayed, stopped, and completed trips.\n\nRoute planning tools optimize pickup and dropoff sequences based on student addresses, traffic patterns, and time constraints. Driver assignment and schedule management ensures the right drivers are on the right routes each day. Attendance tracking with boarding and alighting logs creates an auditable record of student transport.\n\nReal-time alerts for speed violations, route deviations, and harsh driving events give transport managers immediate visibility into safety concerns. Fuel monitoring and maintenance scheduling keep the bus fleet operating efficiently and reliably. Incident reports with video review capability — when dashcams are installed — provide documentation for any transport-related concerns from parents or staff. Custom reports for school management present key metrics including on-time performance, route efficiency, and safety statistics."
        },
        {
          heading: "Driver Safety and Compliance Features",
          text: "School bus drivers carry the most precious cargo — children — and the monitoring systems reflect this responsibility. Speed limit enforcement generates automatic alerts when buses exceed configured limits, with school zones typically set at 30 to 40 kilometers per hour. Route deviation alerts trigger instant notifications if a bus departs from its planned route, which could indicate a wrong turn or a more concerning situation.\n\nHarsh braking and acceleration monitoring is particularly important for school buses where children may be standing or not fully secured. The system scores driving smoothness and alerts when events could have caused passenger discomfort or risk. Driving hours tracking ensures that bus drivers comply with rest requirements and are not operating while fatigued.\n\nOptional AI dashcams provide an additional safety layer, monitoring driver alertness and detecting phone usage or distraction. Door sensor integration logs the exact times and locations of every door opening, creating a verifiable record of boarding and alighting events that can be cross-referenced with student attendance data."
        },
        {
          heading: "Route Optimization for School Fleets",
          text: "Efficient route planning directly impacts both student experience and operational costs. Optimizing pickup and dropoff sequences based on student addresses and traffic patterns during school hours reduces the time students spend on the bus — a factor that matters greatly to parents and affects school satisfaction ratings.\n\nRoute optimization also reduces the number of buses needed. By consolidating students into efficiently planned routes, schools can serve the same student population with fewer vehicles, reducing capital and operating costs significantly. Dynamic route adaptation accounts for construction, road closures, and seasonal traffic changes, ensuring routes remain efficient as conditions evolve.\n\nFuel savings from shorter, smarter routes compound over the school year. A fleet of 30 school buses that reduces average route distance by 15 percent through optimization saves thousands of riyals monthly in fuel alone, plus proportional reductions in vehicle wear and driver hours."
        },
        {
          heading: "Getting Started with School Bus Tracking",
          text: "Implementing school bus tracking is a powerful differentiator for schools competing in Saudi Arabia's education market. Parents increasingly consider transport safety and transparency when choosing schools, and a modern tracking system with a parent app demonstrates a commitment to student welfare that resonates with families.\n\nA complete school bus solution includes CST-approved GPS trackers designed for commercial vehicles, the school administrator dashboard with route planning and reporting, the parent mobile application in both Arabic and English, and driver behavior monitoring. Optional add-ons include AI dual-facing dashcams for comprehensive driver monitoring, RFID student check-in systems, and panic buttons for emergency situations.\n\nAll data is hosted on Saudi-based cloud servers for PDPL compliance, and dedicated support and training ensure that school transport teams can manage the system confidently from day one.\n\nRunning a school transport fleet? Get a complete school bus tracking demo from Axtella, including a live parent app walkthrough. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
    // Fleet Blog 10 (Smart Cities & Vision 2030 category)
    {
      slug: "saudi-vision-2030-digital-transformation-fleet-logistics",
      title: "How Saudi Vision 2030 is Driving Digital Transformation in Fleet and Logistics",
      description: "Explore how Saudi Vision 2030 is accelerating digital transformation in fleet management and logistics through smart mobility, IoT, AI, and government mandates.",
      excerpt: "Saudi Arabia's Vision 2030 is reshaping fleet management and logistics through smart mobility initiatives, government tracking mandates, and massive infrastructure investment. Learn how IoT, AI, and cloud technology are driving a fleet management revolution.",
      image: "/images/blog/fleet-placeholder.jpg",
      featuredImage: "/images/blog/fleet-placeholder.jpg",
      imageAlt: "Saudi Vision 2030 smart city with connected fleet vehicles and IoT infrastructure",
      category: "Smart Cities & Vision 2030",
      authorId: "fleet",
      tags: ["Vision 2030", "Digital Transformation", "Smart Mobility", "IoT", "Fleet Technology"],
      publishedDate: "2026-02-19",
      readTime: "9 min read",
      featured: true,
      metaTitle: "Vision 2030 and Fleet Digital Transformation in Saudi Arabia | Axtella",
      metaDescription: "Explore how Saudi Vision 2030 is accelerating digital transformation in fleet management and logistics. Smart mobility, IoT, AI telematics, and government mandates are reshaping the industry.",
      content: [
        {
          text: "Saudi Arabia's Vision 2030 is not merely an economic plan — it is a comprehensive transformation of how the kingdom operates, competes, and innovates. Digital transformation sits at the heart of this vision, with technology investment reshaping every sector from healthcare and education to logistics and transportation. For fleet management and logistics businesses, Vision 2030 creates both opportunities and imperatives: opportunities to leverage new technologies for competitive advantage, and imperatives to adopt digital solutions to meet evolving regulatory requirements and market expectations.\n\nThe Saudi digital economy exceeded 495 billion SAR in 2025, making it the largest in the MENA region. Within this digital ecosystem, fleet management technology is emerging as a critical enabler for the kingdom's ambitious transportation and logistics goals."
        },
        {
          heading: "The Growth of Saudi Arabia's Fleet Management Market",
          text: "The fleet management market in Saudi Arabia was valued at approximately 726 million dollars in 2024, and industry analysts project growth at a compound annual growth rate of 16.47 percent, reaching over 2 billion dollars by 2032. This remarkable growth trajectory reflects the convergence of several powerful drivers.\n\nGovernment mandates requiring commercial vehicle tracking create a regulatory floor for adoption. The expansion of e-commerce and last-mile delivery services demands sophisticated logistics technology. Mega-project construction — with projects like NEOM alone requiring thousands of vehicles and pieces of heavy equipment — generates massive demand for fleet management solutions. Sustainability goals pushing for fuel efficiency and emission reduction add another layer of motivation for fleet technology adoption.\n\nGovernment initiatives across Riyadh, Jeddah, Dammam, and other Saudi cities are directly propelling fleet management growth, aligned with Vision 2030's focus on smart mobility and efficient urban transportation. For fleet management providers and their customers, this growth represents a market that is rapidly maturing and professionalizing."
        },
        {
          heading: "Smart Mobility: The Future of Saudi Transportation",
          text: "Smart mobility is a cornerstone of Vision 2030's smart city programs. The concept envisions a transportation ecosystem where vehicles, infrastructure, and management systems communicate seamlessly to optimize movement of people and goods. Connected vehicles equipped with IoT sensors generate real-time data that feeds into city-wide traffic management systems. Autonomous vehicle testing and development, particularly in the NEOM technology zone, is pushing the boundaries of what fleet operations will look like in the near future.\n\nElectric vehicle adoption is accelerating, supported by expanding charging infrastructure across Saudi cities. Mobility-as-a-Service platforms are emerging to integrate public transport, ride-sharing, and logistics into unified systems that consumers and businesses access through digital interfaces.\n\nFleet management platforms serve as the backbone of this smart mobility ecosystem. The GPS tracking, telematics, and analytics capabilities that fleet managers use today to monitor their vehicles are the same technologies that will enable the connected, intelligent transportation networks of tomorrow. Companies that invest in comprehensive fleet management now are building the digital infrastructure that will keep them competitive as smart mobility evolves."
        },
        {
          heading: "Government Mandates Driving Fleet Technology Adoption",
          text: "Saudi Arabia's regulatory framework for fleet tracking is among the most comprehensive in the region, and it continues to expand. The Communications, Space and Technology Commission requires all tracking devices to be CST-certified, establishing quality and security standards for the hardware layer. The Transport General Authority mandates GPS tracking for certain categories of commercial transport, making fleet tracking a legal requirement rather than an optional investment.\n\nThe WASL platform provides an electronic monitoring system for public land transport, integrating fleet data from operators across the kingdom into a centralized government system. The Saudi Food and Drug Authority requires temperature monitoring for food and pharmaceutical transport, adding sensor requirements beyond basic GPS tracking. The National Data Management Office establishes data localization requirements that fleet data storage must comply with.\n\nThese regulations create what industry analysts call a compliance-driven market — one where fleet management technology adoption is not optional for businesses that want to operate commercially in Saudi Arabia. For forward-thinking companies, compliance requirements represent not a burden but a catalyst that accelerates the adoption of technology that delivers genuine operational benefits."
        },
        {
          heading: "IoT, AI, and Cloud: Technologies Reshaping Fleet Operations",
          text: "Three technology waves are converging to transform fleet operations in Saudi Arabia. The Internet of Things turns every vehicle into a connected data source. GPS devices, engine diagnostic sensors, fuel level monitors, temperature probes, dashcams, and tire pressure sensors generate thousands of data points daily from each vehicle. This rich data stream creates the foundation for intelligent fleet management.\n\nArtificial intelligence transforms raw data into actionable insights. AI algorithms analyze fleet-wide patterns to predict maintenance needs before breakdowns occur, optimize routes based on historical traffic data, score driver risk levels, and detect fuel consumption anomalies that indicate theft or waste. Computer vision processes dashcam footage in real-time to detect dangerous driving behaviors with an accuracy that exceeds human observation.\n\nCloud computing provides the scalable infrastructure to process data from thousands of vehicles simultaneously. Saudi-hosted cloud platforms from providers like AWS, Azure, and STC Cloud deliver the computing power needed for real-time analytics while keeping data within the kingdom's borders. The emergence of 5G connectivity across Saudi cities adds ultra-low latency networking that enables real-time video streaming from fleet cameras and near-instantaneous command-response for emerging autonomous features."
        },
        {
          heading: "Mega-Projects and the Demand for Advanced Fleet Solutions",
          text: "Saudi Arabia's mega-projects represent some of the largest construction and development undertakings in human history, and each one generates enormous demand for sophisticated fleet management. NEOM, the 500 billion dollar future city being built on the Red Sea coast, requires thousands of construction vehicles, equipment units, and support vehicles operating across a massive and remote site. Red Sea Global is developing luxury tourism destinations that demand logistics and transport fleets. Qiddiya, Diriyah Gate, and The Line each add their own fleet management requirements.\n\nThese projects require fleet management capabilities that go far beyond standard commercial tracking. Multi-site management across vast areas, heavy equipment monitoring with engine hour tracking, fuel theft detection in remote locations, sub-contractor fleet coordination, and integration with project management systems are all essential requirements. The scale and complexity of these projects are pushing fleet management technology forward, driving innovation that eventually benefits the broader market.\n\nFor fleet management providers, mega-projects represent both a significant commercial opportunity and a proving ground for advanced capabilities. Solutions that meet the demanding requirements of NEOM or Red Sea Global demonstrate a level of capability that gives other customers confidence in the platform's maturity and reliability."
        },
        {
          heading: "Sustainability and Green Fleet Management",
          text: "Vision 2030 includes ambitious sustainability targets, and fleet operations are directly relevant to these goals. Transportation accounts for a significant portion of Saudi Arabia's carbon emissions, and fleet optimization technologies contribute to emission reduction through multiple mechanisms.\n\nFuel optimization through idle time reduction, route efficiency, and driver behavior improvement directly reduces both fuel consumption and associated emissions. Electric vehicle fleet management capabilities — including charge scheduling, range optimization, and charging station integration — are becoming essential as Saudi companies begin transitioning portions of their fleets to electric vehicles.\n\nCarbon tracking and reporting features allow companies to measure and document their fleet emissions, supporting ESG reporting requirements that are increasingly important for companies working with international partners and investors. Fleet management platforms that provide sustainability dashboards and emission reduction analytics position their customers favorably in a business environment that increasingly values environmental responsibility."
        },
        {
          heading: "Preparing Your Fleet for 2030",
          text: "The businesses that will thrive in Saudi Arabia's 2030 economy are those that embrace digital transformation today rather than waiting for it to become unavoidable. For fleet operators, this means investing in comprehensive fleet management technology that provides real-time visibility, data-driven decision making, and regulatory compliance.\n\nStart with a platform that meets today's needs while providing a clear upgrade path for tomorrow's requirements. Ensure your fleet data is hosted in Saudi Arabia on compliant infrastructure. Build the skills within your team to leverage fleet analytics for continuous operational improvement. Establish integrations between fleet management and your other business systems to eliminate data silos and enable automated workflows.\n\nThe fleet management market in Saudi Arabia is growing at over 16 percent annually, driven by government mandates, technological advancement, and economic transformation. Companies that position themselves on the leading edge of this growth will have significant competitive advantages over those that delay.\n\nReady to prepare your fleet for the opportunities of Vision 2030? Partner with Axtella for a fleet management solution that grows with your business. Contact sales@axtellaglobal.com or call +966 55 732 3274."
        },
      ],
    },
  ];

  for (const post of blogPostsData) {
    const catSlug = categoryMap[post.category];
    const cat = await prisma.blogCategory.findUnique({
      where: { slug: catSlug },
    });

    if (!cat) {
      console.warn(`Category not found for slug: ${catSlug}, skipping post: ${post.slug}`);
      continue;
    }

    const postAuthorId = fleetAuthor.id;

    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        description: post.description,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        featuredImage: post.featuredImage,
        imageAlt: post.imageAlt,
        categoryId: cat.id,
        tags: post.tags,
        authorId: postAuthorId,
        readTime: post.readTime,
        featured: post.featured,
        published: true,
        publishedAt: new Date(post.publishedDate),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
      },
      create: {
        slug: post.slug,
        title: post.title,
        description: post.description,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        featuredImage: post.featuredImage,
        imageAlt: post.imageAlt,
        categoryId: cat.id,
        tags: post.tags,
        authorId: postAuthorId,
        readTime: post.readTime,
        featured: post.featured,
        published: true,
        publishedAt: new Date(post.publishedDate),
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
      },
    });
  }

  console.log(
    "Created blog posts:",
    blogPostsData.map((p) => p.slug).join(", ")
  );

  // ─── Job Positions ──────────────────────────────────────────
  const jobPositions = [
    {
      title: "Fleet Solutions Architect",
      department: "Engineering",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Design and architect end-to-end fleet management solutions including GPS tracking, telematics, and real-time monitoring platforms. Collaborate with cross-functional teams to deliver scalable systems for enterprise clients across the Kingdom.",
      order: 1,
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Build and maintain web applications powering our fleet management dashboard, admin portals, and client-facing platforms. Work with Next.js, React, TypeScript, and PostgreSQL in an agile environment.",
      order: 2,
    },
    {
      title: "IoT Hardware Engineer",
      department: "Engineering",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Develop and integrate IoT hardware solutions for vehicle tracking, sensor systems, and telematics devices. Work closely with firmware teams and field technicians to ensure reliable GPS and OBD-II installations.",
      order: 3,
    },
    {
      title: "Sales Executive - Fleet Management",
      department: "Sales",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Drive new business development for fleet management solutions across the Central Region. Identify prospects, deliver product demonstrations, and close deals with logistics companies, construction firms, and government entities.",
      order: 4,
    },
    {
      title: "Sales Executive - Fleet Management",
      department: "Sales",
      location: "Jeddah, Saudi Arabia",
      type: "Full-time",
      description:
        "Expand our fleet management client base in the Western Region. Build relationships with key decision-makers in transportation, delivery, and field services industries.",
      order: 5,
    },
    {
      title: "Technical Support Specialist",
      department: "Support",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Provide technical assistance for our fleet management platform and GPS tracking systems. Troubleshoot hardware and software issues, manage support tickets, and ensure high client satisfaction.",
      order: 6,
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Riyadh, Saudi Arabia",
      type: "Full-time",
      description:
        "Plan and execute digital marketing campaigns for Axtella's fleet management and technology services. Manage SEO, social media, content creation, and lead generation to grow brand awareness in the Saudi market.",
      order: 7,
    },
    {
      title: "GPS Installation Technician",
      department: "Operations",
      location: "Dammam, Saudi Arabia",
      type: "Full-time",
      description:
        "Install, configure, and maintain GPS tracking devices and telematics hardware in client vehicles. Perform on-site installations across the Eastern Province and provide hands-on technical support.",
      order: 8,
    },
  ];

  for (const job of jobPositions) {
    await prisma.jobPosition.upsert({
      where: {
        id: `seed-job-${job.order}`,
      },
      update: {
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        order: job.order,
        active: true,
      },
      create: {
        id: `seed-job-${job.order}`,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        order: job.order,
        active: true,
      },
    });
  }

  console.log("Created job positions:", jobPositions.map((j) => j.title).join(", "));

  console.log("\nSeed completed!");
  console.log("Login with: admin@axtella.com / admin123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
