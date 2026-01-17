import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIncident,
  deleteIncident,
  fetchIncidents,
  updateIncident,
} from "../api/incidents";

// Fetch all incidents
export const useIncidents = () => {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });
};

// Create a new incidents
export const useCreateIncidents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncident,
    onSuccess: (newIncident) => {
      queryClient.setQueryData(["incidents"], (oldIncident = []) => [
        newIncident,
        ...oldIncident,
      ]);
    },
  });
};

// Update an existing incidents
export const useUpdateIncidents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateIncident(id, data),
    onSuccess: (updatedIncidents) => {
      queryClient.setQueryData(["incidents"], (oldIncidents = []) =>
        oldIncidents.map((incidents) =>
          incidents.id === updatedIncidents.id ? updatedIncidents : incidents
        )
      );
    },
  });
};

// Delete an incidents
export const useDeleteIncidents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteIncident(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["incidents"], (oldIncidents = []) =>
        oldIncidents.filter((incidents) => incidents.id !== id)
      );
    },
  });
};
