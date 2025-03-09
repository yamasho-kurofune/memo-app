import Link from 'next/link';
import { notFound } from 'next/navigation';
import NoteForm from '../../../components/NoteForm';
import { supabase } from '../../../lib/supabase';
import { Note } from '../../../types';

// メモの詳細を取得する関数
async function getNote(id: string): Promise<Note | null> {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching note:', error);
    return null;
  }

  return data;
}

export default async function EditNote({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  if (!note) {
    notFound();
  }

  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-white mr-4">
            ← 戻る
          </Link>
          <h1 className="text-xl font-bold">メモを編集</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-2xl">
        <NoteForm note={note} isEditing={true} />
      </main>
    </div>
  );
}
