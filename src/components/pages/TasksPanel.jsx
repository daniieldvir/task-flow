import { useCallback, useMemo, useRef, useState } from "react";
import {
  DEFAULT_TASK_STATUS,
  TASK_STATUSES,
} from "../../constants/config.js";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../../hooks/tasks";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../shared/AddForm/AddForm.jsx";
import DataPanel from "../shared/DataPanel/DataPanel.jsx";
import Error from "../shared/Errors/Error.jsx";
import LoadingSkeleton from "../shared/Feedback/LoadingSkeleton.jsx";
import AppSnackbar from "../shared/Feedback/Snackbar.jsx";
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

  const closeModal = useCallback(() => {
    setModal({ type: null, task: null });
  }, []);

  const withSnackbar = useCallback(
    (messages) => ({
      onError: (err) => {
        snackbarRef.current?.show(err?.message || messages.error("Task"));
      },
      onSuccess: () => {
        snackbarRef.current?.show(messages.success("Task"));
        closeModal();
      },
    }),
    [closeModal]
  );

  const createTaskMutation = useCreateTask(withSnackbar(creatMessages));
  const updateTaskMutation = useUpdateTask(withSnackbar(updateMessages));
  const deleteTaskMutation = useDeleteTask(withSnackbar(deleteMessages));

  const handleAddClicked = useCallback(() => {
    setModal({ type: "add", task: null });
  }, []);

  const handleEditClicked = useCallback((task) => {
    setModal({ type: "edit", task });
  }, []);

  const handleDeleteClicked = useCallback((taskId) => {
    setModal({ type: "delete", task: taskId });
  }, []);

  const handleCreate = useCallback(
    (taskData) => {
      if (modal.type === "add") {
        createTaskMutation.mutate({
          ...taskData,
          author: loginUser?.username,
          createDate: new Date(),
        });
      }

      if (modal.type === "edit") {
        updateTaskMutation.mutate({
          id: modal.task?.id,
          data: taskData,
        });
      }

      closeModal();
    },
    [
      modal.type,
      modal.task,
      loginUser?.username,
      createTaskMutation,
      updateTaskMutation,
      closeModal,
    ]
  );

  const handleDelete = useCallback(() => {
    if (modal.type === "delete" && modal.task) {
      deleteTaskMutation.mutate(modal.task);
    }
  }, [modal.type, modal.task, deleteTaskMutation]);

  const formFields = useMemo(
    () => [
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
        defaultValue: DEFAULT_TASK_STATUS,
        options: TASK_STATUSES,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter task description",
      },
    ],
    []
  );

  if (isLoading) return <LoadingSkeleton type="card" count={4} />;
  if (error) return <Error message={error.message} />;

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
        onEdit={handleEditClicked}
        onDelete={handleDeleteClicked}
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
          fields={formFields}
        />
      </Modal>

      <AppSnackbar ref={snackbarRef} />
    </>
  );
}
