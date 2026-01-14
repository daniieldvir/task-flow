import alarts from "../../assets/json/alarts.json";
import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import styles from "./AlartsPanel.module.scss";

export default function AlartsPanel() {
  return (
    <div className={styles.alartsPanel}>
      <h2>Alarts</h2>
      <ul className={styles.alartList}>
        {alarts.map((alart) => (
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
