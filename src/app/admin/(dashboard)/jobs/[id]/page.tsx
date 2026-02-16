"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  InputField,
  TextareaField,
  SelectField,
  ToggleField,
  FormSection,
} from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast";
import {
  ArrowLeft,
  Save,
  X,
  Download,
  Trash2,
  Mail,
  Phone,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string | null;
  cvFilename: string;
  cvUrl: string;
  cvSize: number | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface JobData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string | null;
  active: boolean;
  order: number;
  applications: Application[];
}

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  new: { label: "New", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  reviewed: {
    label: "Reviewed",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  shortlisted: {
    label: "Shortlisted",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  rejected: { label: "Rejected", color: "text-red-400", bg: "bg-red-400/10" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    active: true,
    order: 0,
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((job: JobData) => {
        setFormData({
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          description: job.description || "",
          active: job.active,
          order: job.order,
        });
        setApplications(job.applications);
        setLoading(false);
      })
      .catch(() => {
        router.push("/admin/jobs");
      });
  }, [id, router]);

  const update = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      toast("Job updated", "success");
      router.push("/admin/jobs");
    } else {
      toast("Failed to update", "error");
    }
    setSaving(false);
  };

  const updateAppStatus = async (appId: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status } : a))
        );
        if (selectedApp?.id === appId) {
          setSelectedApp((prev) => (prev ? { ...prev, status } : null));
        }
        toast("Status updated", "success");
      }
    } catch {
      toast("Failed to update status", "error");
    }
  };

  const deleteApplication = async (appId: string) => {
    if (!confirm("Delete this application permanently?")) return;
    try {
      await fetch(`/api/applications/${appId}`, { method: "DELETE" });
      setApplications((prev) => prev.filter((a) => a.id !== appId));
      if (selectedApp?.id === appId) setSelectedApp(null);
      toast("Application deleted", "success");
    } catch {
      toast("Failed to delete", "error");
    }
  };

  if (loading) {
    return (
      <>
        <AdminHeader title="Edit Job Position" />
        <main className="p-6">
          <p className="text-gray-400">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Edit Job Position" />
      <main className="p-6">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Link>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <FormSection title="Position Details">
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={(v) => update("title", v)}
              required
            />
            <InputField
              label="Department"
              name="department"
              value={formData.department}
              onChange={(v) => update("department", v)}
              required
              placeholder="Engineering, IT, Sales..."
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(v) => update("location", v)}
              required
              placeholder="Riyadh, Bahrain, Remote..."
            />
            <SelectField
              label="Type"
              name="type"
              value={formData.type}
              onChange={(v) => update("type", v)}
              options={[
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Contract", value: "Contract" },
                { label: "Internship", value: "Internship" },
              ]}
            />
            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={(v) => update("description", v)}
              rows={5}
            />
            <ToggleField
              label="Active"
              name="active"
              checked={formData.active}
              onChange={(v) => update("active", v)}
              hint="Show this position on the careers page"
            />
          </FormSection>
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/jobs"
              className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Update Position"}
            </button>
          </div>
        </form>

        {/* Applications Section */}
        <div className="mt-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-[#F5A623]" />
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-montserrat)]">
              Applications
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
              {applications.length}
            </span>
          </div>

          {applications.length === 0 ? (
            <div className="bg-[#0f1729] border border-white/10 rounded-xl p-8 text-center">
              <p className="text-gray-500 text-sm">
                No applications received yet
              </p>
            </div>
          ) : (
            <div className="bg-[#0f1729] border border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        CV
                      </th>
                      <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-right px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {applications.map((app) => {
                      const cfg =
                        statusConfig[app.status] || statusConfig.new;
                      return (
                        <tr
                          key={app.id}
                          className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                          onClick={() => setSelectedApp(app)}
                        >
                          <td className="px-4 py-3">
                            <p className="text-sm text-white font-medium">
                              {app.name}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-xs text-gray-300">{app.email}</p>
                            <p className="text-xs text-gray-500 font-mono">
                              {app.phone}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={app.cvUrl}
                              download={app.cvFilename}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs text-[#F5A623] hover:underline"
                            >
                              <FileText size={12} />
                              {app.cvFilename.length > 20
                                ? app.cvFilename.slice(0, 17) + "..."
                                : app.cvFilename}
                            </a>
                            {app.cvSize && (
                              <p className="text-[10px] text-gray-600 mt-0.5">
                                {formatFileSize(app.cvSize)}
                              </p>
                            )}
                          </td>
                          <td
                            className="px-4 py-3"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <select
                              value={app.status}
                              onChange={(e) =>
                                updateAppStatus(app.id, e.target.value)
                              }
                              className={cn(
                                "text-[11px] font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40",
                                cfg.color,
                                cfg.bg
                              )}
                            >
                              {Object.entries(statusConfig).map(([key, c]) => (
                                <option
                                  key={key}
                                  value={key}
                                  className="bg-[#0f1729] text-white"
                                >
                                  {c.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-400">
                            {formatDate(app.createdAt)}
                          </td>
                          <td
                            className="px-4 py-3 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Application Detail Side Panel */}
      {selectedApp && (
        <ApplicationDetailPanel
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onStatusChange={(status) => updateAppStatus(selectedApp.id, status)}
          onDelete={() => deleteApplication(selectedApp.id)}
          onSaved={(updated) => {
            setApplications((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
            setSelectedApp(updated);
          }}
          toast={toast}
        />
      )}
    </>
  );
}

// ─── Application Detail Side Panel ─────────────────────────

function ApplicationDetailPanel({
  app,
  onClose,
  onStatusChange,
  onDelete,
  onSaved,
  toast,
}: {
  app: Application;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  onSaved: (app: Application) => void;
  toast: (msg: string, type: "success" | "error") => void;
}) {
  const [notes, setNotes] = useState(app.adminNotes || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(app.adminNotes || "");
  }, [app.id, app.adminNotes]);

  const saveNotes = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/applications/${app.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });
      if (res.ok) {
        toast("Notes saved", "success");
        onSaved({ ...app, adminNotes: notes });
      }
    } catch {
      toast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const cfg = statusConfig[app.status] || statusConfig.new;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-[#0a1020] border-l border-white/10 z-50 overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{app.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                    cfg.color,
                    cfg.bg
                  )}
                >
                  {cfg.label}
                </span>
                <span className="text-[10px] text-gray-500">
                  Applied {formatDate(app.createdAt)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm text-gray-300">{app.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm text-gray-300">{app.phone}</p>
              </div>
            </div>
          </div>

          {/* CV Download */}
          <div>
            <h4 className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
              Resume / CV
            </h4>
            <a
              href={app.cvUrl}
              download={app.cvFilename}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 hover:border-[#F5A623]/30 transition-all"
            >
              <Download size={16} className="text-[#F5A623]" />
              <div>
                <p className="font-medium">{app.cvFilename}</p>
                {app.cvSize && (
                  <p className="text-[10px] text-gray-500">
                    {formatFileSize(app.cvSize)}
                  </p>
                )}
              </div>
            </a>
          </div>

          {/* Cover Letter */}
          {app.coverLetter && (
            <div>
              <h4 className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
                Cover Letter
              </h4>
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                {app.coverLetter}
              </p>
            </div>
          )}

          {/* Status & Notes */}
          <div>
            <h4 className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
              Review
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Status
                </label>
                <select
                  value={app.status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40"
                >
                  {Object.entries(statusConfig).map(([key, c]) => (
                    <option
                      key={key}
                      value={key}
                      className="bg-[#0f1729]"
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Admin Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes about this applicant..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40"
                />
              </div>
              <button
                onClick={saveNotes}
                disabled={saving}
                className="px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            <a
              href={`mailto:${app.email}`}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/20 rounded-lg transition-colors"
            >
              <Mail size={13} /> Email
            </a>
            <a
              href={`tel:${app.phone}`}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/20 rounded-lg transition-colors"
            >
              <Phone size={13} /> Call
            </a>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-400 hover:text-red-400 hover:border-red-400/20 rounded-lg transition-colors ml-auto"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>

          {/* Timestamps */}
          <p className="text-[10px] text-gray-600">
            Applied: {new Date(app.createdAt).toLocaleString()} | Updated:{" "}
            {new Date(app.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}
