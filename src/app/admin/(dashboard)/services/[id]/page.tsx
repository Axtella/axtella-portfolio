"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, ToggleField, FormSection } from "@/components/admin/form-field";
import { ImageField } from "@/components/admin/image-field";
import { SeoFields, getDefaultSeoData, type SeoData } from "@/components/admin/seo-fields";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ListItem { title: string; description: string; image?: string; [key: string]: any }

interface StatItem {
  icon: string;
  displayValue: string;
  title: string;
  description: string;
  accentColor: string;
  // auto-derived fields preserved from seed data
  targetNumber?: number | null;
  prefix?: string;
  suffix?: string;
  accentBg?: string;
  progressPercent?: number;
}

interface StatsSection {
  label: string;
  heading: string;
  subtext: string;
  bgImage: string;
  items: StatItem[];
}

function ListEditor({ items, onChange, label, showImage }: { items: ListItem[]; onChange: (items: ListItem[]) => void; label: string; showImage?: boolean }) {
  const add = () => onChange([...items, { title: "", description: "", ...(showImage ? { image: "" } : {}) }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 items-start p-3 bg-white/[0.02] border border-white/5 rounded-lg">
          <div className="flex-1 space-y-2">
            <input value={item.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Title" className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50" />
            <textarea value={item.description} onChange={(e) => update(i, "description", e.target.value)} placeholder="Description" rows={2} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50 resize-none" />
            {showImage && (
              <ImageField
                value={item.image || ""}
                onChange={(url) => update(i, "image", url)}
              />
            )}
          </div>
          <button type="button" onClick={() => remove(i)} className="p-1 text-gray-500 hover:text-red-400"><X size={16} /></button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#F5A623] transition-colors">
        <Plus size={14} /> Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}

const inputCls = "w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50";

function StatsEditor({ data, onChange }: { data: StatsSection; onChange: (d: StatsSection) => void }) {
  const updateField = (field: keyof StatsSection, value: string) => onChange({ ...data, [field]: value });
  const addItem = () => onChange({ ...data, items: [...data.items, { icon: "ArrowUpCircle", displayValue: "", title: "", description: "", accentColor: "#F59E0B" }] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  const updateItem = (i: number, field: string, value: string) => {
    const updated = [...data.items];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ ...data, items: updated });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Section Label</label>
          <input value={data.label} onChange={(e) => updateField("label", e.target.value)} placeholder="Measurable Results" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Section Heading</label>
          <input value={data.heading} onChange={(e) => updateField("heading", e.target.value)} placeholder="Results That Speak For Themselves" className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Subtext</label>
        <textarea value={data.subtext} onChange={(e) => updateField("subtext", e.target.value)} placeholder="Description paragraph..." rows={2} className={inputCls + " resize-none"} />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1">Background Image</label>
        <ImageField value={data.bgImage} onChange={(url) => updateField("bgImage", url)} />
      </div>

      <hr className="border-white/10" />
      <label className="block text-sm font-medium text-gray-300">Stat Cards</label>

      {data.items.map((item, i) => (
        <div key={i} className="flex gap-3 items-start p-3 bg-white/[0.02] border border-white/5 rounded-lg">
          <div className="flex-1 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">Icon</label>
                <input value={item.icon} onChange={(e) => updateItem(i, "icon", e.target.value)} placeholder="ArrowUpCircle" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">Display Value</label>
                <input value={item.displayValue} onChange={(e) => updateItem(i, "displayValue", e.target.value)} placeholder="99.99%" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-0.5">Accent Color</label>
                <div className="flex gap-1.5 items-center">
                  <input type="color" value={item.accentColor || "#F59E0B"} onChange={(e) => updateItem(i, "accentColor", e.target.value)} className="w-8 h-8 rounded border border-white/10 bg-transparent cursor-pointer" />
                  <input value={item.accentColor} onChange={(e) => updateItem(i, "accentColor", e.target.value)} placeholder="#F59E0B" className={inputCls} />
                </div>
              </div>
            </div>
            <input value={item.title} onChange={(e) => updateItem(i, "title", e.target.value)} placeholder="Title" className={inputCls} />
            <textarea value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} placeholder="Description" rows={2} className={inputCls + " resize-none"} />
          </div>
          <button type="button" onClick={() => removeItem(i)} className="p-1 text-gray-500 hover:text-red-400"><X size={16} /></button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#F5A623] transition-colors">
        <Plus size={14} /> Add Stat Card
      </button>
    </div>
  );
}

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalSlug, setOriginalSlug] = useState("");
  const [formData, setFormData] = useState({
    title: "", slug: "", heroTitle: "", heroSubtitle: "", heroImage: "", published: true, order: 0,
  });
  const [offers, setOffers] = useState<ListItem[]>([]);
  const [features, setFeatures] = useState<ListItem[]>([]);
  const [howItWorks, setHowItWorks] = useState<ListItem[]>([]);
  const [statsData, setStatsData] = useState<StatsSection>({ label: "", heading: "", subtext: "", bgImage: "", items: [] });
  const [industries, setIndustries] = useState<ListItem[]>([]);
  const [seo, setSeo] = useState<SeoData>(getDefaultSeoData());

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((services: Record<string, unknown>[]) => {
        const service = services.find((s) => s.id === id) as Record<string, unknown> | undefined;
        if (!service) { router.push("/admin/services"); return; }
        setOriginalSlug(service.slug as string);
        setFormData({
          title: service.title as string, slug: service.slug as string,
          heroTitle: (service.heroTitle as string) || "", heroSubtitle: (service.heroSubtitle as string) || "",
          heroImage: (service.heroImage as string) || "",
          published: service.published as boolean, order: (service.order as number) || 0,
        });
        setOffers((service.offers as ListItem[]) || []);
        setFeatures((service.features as ListItem[]) || []);
        setHowItWorks((service.howItWorks as ListItem[]) || []);
        const rawStats = service.stats;
        if (Array.isArray(rawStats)) {
          setStatsData({ label: "", heading: "", subtext: "", bgImage: "", items: rawStats as StatItem[] });
        } else if (rawStats && typeof rawStats === "object") {
          const s = rawStats as StatsSection;
          setStatsData({ label: s.label || "", heading: s.heading || "", subtext: s.subtext || "", bgImage: s.bgImage || "", items: s.items || [] });
        }
        setIndustries((service.industries as ListItem[]) || []);
        setSeo({
          metaTitle: (service.metaTitle as string) || "", metaDescription: (service.metaDescription as string) || "",
          ogImage: (service.ogImage as string) || "", ogTitle: (service.ogTitle as string) || "",
          ogDescription: (service.ogDescription as string) || "", canonicalUrl: (service.canonicalUrl as string) || "",
          noIndex: (service.noIndex as boolean) || false,
        });
        setLoading(false);
      });
  }, [id, router]);

  const update = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/services/${originalSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, offers, features, howItWorks, stats: statsData, industries, ...seo }),
    });
    if (res.ok) { toast("Service updated", "success"); router.push("/admin/services"); }
    else { toast("Failed to update", "error"); }
    setSaving(false);
  };

  if (loading) return (<><AdminHeader title="Edit Service" /><main className="p-6"><p className="text-gray-400">Loading...</p></main></>);

  return (
    <>
      <AdminHeader title="Edit Service" />
      <main className="p-6">
        <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"><ArrowLeft size={16} /> Back to Services</Link>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <FormSection title="Basic Information">
            <InputField label="Title" name="title" value={formData.title} onChange={(v) => update("title", v)} required />
            <InputField label="Slug" name="slug" value={formData.slug} onChange={(v) => update("slug", v)} required />
            <InputField label="Hero Title" name="heroTitle" value={formData.heroTitle} onChange={(v) => update("heroTitle", v)} required />
            <InputField label="Hero Subtitle" name="heroSubtitle" value={formData.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
            <InputField label="Hero Image" name="heroImage" value={formData.heroImage} onChange={(v) => update("heroImage", v)} />
            <InputField label="Order" name="order" type="number" value={String(formData.order)} onChange={(v) => update("order", parseInt(v) || 0)} />
            <ToggleField label="Published" name="published" checked={formData.published} onChange={(v) => update("published", v)} />
          </FormSection>
          <FormSection title="Offers"><ListEditor items={offers} onChange={setOffers} label="Offers" showImage /></FormSection>
          <FormSection title="Key Features"><ListEditor items={features} onChange={setFeatures} label="Features" /></FormSection>
          <FormSection title="How It Works"><ListEditor items={howItWorks} onChange={setHowItWorks} label="Steps" showImage /></FormSection>
          <FormSection title="Measurable Results"><StatsEditor data={statsData} onChange={setStatsData} /></FormSection>
          <FormSection title="Industries"><ListEditor items={industries} onChange={setIndustries} label="Industries" showImage /></FormSection>
          <SeoFields data={seo} onChange={setSeo} />
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/services" className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Cancel</Link>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"><Save size={16} />{saving ? "Saving..." : "Update Service"}</button>
          </div>
        </form>
      </main>
    </>
  );
}
