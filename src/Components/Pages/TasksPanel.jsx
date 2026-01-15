import { useState } from "react";
import { useCreateTask, useTasks } from "../../hooks/useTasks";
import AddForm from "../UI/ActionsPages/AddForm";
import Modal from "../UI/ActionsPages/Modal";
import { useData } from "../utils/DataContext";
import DataPanel from "./DataPanel";

export default function TasksPanel() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const { filter } = useData();
  const { createTask, isPending, isError } = useCreateTask();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (data) => {
    const dataToSend = {
      ...data,
      createDate: new Date(),
    };
    createTask(dataToSend);
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
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
        sourceField="status"
        emptyMessage="No Tasks"
        panelTitle="Tasks"
        onAdd={handleAdd}
        onEdit={(task) => {
          /* edit task */
        }}
        onDelete={(id) => {
          /* delete task */
        }}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
      >
        <AddForm
          title="Create Task"
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
