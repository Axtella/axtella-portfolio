"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";

interface Blog {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  featured: boolean;
  category: { name: string } | null;
  author: { name: string } | null;
  createdAt: string;
  [key: string]: unknown;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadBlogs = useCallback(async () => {
    const res = await fetch("/api/blogs");
    setBlogs(await res.json());
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/blogs/${deleteTarget.slug}`, { method: "DELETE" });
    if (res.ok) {
      toast("Blog deleted", "success");
      loadBlogs();
    } else {
      toast("Failed to delete", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "category",
      label: "Category",
      render: (blog: Blog) => (
        <span className="px-2 py-1 bg-white/5 rounded text-xs">
          {blog.category?.name || "—"}
        </span>
      ),
    },
    {
      key: "author",
      label: "Author",
      render: (blog: Blog) => blog.author?.name || "—",
    },
    {
      key: "published",
      label: "Status",
      render: (blog: Blog) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            blog.published
              ? "bg-green-400/10 text-green-400"
              : "bg-yellow-400/10 text-yellow-400"
          }`}
        >
          {blog.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (blog: Blog) =>
        new Date(blog.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <>
      <AdminHeader title="Blog Posts" />
      <main className="p-6">
        <DataTable
          columns={columns}
          data={blogs}
          searchKey="title"
          title="All Posts"
          createHref="/admin/blogs/new"
          createLabel="New Post"
          editHref={(blog) => `/admin/blogs/${blog.id}`}
          onDelete={(blog) => setDeleteTarget(blog)}
          getId={(blog) => blog.id}
        />
        <ConfirmDialog
          open={!!deleteTarget}
          title="Delete Blog Post"
          message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      </main>
    </>
  );
}
