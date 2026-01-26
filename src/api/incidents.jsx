import axios from "axios";
import { API_BASE_URL } from "../constants/config.js";

export const fetchIncidents = async () => {
  const response = await axios.get(`${API_BASE_URL}/incidents`);
  return response.data;
};

export const createIncident = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/incidents`, data);
  return response.data;
};

export const updateIncident = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/incidents/${id}`, data);
  return response.data;
};

export const deleteIncident = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/incidents/${id}`);
  return response.data;
};
