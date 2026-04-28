# Book Updater 使用ガイド

複数のOCR済みPDFを参照して、1冊の書籍の内容・理論を最新解釈にアップデートしたMarkdown記事を生成・公開するシステムです。

---

## システム構成

```
Book-updater/
├── pdfs/          ← OCR済みPDFをここに置く（GitHubには上がらない）
├── content/       ← 生成したMarkdown記事（GitHubで管理）
│   ├── marketing/
│   ├── tech/
│   ├── business/
│   └── science/
└── ...
```

**公開URL：** https://book-updater.vercel.app  
**GitHub：** https://github.com/kou56250046-cloud/Book-updater

---

## 基本的な使い方

### Step 1 — PDFを置く

OCR済みPDFを `/pdfs/` フォルダに置きます。

```
pdfs/
├── influence.pdf          ← ベース書籍（アップデートしたい本）
├── hooked.pdf             ← 参照書籍①
└── predictably-irrational.pdf  ← 参照書籍②
```

> **注意：** `/pdfs/` 内のPDFはGitHubにコミットされません（`.gitignore`で除外済み）。ローカル環境にのみ保存されます。

---

### Step 2 — Claude Code（このチャット）に指示する

このチャット（Claude Code）に以下のように指示します。

#### 基本的な指示例

```
pdfs/influence.pdf をベースに、pdfs/hooked.pdf と pdfs/predictably-irrational.pdf
を参照して、marketing カテゴリで influence-updated という名前で記事を生成してください。
```

#### 指定できる情報

| 項目 | 説明 | 例 |
|------|------|----|
| ベース書籍 | アップデートしたい書籍のPDFパス | `pdfs/influence.pdf` |
| 参照書籍 | 知見を取り込む書籍（複数可） | `pdfs/hooked.pdf` |
| カテゴリ | 記事の分類 | `marketing` / `tech` / `business` / `science` |
| スラッグ | URLとファイル名になる英数字 | `influence-updated` |

---

### Step 3 — 記事が生成される

Claudeが以下の形式でMarkdownファイルを生成・保存します。

```
content/marketing/influence-updated.md
```

生成される記事の構成：

```markdown
---
title: "影響力の武器 — 行動経済学・デジタル時代の最新解釈"
category: "marketing"
base_book: "影響力の武器（チャルディーニ）"
reference_books:
  - "Hooked（ニール・イヤール）"
  - "予測どおりに不合理（アリエリー）"
updated_at: "2026-04-28"
---

## 元の理論
...

## 最新解釈
...

## 参照書籍からの補足
...
```

---

### Step 4 — GitHubにプッシュして公開

```bash
git add content/
git commit -m "〇〇の最新解釈を追加"
git push
```

Vercelが自動でビルドし、数分で https://book-updater.vercel.app に反映されます。

---

## カテゴリ一覧

| フォルダ名 | 表示名 | 用途 |
|-----------|--------|------|
| `marketing` | マーケティング | マーケ・行動経済学・消費者心理 |
| `tech` | 技術書 | プログラミング・設計・アーキテクチャ |
| `business` | ビジネス書 | 経営・戦略・組織・リーダーシップ |
| `science` | 科学・心理 | 認知科学・神経科学・社会科学 |
| `other` | その他 | 上記に当てはまらないもの |

新しいカテゴリを追加したい場合は、`content/` 配下に新しいフォルダを作るだけで自動認識されます。

---

## 指示のコツ

### 章を絞って指示する

書籍全体ではなく特定の章だけを対象にすると精度が上がります。

```
pdfs/clean-code.pdf の第3章〜第5章（関数・コメント・書式）を対象に、
pdfs/philosophy-of-software-design.pdf の知見でアップデートして。
カテゴリは tech、スラッグは clean-code-functions-updated で。
```

### 観点を指定する

どの視点でアップデートするかを指定するとより有用な記事になります。

```
pdfs/influence.pdf を、デジタルプロダクト設計の観点から
pdfs/hooked.pdf と pdfs/nir-eyal-indistractable.pdf を使ってアップデートして。
```

### 複数記事をまとめて依頼する

```
pdfs/the-lean-startup.pdf の以下の概念を1記事ずつ生成して：
- MVPの考え方（参照：pdfs/zero-to-one.pdf）
- ピボット判断（参照：pdfs/good-strategy-bad-strategy.pdf）
カテゴリはすべて business で。
```

---

## 記事を手動で編集する

生成された記事は通常のMarkdownファイルなので、VSCodeなどで直接編集できます。

```
content/marketing/influence-updated.md
```

編集後は `git add / commit / push` で公開されます。

---

## トラブルシューティング

### サイトに記事が表示されない

1. `content/` 配下の正しいカテゴリフォルダに `.md` ファイルがあるか確認
2. ファイルの先頭にfrontmatter（`---`で囲まれた部分）が正しく書かれているか確認
3. `git push` が完了しているか確認（Vercelのデプロイには1〜2分かかる）

### PDFが読み込めない

- PDFが `pdfs/` フォルダに置かれているか確認
- PDFがOCR処理済み（テキスト抽出可能な状態）であるか確認
- ファイル名にスペースや日本語が含まれている場合はリネームを推奨

### カテゴリタブが表示されない

`content/` 配下に少なくとも1つの `.md` ファイルがあればタブが表示されます。空のフォルダのみの場合は表示されません。
