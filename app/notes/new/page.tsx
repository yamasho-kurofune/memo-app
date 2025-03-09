import Link from 'next/link';
import NoteForm from '../../../components/NoteForm';

export default function NewNote() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/" className="text-white mr-4">
            ← 戻る
          </Link>
          <h1 className="text-xl font-bold">新規メモ</h1>
        </div>
      </header>

      <main className="container mx-auto p-4 max-w-2xl">
        <NoteForm />
      </main>
    </div>
  );
}
