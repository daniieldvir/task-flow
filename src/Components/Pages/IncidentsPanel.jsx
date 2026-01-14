import incidents from "../../assets/json/incidents.json";
import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import styles from "./IncidentsPanel.module.scss";

export default function IncidentsPanel() {
  return (
    <div className={styles.incidentPanel}>
      <h2>Incidents</h2>
      <ul className={styles.incidentList}>
        {incidents.map((incident) => (
          <Card key={incident.id}>
            <DataPreview
              props={incident}
              title={incident.title}
              source={incident.reportedBy}
              statusKey={incident.severity}
            />
          </Card>
        ))}
      </ul>
    </div>
  );
}
