import { useData } from "../utils/DataContext";
import DataPanel from "./DataPanel";

export default function AlertsPanel() {
  const { alerts, filter } = useData();

  return (
    <DataPanel
      data={alerts}
      filter={filter}
      filterField="severity"
      titleField="title"
      sourceField="severity"
      emptyMessage="No Alerts"
      panelTitle="Alerts"
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
