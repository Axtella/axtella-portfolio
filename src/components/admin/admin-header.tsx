"use client";

import { useSession } from "next-auth/react";
import { Bell, Menu } from "lucide-react";
import { useSidebarContext } from "@/app/admin/(dashboard)/layout-client";

export function AdminHeader({ title }: { title: string }) {
  const { data: session } = useSession();
  const { openSidebar } = useSidebarContext();

  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={openSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-white font-[family-name:var(--font-montserrat)]">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#F5A623]/20 rounded-full flex items-center justify-center text-[#F5A623] text-sm font-semibold">
            {session?.user?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-white leading-none">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
