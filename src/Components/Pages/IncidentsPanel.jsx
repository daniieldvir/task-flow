import { useState } from "react";
import { useIncidents } from "../../apiCalls/hooks/incidents.jsx";
import DataPanel from "../UI/DataDisplay/DataPanel";

export default function IncidentsPanel() {
  const { data: incidents = [], isLoading, error } = useIncidents();
  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <DataPanel
      data={incidents}
      filter={filterStatus}
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
