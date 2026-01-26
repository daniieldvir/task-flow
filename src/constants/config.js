// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://task-flow-backend-t5ng.onrender.com/api";

// Entity Types
export const ENTITY_TYPES = {
  TASK: "Task",
  ALERT: "Alert",
  INCIDENT: "Incident",
};

// Status Options
export const TASK_STATUSES = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

export const ALERT_SEVERITIES = [
  { label: "Critical", value: "Critical" },
  { label: "Info", value: "Info" },
  { label: "Warning", value: "Warning" },
  { label: "Resolved", value: "Resolved" },
];

export const INCIDENT_PRIORITIES = [
  { label: "Low", value: "Low" },
  { label: "Warning", value: "Warning" },
  { label: "Critical", value: "Critical" },
];

// Default Values
export const DEFAULT_TASK_STATUS = "Open";
export const DEFAULT_ALERT_SEVERITY = "Info";
export const DEFAULT_INCIDENT_PRIORITY = "Low";

// Pagination
export const DEFAULT_ITEMS_PER_PAGE = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_USER: "incident_dashboard_auth_user",
  THEME: "incident_dashboard_theme",
};
