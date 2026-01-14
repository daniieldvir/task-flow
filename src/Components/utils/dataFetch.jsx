export async function taskData() {
  const response = await fetch("http://localhost:3000/api/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const resData = await response.json();
  return Array.isArray(resData) ? resData : [];
}

export async function alartsData() {
  const response = await fetch("http://localhost:3000/api/alerts");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const resData = await response.json();
  return Array.isArray(resData) ? resData : [];
}

export async function incidentsData() {
  const response = await fetch("http://localhost:3000/api/incidents");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  const resData = await response.json();
  return Array.isArray(resData) ? resData : [];
}
