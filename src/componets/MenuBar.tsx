export default function MenuBar() {
  return (
    <div className="flex flex-col w-1/5 h-screen bg-menu-background text-white">
      <div className="flex items-center justify-center h-16 bg-menu-background">
        <h1 className="text-2xl font-bold">Muze</h1>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <a href="#" className="text-lg hover:text-gray-400">
          Home
        </a>
        <a href="#" className="text-lg hover:text-gray-400">
          Search
        </a>
        <a href="#" className="text-lg hover:text-gray-400">
          Library
        </a>
      </nav>
    </div>
  );
}
