"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, SelectField, FormSection } from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditUserPage({
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
    name: "",
    email: "",
    password: "",
    role: "editor",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((user) => {
        setFormData({
          name: user.name,
          email: user.email,
          password: "",
          role: user.role,
        });
        setLoading(false);
      })
      .catch(() => {
        toast("User not found", "error");
        router.push("/admin/users");
      });
  }, [id, router, toast]);

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast("User updated", "success");
      router.push("/admin/users");
    } else {
      const data = await res.json();
      if (data.fieldErrors) setErrors(data.fieldErrors);
      toast(data.error || "Failed to update user", "error");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <>
        <AdminHeader title="Edit User" />
        <main className="p-6">
          <p className="text-gray-400">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Edit User" />
      <main className="p-6">
        <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Users
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <FormSection title="User Details">
            <div>
              <InputField label="Name" name="name" value={formData.name} onChange={(v) => update("name", v)} required />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name[0]}</p>}
            </div>
            <div>
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={(v) => update("email", v)} required />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email[0]}</p>}
            </div>
            <div>
              <InputField label="Password" name="password" type="password" value={formData.password} onChange={(v) => update("password", v)} hint="Leave blank to keep current password" />
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password[0]}</p>}
            </div>
            <SelectField label="Role" name="role" value={formData.role} onChange={(v) => update("role", v)} options={[
              { label: "Editor", value: "editor" },
              { label: "Admin", value: "admin" },
            ]} />
          </FormSection>
          <div className="flex justify-end gap-3">
            <Link href="/admin/users" className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Cancel</Link>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"><Save size={16} />{saving ? "Saving..." : "Update User"}</button>
          </div>
        </form>
      </main>
    </>
  );
}
