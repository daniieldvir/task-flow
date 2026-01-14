import Card from "../UI/Card";
import DataPreview from "../UI/DataPreview";
import { useData } from "../utils/DataContext";
import styles from "./TasksPanel.module.scss";

export default function TasksPanel() {
  const { tasks } = useData();

  return (
    <div className={styles.tasksPanel}>
      <h2>Tasks</h2>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <DataPreview
              props={task}
              title={task.name}
              source={task.status}
              statusKey={task.status}
            />
          </Card>
        ))}
      </ul>
    </div>
  );
}
