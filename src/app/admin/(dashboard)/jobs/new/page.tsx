"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, TextareaField, SelectField, ToggleField, FormSection } from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "", department: "", location: "", type: "Full-time", description: "", active: true,
  });

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) { toast("Job created", "success"); router.push("/admin/jobs"); }
    else { toast("Failed to create", "error"); }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader title="New Job Position" />
      <main className="p-6">
        <Link href="/admin/jobs" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <FormSection title="Position Details">
            <InputField label="Title" name="title" value={formData.title} onChange={(v) => update("title", v)} required />
            <InputField label="Department" name="department" value={formData.department} onChange={(v) => update("department", v)} required placeholder="Engineering, IT, Sales..." />
            <InputField label="Location" name="location" value={formData.location} onChange={(v) => update("location", v)} required placeholder="Riyadh, Bahrain, Remote..." />
            <SelectField label="Type" name="type" value={formData.type} onChange={(v) => update("type", v)} options={[
              { label: "Full-time", value: "Full-time" },
              { label: "Part-time", value: "Part-time" },
              { label: "Contract", value: "Contract" },
              { label: "Internship", value: "Internship" },
            ]} />
            <TextareaField label="Description" name="description" value={formData.description} onChange={(v) => update("description", v)} rows={5} />
            <ToggleField label="Active" name="active" checked={formData.active} onChange={(v) => update("active", v)} hint="Show this position on the careers page" />
          </FormSection>
          <div className="flex justify-end gap-3">
            <Link href="/admin/jobs" className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Cancel</Link>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"><Save size={16} />{saving ? "Saving..." : "Create Position"}</button>
          </div>
        </form>
      </main>
    </>
  );
}
