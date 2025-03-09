import { Suspense } from 'react';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import { supabase } from '../lib/supabase';
import { Note } from '../types';

// メモ一覧を取得する関数
async function getNotes(): Promise<{ notes: Note[], tableExists: boolean }> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    // テーブルが存在しないエラーの場合
    if (error.code === '42P01') {
      return { notes: [], tableExists: false };
    }
    return { notes: [], tableExists: true };
  }

  return { notes: data || [], tableExists: true };
}

// ローディング表示用コンポーネント
function NotesLoading() {
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">読み込み中...</p>
    </div>
  );
}

// メモ一覧コンポーネント
async function Notes() {
  const { notes, tableExists } = await getNotes();
  
  if (!tableExists) {
    return (
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
  }
  
  return <NoteList notes={notes} />;
}

export default function Home() {
  return (
    <div>
      <Header />
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">メモ一覧</h1>
        
        <Suspense fallback={<NotesLoading />}>
          <Notes />
        </Suspense>
      </main>
    </div>
  );
}
