export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  FileText,
  Briefcase,
  PenTool,
  HelpCircle,
  Users,
  Image,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  const [pages, services, blogs, faqs, jobs, media, submissions] =
    await Promise.all([
      prisma.page.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.fAQ.count(),
      prisma.jobPosition.count(),
      prisma.media.count(),
      prisma.contactSubmission.count({ where: { read: false } }),
    ]);

  return { pages, services, blogs, faqs, jobs, media, submissions };
}

const statCards = [
  { label: "Pages", key: "pages", icon: FileText, href: "/admin/pages", color: "#3B82F6" },
  { label: "Services", key: "services", icon: Briefcase, href: "/admin/services", color: "#8B5CF6" },
  { label: "Blog Posts", key: "blogs", icon: PenTool, href: "/admin/blogs", color: "#F5A623" },
  { label: "FAQs", key: "faqs", icon: HelpCircle, href: "/admin/faqs", color: "#10B981" },
  { label: "Job Positions", key: "jobs", icon: Users, href: "/admin/jobs", color: "#EF4444" },
  { label: "Media Files", key: "media", icon: Image, href: "/admin/media", color: "#EC4899" },
  { label: "Unread Messages", key: "submissions", icon: MessageSquare, href: "/admin/submissions", color: "#F59E0B" },
] as const;

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            const count = stats[card.key as keyof typeof stats];
            return (
              <Link
                key={card.key}
                href={card.href}
                className="group bg-[#0f1729] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${card.color}20` }}
                  >
                    <Icon size={20} style={{ color: card.color }} />
                  </div>
                  <span className="text-3xl font-bold text-white">
                    {count}
                  </span>
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {card.label}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4 font-[family-name:var(--font-montserrat)]">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/blogs/new"
              className="px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors"
            >
              + New Blog Post
            </Link>
            <Link
              href="/admin/services/new"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
            >
              + New Service
            </Link>
            <Link
              href="/admin/jobs/new"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
            >
              + New Job Position
            </Link>
            <Link
              href="/admin/media"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
            >
              Upload Media
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
