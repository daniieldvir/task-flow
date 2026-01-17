import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAlert, fetchAlerts } from "../api/alerts";

export const useAlerts = () => {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: fetchAlerts,
  });
};

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
