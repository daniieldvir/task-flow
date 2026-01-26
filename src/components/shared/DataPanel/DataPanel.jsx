import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../../hooks/authContext";
import { useDynamicItemsPerPage } from "../../../hooks/useDynamicItemsPerPage";
import ActionButton from "../../UI/Buttons/ActionButton";
import Card from "../../UI/DataDisplay/Card.jsx";
import Pagination from "../../UI/Navigation/Pagination.jsx";
import DataPreview from "../DataPreview/DataPreview";
import styles from "./DataPanel.module.scss";

export default function DataPanel({
  data,
  filter,
  filterField,
  titleField,
  sourceField,
  emptyMessage,
  panelTitle,
  onAdd,
  onEdit,
  onDelete,
  initialPage = 1,
  itemsPerPage: fixedItemsPerPage = null, // null = auto-calculate
}) {
  const [page, setPage] = useState(initialPage);
  const { isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  const listContainerRef = useRef(null);

  // Calculate dynamic items per page if not fixed
  const dynamicItemsPerPage = useDynamicItemsPerPage({
    containerRef: listContainerRef, // Use the list container for more accurate measurement
    estimatedCardHeight: 180,
    estimatedCardWidth: 300,
    gap: 10,
    headerHeight: 60, // Reduced since header is separate
    paginationHeight: 50,
    minItems: 6,
    maxItems: 50, // Reduced to ensure pagination shows
  });

  // Use fixed itemsPerPage if provided, otherwise use dynamic calculation
  const itemsPerPage = fixedItemsPerPage ?? dynamicItemsPerPage;

  const filteredData = useMemo(
    () =>
      filter === "All"
        ? data
        : data.filter((item) => item[filterField] === filter),
    [data, filter, filterField]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData.length, itemsPerPage]
  );

  // Reset to page 1 when itemsPerPage changes
  useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  // Get only items for current page
  const pagedData = useMemo(
    () =>
      filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredData, page, itemsPerPage]
  );

  return (
    <div className={styles.panel} ref={containerRef}>
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
        <div className={styles.listContiner} ref={listContainerRef}>
          <ul className={styles.list}>
            {pagedData.map((item) => (
              <Card key={item.id}>
                <DataPreview
                  props={item}
                  title={item[titleField]}
                  source={item[sourceField]}
                  statusKey={item[filterField]}
                  onEdit={onEdit ? onEdit.bind(null, item) : undefined}
                  onDelete={onDelete ? onDelete.bind(null, item.id) : undefined}
                />
              </Card>
            ))}
          </ul>

          {filteredData.length > itemsPerPage && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              className={styles.paging}
            />
          )}
        </div>
      )}
    </div>
  );
}