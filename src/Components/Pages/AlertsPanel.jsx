import { useState } from "react";
import { useAlerts, useCreateAlert } from "../../hooks/useAlerts";
import AddForm from "../UI/ActionsPages/AddForm";
import Modal from "../UI/ActionsPages/Modal";
import { useData } from "../utils/DataContext";
import DataPanel from "./DataPanel";

export default function AlertsPanel() {
  const { data: alarts = [], isLoading, error } = useAlerts();
  const { filter } = useData();
  const { createAlert, isPending, isError } = useCreateAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (data) => {
    console.log(data);
    const dataToSend = {
      ...data,
      createDate: new Date(),
    };
    createAlert(dataToSend);
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
        data={alarts}
        filter={filter}
        filterField="severity"
        titleField="title"
        sourceField="severity"
        emptyMessage="No Alerts"
        panelTitle="Alerts"
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
              label: "Alert Name",
              type: "text",
              required: true,
              placeholder: "Enter alert name",
            },
            {
              name: "severity",
              label: "Severity",
              type: "select",
              defaultValue: "Warning",
              options: [
                { label: "Critical", value: "Critical" },
                { label: "Warning", value: "Warning" },
                { label: "Resolved", value: "Resolved" },
              ],
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "Enter alert description",
            },
          ]}
        />
      </Modal>
    </>
  );
}
