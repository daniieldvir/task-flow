import { useEffect, useMemo, useState } from "react";
import Pageing from "../UI/Pageing";
import styles from "./GenericTable.module.scss";

export default function GenericTable({
  data,
  columns,
  renderActions,
  itemsPerPage = 10,
  filter = "All",
  filterField,
  emptyMessage = "No data available",
}) {
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (filter === "All") return data;
    return data.filter((item) => item[filterField] === filter);
  }, [data, filter, filterField]);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page, itemsPerPage]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  if (filteredData.length === 0) {
    return <p className={styles.emptyState}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.tableWraper}>
      {/* Header */}
      <div className={`${styles.row} ${styles.headerRow}`}>
        {columns.map((col) => (
          <div
            key={col.key}
            className={`${styles.cell} ${
              col.key === "description" ? styles.descriptionCell : ""
            }`}
          
          >
            {col.label}
          </div>
        ))}
        {renderActions && (
          <div className={styles.cell} style={{ flex: "0 0 120px" }}>
            Actions
          </div>
        )}
      </div>

      {/* Rows */}
      {currentData.map((item) => (
        <div key={item.id} className={styles.row}>
          {columns.map((col) => {
            let content = item[col.key];

            if (col.render) content = col.render(item[col.key], item);
            else if (col.key === "createDate") {
              const date = new Date(item.createDate);
              content = (
                <div>
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              );
            }

            return (
              <div
                key={col.key}
                className={`${styles.cell} ${
                  col.key === "description" ? styles.descriptionCell : ""
                }`}
              >
                {col.key === "description" ? (
                  <div className={styles.description}>{content}</div>
                ) : (
                  content
                )}
              </div>
            );
          })}

          {renderActions && (
            <div
              className={`${styles.cell} ${styles.tableActions}`}
              style={{ flex: "0 0 120px" }}
            >
              {renderActions(item)}
            </div>
          )}
        </div>
      ))}

      {filteredData.length > itemsPerPage && (
        <Pageing
          page={page}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          setPage={setPage}
          className={styles.paging}
        />
      )}
    </div>
  );
}

