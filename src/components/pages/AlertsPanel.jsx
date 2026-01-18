import { useState } from "react";
import {
  useAlerts,
  useCreateAlert,
  useDeleteAlert,
  useUpdateAlert,
} from "../../hooks/alerts";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../UI/AddForm";
import DataPanel from "../UI/DataDisplay/DataPanel";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";

export default function AlertsPanel() {
  const { data: alerts = [], isLoading, error } = useAlerts();
  const { filter } = useFilter();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [alertToEdit, setAlertToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState(null);

  const createAlertsMutation = useCreateAlert();
  const updateAlertMutation = useUpdateAlert();
  const deleteAlertMutation = useDeleteAlert();

  const handleAddClicked = async () => {
    setAlertToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClicked = async (alert) => {
    setAlertToEdit(alert);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClicked = async (id) => {
    setAlertToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCreate = async (alertData) => {
    if (!alertToEdit) {
      createAlertsMutation.mutate({
        ...alertData,
        createDate: new Date(),
      });
    } else {
      updateAlertMutation.mutate({
        id: alertToEdit.id,
        data: alertData,
      });
    }
    setIsAddEditModalOpen(false);
    setAlertToEdit(null);
  };

  const handleDelete = async () => {
    deleteAlertMutation.mutate(alertToDelete);
    setIsDeleteModalOpen(false);
    setAlertToDelete(null);
  };

  const handleCancel = async () => {
    setIsAddEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setAlertToEdit(null);
    setAlertToDelete(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addEditTitelModal = !!alertToEdit ? "edit alert" : "create new alert";

  return (
    <>
      <DataPanel
        data={alerts}
        filter={filter}
        filterField="severity"
        titleField="title"
        sourceField="source"
        emptyMessage="No Alerts"
        panelTitle="Alerts"
        onAdd={handleAddClicked}
        onEdit={(alert) => handleEditClicked(alert)}
        onDelete={(alert) => handleDeleteClicked(alert)}
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
          initialData={alertToEdit || {}}
          title="Create Alert"
          submitLabel="Create Alert"
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
