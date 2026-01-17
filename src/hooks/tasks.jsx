import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTasks } from "../api/tasks";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) => [
        newTask,
        ...oldTasks,
      ]);
    },
  });
};
