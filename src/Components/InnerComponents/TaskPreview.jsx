import styles from "./TaskPreview.module.scss";

export default function TaskPreview({ props }) {
  const statusClassName = props.status.toLowerCase().replace(/\s+/g, "");

  return (
    <div className={styles.taskPreview}>
      <div>
        <p className={styles.taskName}>{props.name}</p>
        <p className={styles.description}>{props.description}</p>
      </div>

      <div className={styles.taskDetails}>
        <p>{props.createDate}</p>
        <p>Author: {props.author}</p>
        <p className={styles[statusClassName]}>{props.status}</p>
      </div>
    </div>
  );
}
