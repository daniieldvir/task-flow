import { useState } from "react";
import { useCreateTask, useTasks } from "../../apiCalls/hooks/tasks.jsx";
import AddForm from "../UI/ActionsPages/AddForm";
import Modal from "../UI/ActionsPages/Modal";
import DataPanel from "../UI/DataDisplay/DataPanel";

export default function TasksPanel() {
  const { data: tasks = [], isLoading, error } = useTasks();
  console.log("tasks", tasks);
  const createTaskMutation = useCreateTask();

  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async () => {
    setIsModalOpen(true);
  };

  const handleCreate = (taskData) => {
    createTaskMutation.mutate({
      ...taskData,
      createDate: new Date(),
    });
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
        filter={filterStatus}
        filterField="status"
        titleField="name"
        sourceField="author"
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
