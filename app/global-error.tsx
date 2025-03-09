'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="ja">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              アプリケーションエラー
            </h2>
            <p className="text-gray-700 mb-6">
              申し訳ありませんが、アプリケーションでエラーが発生しました。
            </p>
            <button
              onClick={reset}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
            >
              再読み込み
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
