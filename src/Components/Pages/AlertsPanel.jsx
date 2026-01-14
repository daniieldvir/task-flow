import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import { useData } from "../utils/DataContext";
import styles from "./AlertsPanel.module.scss";

export default function AlertsPanel() {
  const { alerts } = useData();
  return (
    <div className={styles.alertsPanel}>
      <h2>Alerts</h2>
      <ul className={styles.alartList}>
        {alerts.map((alart) => (
          <Card key={alart.id}>
            <DataPreview
              props={alart}
              title={alart.title}
              source={alart.severity}
              statusKey={alart.severity}
            />
          </Card>
        ))}
      </ul>
    </div>
  );
}
