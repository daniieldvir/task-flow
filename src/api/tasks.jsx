const API_BASE = "http://localhost:3000/api";

export const tasksApi = {
  getAll: () => fetch(`${API_BASE}/tasks`).then((r) => r.json()),
  getById: (id) => fetch(`${API_BASE}/tasks/${id}`).then((r) => r.json()),
  create: async (data) => {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    return res.json();
  },
  update: (id, data) =>
    fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${API_BASE}/tasks/${id}`, {
      method: "DELETE",
    }).then((r) => r.json()),
};
