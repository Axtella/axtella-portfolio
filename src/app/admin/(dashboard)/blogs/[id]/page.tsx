"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { InputField, TextareaField, SelectField, ToggleField, FormSection } from "@/components/admin/form-field";
import { SeoFields, getDefaultSeoData, type SeoData } from "@/components/admin/seo-fields";
import { useToast } from "@/components/admin/toast";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Category { id: string; name: string; slug: string }
interface Author { id: string; name: string }

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [originalSlug, setOriginalSlug] = useState("");

  const [formData, setFormData] = useState({
    title: "", slug: "", excerpt: "", description: "",
    content: [{ heading: "", text: "" }],
    image: "", featuredImage: "", imageAlt: "",
    categoryId: "", tags: "", authorId: "", readTime: "",
    featured: false, published: false,
  });

  const [seo, setSeo] = useState<SeoData>(getDefaultSeoData());

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
    fetch("/api/authors").then((r) => r.json()).then(setAuthors);
  }, []);

  useEffect(() => {
    // Load blog by fetching all and finding by id
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((blogs: Record<string, unknown>[]) => {
        const blog = blogs.find((b) => b.id === id) as Record<string, unknown> | undefined;
        if (!blog) { router.push("/admin/blogs"); return; }
        setOriginalSlug(blog.slug as string);
        setFormData({
          title: blog.title as string, slug: blog.slug as string,
          excerpt: (blog.excerpt as string) || "", description: (blog.description as string) || "",
          content: (blog.content as { heading: string; text: string }[]) || [{ heading: "", text: "" }],
          image: (blog.image as string) || "", featuredImage: (blog.featuredImage as string) || "",
          imageAlt: (blog.imageAlt as string) || "",
          categoryId: (blog.categoryId as string) || "",
          tags: (blog.tags as string[])?.join(", ") || "",
          authorId: (blog.authorId as string) || "",
          readTime: (blog.readTime as string) || "",
          featured: blog.featured as boolean,
          published: blog.published as boolean,
        });
        setSeo({
          metaTitle: (blog.metaTitle as string) || "", metaDescription: (blog.metaDescription as string) || "",
          ogImage: (blog.ogImage as string) || "", ogTitle: (blog.ogTitle as string) || "",
          ogDescription: (blog.ogDescription as string) || "", canonicalUrl: (blog.canonicalUrl as string) || "",
          noIndex: blog.noIndex as boolean || false,
        });
        setLoading(false);
      });
  }, [id, router]);

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateContent = (index: number, field: string, value: string) => {
    const newContent = [...formData.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setFormData((prev) => ({ ...prev, content: newContent }));
  };

  const addContentSection = () => {
    setFormData((prev) => ({ ...prev, content: [...prev.content, { heading: "", text: "" }] }));
  };

  const removeContentSection = (index: number) => {
    setFormData((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/blogs/${originalSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        ...seo,
      }),
    });
    if (res.ok) {
      toast("Blog post updated", "success");
      router.push("/admin/blogs");
    } else {
      toast("Failed to update", "error");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <>
        <AdminHeader title="Edit Blog Post" />
        <main className="p-6">
          <p className="text-gray-400">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Edit Blog Post" />
      <main className="p-6">
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          <FormSection title="Basic Information">
            <InputField label="Title" name="title" value={formData.title} onChange={(v) => update("title", v)} required />
            <InputField label="Slug" name="slug" value={formData.slug} onChange={(v) => update("slug", v)} required />
            <TextareaField label="Excerpt" name="excerpt" value={formData.excerpt} onChange={(v) => update("excerpt", v)} rows={2} />
            <TextareaField label="Description" name="description" value={formData.description} onChange={(v) => update("description", v)} rows={3} />
          </FormSection>

          <FormSection title="Content Sections">
            {formData.content.map((section, index) => (
              <div key={index} className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Section {index + 1}</span>
                  {formData.content.length > 1 && (
                    <button type="button" onClick={() => removeContentSection(index)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
                  )}
                </div>
                <InputField label="Heading" name={`heading-${index}`} value={section.heading} onChange={(v) => updateContent(index, "heading", v)} />
                <TextareaField label="Text" name={`text-${index}`} value={section.text} onChange={(v) => updateContent(index, "text", v)} rows={6} />
              </div>
            ))}
            <button type="button" onClick={addContentSection} className="w-full py-2 border border-dashed border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors">
              + Add Content Section
            </button>
          </FormSection>

          <FormSection title="Media">
            <InputField label="Thumbnail Image" name="image" value={formData.image} onChange={(v) => update("image", v)} />
            <InputField label="Featured Image" name="featuredImage" value={formData.featuredImage} onChange={(v) => update("featuredImage", v)} />
            <InputField label="Image Alt Text" name="imageAlt" value={formData.imageAlt} onChange={(v) => update("imageAlt", v)} />
          </FormSection>

          <FormSection title="Categorization">
            <SelectField label="Category" name="categoryId" value={formData.categoryId} onChange={(v) => update("categoryId", v)} options={categories.map((c) => ({ label: c.name, value: c.id }))} />
            <SelectField label="Author" name="authorId" value={formData.authorId} onChange={(v) => update("authorId", v)} options={authors.map((a) => ({ label: a.name, value: a.id }))} />
            <InputField label="Tags" name="tags" value={formData.tags} onChange={(v) => update("tags", v)} hint="Comma-separated" />
            <InputField label="Read Time" name="readTime" value={formData.readTime} onChange={(v) => update("readTime", v)} />
          </FormSection>

          <FormSection title="Publishing">
            <ToggleField label="Published" name="published" checked={formData.published} onChange={(v) => update("published", v)} />
            <ToggleField label="Featured" name="featured" checked={formData.featured} onChange={(v) => update("featured", v)} />
          </FormSection>

          <SeoFields data={seo} onChange={setSeo} />

          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/blogs" className="px-4 py-2 text-sm text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">Cancel</Link>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50">
              <Save size={16} />{saving ? "Saving..." : "Update Post"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
