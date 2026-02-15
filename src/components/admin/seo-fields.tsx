"use client";

import { InputField, TextareaField, ToggleField, FormSection } from "./form-field";

interface SeoData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
}

interface SeoFieldsProps {
  data: SeoData;
  onChange: (data: SeoData) => void;
}

export function SeoFields({ data, onChange }: SeoFieldsProps) {
  const update = (field: keyof SeoData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <FormSection
      title="SEO Settings"
      description="Configure search engine optimization for this page"
    >
      <InputField
        label="Meta Title"
        name="metaTitle"
        value={data.metaTitle}
        onChange={(v) => update("metaTitle", v)}
        placeholder="Page title for search engines"
        hint={`${data.metaTitle.length}/60 characters recommended`}
      />
      <TextareaField
        label="Meta Description"
        name="metaDescription"
        value={data.metaDescription}
        onChange={(v) => update("metaDescription", v)}
        placeholder="Brief description for search results"
        rows={3}
        hint={`${data.metaDescription.length}/160 characters recommended`}
      />
      <InputField
        label="OG Image URL"
        name="ogImage"
        value={data.ogImage}
        onChange={(v) => update("ogImage", v)}
        placeholder="/images/og-default.jpg"
      />
      <InputField
        label="OG Title"
        name="ogTitle"
        value={data.ogTitle}
        onChange={(v) => update("ogTitle", v)}
        placeholder="Title for social media sharing"
      />
      <TextareaField
        label="OG Description"
        name="ogDescription"
        value={data.ogDescription}
        onChange={(v) => update("ogDescription", v)}
        placeholder="Description for social media sharing"
        rows={2}
      />
      <InputField
        label="Canonical URL"
        name="canonicalUrl"
        value={data.canonicalUrl}
        onChange={(v) => update("canonicalUrl", v)}
        placeholder="https://axtella.com/page"
      />
      <ToggleField
        label="No Index"
        name="noIndex"
        checked={data.noIndex}
        onChange={(v) => update("noIndex", v)}
        hint="Prevent search engines from indexing this page"
      />
    </FormSection>
  );
}

export function getDefaultSeoData(): SeoData {
  return {
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
    ogTitle: "",
    ogDescription: "",
    canonicalUrl: "",
    noIndex: false,
  };
}

export type { SeoData };
