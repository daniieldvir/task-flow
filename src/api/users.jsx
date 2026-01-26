import axios from "axios";
import { API_BASE_URL } from "../constants/config.js";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
