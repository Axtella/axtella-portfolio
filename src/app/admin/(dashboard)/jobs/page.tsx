"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useToast } from "@/components/admin/toast";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  active: boolean;
  createdAt: string;
  [key: string]: unknown;
}

export default function JobsAdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const loadJobs = useCallback(async () => {
    const res = await fetch("/api/jobs");
    setJobs(await res.json());
  }, []);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/jobs/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) { toast("Job deleted", "success"); loadJobs(); }
    else { toast("Failed to delete", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "department", label: "Department" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    {
      key: "active",
      label: "Status",
      render: (j: Job) => (
        <span className={`px-2 py-1 rounded text-xs ${j.active ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"}`}>
          {j.active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminHeader title="Job Positions" />
      <main className="p-6">
        <DataTable
          columns={columns}
          data={jobs}
          searchKey="title"
          title="All Positions"
          createHref="/admin/jobs/new"
          createLabel="New Position"
          editHref={(j) => `/admin/jobs/${j.id}`}
          onDelete={(j) => setDeleteTarget(j)}
          getId={(j) => j.id}
        />
        <ConfirmDialog open={!!deleteTarget} title="Delete Job Position" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
      </main>
    </>
  );
}
