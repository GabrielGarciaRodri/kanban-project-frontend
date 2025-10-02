import { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { CreateBoardDto } from '../../services/boards.service';
import { useCreateBoard } from '../../hooks/useBoards';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backgroundColors = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
];

export const CreateBoardModal = ({ isOpen, onClose }: CreateBoardModalProps) => {
  const [selectedBg, setSelectedBg] = useState(backgroundColors[0]);
  const createBoard = useCreateBoard();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateBoardDto>();

  if (!isOpen) return null;

  const onSubmit = async (data: CreateBoardDto) => {
    try {
      await createBoard.mutateAsync({
        ...data,
        background: selectedBg,
      });
      reset();
      onClose();
    } catch (error) {
      // Error manejado en el hook
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Crear nuevo board</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título del board
            </label>
            <input
              {...register('title', { required: 'El título es requerido' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Proyecto Web App"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (opcional)
            </label>
            <textarea
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe tu board..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de fondo
            </label>
            <div className="grid grid-cols-5 gap-2">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedBg(color)}
                  className={`h-16 rounded-md transition-transform ${
                    selectedBg === color ? 'ring-2 ring-offset-2 ring-blue-500 scale-95' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear board'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};