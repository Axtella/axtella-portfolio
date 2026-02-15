import { SessionProvider } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { ToastProvider } from "@/components/admin/toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ToastProvider>
        <div className="min-h-screen bg-[#080D1A]">
          <AdminSidebar />
          <div className="ml-[250px] transition-all duration-300">
            {children}
          </div>
        </div>
      </ToastProvider>
    </SessionProvider>
  );
}
