import { useState } from "react";
import { useAuth } from "../../../hooks/authContext";
import ActionButton from "../Buttons/ActionButton";
import Card from "../Cards/Card";
import Pageing from "../Pageing";
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
  initialPage = 1,
  itemsPerPage = 10, // optional default page size
}) {
  const [page, setPage] = useState(initialPage);
  const { isAuthenticated } = useAuth();

  const filteredData =
    filter === "All"
      ? data
      : data.filter((item) => item[filterField] === filter);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get only items for current page
  const pagedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>{panelTitle}</h2>
        {onAdd && (
          <ActionButton
            onClick={onAdd}
            label="Add"
            disabled={!isAuthenticated}
          />
        )}
      </div>

      {filteredData.length === 0 ? (
        <p className={styles.emptyState}>{emptyMessage}</p>
      ) : (
        <div className={styles.listContiner}>
          <ul className={styles.list}>
            {pagedData.map((item) => (
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

          <Pageing
            className={styles.paging}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}
