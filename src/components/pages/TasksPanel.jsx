import { useRef, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../../hooks/tasks";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../shared/AddForm";
import DataPanel from "../shared/DataPanel";
import AppSnackbar from "../shared/Snackbar";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";
import {
  creatMessages,
  deleteMessages,
  updateMessages,
} from "../utils/SnackbarMessage";

export default function TasksPanel() {
  const snackbarRef = useRef();
  const { data: tasks = [], isLoading, error } = useTasks();
  const { loginUser } = useAuth();
  const { filter } = useFilter();

  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    task: null,
  });

  const withSnackbar = (messages) => ({
    onError: (err) => {
      snackbarRef.current.show(err?.message || messages.error("Task"));
    },
    onSuccess: () => {
      snackbarRef.current.show(messages.success("Task"));
      closeModal();
    },
  });

  const createTaskMutation = useCreateTask(withSnackbar(creatMessages));
  const updateTaskMutation = useUpdateTask(withSnackbar(updateMessages));
  const deleteTaskMutation = useDeleteTask(withSnackbar(deleteMessages));

  const handleAddClicked = async () => {
    setModal({ type: "add", task: null });
  };

  const handleEditClicked = async (task) => {
    setModal({ type: "edit", task });
  };

  const handleDeleteClicked = async (taskId) => {
    setModal({ type: "delete", task: taskId });
  };

  const handleCreate = (taskData) => {
    if (modal.type === "add") {
      createTaskMutation.mutate({
        ...taskData,
        author: loginUser.username,
        createDate: new Date(),
      });
    }

    if (modal.type === "edit") {
      updateTaskMutation.mutate({
        id: modal.task.id,
        data: taskData,
      });
    }

    closeModal();
  };

  const handleDelete = async () => {
    if (modal.type === "delete" && modal.task) {
      deleteTaskMutation.mutate(modal.task);
    }
  };

  const closeModal = async () => {
    setModal({ type: null, task: null });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DataPanel
        data={tasks}
        filter={filter}
        filterField="status"
        titleField="name"
        sourceField="author"
        emptyMessage="No Tasks"
        panelTitle="Tasks"
        onAdd={handleAddClicked}
        onEdit={(task) => handleEditClicked(task)}
        onDelete={(task) => handleDeleteClicked(task)}
      />

      <DeleteModal
        isOpen={modal.type === "delete"}
        entity="Alert"
        onClose={closeModal}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        title={modal.type === "edit" ? "edit task" : "create new task"}
        onClose={closeModal}
      >
        <AddForm
          initialData={modal.task || {}}
          submitLabel="Create Task"
          onSubmit={handleCreate}
          onCancel={closeModal}
          fields={[
            {
              name: "name",
              label: "Task Name",
              type: "text",
              required: true,
              placeholder: "Enter task name",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              defaultValue: "Open",
              options: [
                { label: "Open", value: "Open" },
                { label: "In Progress", value: "In Progress" },
                { label: "Resolved", value: "Resolved" },
              ],
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "Enter task description",
            },
          ]}
        />
      </Modal>

      <AppSnackbar ref={snackbarRef} />
    </>
  );
}
