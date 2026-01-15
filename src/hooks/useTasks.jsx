import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getAll,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks) => {
        if (!oldTasks) return [newTask];
        return [newTask, ...oldTasks];
      });
    },
  });

  return {
    createTask: mutation.mutate,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => tasksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
