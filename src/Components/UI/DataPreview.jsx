import styles from "./DataPreview.module.scss";
import Status from "./Status";

export default function DataPreview({ props, statusKey }) {
  return (
    <div className={styles.dataPreview}>
      <div>
        <p className={styles.name}>{props.name ?? props.title}</p>
        <p className={styles.description}>{props.description}</p>
      </div>

      <div className={styles.details}>
        <p>{props.createDate}</p>
        <p> {props.author ?? props.source}</p>

        <Status statusKey={statusKey} />
      </div>
    </div>
  );
}
