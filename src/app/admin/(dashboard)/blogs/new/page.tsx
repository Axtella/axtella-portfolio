"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, TextareaField, SelectField, ToggleField, FormSection } from "@/components/admin/form-field";
import { ImageField } from "@/components/admin/image-field";
import { SeoFields, getDefaultSeoData } from "@/components/admin/seo-fields";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
}

export default function NewBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    description: "",
    content: [{ heading: "", text: "" }],
    image: "",
    featuredImage: "",
    imageAlt: "",
    categoryId: "",
    tags: "",
    authorId: "",
    readTime: "",
    featured: false,
    published: false,
  });

  const [seo, setSeo] = useState(getDefaultSeoData());

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
    fetch("/api/authors").then((r) => r.json()).then(setAuthors);
  }, []);

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Auto-generate slug from title
    if (field === "title") {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const updateContent = (index: number, field: string, value: string) => {
    const newContent = [...formData.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const addContentSection = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, { heading: "", text: "" }],
    }));
  };

  const removeContentSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        ...seo,
      }),
    });

    if (res.ok) {
      toast("Blog post created", "success");
      router.push("/admin/blogs");
    } else {
      toast("Failed to create blog post", "error");
    }
    setSaving(false);
  };

  return (
    <>
      <AdminHeader title="New Blog Post" />
      <main className="p-6">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <FormSection title="Basic Information">
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={(v) => update("title", v)}
              required
            />
            <InputField
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={(v) => update("slug", v)}
              required
              hint="URL-friendly identifier"
            />
            <TextareaField
              label="Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={(v) => update("excerpt", v)}
              placeholder="Short summary for blog cards"
              rows={2}
            />
            <TextareaField
              label="Description"
              name="description"
              value={formData.description}
              onChange={(v) => update("description", v)}
              placeholder="Longer description"
              rows={3}
            />
          </FormSection>

          <FormSection title="Content Sections">
            {formData.content.map((section, index) => (
              <div
                key={index}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Section {index + 1}
                  </span>
                  {formData.content.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContentSection(index)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <InputField
                  label="Heading"
                  name={`heading-${index}`}
                  value={section.heading}
                  onChange={(v) => updateContent(index, "heading", v)}
                  placeholder="Section heading (optional)"
                />
                <TextareaField
                  label="Text"
                  name={`text-${index}`}
                  value={section.text}
                  onChange={(v) => updateContent(index, "text", v)}
                  placeholder="Section content..."
                  rows={6}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addContentSection}
              className="w-full py-2 border border-dashed border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
            >
              + Add Content Section
            </button>
          </FormSection>

          <FormSection title="Media">
            <ImageField
              label="Thumbnail Image"
              value={formData.image}
              onChange={(v) => update("image", v)}
            />
            <ImageField
              label="Featured Image"
              value={formData.featuredImage}
              onChange={(v) => update("featuredImage", v)}
            />
            <InputField
              label="Image Alt Text"
              name="imageAlt"
              value={formData.imageAlt}
              onChange={(v) => update("imageAlt", v)}
            />
          </FormSection>

          <FormSection title="Categorization">
            <SelectField
              label="Category"
              name="categoryId"
              value={formData.categoryId}
              onChange={(v) => update("categoryId", v)}
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />
            <SelectField
              label="Author"
              name="authorId"
              value={formData.authorId}
              onChange={(v) => update("authorId", v)}
              options={authors.map((a) => ({ label: a.name, value: a.id }))}
            />
            <InputField
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={(v) => update("tags", v)}
              placeholder="tag1, tag2, tag3"
              hint="Comma-separated"
            />
            <InputField
              label="Read Time"
              name="readTime"
              value={formData.readTime}
              onChange={(v) => update("readTime", v)}
              placeholder="5 min read"
            />
          </FormSection>

          <FormSection title="Publishing">
            <ToggleField
              label="Published"
              name="published"
              checked={formData.published}
              onChange={(v) => update("published", v)}
              hint="Make this post visible on the website"
            />
            <ToggleField
              label="Featured"
              name="featured"
              checked={formData.featured}
              onChange={(v) => update("featured", v)}
              hint="Show in the featured section on the home page"
            />
          </FormSection>

          <SeoFields data={seo} onChange={setSeo} />

          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin/blogs"
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
              {saving ? "Saving..." : "Create Post"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
