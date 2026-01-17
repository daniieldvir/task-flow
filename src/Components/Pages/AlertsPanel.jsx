import { useState } from "react";
import { useAlerts, useCreateAlert } from "../../apiCalls/hooks/alerts.jsx";
import AddForm from "../UI/ActionsPages/AddForm";
import Modal from "../UI/ActionsPages/Modal";
import DataPanel from "../UI/DataDisplay/DataPanel";

export default function AlertsPanel() {
  const { data: alerts = [], isLoading, error } = useAlerts();
  const createAlertsMutation = useCreateAlert();
  console.log("alerts", alerts);

  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = async () => {
    setIsModalOpen(true);
  };

  const handleCreate = async (alertData) => {
    createAlertsMutation.mutate({
      ...alertData,
      createDate: new Date(),
    });
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (id) => {
    const alartToEdit = alarts.find((alart) => alart.id === id);
    console.log(alartToEdit);
    // setAlartInAction(alartToEdit);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <DataPanel
        data={alerts}
        filter={filterStatus}
        filterField="severity"
        titleField="title"
        sourceField="source"
        emptyMessage="No Alerts"
        panelTitle="Alerts"
        onAdd={handleAdd}
        onEdit={(task) => handleEdit(task.id)}
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
              name: "title",
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
