import axios from "axios";
import { API_BASE_URL } from "../constants/config.js";

export const fetchTasks = async (page, pageSize) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (pageSize) params.append("pageSize", pageSize);

  const response = await axios.get(`${API_BASE_URL}/tasks?${params.toString()}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, data);
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return response.data;
};
