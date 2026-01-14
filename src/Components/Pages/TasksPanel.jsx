import tasks from "../../assets/json/tasks.json";
import TaskPreview from "../InnerComponents/TaskPreview";
import Card from "../UI/Card";
import styles from "./TasksPanel.module.scss";

export default function TasksPanel() {
  return (
    <div className={styles.tasksPanel}>
      <h2>Tasks</h2>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <TaskPreview props={task} />
          </Card>
        ))}
      </ul>
    </div>
  );
}
