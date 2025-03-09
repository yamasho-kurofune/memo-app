'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
        <h2 className="text-lg font-semibold mb-2">エラーが発生しました</h2>
        <p className="mb-4">{error.message || 'エラーが発生しました。もう一度お試しください。'}</p>
        <div className="flex space-x-4">
          <button
            onClick={reset}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-medium"
          >
            再試行
          </button>
          <Link href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium inline-block">
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
