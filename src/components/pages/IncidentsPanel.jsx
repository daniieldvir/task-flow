import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/authContext";
import {
  useCreateIncidents,
  useDeleteIncidents,
  useIncidents,
  useUpdateIncidents,
} from "../../hooks/incidents";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../shared/AddForm";
import GenericTable from "../shared/GenericTable";
import AppSnackbar from "../shared/Snackbar";
import ActionButton from "../UI/Buttons/ActionButton";
import ButtonSVG from "../UI/Buttons/ButtonSVG";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";
import Status from "../UI/Status";
import { creatMessages } from "../utils/SnackbarMessage";
import styles from "./IncidentsPanel.module.scss";

export default function IncidentsPanel() {
  const snackbarRef = useRef();
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { isAuthenticated } = useAuth();

  const { filter } = useFilter();
  const { loginUser } = useAuth();

  const [modal, setModal] = useState({
    type: null, // 'add' | 'edit' | 'delete'
    incident: null,
  });

  const withSnackbar = (messages) => ({
    onError: (err) => {
      snackbarRef.current.show(err?.message || messages.error("Incident"));
    },
    onSuccess: () => {
      snackbarRef.current.show(messages.success("Incident"));
      closeModal();
    },
  });

  const createIncidentsMutation = useCreateIncidents(
    withSnackbar(creatMessages),
  );
  const updateIncidentsMutation = useUpdateIncidents(
    withSnackbar(creatMessages),
  );
  const deleteIncidentsMutation = useDeleteIncidents(
    withSnackbar(creatMessages),
  );

  const handleAddClicked = async () => {
    setModal({ type: "add", incident: null });
  };

  const handleEditClicked = async (incident) => {
    setModal({ type: "edit", incident });
  };

  const handleDeleteClicked = async (incidentId) => {
    setModal({ type: "delete", incident: incidentId });
  };

  const handleCreate = async (incidentData) => {
    if (modal.type === "add") {
      createIncidentsMutation.mutate({
        ...incidentData,
        reportedBy: loginUser.username,
        createDate: new Date(),
      });
    }
    if (modal.type === "edit") {
      updateIncidentsMutation.mutate({
        id: modal.incident.id,
        data: incidentData,
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modal.type === "delete" && modal.incident) {
      deleteIncidentsMutation.mutate(modal.incident);
    }
  };

  const closeModal = async () => {
    setModal({ type: null, incident: null });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <header className={styles.header}>
        <h2>Incidents</h2>
        <ActionButton
          onClick={handleAddClicked}
          label="Add"
          disabled={!isAuthenticated}
        />
      </header>

      <GenericTable
        data={incidents}
        filter={filter}
        filterField="priority"
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          {
            key: "priority",
            label: "Priority",
            render: (val) => <Status statusKey={val} />,
          },
          { key: "createDate", label: "Create Date" },
          { key: "reportedBy", label: "Reported By" },
        ]}
        renderActions={(incident) => (
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
        )}
        itemsPerPage={10}
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
          fields={[
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
              defaultValue: "Low",
              options: [
                { label: "Low", value: "Low" },
                { label: "Warning", value: "Warning" },
                { label: "Critical", value: "Critical" },
              ],
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
              placeholder: "Enter incident description",
            },
          ]}
        />
      </Modal>

      <AppSnackbar ref={snackbarRef} />
    </>
  );
}
