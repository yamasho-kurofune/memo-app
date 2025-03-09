import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新規メモ - メモアプリ',
  description: '新しいメモの作成ページ',
};

export default function NewNoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-white mr-4">
            ← 戻る
          </Link>
          <h1 className="text-xl font-bold">メモアプリ</h1>
        </div>
      </header>
      {children}
    </div>
  );
}
