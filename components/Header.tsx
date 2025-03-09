import Link from 'next/link';

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">メモアプリ</Link>
      <Link href="/notes/new" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">
        新規メモ
      </Link>
    </div>
  </header>
);

export default Header;
