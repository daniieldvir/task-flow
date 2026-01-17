import ActionButton from "../Buttons/ActionButton";
import Card from "../Cards/Card";
import styles from "./DataPanel.module.scss";
import DataPreview from "./DataPreview";

export default function DataPanel({
  data,
  filter,
  filterField, // "status" or "severity"
  titleField, // "name" or "title"
  sourceField, // "status", "reportedBy", or "severity"
  emptyMessage,
  panelTitle,
  onAdd,
  onEdit,
  onDelete,
}) {
  const filteredData =
    filter === "All"
      ? data
      : data.filter((item) => item[filterField] === filter);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>{panelTitle}</h2>
        {onAdd && <ActionButton onClick={onAdd} label="Add" />}
      </div>

      {filteredData.length === 0 ? (
        <p className={styles.emptyState}>{emptyMessage}</p>
      ) : (
        <ul className={styles.list}>
          {filteredData.map((item) => (
            <Card key={item.id}>
              <DataPreview
                props={item}
                title={item[titleField]}
                source={item[sourceField]}
                statusKey={item[filterField]}
                onEdit={onEdit ? () => onEdit(item) : undefined}
                onDelete={onDelete ? () => onDelete(item.id) : undefined}
              />
            </Card>
          ))}
        </ul>
      )}
    </div>
  );
}
