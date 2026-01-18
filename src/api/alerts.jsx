import axios from "axios";

const API_BASE = "https://task-flow-backend-t5ng.onrender.com/api";

export const fetchAlerts = async () => {
  const response = await axios.get(`${API_BASE}/alerts`);
  return response.data;
};

export const createAlert = async (data) => {
  const response = await axios.post(`${API_BASE}/alerts`, data);
  return response.data;
};

export const updateAlert = async (id, data) => {
  const response = await axios.put(`${API_BASE}/alerts/${id}`, data);
  return response.data;
};

export const deleteAlert = async (id) => {
  const response = await axios.delete(`${API_BASE}/alerts/${id}`);
  return response.data;
};
