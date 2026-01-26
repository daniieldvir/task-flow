import axios from "axios";
import { API_BASE_URL } from "../constants/config.js";

export const fetchAlerts = async () => {
  const response = await axios.get(`${API_BASE_URL}/alerts`);
  return response.data;
};

export const createAlert = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/alerts`, data);
  return response.data;
};

export const updateAlert = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/alerts/${id}`, data);
  return response.data;
};

export const deleteAlert = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/alerts/${id}`);
  return response.data;
};
