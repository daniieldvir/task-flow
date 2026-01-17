import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonSVG from "../Buttons/ButtonSVG";
import Status from "../Status";
import styles from "./DataPreview.module.scss";

export default function DataPreview({
  props,
  statusKey,
  source,
  title,
  onEdit,
  onDelete,
}) {
  const formattedDate = new Date(props.createDate).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.dataPreview}>
      <header>
        <div>
          <p className={styles.name}>{title}</p>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.actions}>
          <ButtonSVG icon={<EditIcon onClick={onEdit} />} />
          <ButtonSVG icon={<DeleteIcon onClick={onDelete} />} />
        </div>
      </header>

      <div className={styles.details}>
        <div className={styles.creat}>
          <p>{formattedDate}</p>
          <p> {source}</p>
        </div>
        <Status statusKey={statusKey} />
      </div>
    </div>
  );
}
