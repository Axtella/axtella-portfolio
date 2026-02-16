import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayoutClient } from "./layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
