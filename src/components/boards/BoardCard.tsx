import { Board } from '../../services/boards.service';
import { MoreVertical, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBoard } from '../../hooks/useBoards';

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const deleteBoard = useDeleteBoard();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de eliminar este board?')) {
      await deleteBoard.mutateAsync(board.id);
    }
    setShowMenu(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={() => navigate(`/boards/${board.id}`)}
      className="relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      style={{
        backgroundImage: board.background?.startsWith('#') 
          ? undefined 
          : `url(${board.background})`,
        backgroundColor: board.background?.startsWith('#') 
          ? board.background 
          : undefined,
      }}
    >
      <div className={`p-6 ${board.background ? 'bg-black/40 text-white' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-xl font-semibold ${board.background ? 'text-white' : 'text-gray-900'}`}>
            {board.title}
          </h3>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`p-1 rounded hover:bg-gray-100 ${board.background ? 'hover:bg-white/20' : ''}`}
            >
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {board.description && (
          <p className={`mb-4 ${board.background ? 'text-white/90' : 'text-gray-600'}`}>
            {board.description}
          </p>
        )}

        <div className={`flex items-center justify-between text-sm ${board.background ? 'text-white/80' : 'text-gray-500'}`}>
          <div className="flex items-center gap-4">
            {board._count && (
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{board._count.members} miembros</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(board.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};