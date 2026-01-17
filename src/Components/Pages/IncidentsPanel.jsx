import { useIncidents } from "../../hooks/incidents.jsx";
import { useFilter } from "../../hooks/useFilter";
import DataPanel from "../UI/DataDisplay/DataPanel";

export default function IncidentsPanel() {
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { filter } = useFilter();

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
        onAdd={() => {
          /* add task */
        }}
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
        entity="Incidents"
      >
        <AddForm
          initialData={alertInAction}
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
