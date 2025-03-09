import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'メモ編集 - メモアプリ',
  description: 'メモの編集ページ',
};

export default function NoteLayout({
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
