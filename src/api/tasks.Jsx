import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export const fetchTasks = async (page, pageSize) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (pageSize) params.append("pageSize", pageSize);

  const response = await axios.get(`${API_BASE}/tasks?${params.toString()}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await axios.post(`${API_BASE}/tasks`, data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axios.put(`${API_BASE}/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE}/tasks/${id}`);
  return response.data;
};
