import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export const fetchIncidents = async () => {
  const response = await axios.get(`${API_BASE}/incidents`);
  return response.data;
};

export const createIncident = async (data) => {
  const response = await axios.post(`${API_BASE}/incidents`, data);
  return response.data;
};

export const updateIncident = async (id, data) => {
  const response = await axios.put(`${API_BASE}/incidents/${id}`, data);
  return response.data;
};

export const deleteIncident = async (id) => {
  const response = await axios.delete(`${API_BASE}/incidents/${id}`);
  return response.data;
};
