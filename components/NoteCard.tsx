import Link from 'next/link';
import { Note } from '../types';

type NoteCardProps = {
  note: Note;
};

const NoteCard = ({ note }: NoteCardProps) => {
  // 日付をフォーマット
  const formattedDate = new Date(note.updated_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/notes/${note.id}`} className="block">
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {note.content || '内容なし'}
        </p>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default NoteCard;
