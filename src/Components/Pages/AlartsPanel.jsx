import { useLoaderData } from "react-router-dom";
import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import styles from "./AlartsPanel.module.scss";

export default function AlartsPanel() {
  const alarts = useLoaderData() ?? [];
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
