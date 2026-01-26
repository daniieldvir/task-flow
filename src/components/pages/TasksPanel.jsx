import { useCallback, useMemo, useRef, useState } from "react";
import {
  DEFAULT_TASK_PRIORITY,
  DEFAULT_TASK_STATUS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/config.js";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../../hooks/tasks";
import AddForm from "../shared/AddForm/AddForm.jsx";
import Error from "../shared/Errors/Error.jsx";
import LoadingSkeleton from "../shared/Feedback/LoadingSkeleton.jsx";
import AppSnackbar from "../shared/Feedback/Snackbar.jsx";
import TaskCard from "../shared/TaskCard/TaskCard";
import ActionButton from "../UI/Buttons/ActionButton";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";
import {
  creatMessages,
  deleteMessages,
  updateMessages,
} from "../utils/SnackbarMessage";
import styles from "./TasksPanel.module.scss";

export default function TasksPanel() {
  const snackbarRef = useRef();
  const { data: tasks = [], isLoading, error } = useTasks();
  const { loginUser, isAuthenticated } = useAuth();
  
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

  const handleDeleteClicked = useCallback((e, taskId) => {
    e?.stopPropagation();
    setModal({ type: "delete", task: taskId });
  }, []);

  const handleCreate = useCallback(
    (taskData) => {
      
      const enrichedData = {
        ...taskData,
        author: loginUser?.username || "Anonymous",
        createDate: new Date(),
        priority: taskData.priority || ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
        tags: taskData.tags || ["New"], 
      };

      if (modal.type === "add") {
        createTaskMutation.mutate(enrichedData);
      }

      if (modal.type === "edit") {
        updateTaskMutation.mutate({
          id: modal.task?.id,
          data: enrichedData,
        });
      }

      closeModal();
    },
    [modal.type, modal.task, loginUser?.username, createTaskMutation, updateTaskMutation, closeModal]
  );

  const handleDelete = useCallback(() => {
    if (modal.type === "delete" && modal.task) {
      deleteTaskMutation.mutate(modal.task);
    }
  }, [modal.type, modal.task, deleteTaskMutation]);

  // Group tasks by status
  const columns = useMemo(() => {
    const cols = {
      "Open": [],
      "In Progress": [],
      "Resolved": []
    };
    
    tasks.forEach(task => {
      // Normalize status check
      const status = task.status || "Open";
      if (cols[status]) {
        cols[status].push(task);
      } else {
        // Fallback for unknown statuses
        cols["Open"].push(task);
      }
    });
    
    return cols;
  }, [tasks]);

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
        name: "priority",
        label: "Priority",
        type: "select",
        defaultValue: DEFAULT_TASK_PRIORITY,
        options: TASK_PRIORITIES,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe the task objectives...",
      },
    ],
    []
  );

  if (isLoading) return <LoadingSkeleton type="card" count={4} />;
  if (error) return <Error message={error.message} />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>InfoBoard</h2>
        <ActionButton
          onClick={handleAddClicked}
          label="New"
          disabled={!isAuthenticated}
        />
      </div>

      <div className={styles.board}>
        {Object.entries(columns).map(([status, statusTasks]) => (
          <div key={status} className={`${styles.column} ${styles[`column${status.replace(" ", "")}`]}`}>
            <div className={styles.columnHeader}>
              <h3>
                {status}
              </h3>
              <span className={styles.count}>{statusTasks.length}</span>
            </div>
            
            <div className={styles.taskList}>
              {statusTasks.length > 0 ? (
                statusTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditClicked}
                    onDelete={handleDeleteClicked}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={modal.type === "delete"}
        entity="Task"
        onClose={closeModal}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        title={modal.type === "edit" ? "Edit Task" : "Create New Task"}
        onClose={closeModal}
      >
        <AddForm
          initialData={modal.task || {}}
          submitLabel={modal.type === "edit" ? "Save Changes" : "Create Task"}
          onSubmit={handleCreate}
          onCancel={closeModal}
          fields={formFields}
        />
      </Modal>

      <AppSnackbar ref={snackbarRef} />
    </div>
  );
}
