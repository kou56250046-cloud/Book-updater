import fs from "fs";
import path from "path";
import matter from "gray-matter";
export { CATEGORY_LABELS } from "./constants";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleMeta {
  slug: string;
  category: string;
  title: string;
  base_book: string;
  reference_books: string[];
  updated_at: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getAllCategories(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  const categoryDir = path.join(contentDir, category);
  if (!fs.existsSync(categoryDir)) return [];

  return fs
    .readdirSync(categoryDir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(categoryDir, filename);
      const { data } = matter(fs.readFileSync(filePath, "utf8"));
      return {
        slug,
        category,
        title: data.title ?? slug,
        base_book: data.base_book ?? "",
        reference_books: data.reference_books ?? [],
        updated_at: data.updated_at ?? "",
      };
    })
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}

export function getAllArticles(): ArticleMeta[] {
  const categories = getAllCategories();
  return categories.flatMap((cat) => getArticlesByCategory(cat));
}

export function getArticle(category: string, slug: string): Article | null {
  const filePath = path.join(contentDir, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    slug,
    category,
    title: data.title ?? slug,
    base_book: data.base_book ?? "",
    reference_books: data.reference_books ?? [],
    updated_at: data.updated_at ?? "",
    content,
  };
}

