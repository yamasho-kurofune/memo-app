'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type DataRefresherProps = {
  interval?: number; // ミリ秒単位の更新間隔（デフォルト: 5000ms）
};

export const DataRefresher = ({ interval = 5000 }: DataRefresherProps) => {
  const router = useRouter();

  useEffect(() => {
    // コンポーネントがマウントされたときにデータを更新
    router.refresh();

    // 定期的にデータを更新するためのインターバルを設定
    const intervalId = setInterval(() => {
      router.refresh();
    }, interval);

    // クリーンアップ関数
    return () => {
      clearInterval(intervalId);
    };
  }, [router, interval]);

  // このコンポーネントは何もレンダリングしない
  return null;
};

export default DataRefresher;
