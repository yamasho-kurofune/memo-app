import { Note } from '../types';
import NoteCard from './NoteCard';

type NoteListProps = {
  notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">メモがありません。新しく作成してみましょう。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
