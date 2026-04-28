"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORY_LABELS } from "@/lib/constants";

interface Props {
  categories: string[];
  activeCategory: string | null;
}

const tabs = (categories: string[]) => [
  { key: null, label: "すべて", href: "/" },
  ...categories.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat] ?? cat,
    href: `/?category=${cat}`,
  })),
];

export default function CategoryTabs({ categories, activeCategory }: Props) {
  const allTabs = tabs(categories);

  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-8">
      {allTabs.map((tab) => {
        const isActive = tab.key === activeCategory;
        return (
          <Link key={tab.href} href={tab.href} className="relative">
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 bg-gray-900 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ${
                isActive ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
