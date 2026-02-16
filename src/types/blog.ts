export interface BlogAuthor {
  name: string;
  role?: string | null;
  avatar?: string | null;
}

export interface BlogContentSection {
  heading?: string;
  text: string;
  image?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  // Basic Info
  id: string;
  slug: string;

  // Content
  title: string;
  description?: string | null;
  excerpt?: string | null;
  content?: BlogContentSection[];

  // Media
  image?: string | null;
  featuredImage?: string | null;
  imageAlt?: string | null;

  // Metadata
  category?: BlogCategory | null;
  tags: string[];
  author?: BlogAuthor | null;
  publishedAt?: string | Date | null;
  readTime?: string | null;

  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;

  // Status
  featured?: boolean;
  published?: boolean;
}
