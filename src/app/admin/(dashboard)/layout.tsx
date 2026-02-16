"use client";

import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ToastProvider } from "@/components/admin/toast";
import { useState, useCallback, createContext, useContext } from "react";

// Context so any admin page can trigger the mobile menu
const SidebarContext = createContext<{
  openSidebar: () => void;
}>({ openSidebar: () => {} });

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  return (
    <SessionProvider>
      <ToastProvider>
        <SidebarContext.Provider value={{ openSidebar }}>
          <div className="min-h-screen bg-[#080D1A]">
            <AdminSidebar
              isOpen={sidebarOpen}
              onClose={closeSidebar}
              collapsed={collapsed}
              onCollapsedChange={setCollapsed}
            />
            <div
              className={`transition-all duration-300 ml-0 ${
                collapsed ? "lg:ml-[70px]" : "lg:ml-[250px]"
              }`}
            >
              {children}
            </div>
          </div>
        </SidebarContext.Provider>
      </ToastProvider>
    </SessionProvider>
  );
}
