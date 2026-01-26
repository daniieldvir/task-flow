import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { memo, useMemo } from "react";
import { useAuth } from "../../../hooks/authContext";
import ButtonSVG from "../../UI/Buttons/ButtonSVG";
import Status from "../../UI/DataDisplay/Status.jsx";
import styles from "./DataPreview.module.scss";

function DataPreview({
  props,
  statusKey,
  source,
  title,
  onEdit,
  onDelete,
}) {
  const { isAuthenticated } = useAuth();

  const formattedDate = useMemo(() => {
    if (!props?.createDate) return "";
    return new Date(props.createDate).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [props?.createDate]);

  return (
    <div className={styles.dataPreview}>
      <header>
        <div>
          <p className={styles.name}>{title}</p>
          <p className={styles.description}>{props.description}</p>
        </div>
        <div className={styles.actions}>
          <ButtonSVG
            icon={<EditIcon />}
            onClick={onEdit}
            disabled={!isAuthenticated}
          />
          <ButtonSVG
            icon={<DeleteIcon />}
            onClick={onDelete}
            disabled={!isAuthenticated}
          />
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

export default memo(DataPreview);
