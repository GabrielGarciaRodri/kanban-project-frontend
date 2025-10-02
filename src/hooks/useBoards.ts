import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boardsService, Board, CreateBoardDto } from '../services/boards.service';
import toast from 'react-hot-toast';

export const useBoards = () => {
  return useQuery<Board[]>({
    queryKey: ['boards'],
    queryFn: boardsService.getAll,
  });
};

export const useBoard = (id: string) => {
  return useQuery<Board>({
    queryKey: ['boards', id],
    queryFn: () => boardsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBoardDto) => boardsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      toast.success('Board creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al crear el board');
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => boardsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
      toast.success('Board eliminado');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Error al eliminar el board');
    },
  });
};