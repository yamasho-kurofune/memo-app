import Link from 'next/link';

export default function NoteNotFound() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
        メモが見つかりませんでした
      </div>
      <Link href="/" className="text-blue-600 hover:underline">
        ← メモ一覧に戻る
      </Link>
    </div>
  );
}
