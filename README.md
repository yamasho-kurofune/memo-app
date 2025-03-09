# メモアプリ

Next.js、TypeScript、Tailwind CSS、Supabaseを使用したシンプルなメモアプリです。

## 機能

- メモの作成
- メモの閲覧
- メモの編集
- メモの削除
- メモの一覧表示

## 技術スタック

- **フロントエンド**: Next.js, TypeScript, Tailwind CSS
- **バックエンド**: Supabase (Database)
- **デプロイ**: Vercel

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <リポジトリURL>
cd memo-app
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の内容を追加します：

```
NEXT_PUBLIC_SUPABASE_URL=https://xiazceibxmohjokozjrk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpYXpjZWlieG1vaGpva296anJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1MjIyMTEsImV4cCI6MjA1NzA5ODIxMX0.CHExWLJ7Jt1OlKlrBnQkYuVm5Lezbv6vQsZkzB0ik90
```

### 4. Supabaseのセットアップ

1. [Supabaseダッシュボード](https://app.supabase.io/)にアクセスし、プロジェクトを開きます。
2. SQLエディタを開き、以下のSQLを実行してnotesテーブルを作成します：

```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で実行されます。

## プロジェクト構造

```
/
├── app/                  # Next.js App Router
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # ホームページ（メモ一覧）
│   ├── notes/            # メモ関連ページ
│   │   ├── [id]/         # メモ編集ページ
│   │   └── new/          # 新規メモ作成ページ
├── components/           # 共通コンポーネント
│   ├── Header.tsx        # ヘッダーコンポーネント
│   ├── NoteCard.tsx      # メモカードコンポーネント
│   ├── NoteForm.tsx      # メモフォームコンポーネント
│   └── NoteList.tsx      # メモリストコンポーネント
├── lib/                  # ユーティリティ
│   └── supabase.ts       # Supabaseクライアント
├── types/                # 型定義
│   └── index.ts          # 共通型定義
└── public/               # 静的ファイル
```

## デプロイ

このアプリケーションはVercelにデプロイできます：

1. [Vercel](https://vercel.com)にアクセスし、GitHubリポジトリを連携します。
2. 環境変数を設定します（NEXT_PUBLIC_SUPABASE_URLとNEXT_PUBLIC_SUPABASE_ANON_KEY）。
3. デプロイを実行します。

## 注意事項

- このアプリケーションはユーザー認証を実装していません。実際の運用では認証機能を追加することをお勧めします。
- Supabaseの「notes」テーブルが存在しない場合、アプリケーションはエラーメッセージを表示します。
