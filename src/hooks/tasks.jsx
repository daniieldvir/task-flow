import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../api/tasks.jsx";

// Fetch all tasks
export const useTasks = (callbacks = {}) => {
  const { onError, onSuccess } = callbacks;
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const tasks = await fetchTasks();

      return [...tasks].sort(
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

// Create a new task
export const useCreateTask = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) => [
        newTask,
        ...oldTasks,
      ]);
      if (onSuccess) onSuccess(newTask);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};

// Update an existing task
export const useUpdateTask = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task,
        ),
      );
      if (onSuccess) onSuccess(updatedTask);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};

// Delete an task
export const useDeleteTask = (callbacks = {}) => {
  const queryClient = useQueryClient();
  const { onError, onSuccess } = callbacks;

  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== id),
      );
      if (onSuccess) onSuccess(data, id);
    },
    onError: (err) => {
      if (onError) onError(err);
    },
  });
};
