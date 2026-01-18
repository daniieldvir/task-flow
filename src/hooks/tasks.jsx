import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../api/tasks.jsx";

// Fetch all tasks
export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await fetchTasks();

      return [...tasks].sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );
    },
  });
};

// Create a new task
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

// Update an existing task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    },
  });
};

// Delete an task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== id)
      );
    },
  });
};
