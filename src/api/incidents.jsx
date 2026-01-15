const API_BASE = "http://localhost:3000/api";

export const incidentsApi = {
  getAll: () => fetch(`${API_BASE}/incidents`).then((r) => r.json()),
  getById: (id) => fetch(`${API_BASE}/incidents/${id}`).then((r) => r.json()),
  create: (data) =>
    fetch(`${API_BASE}/incidents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  update: (id, data) =>
    fetch(`${API_BASE}/incidents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${API_BASE}/incidents/${id}`, {
      method: "DELETE",
    }).then((r) => r.json()),
};
