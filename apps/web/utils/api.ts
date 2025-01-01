import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const menuApi = {
  getAllMenus: () => api.get('/menus'),
  getMenuWithDepth: (id: string, depth: number) => api.get(`/menus/${id}?depth=${depth}`),
  createMenuItem: (data: CreateMenuData) => api.post('/menus', data),
  updateMenuItem: (id: string, data: UpdateMenuData) => api.put(`/menus/${id}`, data),
  deleteMenuItem: (id: string) => api.delete(`/menus/${id}`),
  reorderMenuItems: (items: ReorderItem[]) => api.put('/menus/reorder', items),
};

interface CreateMenuData {
  name: string;
  depth: number;
  root_id?: string;
  menu_id?: string;
  parent_id?:string;
}

interface UpdateMenuData {
  name?: string;
  depth?: number;
  order?: number;
  root_id?: string;
}

interface ReorderItem {
  id: string;
  order: number;
}

export type { CreateMenuData, UpdateMenuData, ReorderItem };