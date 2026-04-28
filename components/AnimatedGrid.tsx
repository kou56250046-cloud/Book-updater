"use client";

import { motion } from "framer-motion";
import type { ArticleMeta } from "@/lib/content";
import ArticleCard from "./ArticleCard";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

interface Props {
  articles: ArticleMeta[];
}

export default function AnimatedGrid({ articles }: Props) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {articles.map((article) => (
        <motion.div key={`${article.category}/${article.slug}`} variants={item}>
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </motion.div>
  );
}
