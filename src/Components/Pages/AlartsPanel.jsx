import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import { useData } from "../utils/DataContext";
import styles from "./AlartsPanel.module.scss";

export default function AlartsPanel() {
  const { alerts } = useData();
  return (
    <div className={styles.alartsPanel}>
      <h2>Alarts</h2>
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
