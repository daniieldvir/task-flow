import tasks from "../../assets/json/tasks.json";
import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import styles from "./TasksPanel.module.scss";

export default function TasksPanel() {
  return (
    <div className={styles.tasksPanel}>
      <h2>Tasks</h2>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <DataPreview props={task} statusKey={task.status} />
          </Card>
        ))}
      </ul>
    </div>
  );
}
