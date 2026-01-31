import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://flowsync-backend.onrender.com/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getProfile: () => api.get('/auth/profile'),
};

export const projectAPI = {
  getProjects: () => api.get('/projects'),
  createProject: (projectData) => api.post('/projects', projectData),
  updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  addMember: (projectId, email) => api.post(`/projects/${projectId}/members`, { email }),
  removeMember: (projectId, userId) => api.delete(`/projects/${projectId}/members/${userId}`),
};

export const taskAPI = {
  getTasks: (projectId) => api.get(`/tasks${projectId ? `?projectId=${projectId}` : ''}`),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllProjects: () => api.get('/admin/projects'),
  getAllTasks: () => api.get('/admin/tasks'),
};

export default api;