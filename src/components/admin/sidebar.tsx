"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PenTool,
  HelpCircle,
  Users,
  Image,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Blogs", href: "/admin/blogs", icon: PenTool },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Jobs", href: "/admin/jobs", icon: Users },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Submissions", href: "/admin/submissions", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0a1020] border-r border-white/10 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-[70px]" : "w-[250px]"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/10">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F5A623] rounded-lg flex items-center justify-center text-black font-bold text-sm">
              A
            </div>
            <span className="text-white font-semibold font-[family-name:var(--font-montserrat)]">
              Axtella Admin
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-[#F5A623] rounded-lg flex items-center justify-center text-black font-bold text-sm mx-auto">
            A
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-[#F5A623]/10 text-[#F5A623]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight size={20} className="flex-shrink-0" />
          ) : (
            <ChevronLeft size={20} className="flex-shrink-0" />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-colors w-full"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
