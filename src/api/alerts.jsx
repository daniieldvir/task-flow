const API_BASE = "http://localhost:3000/api";

export const alertsApi = {
  getAll: () => fetch(`${API_BASE}/alerts`).then((r) => r.json()),
  getById: (id) => fetch(`${API_BASE}/alerts/${id}`).then((r) => r.json()),
  create: (data) =>
    fetch(`${API_BASE}/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  update: (id, data) =>
    fetch(`${API_BASE}/alerts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${API_BASE}/alerts/${id}`, {
      method: "DELETE",
    }).then((r) => r.json()),
};
