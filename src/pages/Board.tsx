import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../hooks/useBoards';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Board = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: board, isLoading, error } = useBoard(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error || !board) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Board no encontrado</p>
          <button
            onClick={() => navigate('/boards')}
            className="text-blue-600 hover:underline"
          >
            Volver a boards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: board.background?.startsWith('#') ? board.background : '#f3f4f6',
      }}
    >
      {/* Header */}
      <nav className="bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/boards')}
                className="text-white hover:bg-white/20 p-2 rounded"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold text-white">
                {board.title}
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="text-white hover:bg-white/20 px-3 py-1 rounded"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Board Content */}
      <main className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {board.columns?.map((column) => (
            <div
              key={column.id}
              className="bg-gray-200 rounded-lg p-4 min-w-[300px] max-w-[300px]"
            >
              <h3 className="font-medium mb-4">{column.title}</h3>
              <div className="space-y-2">
                {column.cards?.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white p-3 rounded shadow hover:shadow-md cursor-pointer"
                  >
                    <p className="text-sm">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};