import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBoards } from '../hooks/useBoards';
import { BoardCard } from '../components/boards/BoardCard';
import { CreateBoardModal } from '../components/boards/CreateBoardModal';
import { Plus, Loader2, LogOut } from 'lucide-react';

export const Boards = () => {
  const { user, logout } = useAuth();
  const { data: boards, isLoading, error } = useBoards();
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error al cargar los boards</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Kanban Board</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Mis Boards
            </h2>
            <p className="text-gray-600">
              Organiza tus proyectos y tareas en boards personalizados
            </p>
          </div>

          {/* Boards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Create new board card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gray-200 rounded-lg p-6 hover:bg-gray-300 transition-colors flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-400"
            >
              <Plus size={48} className="text-gray-600 mb-2" />
              <span className="text-gray-600 font-medium">
                Crear nuevo board
              </span>
            </button>

            {/* Board cards */}
            {boards?.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))}
          </div>

          {/* Empty state */}
          {boards?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                No tienes boards todavía
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={20} />
                Crear tu primer board
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Board Modal */}
      <CreateBoardModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};