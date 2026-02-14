import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ALERT_SEVERITIES,
  DEFAULT_ALERT_SEVERITY,
  DEFAULT_ITEMS_PER_PAGE,
} from "../../constants/config.js";
import {
  useAlerts,
  useCreateAlert,
  useDeleteAlert,
  useUpdateAlert,
} from "../../hooks/alerts";
import { useAuth } from "../../hooks/authContext";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../shared/AddForm/AddForm.jsx";
import Error from "../shared/Errors/Error.jsx";
import LoadingSkeleton from "../shared/Feedback/LoadingSkeleton.jsx";
import AppSnackbar from "../shared/Feedback/Snackbar.jsx";
import GenericTable from "../shared/GenericTable/GenericTable.jsx";
import ActionButton from "../UI/Buttons/ActionButton";
import ButtonSVG from "../UI/Buttons/ButtonSVG";
import Status from "../UI/DataDisplay/Status.jsx";
import FilterSelect from "../UI/Filters/FilterSelect.jsx";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";
import { FilterOptionsByPath } from "../utils/FilterOptions.jsx";
import { createMessages } from "../utils/SnackbarMessage";
import styles from "./AlertsPanel.module.scss";

export default function AlertsPanel() {
  const snackbarRef = useRef();
  const { data: alerts = [], isLoading, error } = useAlerts();
    const { filter, setFilter } = useFilter();
  const { loginUser } = useAuth();
  const { isAuthenticated } = useAuth();
  const currentOptions = FilterOptionsByPath["/alerts"] ?? ["All"];

  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    alert: null,
  });

  const closeModal = useCallback(() => {
    setModal({ type: null, alert: null });
  }, []);

  const withSnackbar = useCallback(
    (messages) => ({
      onError: (err) => {
        snackbarRef.current?.show(err?.message || messages.error("Alert"));
      },
      onSuccess: () => {
        snackbarRef.current?.show(messages.success("Alert"));
        closeModal();
      },
    }),
    [closeModal]
  );

  const createAlertsMutation = useCreateAlert(withSnackbar(createMessages));
  const updateAlertMutation = useUpdateAlert(withSnackbar(createMessages));
  const deleteAlertMutation = useDeleteAlert(withSnackbar(createMessages));

  const handleAddClicked = useCallback(() => {
    setModal({ type: "add", alert: null });
  }, []);

  const handleEditClicked = useCallback((alert) => {
    setModal({ type: "edit", alert });
  }, []);

  const handleDeleteClicked = useCallback((alertId) => {
    setModal({ type: "delete", alert: alertId });
  }, []);

  const handleCreate = useCallback(
    (alertData) => {
      if (modal.type === "add") {
        createAlertsMutation.mutate({
          ...alertData,
          source: loginUser?.username,
          createDate: new Date(),
        });
      }
      if (modal.type === "edit") {
        updateAlertMutation.mutate({
          id: modal.alert?.id,
          data: alertData,
        });
      }
      closeModal();
    },
    [
      modal.type,
      modal.alert,
      loginUser?.username,
      createAlertsMutation,
      updateAlertMutation,
      closeModal,
    ]
  );

  const handleDelete = useCallback(() => {
    if (modal.type === "delete" && modal.alert) {
      deleteAlertMutation.mutate(modal.alert);
    }
  }, [modal.type, modal.alert, deleteAlertMutation]);

  const columns = useMemo(
    () => [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      {
        key: "severity",
        label: "severity",
        render: (val) => <Status statusKey={val} />,
      },
      { key: "createDate", label: "Create Date" },
      { key: "source", label: "Source" },
    ],
    []
  );

  const formFields = useMemo(
    () => [
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
        defaultValue: DEFAULT_ALERT_SEVERITY,
        options: ALERT_SEVERITIES,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter alert description",
      },
    ],
    []
  );

  const renderActions = useCallback(
    (alert) => (
      <>
        <ButtonSVG
          icon={<EditIcon />}
          onClick={() => handleEditClicked(alert)}
          disabled={!isAuthenticated}
        />
        <ButtonSVG
          icon={<DeleteIcon />}
          onClick={() => handleDeleteClicked(alert.id)}
          disabled={!isAuthenticated}
        />
      </>
    ),
    [handleEditClicked, handleDeleteClicked, isAuthenticated]
  );

  if (isLoading) return <LoadingSkeleton type="table" rows={10} />;
  if (error) return <Error message={error.message} />;

 
  return (
    <>
      <header className={styles.header}>
        <h2>Alerts</h2>
        <div className={styles.headerActions}>
          <FilterSelect
            options={currentOptions}
            value={filter}
            onChange={setFilter}
          />

        <ActionButton
          onClick={handleAddClicked}
          label="Add"
          disabled={!isAuthenticated}
        />
        </div>
       
      </header>

      <GenericTable
        data={alerts}
        filter={filter}
        filterField="severity"
        columns={columns}
        renderActions={renderActions}
        itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
      />

      <DeleteModal
        isOpen={modal.type === "delete"}
        entity="alert"
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
          onSubmit={handleCreate}
          onCancel={closeModal}
          fields={formFields}
        />
      </Modal>
      <AppSnackbar ref={snackbarRef} />
    </>
  );
}