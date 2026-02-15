"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, TextareaField, FormSection } from "@/components/admin/form-field";
import { useToast } from "@/components/admin/toast";
import { Save } from "lucide-react";

export default function SettingsAdminPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    footerText: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        const social = (data.socialLinks || {}) as Record<string, string>;
        setFormData({
          siteName: data.siteName || "",
          contactEmail: data.contactEmail || "",
          contactPhone: data.contactPhone || "",
          address: data.address || "",
          footerText: data.footerText || "",
          linkedin: social.linkedin || "",
          twitter: social.twitter || "",
          facebook: social.facebook || "",
          instagram: social.instagram || "",
        });
      });
  }, []);

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteName: formData.siteName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        address: formData.address,
        footerText: formData.footerText,
        socialLinks: {
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          facebook: formData.facebook,
          instagram: formData.instagram,
        },
      }),
    });
    if (res.ok) { toast("Settings saved", "success"); }
    else { toast("Failed to save settings", "error"); }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader title="Site Settings" />
      <main className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <FormSection title="General">
            <InputField label="Site Name" name="siteName" value={formData.siteName} onChange={(v) => update("siteName", v)} />
            <TextareaField label="Footer Text" name="footerText" value={formData.footerText} onChange={(v) => update("footerText", v)} rows={2} />
          </FormSection>

          <FormSection title="Contact Information">
            <InputField label="Email" name="contactEmail" value={formData.contactEmail} onChange={(v) => update("contactEmail", v)} type="email" />
            <InputField label="Phone" name="contactPhone" value={formData.contactPhone} onChange={(v) => update("contactPhone", v)} />
            <TextareaField label="Address" name="address" value={formData.address} onChange={(v) => update("address", v)} rows={2} />
          </FormSection>

          <FormSection title="Social Links">
            <InputField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={(v) => update("linkedin", v)} placeholder="https://linkedin.com/company/axtella" />
            <InputField label="Twitter / X" name="twitter" value={formData.twitter} onChange={(v) => update("twitter", v)} placeholder="https://x.com/axtella" />
            <InputField label="Facebook" name="facebook" value={formData.facebook} onChange={(v) => update("facebook", v)} placeholder="https://facebook.com/axtella" />
            <InputField label="Instagram" name="instagram" value={formData.instagram} onChange={(v) => update("instagram", v)} placeholder="https://instagram.com/axtella" />
          </FormSection>

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              <Save size={16} />{saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
