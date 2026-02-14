import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  DEFAULT_INCIDENT_PRIORITY,
  DEFAULT_ITEMS_PER_PAGE,
  INCIDENT_PRIORITIES,
} from "../../constants/config.js";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateIncidents,
  useDeleteIncidents,
  useIncidents,
  useUpdateIncidents,
} from "../../hooks/incidents";
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
import styles from "./IncidentsPanel.module.scss";

export default function IncidentsPanel() {
  const snackbarRef = useRef();
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { isAuthenticated } = useAuth();
  const { filter, setFilter } = useFilter();
  const { loginUser } = useAuth();
    const currentOptions = FilterOptionsByPath["/incidents"] ?? ["All"];


  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    incident: null,
  });

  const closeModal = useCallback(() => {
    setModal({ type: null, incident: null });
  }, []);

  const withSnackbar = useCallback(
    (messages) => ({
      onError: (err) => {
        snackbarRef.current?.show(err?.message || messages.error("Incident"));
      },
      onSuccess: () => {
        snackbarRef.current?.show(messages.success("Incident"));
        closeModal();
      },
    }),
    [closeModal]
  );

  const createIncidentsMutation = useCreateIncidents(
    withSnackbar(createMessages),
  );
  const updateIncidentsMutation = useUpdateIncidents(
    withSnackbar(createMessages),
  );
  const deleteIncidentsMutation = useDeleteIncidents(
    withSnackbar(createMessages),
  );

  const handleAddClicked = useCallback(() => {
    setModal({ type: "add", incident: null });
  }, []);

  const handleEditClicked = useCallback((incident) => {
    setModal({ type: "edit", incident });
  }, []);

  const handleDeleteClicked = useCallback((incidentId) => {
    setModal({ type: "delete", incident: incidentId });
  }, []);

  const handleCreate = useCallback(
    (incidentData) => {
      if (modal.type === "add") {
        createIncidentsMutation.mutate({
          ...incidentData,
          reportedBy: loginUser?.username,
          createDate: new Date(),
        });
      }
      if (modal.type === "edit") {
        updateIncidentsMutation.mutate({
          id: modal.incident?.id,
          data: incidentData,
        });
      }
      closeModal();
    },
    [
      modal.type,
      modal.incident,
      loginUser?.username,
      createIncidentsMutation,
      updateIncidentsMutation,
      closeModal,
    ]
  );

  const handleDelete = useCallback(() => {
    if (modal.type === "delete" && modal.incident) {
      deleteIncidentsMutation.mutate(modal.incident);
    }
  }, [modal.type, modal.incident, deleteIncidentsMutation]);

  const columns = useMemo(
    () => [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
      {
        key: "priority",
        label: "Priority",
        render: (val) => <Status statusKey={val} />,
      },
      { key: "createDate", label: "Create Date" },
      { key: "reportedBy", label: "Reported By" },
    ],
    []
  );

  const formFields = useMemo(
    () => [
      {
        name: "title",
        label: "Incident Name",
        type: "text",
        required: true,
        placeholder: "Enter incident name",
      },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        defaultValue: DEFAULT_INCIDENT_PRIORITY,
        options: INCIDENT_PRIORITIES,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter incident description",
      },
    ],
    []
  );

  const renderActions = useCallback(
    (incident) => (
      <>
        <ButtonSVG
          icon={<EditIcon />}
          onClick={() => handleEditClicked(incident)}
          disabled={!isAuthenticated}
        />
        <ButtonSVG
          icon={<DeleteIcon />}
          onClick={() => handleDeleteClicked(incident.id)}
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
        <h2>Incidents</h2>
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
        data={incidents}
        filter={filter}
        filterField="priority"
        columns={columns}
        renderActions={renderActions}
        itemsPerPage={DEFAULT_ITEMS_PER_PAGE}
      />

      <DeleteModal
        isOpen={modal.type === "delete"}
        entity="incident"
        onClose={closeModal}
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={modal.type === "add" || modal.type === "edit"}
        title={modal.type === "edit" ? "edit incident" : "create new incident"}
        onClose={closeModal}
      >
        <AddForm
          initialData={modal.incident || {}}
          onSubmit={handleCreate}
          onCancel={closeModal}
          fields={formFields}
        />
      </Modal>

      <AppSnackbar ref={snackbarRef} />
    </>
  );
}
