import axios from "axios";

const API_BASE = "https://task-flow-backend-t5ng.onrender.com/api";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};
