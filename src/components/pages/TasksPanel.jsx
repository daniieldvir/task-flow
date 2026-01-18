import { useState } from "react";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "../../hooks/tasks";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../UI/AddForm";
import DataPanel from "../UI/DataDisplay/DataPanel";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";

export default function TasksPanel() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const { loginUser } = useAuth();
  const { filter } = useFilter();

  console.log(loginUser, "loginUser");

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [taskToEdit, setTasktToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleAddClicked = async () => {
    setTasktToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClicked = async (task) => {
    setTasktToEdit(task);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClicked = async (id) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCreate = (taskData) => {
    if (!taskToEdit) {
      createTaskMutation.mutate({
        ...taskData,
        author: loginUser.username,
        createDate: new Date(),
      });
    } else {
      updateTaskMutation.mutate({
        id: taskToEdit.id,
        data: taskData,
      });
    }
    setIsAddEditModalOpen(false);
    setTasktToEdit(null);
  };

  const handleDelete = async () => {
    deleteTaskMutation.mutate(taskToDelete);
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleCancel = async () => {
    setIsAddEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
    setTasktToEdit(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addEditTitelModal = !!taskToEdit ? "edit task" : "create new task";

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
        isOpen={isDeleteModalOpen}
        onClose={handleCancel}
        entity="Alert"
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={isAddEditModalOpen}
        onClose={handleCancel}
        title={addEditTitelModal}
      >
        <AddForm
          initialData={taskToEdit || {}}
          submitLabel="Create Task"
          onSubmit={handleCreate}
          onCancel={handleCancel}
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
    </>
  );
}
