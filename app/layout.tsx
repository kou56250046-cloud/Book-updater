import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Book Updater",
  description: "複数の書籍を参照して、1冊の内容を最新解釈にアップデートするナレッジベース",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl">📚</span>
              <span className="font-bold text-lg tracking-tight">Book Updater</span>
            </a>
            <span className="text-xs text-gray-400 ml-1">書籍の最新解釈ナレッジベース</span>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
        <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-gray-400 border-t border-gray-200">
          Book Updater — Claude Code で生成したナレッジベース
        </footer>
      </body>
    </html>
  );
}
