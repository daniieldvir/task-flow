import { useData } from "../utils/DataContext";
import DataPanel from "./DataPanel";

export default function IncidentsPanel() {
  const { incidents, filter } = useData();

  return (
    <DataPanel
      data={incidents}
      filter={filter}
      filterField="severity"
      titleField="title"
      sourceField="severity"
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
