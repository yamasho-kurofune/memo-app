import Link from 'next/link';

export default function NoteLoading() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-white mr-4">
            ← 戻る
          </Link>
          <h1 className="text-xl font-bold">読み込み中...</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-2xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="flex space-x-2">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
