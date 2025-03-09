'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Note } from '../types';
import NoteList from './NoteList';
import Header from './Header';

export default function ClientHome() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableExists, setTableExists] = useState(true);
  
  // ページがマウントされるたびにデータを再取得
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        // キャッシュ回避のためのタイムスタンプ
        const timestamp = new Date().getTime();
        
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error('Error fetching notes:', error);
          // テーブルが存在しないエラーの場合
          if (error.code === '42P01') {
            setTableExists(false);
          } else {
            throw error;
          }
        } else {
          console.log('取得したデータ:', data); // デバッグ用
          setNotes(data || []);
          setTableExists(true);
        }
      } catch (err) {
        console.error('データ取得エラー:', err);
        setError('メモの取得中にエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
    
    // 画面がフォーカスを取得したときにも再取得
    const handleFocus = () => {
      fetchNotes();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // 定期的にデータを更新
    const intervalId = setInterval(fetchNotes, 3000);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, []);

  // テーブルが存在しない場合のメッセージ
  const TableNotExistsMessage = () => (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Supabaseテーブルが見つかりません</h3>
      <p className="text-yellow-700 mb-4">
        Supabaseの「notes」テーブルが存在しないようです。Supabaseダッシュボードでテーブルを作成してください。
      </p>
      <div className="text-sm text-yellow-600">
        <p className="mb-1">必要なテーブル構造:</p>
        <ul className="list-disc list-inside ml-2">
          <li>id: UUID (主キー)</li>
          <li>title: text (必須)</li>
          <li>content: text</li>
          <li>created_at: timestamp with time zone</li>
          <li>updated_at: timestamp with time zone</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">メモ一覧</h1>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">読み込み中...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
        ) : !tableExists ? (
          <TableNotExistsMessage />
        ) : (
          <NoteList notes={notes} />
        )}
      </main>
    </div>
  );
}
