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
  ClipboardList,
  UserCog,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pages", href: "/admin/pages", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Blogs", href: "/admin/blogs", icon: PenTool },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Jobs", href: "/admin/jobs", icon: Users },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Submissions", href: "/admin/submissions", icon: MessageSquare },
  { label: "Fleet Leads", href: "/admin/quotes", icon: ClipboardList },
  { label: "Users", href: "/admin/users", icon: UserCog, adminOnly: true },
  { label: "Settings", href: "/admin/settings", icon: Settings },
] as const;

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function AdminSidebar({
  isOpen,
  onClose,
  collapsed,
  onCollapsedChange,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const filteredNavItems = navItems.filter(
    (item) => !("adminOnly" in item && item.adminOnly) || (session?.user as { role?: string })?.role === "admin"
  );

  // Close mobile drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed left-0 top-0 h-screen bg-[#0a1020] border-r border-white/10 flex flex-col transition-all duration-300 z-50",
          // Mobile: slide in/out
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Mobile: always full width (250px)
          "w-[250px]",
          // Desktop: always visible, respect collapsed state
          "lg:translate-x-0",
          collapsed ? "lg:w-[70px]" : "lg:w-[250px]",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden mr-2 p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {!collapsed && (
            <Link
              href="/admin"
              className="flex items-center gap-2 lg:flex"
            >
              <div className="w-8 h-8 bg-[#F5A623] rounded-lg flex items-center justify-center text-black font-bold text-sm">
                A
              </div>
              <span className="text-white font-semibold font-[family-name:var(--font-montserrat)]">
                Axtella Admin
              </span>
            </Link>
          )}
          {/* Desktop collapsed logo */}
          <div className={`${collapsed ? "hidden lg:flex" : "hidden"} w-full justify-center`}>
            <div className="w-8 h-8 bg-[#F5A623] rounded-lg flex items-center justify-center text-black font-bold text-sm">
              A
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {filteredNavItems.map((item) => {
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
                    {/* Always show label on mobile, hide when collapsed on desktop */}
                    <span className={collapsed ? "lg:hidden" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 space-y-1">
          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => onCollapsedChange(!collapsed)}
            className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors w-full"
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
            <span className={collapsed ? "lg:hidden" : ""}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
