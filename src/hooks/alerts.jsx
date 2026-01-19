import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAlert,
  deleteAlert,
  fetchAlerts,
  updateAlert,
} from "../api/alerts.jsx";

// Fetch all alerts
export const useAlerts = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;
  return useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      const alerts = await fetchAlerts();

      return [...alerts].sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
      );
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};

// Create a new alert
export const useCreateAlert = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAlert,
    onSuccess: (newAlert) => {
      queryClient.setQueryData(["alerts"], (oldAlert = []) => [
        newAlert,
        ...oldAlert,
      ]);
      if (onSuccess) onSuccess(newAlert);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};

// Update an existing alert
export const useUpdateAlert = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAlert(id, data),
    onSuccess: (updatedAlert) => {
      queryClient.setQueryData(["alerts"], (oldAlerts = []) =>
        oldAlerts.map((alert) =>
          alert.id === updatedAlert.id ? updatedAlert : alert,
        ),
      );
      if (onSuccess) onSuccess(updatedAlert);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};

// Delete an alert
export const useDeleteAlert = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteAlert(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["alerts"], (oldAlerts = []) =>
        oldAlerts.filter((alert) => alert.id !== id),
      );
      if (onSuccess) onSuccess(data, id);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};
