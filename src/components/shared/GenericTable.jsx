import { useMemo, useState } from "react";
import Pageing from "../UI/Pageing";
import styles from "./GenericTable.module.scss";

export default function GenericTable({
  data,
  columns,
  renderActions,
  itemsPerPage = 10,
}) {
  const [page, setPage] = useState(1);
  console.log("data", data);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page, itemsPerPage]);

  return (
    <div className={styles.tableWraper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => {
                let content = item[col.key];

                if (col.render) {
                  content = col.render(item[col.key], item);
                } else if (col.key === "description") {
                  content = <div className={styles.description}>{content}</div>;
                } else if (col.key === "createDate") {
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

                return <td key={col.key}>{content}</td>;
              })}

              {renderActions && (
                <td>
                  <div className={styles.tableActions}>
                    {renderActions(item)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pageing
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          className={styles.paging}
        />
      )}
    </div>
  );
}
