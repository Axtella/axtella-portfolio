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
    { name: "Data Analytics", slug: "data-analytics" },
    { name: "Career", slug: "career" },
    { name: "Technology", slug: "technology" },
    { name: "Productivity", slug: "productivity" },
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
