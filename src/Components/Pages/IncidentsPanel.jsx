import { useIncidents } from "../../hooks/incidents.jsx";
import { useFilter } from "../../hooks/useFilter";
import DataPanel from "../UI/DataDisplay/DataPanel";

export default function IncidentsPanel() {
  const { data: incidents = [], isLoading, error } = useIncidents();
  const { filter } = useFilter();

  return (
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
  );
}
