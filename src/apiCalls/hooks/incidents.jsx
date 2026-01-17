import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createIncident, fetchIncidents } from "../api/incidents";

export const useIncidents = () => {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });
};

export const useCreateAlert = () => {
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
