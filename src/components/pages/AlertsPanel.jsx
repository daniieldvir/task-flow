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
import { creatMessages } from "../utils/SnackbarMessage";

export default function AlertsPanel() {
  const snackbarRef = useRef();
  const { data: alerts = [], isLoading, error } = useAlerts();
  const { filter } = useFilter();
  const { loginUser } = useAuth();

  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    alert: null,
  });

  const withSnackbar = (messages) => ({
    onError: (err) => {
      snackbarRef.current.show(err?.message || messages.error("Alert"));
    },
    onSuccess: () => {
      snackbarRef.current.show(messages.success("Alert"));
      closeModal();
    },
  });

  const createAlertsMutation = useCreateAlert(withSnackbar(creatMessages));
  const updateAlertMutation = useUpdateAlert(withSnackbar(creatMessages));
  const deleteAlertMutation = useDeleteAlert(withSnackbar(creatMessages));

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
    closeModal();
  };

  const handleDelete = async () => {
    if (modal.type === "delete" && modal.alert) {
      deleteAlertMutation.mutate(modal.alert);
    }
  };

  const closeModal = async () => {
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
        onClose={closeModal}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        title={modal.type === "edit" ? "edit alert" : "create new alert"}
        onClose={closeModal}
      >
        <AddForm
          initialData={modal.alert || {}}
          title="Create Alert"
          submitLabel="Create Alert"
          onSubmit={handleCreate}
          onCancel={closeModal}
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
              defaultValue: "Info",
              options: [
                { label: "Critical", value: "Critical" },
                { label: "Info", value: "Info" },
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
