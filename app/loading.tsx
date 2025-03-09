import Header from '../components/Header';

export default function Loading() {
  return (
    <div>
      <Header />
      
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">メモ一覧</h1>
        
        <div className="text-center py-8">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </main>
    </div>
  );
}
