import { api } from './api';

export interface Board {
  id: string;
  title: string;
  description?: string;
  background?: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    members: number;
  };
  columns?: Column[];
  members?: BoardMember[];
}

export interface Column {
  id: string;
  title: string;
  position: number;
  color?: string;
  boardId: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  columnId: string;
  dueDate?: string;
  cover?: string;
  assignees?: any[];
  labels?: any[];
  _count?: {
    comments: number;
    attachments: number;
    checklists: number;
  };
}

export interface BoardMember {
  id: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export interface CreateBoardDto {
  title: string;
  description?: string;
  background?: string;
}

export interface UpdateBoardDto {
  title?: string;
  description?: string;
  background?: string;
}

export const boardsService = {
  async getAll(): Promise<Board[]> {
    const response = await api.get<Board[]>('/boards');
    return response.data;
  },

  async getById(id: string): Promise<Board> {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  },

  async create(data: CreateBoardDto): Promise<Board> {
    const response = await api.post<Board>('/boards', data);
    return response.data;
  },

  async update(id: string, data: UpdateBoardDto): Promise<Board> {
    const response = await api.patch<Board>(`/boards/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/boards/${id}`);
  },
};