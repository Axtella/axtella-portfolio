"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";

interface Page {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  createdAt: string;
  [key: string]: unknown;
}

export default function PagesAdminPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Page | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadPages = useCallback(async () => {
    const res = await fetch("/api/pages");
    setPages(await res.json());
  }, []);

  useEffect(() => { loadPages(); }, [loadPages]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/pages/${deleteTarget.slug}`, { method: "DELETE" });
    if (res.ok) { toast("Page deleted", "success"); loadPages(); }
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
      render: (p: Page) => (
        <span className={`px-2 py-1 rounded text-xs ${p.published ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"}`}>
          {p.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (p: Page) => new Date(p.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <>
      <AdminHeader title="Pages" />
      <main className="p-6">
        <DataTable
          columns={columns}
          data={pages}
          searchKey="title"
          title="All Pages"
          editHref={(p) => `/admin/pages/${p.id}`}
          onDelete={(p) => setDeleteTarget(p)}
          getId={(p) => p.id}
        />
        <ConfirmDialog open={!!deleteTarget} title="Delete Page" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
      </main>
    </>
  );
}
