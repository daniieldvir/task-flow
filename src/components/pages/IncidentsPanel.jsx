import { useState } from "react";
import {
  useCreateIncidents,
  useDeleteIncidents,
  useIncidents,
  useUpdateIncidents,
} from "../../hooks/incidents";
import { useFilter } from "../../hooks/useFilter";
import AddForm from "../UI/AddForm";
import DataPanel from "../UI/DataDisplay/DataPanel";
import DeleteModal from "../UI/Modals/DeleteModal";
import Modal from "../UI/Modals/Modal";

export default function IncidentsPanel() {
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { filter } = useFilter();

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState(null);

  const createIncidentsMutation = useCreateIncidents();
  const updateIncidentsMutation = useUpdateIncidents();
  const deleteIncidentsMutation = useDeleteIncidents();

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

  const handleDelete = async () => {
    deleteIncidentsMutation.mutate(incidentToDelete);
    setIsDeleteModalOpen(false);
    setIncidentToDelete(null);
  };

  const handleCancel = async () => {
    setIsAddEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIncidentsToEdit(null);
    setIncidentsToDelete(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const addEditTitelModal = !!incidentToEdit
    ? "edit incident"
    : "create new incident";

  return (
    <>
      <DataPanel
        data={incidents}
        filter={filter}
        filterField="severity"
        titleField="title"
        sourceField="reportedBy"
        emptyMessage="No incidents"
        panelTitle="Incidents"
        onAdd={handleAddClicked}
        onEdit={(incident) => handleEditClicked(incident)}
        onDelete={(incident) => handleDeleteClicked(incident)}
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
              placeholder: "Enter incident description",
            },
          ]}
        />
      </Modal>
    </>
  );
}
