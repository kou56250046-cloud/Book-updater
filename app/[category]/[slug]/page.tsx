import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle, getAllCategories, getArticlesByCategory } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/constants";
import Link from "next/link";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.flatMap((category) =>
    getArticlesByCategory(category).map((article) => ({
      category,
      slug: article.slug,
    }))
  );
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);

  if (!article) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href={`/?category=${category}`}
          className="text-sm text-indigo-600 hover:underline mb-4 inline-block"
        >
          ← {CATEGORY_LABELS[category] ?? category}
        </Link>
        <h1 className="text-3xl font-bold leading-tight mb-4">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
          <span>
            <span className="font-medium text-gray-700">ベース書籍：</span>
            {article.base_book}
          </span>
          <span>
            <span className="font-medium text-gray-700">更新日：</span>
            {article.updated_at}
          </span>
        </div>
        {article.reference_books.length > 0 && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm">
            <p className="font-medium text-indigo-800 mb-2">参照書籍</p>
            <ul className="list-disc list-inside text-indigo-700 space-y-1">
              {article.reference_books.map((book) => (
                <li key={book}>{book}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <article className="prose prose-gray max-w-none">
        <MDXRemote source={article.content} />
      </article>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
          ← 一覧に戻る
        </Link>
      </div>
    </div>
  );
}
