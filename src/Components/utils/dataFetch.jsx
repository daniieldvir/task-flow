// export async function taskData() {
//   const response = await fetch("http://localhost:3000/api/tasks");
//   if (!response.ok) throw new Error("Failed to fetch tasks");
//   const resData = await response.json();
//   return Array.isArray(resData) ? resData : [];
// }

// export async function createTask(taskData) {
//   const response = await fetch("http://localhost:3000/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(taskData),
//   });

//   if (!response.ok) throw new Error("Failed to create task");
//   return await response.json();
// }

// export async function alertsData() {
//   const response = await fetch("http://localhost:3000/api/alerts");
//   if (!response.ok) throw new Error("Failed to fetch tasks");
//   const resData = await response.json();
//   return Array.isArray(resData) ? resData : [];
// }

// export async function incidentsData() {
//   const response = await fetch("http://localhost:3000/api/incidents");
//   if (!response.ok) throw new Error("Failed to fetch tasks");
//   const resData = await response.json();
//   return Array.isArray(resData) ? resData : [];
// }
