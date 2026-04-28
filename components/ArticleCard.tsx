import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { CATEGORY_LABELS } from "@/lib/constants";

interface Props {
  article: ArticleMeta;
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
          {CATEGORY_LABELS[article.category] ?? article.category}
        </span>
        <span className="text-xs text-gray-400">{article.updated_at}</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
        {article.title}
      </h2>
      <p className="text-sm text-gray-500">
        <span className="font-medium">ベース：</span>
        {article.base_book}
      </p>
      {article.reference_books.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          参照：{article.reference_books.join("、")}
        </p>
      )}
    </Link>
  );
}
