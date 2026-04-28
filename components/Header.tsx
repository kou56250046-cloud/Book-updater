"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 20], ["0 0 0 0 rgba(0,0,0,0)", "0 1px 8px 0 rgba(0,0,0,0.08)"]);

  return (
    <motion.header
      style={{ boxShadow: shadow }}
      className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <motion.span
            className="text-2xl inline-block"
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          >
            📚
          </motion.span>
          <span className="font-bold text-lg tracking-tight">Book Updater</span>
        </a>
        <span className="text-xs text-gray-400 ml-1">書籍の最新解釈ナレッジベース</span>
      </div>
    </motion.header>
  );
}
