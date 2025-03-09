import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { NoteForm } from '../../../components/NoteForm';
import { supabase } from '../../../lib/supabase';
import { Note } from '../../../types';

type Props = {
  params: {
    id: string;
  };
};

export default async function NotePage({ params }: Props) {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !data) {
      return notFound();
    }

    const note = data as Note;

    return (
      <main className="container mx-auto p-4 max-w-2xl">
        <header className="mb-6">
          <h1 className="text-xl font-bold">メモを編集</h1>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <NoteForm note={note} isEditing={true} />
        </Suspense>
      </main>
    );
  } catch (err) {
    console.error('Error fetching note:', err);
    return notFound();
  }
}
