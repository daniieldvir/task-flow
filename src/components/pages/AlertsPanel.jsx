import { useRef, useState } from "react";
import {
  useAlerts,
  useCreateAlert,
  useDeleteAlert,
  useUpdateAlert,
} from "../../hooks/alerts";
import { useAuth } from "../../hooks/authContext";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../shared/AddForm";
import DataPanel from "../shared/DataPanel";
import AppSnackbar from "../shared/Snackbar";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";
import { deleteMessages } from "../utils/SnackbarMessage";

export default function AlertsPanel() {
  const snackbarRef = useRef();
  const { data: alerts = [], isLoading, error } = useAlerts();
  const { filter } = useFilter();
  const { loginUser } = useAuth();

  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    alert: null,
  });

  const createAlertsMutation = useCreateAlert();
  const updateAlertMutation = useUpdateAlert();
  const deleteAlertMutation = useDeleteAlert({
    onError: (err) => {
      snackbarRef.current.show(err?.message || deleteMessages.error("Alert"));
    },
    onSuccess: () => {
      snackbarRef.current.show(deleteMessages.success("Alert"));
      setModal({ type: null, alert: null });
    },
  });

  const handleAddClicked = async () => {
    setModal({ type: "add", alert: null });
  };

  const handleEditClicked = async (alert) => {
    setModal({ type: "edit", alert });
  };

  const handleDeleteClicked = async (alartId) => {
    setModal({ type: "delete", alert: alartId });
  };

  const handleCreate = async (alertData) => {
    if (modal.type === "add") {
      createAlertsMutation.mutate({
        ...alertData,
        source: loginUser.username,
        createDate: new Date(),
      });
    }
    if (modal.type === "edit") {
      updateAlertMutation.mutate({
        id: modal.alert.id,
        data: alertData,
      });
    }
    handleCancel();
  };

  const handleDelete = async () => {
    if (modal.type === "delete" && modal.alert) {
      deleteAlertMutation.mutate(modal.alert);
    }
  };

  const handleCancel = async () => {
    setModal({ type: null, alert: null });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        isOpen={modal.type === "delete"}
        entity="Alert"
        onClose={handleCancel}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        title={modal.type === "edit" ? "edit alert" : "create new alert"}
        onClose={handleCancel}
      >
        <AddForm
          initialData={modal.alert || {}}
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
      <AppSnackbar ref={snackbarRef} />
    </>
  );
}
