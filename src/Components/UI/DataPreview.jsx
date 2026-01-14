import styles from "./DataPreview.module.scss";
import Status from "./Status";

export default function DataPreview({ props, statusKey, source, title }) {
  return (
    <div className={styles.dataPreview}>
      <div>
        <p className={styles.name}>{title}</p>
        <p className={styles.description}>{props.description}</p>
      </div>

      <div className={styles.details}>
        <p>{props.createDate}</p>
        <p> {source}</p>
        <Status statusKey={statusKey} />
      </div>
    </div>
  );
}
