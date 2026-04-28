"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORY_LABELS } from "@/lib/constants";

interface Props {
  categories: string[];
  activeCategory: string | null;
}

export default function CategoryTabs({ categories, activeCategory }: Props) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        すべて
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/?category=${cat}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {CATEGORY_LABELS[cat] ?? cat}
        </Link>
      ))}
    </div>
  );
}
