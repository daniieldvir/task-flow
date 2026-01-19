import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIncident,
  deleteIncident,
  fetchIncidents,
  updateIncident,
} from "../api/incidents.jsx";

// Fetch all incidents
export const useIncidents = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;

  return useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const incidents = await fetchIncidents();
      return [...incidents].sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
      );
    },
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => {
      console.error("Error fetching incidents:", err);
      if (onError) onError(err);
    },
  });
};

// Create a new incidents
export const useCreateIncidents = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: createIncident,
    onSuccess: (newIncident) => {
      queryClient.setQueryData(["incidents"], (oldIncident = []) => [
        newIncident,
        ...oldIncident,
      ]);
      if (onSuccess) onSuccess(newIncident);
    },
    onError: (err) => {
      console.error("Error creating incident:", err);
      if (onError) onError(err);
    },
  });
};

// Update an existing incidents
export const useUpdateIncidents = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: ({ id, data }) => updateIncident(id, data),
    onSuccess: (updatedIncident) => {
      queryClient.setQueryData(["incidents"], (oldIncidents = []) =>
        oldIncidents.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident,
        ),
      );
      if (onSuccess) onSuccess(updatedIncident);
    },
    onError: (err) => {
      console.error("Error updating incident:", err);
      if (onError) onError(err);
    },
  });
};

// Delete an incidents
export const useDeleteIncidents = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: (id) => deleteIncident(id),
    onError: (err) => {
      if (onError) onError(err);
    },
    onSuccess: (data, id) => {
      queryClient.setQueryData(["incidents"], (oldIncidents = []) =>
        oldIncidents.filter((incident) => incident.id !== id),
      );

      if (onSuccess) onSuccess(data, id);
    },
  });
};
