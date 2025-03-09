'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from '../types';
import { supabase } from '../lib/supabase';

type NoteFormProps = {
  note?: Note;
  isEditing?: boolean;
};

export const NoteForm = ({ note, isEditing = false }: NoteFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!title.trim()) {
      setError('タイトルを入力してください');
      setIsLoading(false);
      return;
    }

    try {
      if (isEditing && note) {
        // 更新
        const { error } = await supabase
          .from('notes')
          .update({ title, content, updated_at: new Date().toISOString() })
          .eq('id', note.id);

        if (error) {
          // テーブルが存在しないエラーの場合
          if (error.code === '42P01') {
            setError('Supabaseの「notes」テーブルが存在しません。Supabaseダッシュボードでテーブルを作成してください。');
            return;
          }
          throw error;
        }
      } else {
        // 新規作成
        const { error } = await supabase
          .from('notes')
          .insert({ title, content });

        if (error) {
          // テーブルが存在しないエラーの場合
          if (error.code === '42P01') {
            setError('Supabaseの「notes」テーブルが存在しません。Supabaseダッシュボードでテーブルを作成してください。');
            return;
          }
          throw error;
        }
      }

      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '保存中にエラーが発生しました';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note || !window.confirm('このメモを削除しますか？')) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', note.id);

      if (error) {
        // テーブルが存在しないエラーの場合
        if (error.code === '42P01') {
          setError('Supabaseの「notes」テーブルが存在しません。Supabaseダッシュボードでテーブルを作成してください。');
          return;
        }
        throw error;
      }
      router.push('/');
      router.refresh();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '削除中にエラーが発生しました';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
          placeholder="タイトルを入力"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-1 font-medium">
          内容
        </label>
        <textarea
          id="content"
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 min-h-[200px]"
          placeholder="メモの内容を入力"
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '保存中...' : '保存'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium"
        >
          キャンセル
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-medium ml-auto"
            disabled={isLoading}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};

// 後方互換性のために残しておく
export default NoteForm;
