import { useAlerts } from "./alerts";
import { useIncidents } from "./incidents";
import { useTasks } from "./tasks";

export const useOverviewData = () => {
  const tasksQuery = useTasks();
  const alertsQuery = useAlerts();
  const incidentsQuery = useIncidents();

  // Combine loading states
  const isLoading =
    tasksQuery.isLoading || alertsQuery.isLoading || incidentsQuery.isLoading;

  // Combine errors (optional: just take the first error)
  const error = tasksQuery.error || alertsQuery.error || incidentsQuery.error;

  return {
    tasks: tasksQuery.data ?? [],
    alerts: alertsQuery.data ?? [],
    incidents: incidentsQuery.data ?? [],
    isLoading,
    error,
  };
};
