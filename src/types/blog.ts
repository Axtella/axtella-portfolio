export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogContentSection {
  heading?: string;
  text: string;
  image?: string;
}

export interface BlogPost {
  // Basic Info
  id: number;
  slug: string; // URL-friendly identifier (e.g., "advanced-excel-skills")

  // Content
  title: string;
  description: string;
  excerpt: string; // Short summary for cards
  content?: BlogContentSection[]; // Article body content sections

  // Media
  image: string;
  featuredImage?: string; // Large image for detail page
  imageAlt?: string;

  // Metadata
  category: "Data Analytics" | "Career" | "Technology" | "Productivity";
  tags: string[];
  author: BlogAuthor;
  publishedDate: string; // ISO format: "2024-01-15"
  readTime: string; // e.g., "8 min read"

  // SEO (for future detail page)
  metaTitle?: string;
  metaDescription?: string;

  // Status
  featured?: boolean;
  published?: boolean;
}
