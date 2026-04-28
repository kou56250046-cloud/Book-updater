import { Suspense } from "react";
import { getAllCategories, getArticlesByCategory, getAllArticles } from "@/lib/content";
import CategoryTabs from "@/components/CategoryTabs";
import AnimatedGrid from "@/components/AnimatedGrid";
import FadeIn from "@/components/FadeIn";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;
  const categories = getAllCategories();
  const articles = category
    ? getArticlesByCategory(category)
    : getAllArticles();

  return (
    <div>
      <FadeIn className="mb-8">
        <h1 className="text-3xl font-bold mb-2">書籍ナレッジベース</h1>
        <p className="text-gray-500 text-sm">
          複数の書籍を参照し、1冊の理論・考え方を最新解釈にアップデートした記事集
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Suspense fallback={null}>
          <CategoryTabs categories={categories} activeCategory={category ?? null} />
        </Suspense>
      </FadeIn>

      {articles.length === 0 ? (
        <FadeIn delay={0.2} className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📄</p>
          <p className="text-lg font-medium mb-2">まだ記事がありません</p>
          <p className="text-sm">
            PDFを <code className="bg-gray-100 px-1 rounded">/pdfs/</code> に置き、
            このチャットで「〇〇をアップデートして」と指示してください
          </p>
        </FadeIn>
      ) : (
        <AnimatedGrid articles={articles} />
      )}
    </div>
  );
}
