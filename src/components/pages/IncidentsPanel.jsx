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
import styles from "./IncidentsPanel.module.scss";

export default function IncidentsPanel() {
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { isAuthenticated } = useAuth();

  console.log("incidents", incidents);
  const { filter } = useFilter();
  const { loginUser } = useAuth();
  const snackbarRef = useRef();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);

  const createIncidentsMutation = useCreateIncidents();
  const updateIncidentsMutation = useUpdateIncidents();
  const deleteIncidentsMutation = useDeleteIncidents({
    onError: (err) => {
      snackbarRef.current.show(err?.message || "Something went wrong");
    },
    onSuccess: () => {
      snackbarRef.current.show("Incident deleted successfully");
      setIncidentToDelete(null);
      setIsDeleteModalOpen(false);
    },
  });

  const handleAddClicked = async () => {
    setIncidentToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClicked = async (incident) => {
    setIncidentToEdit(incident);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClicked = async (id) => {
    setIncidentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCreate = async (incidentData) => {
    if (!incidentToEdit) {
      createIncidentsMutation.mutate({
        ...incidentData,
        reportedBy: loginUser.username,
        createDate: new Date(),
      });
    } else {
      updateIncidentsMutation.mutate({
        id: incidentToEdit.id,
        data: incidentData,
      });
    }
    setIsAddEditModalOpen(false);
    setIncidentToEdit(null);
  };

  const handleDelete = () => {
    if (incidentToDelete) {
      deleteIncidentsMutation.mutate(incidentToDelete);
    }
  };

  const handleCancel = async () => {
    setIsAddEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIncidentToEdit(null);
    setIncidentToDelete(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addEditTitelModal = !!incidentToEdit
    ? "edit incident"
    : "create new incident";

  return (
    <>
      <header className={styles.header}>
        <h2>Incident</h2>
        <ActionButton
          onClick={handleAddClicked}
          label="Add"
          disabled={!isAuthenticated}
        />
      </header>

      <GenericTable
        data={incidents}
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
        isOpen={isDeleteModalOpen}
        onClose={handleCancel}
        entity="incident"
        onConfirm={handleDelete}
      />

      <Modal
        isOpen={isAddEditModalOpen}
        onClose={handleCancel}
        title={addEditTitelModal}
      >
        <AddForm
          initialData={incidentToEdit || {}}
          onSubmit={handleCreate}
          onCancel={handleCancel}
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
