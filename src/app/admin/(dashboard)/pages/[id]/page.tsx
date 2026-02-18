"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import {
  InputField,
  TextareaField,
  ToggleField,
  FormSection,
} from "@/components/admin/form-field";
import {
  SeoFields,
  getDefaultSeoData,
  type SeoData,
} from "@/components/admin/seo-fields";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save, Plus, X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Section = Record<string, any>;

function SectionEditor({
  section,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  section: Section;
  index: number;
  onChange: (updated: Section) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const updateField = (key: string, value: unknown) => {
    onChange({ ...section, [key]: value });
  };

  const sectionLabel =
    section.type === "hero"
      ? "Hero Section"
      : section.type === "scroll-highlight"
        ? "Scroll Highlight"
        : section.type === "mentor"
          ? "Mentor / Stats"
          : section.type === "what-sets-apart"
            ? "What Sets Apart"
            : section.type === "core-values"
              ? "Core Values"
              : section.type === "mission-vision"
                ? "Mission & Vision"
                : section.type === "contact-info"
                  ? "Contact Info"
                  : section.type === "why-join"
                    ? "Why Join Us"
                    : section.type === "departments"
                      ? "Departments"
                      : section.type === "discover-services"
                        ? "Discover Services"
                        : `Section: ${section.type || "unknown"}`;

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/5">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white"
        >
          {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          <span className="text-xs px-2 py-0.5 rounded bg-[#F5A623]/10 text-[#F5A623]">
            {index + 1}
          </span>
          {sectionLabel}
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-1 text-gray-500 hover:text-white disabled:opacity-30"
          >
            <ChevronUp size={14} />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className="p-1 text-gray-500 hover:text-white disabled:opacity-30"
          >
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-gray-500 hover:text-red-400 ml-2"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-4 space-y-4">
          <InputField
            label="Section Type"
            name={`section-${index}-type`}
            value={section.type || ""}
            onChange={(v) => updateField("type", v)}
            required
          />

          {/* Hero sections */}
          {section.type === "hero" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Headline Lines (one per line)
                </label>
                <textarea
                  value={(section.headline || []).join("\n")}
                  onChange={(e) =>
                    updateField(
                      "headline",
                      e.target.value.split("\n")
                    )
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 resize-none text-sm"
                  placeholder="Line 1&#10;Line 2&#10;Line 3"
                />
              </div>
              <InputField
                label="Highlight Line Index (gold color, 0-based)"
                name={`section-${index}-highlight`}
                type="number"
                value={String(section.highlightIndex ?? "")}
                onChange={(v) =>
                  updateField("highlightIndex", v ? parseInt(v) : null)
                }
              />
              <TextareaField
                label="Subtext"
                name={`section-${index}-subtext`}
                value={section.subtext || ""}
                onChange={(v) => updateField("subtext", v)}
              />
              {section.cta && (
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="CTA Label"
                    name={`section-${index}-cta-label`}
                    value={section.cta?.label || ""}
                    onChange={(v) =>
                      updateField("cta", { ...section.cta, label: v })
                    }
                  />
                  <InputField
                    label="CTA Link"
                    name={`section-${index}-cta-href`}
                    value={section.cta?.href || ""}
                    onChange={(v) =>
                      updateField("cta", { ...section.cta, href: v })
                    }
                  />
                </div>
              )}
            </>
          )}

          {/* Scroll Highlight */}
          {section.type === "scroll-highlight" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Paragraphs (one per block, double newline to separate)
              </label>
              <textarea
                value={(section.paragraphs || []).join("\n\n")}
                onChange={(e) =>
                  updateField(
                    "paragraphs",
                    e.target.value
                      .split("\n\n")
                      .filter((p: string) => p.trim())
                  )
                }
                rows={8}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 resize-none text-sm"
              />
            </div>
          )}

          {/* Mentor / Stats */}
          {section.type === "mentor" && (
            <>
              <InputField
                label="Title"
                name={`section-${index}-title`}
                value={section.title || ""}
                onChange={(v) => updateField("title", v)}
              />
              <CardListEditor
                items={section.stats || []}
                onChange={(items) => updateField("stats", items)}
                label="Stats"
                fields={["number", "title", "description"]}
              />
            </>
          )}

          {/* What Sets Apart */}
          {section.type === "what-sets-apart" && (
            <>
              <InputField
                label="Heading"
                name={`section-${index}-heading`}
                value={section.heading || ""}
                onChange={(v) => updateField("heading", v)}
              />
              <TextareaField
                label="Description"
                name={`section-${index}-desc`}
                value={section.description || ""}
                onChange={(v) => updateField("description", v)}
              />
              <CardListEditor
                items={section.cards || []}
                onChange={(items) => updateField("cards", items)}
                label="Cards"
                fields={["title", "description"]}
              />
            </>
          )}

          {/* Core Values */}
          {section.type === "core-values" && (
            <>
              <InputField
                label="Label"
                name={`section-${index}-label`}
                value={section.label || ""}
                onChange={(v) => updateField("label", v)}
              />
              <InputField
                label="Heading"
                name={`section-${index}-heading`}
                value={section.heading || ""}
                onChange={(v) => updateField("heading", v)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Paragraphs (double newline to separate)
                </label>
                <textarea
                  value={(section.paragraphs || []).join("\n\n")}
                  onChange={(e) =>
                    updateField(
                      "paragraphs",
                      e.target.value
                        .split("\n\n")
                        .filter((p: string) => p.trim())
                    )
                  }
                  rows={8}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 resize-none text-sm"
                />
              </div>
            </>
          )}

          {/* Mission Vision */}
          {section.type === "mission-vision" && (
            <CardListEditor
              items={section.cards || []}
              onChange={(items) => updateField("cards", items)}
              label="Cards"
              fields={["title", "text"]}
            />
          )}

          {/* Contact Info */}
          {section.type === "contact-info" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">
                Contact Cards
              </label>
              {(section.cards || []).map(
                (card: Record<string, unknown>, ci: number) => (
                  <div
                    key={ci}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        Card {ci + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(section.cards || [])];
                          updated.splice(ci, 1);
                          updateField("cards", updated);
                        }}
                        className="p-1 text-gray-500 hover:text-red-400"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <input
                      value={(card.title as string) || ""}
                      onChange={(e) => {
                        const updated = [...(section.cards || [])];
                        updated[ci] = { ...updated[ci], title: e.target.value };
                        updateField("cards", updated);
                      }}
                      placeholder="Title"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                    />
                    <input
                      value={(card.india as string) || ""}
                      onChange={(e) => {
                        const updated = [...(section.cards || [])];
                        updated[ci] = { ...updated[ci], india: e.target.value };
                        updateField("cards", updated);
                      }}
                      placeholder="India Phone"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                    />
                    <input
                      value={(card.email as string) || ""}
                      onChange={(e) => {
                        const updated = [...(section.cards || [])];
                        updated[ci] = { ...updated[ci], email: e.target.value };
                        updateField("cards", updated);
                      }}
                      placeholder="Email"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* Why Join */}
          {section.type === "why-join" && (
            <>
              <InputField
                label="Label"
                name={`section-${index}-label`}
                value={section.label || ""}
                onChange={(v) => updateField("label", v)}
              />
              <InputField
                label="Title"
                name={`section-${index}-title`}
                value={section.title || ""}
                onChange={(v) => updateField("title", v)}
              />
              <CardListEditor
                items={section.cards || []}
                onChange={(items) => updateField("cards", items)}
                label="Cards"
                fields={["title", "description"]}
              />
            </>
          )}

          {/* Departments */}
          {section.type === "departments" && (
            <>
              <InputField
                label="Label"
                name={`section-${index}-label`}
                value={section.label || ""}
                onChange={(v) => updateField("label", v)}
              />
              <InputField
                label="Title"
                name={`section-${index}-title`}
                value={section.title || ""}
                onChange={(v) => updateField("title", v)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Departments (comma-separated)
                </label>
                <input
                  value={(section.departments || []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      "departments",
                      e.target.value.split(",").map((d: string) => d.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 text-sm"
                  placeholder="Telecom, IT, IoT, Fleet"
                />
              </div>
            </>
          )}

          {/* Discover Services */}
          {section.type === "discover-services" && (
            <>
              <InputField
                label="Label"
                name={`section-${index}-label`}
                value={section.label || ""}
                onChange={(v) => updateField("label", v)}
              />
              <InputField
                label="Heading (use \n for line break)"
                name={`section-${index}-heading`}
                value={section.heading || ""}
                onChange={(v) => updateField("heading", v)}
              />
              <TextareaField
                label="Subtext"
                name={`section-${index}-subtext`}
                value={section.subtext || ""}
                onChange={(v) => updateField("subtext", v)}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="CTA Label"
                  name={`section-${index}-cta-label`}
                  value={section.ctaLabel || ""}
                  onChange={(v) => updateField("ctaLabel", v)}
                />
                <InputField
                  label="CTA Link"
                  name={`section-${index}-cta-href`}
                  value={section.ctaHref || ""}
                  onChange={(v) => updateField("ctaHref", v)}
                />
              </div>

              {/* Service Cards */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Service Cards
                </label>
                {(section.cards || []).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (card: any, ci: number) => (
                    <div
                      key={ci}
                      className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 flex items-center gap-2">
                          Card {ci + 1}
                          {card.color && (
                            <span
                              className="inline-block w-3 h-3 rounded-full"
                              style={{ background: card.color }}
                            />
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(section.cards || [])];
                            updated.splice(ci, 1);
                            updateField("cards", updated);
                          }}
                          className="p-1 text-gray-500 hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <input
                        value={card.title || ""}
                        onChange={(e) => {
                          const updated = [...(section.cards || [])];
                          updated[ci] = { ...updated[ci], title: e.target.value };
                          updateField("cards", updated);
                        }}
                        placeholder="Title (e.g., FLEET MANAGEMENT SOLUTIONS)"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                      />
                      <textarea
                        value={card.description || ""}
                        onChange={(e) => {
                          const updated = [...(section.cards || [])];
                          updated[ci] = { ...updated[ci], description: e.target.value };
                          updateField("cards", updated);
                        }}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50 resize-none"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          value={card.icon || ""}
                          onChange={(e) => {
                            const updated = [...(section.cards || [])];
                            updated[ci] = { ...updated[ci], icon: e.target.value };
                            updateField("cards", updated);
                          }}
                          placeholder="Icon (e.g., Truck)"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                        />
                        <input
                          value={card.color || ""}
                          onChange={(e) => {
                            const updated = [...(section.cards || [])];
                            updated[ci] = { ...updated[ci], color: e.target.value };
                            updateField("cards", updated);
                          }}
                          placeholder="Color (#F59E0B)"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                        />
                        <input
                          value={card.link || ""}
                          onChange={(e) => {
                            const updated = [...(section.cards || [])];
                            updated[ci] = { ...updated[ci], link: e.target.value };
                            updateField("cards", updated);
                          }}
                          placeholder="Link (/services/...)"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={card.isNew || false}
                            onChange={(e) => {
                              const updated = [...(section.cards || [])];
                              updated[ci] = { ...updated[ci], isNew: e.target.checked };
                              updateField("cards", updated);
                            }}
                            className="rounded border-white/20"
                          />
                          Show &quot;NEW&quot; badge
                        </label>
                      </div>
                      <textarea
                        value={(card.bulletPoints || []).join("\n")}
                        onChange={(e) => {
                          const updated = [...(section.cards || [])];
                          updated[ci] = {
                            ...updated[ci],
                            bulletPoints: e.target.value
                              .split("\n")
                              .filter((l: string) => l.trim()),
                          };
                          updateField("cards", updated);
                        }}
                        placeholder="Bullet points (one per line)"
                        rows={5}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50 resize-none"
                      />
                    </div>
                  )
                )}
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(section.cards || [])];
                    updated.push({
                      title: "",
                      description: "",
                      icon: "Monitor",
                      color: "#6B7280",
                      link: "/services/",
                      isNew: false,
                      bulletPoints: [],
                    });
                    updateField("cards", updated);
                  }}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#F5A623] transition-colors"
                >
                  <Plus size={14} /> Add Service Card
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function CardListEditor({
  items,
  onChange,
  label,
  fields,
}: {
  items: Record<string, string>[];
  onChange: (items: Record<string, string>[]) => void;
  label: string;
  fields: string[];
}) {
  const add = () => {
    const empty: Record<string, string> = {};
    fields.forEach((f) => (empty[f] = ""));
    onChange([...items, empty]);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, field: string, value: string) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex gap-3 items-start p-3 bg-white/[0.02] border border-white/5 rounded-lg"
        >
          <div className="flex-1 space-y-2">
            {fields.map((field) => (
              <input
                key={field}
                value={item[field] || ""}
                onChange={(e) => update(i, field, e.target.value)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-1 text-gray-500 hover:text-red-400"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#F5A623] transition-colors"
      >
        <Plus size={14} /> Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
}

export default function EditPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalSlug, setOriginalSlug] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);
  const [seo, setSeo] = useState<SeoData>(getDefaultSeoData());

  useEffect(() => {
    fetch("/api/pages", { cache: "no-store" })
      .then((r) => r.json())
      .then((pages: Record<string, unknown>[]) => {
        const page = pages.find((p) => p.id === id);
        if (!page) {
          router.push("/admin/pages");
          return;
        }
        setOriginalSlug(page.slug as string);
        setTitle(page.title as string);
        setSlug(page.slug as string);
        setPublished(page.published as boolean);
        const loadedSections = Array.isArray(page.sections) ? (page.sections as Section[]) : [];
        console.log("[ADMIN DEBUG] Page slug:", page.slug, "| Sections count:", loadedSections.length, "| Types:", loadedSections.map((s: Section) => s.type));
        setSections(loadedSections);
        setSeo({
          metaTitle: (page.metaTitle as string) || "",
          metaDescription: (page.metaDescription as string) || "",
          ogImage: (page.ogImage as string) || "",
          ogTitle: (page.ogTitle as string) || "",
          ogDescription: (page.ogDescription as string) || "",
          canonicalUrl: (page.canonicalUrl as string) || "",
          noIndex: (page.noIndex as boolean) || false,
        });
        setLoading(false);
      });
  }, [id, router]);

  const updateSection = (index: number, updated: Section) => {
    const newSections = [...sections];
    newSections[index] = updated;
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ];
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { type: "hero", headline: [], subtext: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/pages/${originalSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, slug, published, sections, ...seo }),
    });
    if (res.ok) {
      toast("Page updated", "success");
      router.push("/admin/pages");
    } else {
      toast("Failed to update", "error");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <>
        <AdminHeader title="Edit Page" />
        <main className="p-6">
          <p className="text-gray-400">Loading...</p>
        </main>
      </>
    );

  return (
    <>
      <AdminHeader title={`Edit Page: ${title}`} />
      <main className="p-6">
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Pages
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <FormSection title="Basic Information">
            <InputField
              label="Title"
              name="title"
              value={title}
              onChange={setTitle}
              required
            />
            <InputField
              label="Slug"
              name="slug"
              value={slug}
              onChange={setSlug}
              required
            />
            <ToggleField
              label="Published"
              name="published"
              checked={published}
              onChange={setPublished}
            />
          </FormSection>

          <FormSection title="Page Sections">
            <div className="space-y-4">
              {sections.map((section, i) => (
                <SectionEditor
                  key={i}
                  section={section}
                  index={i}
                  onChange={(updated) => updateSection(i, updated)}
                  onRemove={() => removeSection(i)}
                  onMoveUp={() => moveSection(i, -1)}
                  onMoveDown={() => moveSection(i, 1)}
                  isFirst={i === 0}
                  isLast={i === sections.length - 1}
                />
              ))}
              <button
                type="button"
                onClick={addSection}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-[#F5A623] border border-dashed border-white/10 hover:border-[#F5A623]/30 rounded-lg transition-colors w-full justify-center"
              >
                <Plus size={16} /> Add Section
              </button>
            </div>
          </FormSection>

          <SeoFields data={seo} onChange={setSeo} />

          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin/pages"
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
              {saving ? "Saving..." : "Update Page"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
