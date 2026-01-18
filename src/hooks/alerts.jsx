import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAlert,
  deleteAlert,
  fetchAlerts,
  updateAlert,
} from "../api/alerts.jsx";

// Fetch all alerts
export const useAlerts = () => {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const alerts = await fetchAlerts();

      return [...alerts].sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
    },
  });
};

// Create a new alert
export const useCreateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAlert,
    onSuccess: (newAlert) => {
      queryClient.setQueryData(["alerts"], (oldAlert = []) => [
        newAlert,
        ...oldAlert,
      ]);
    },
  });
};

// Update an existing alert
export const useUpdateAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAlert(id, data),
    onSuccess: (updatedAlert) => {
      queryClient.setQueryData(["alerts"], (oldAlerts = []) =>
        oldAlerts.map((alert) =>
          alert.id === updatedAlert.id ? updatedAlert : alert
        )
      );
    },
  });
};

// Delete an alert
export const useDeleteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAlert(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["alerts"], (oldAlerts = []) =>
        oldAlerts.filter((alert) => alert.id !== id)
      );
    },
  });
};
