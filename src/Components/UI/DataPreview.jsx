import styles from "./DataPreview.module.scss";
import Status from "./Status";

export default function DataPreview({ props, statusKey, source, title }) {
  const formattedDate = new Date(props.createDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.dataPreview}>
      <div>
        <p className={styles.name}>{title}</p>
        <p className={styles.description}>{props.description}</p>
      </div>

      <div className={styles.details}>
        <p>{formattedDate}</p>
        <p> {source}</p>
        <Status statusKey={statusKey} />
      </div>
    </div>
  );
}
