"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";

interface Service {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  order: number;
  createdAt: string;
  [key: string]: unknown;
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadServices = useCallback(async () => {
    const res = await fetch("/api/services");
    setServices(await res.json());
  }, []);

  useEffect(() => { loadServices(); }, [loadServices]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/services/${deleteTarget.slug}`, { method: "DELETE" });
    if (res.ok) { toast("Service deleted", "success"); loadServices(); }
    else { toast("Failed to delete", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    {
      key: "published",
      label: "Status",
      render: (s: Service) => (
        <span className={`px-2 py-1 rounded text-xs ${s.published ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>
          {s.published ? "Published" : "Draft"}
        </span>
      ),
    },
    { key: "order", label: "Order" },
  ];

  return (
    <>
      <AdminHeader title="Services" />
      <main className="p-6">
        <DataTable
          columns={columns}
          data={services}
          searchKey="title"
          title="All Services"
          createHref="/admin/services/new"
          createLabel="New Service"
          editHref={(s) => `/admin/services/${s.id}`}
          onDelete={(s) => setDeleteTarget(s)}
          getId={(s) => s.id}
        />
        <ConfirmDialog open={!!deleteTarget} title="Delete Service" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
      </main>
    </>
  );
}
