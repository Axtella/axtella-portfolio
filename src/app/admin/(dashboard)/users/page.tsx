"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  [key: string]: unknown;
}

export default function UsersAdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadUsers = useCallback(async () => {
    const res = await fetch("/api/users");
    if (res.ok) setUsers(await res.json());
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/users/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) { toast("User deleted", "success"); loadUsers(); }
    else {
      const data = await res.json();
      toast(data.error || "Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (u: User) => (
        <span className={`px-2 py-1 rounded text-xs ${
          u.role === "admin"
            ? "bg-[#F5A623]/10 text-[#F5A623]"
            : "bg-blue-400/10 text-blue-400"
        }`}>
          {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (u: User) => new Date(u.createdAt).toLocaleDateString("en-GB"),
    },
  ];

  const handleDeleteClick = (u: User) => {
    if ((session?.user as { id?: string })?.id === u.id) {
      toast("You cannot delete your own account", "error");
      return;
    }
    setDeleteTarget(u);
  };

  return (
    <>
      <AdminHeader title="User Management" />
      <main className="p-6">
        <DataTable
          columns={columns}
          data={users}
          searchKey="name"
          title="All Users"
          createHref="/admin/users/new"
          createLabel="New User"
          editHref={(u) => `/admin/users/${u.id}`}
          onDelete={handleDeleteClick}
          getId={(u) => u.id}
        />
        <ConfirmDialog
          open={!!deleteTarget}
          title="Delete User"
          message={`Delete "${deleteTarget?.name}" (${deleteTarget?.email})? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      </main>
    </>
  );
}
