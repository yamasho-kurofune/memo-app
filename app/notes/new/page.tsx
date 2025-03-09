import { NoteForm } from '../../../components/NoteForm';

export default function NewNotePage() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <header className="mb-6">
        <h1 className="text-xl font-bold">新規メモ</h1>
      </header>
      <NoteForm />
    </main>
  );
}
