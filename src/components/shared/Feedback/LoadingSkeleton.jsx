import styles from "./LoadingSkeleton.module.scss";

export default function LoadingSkeleton({
  type = "table",
  rows = 5,
  count = 1,
}) {
  if (type === "table") {
    return (
      <div className={styles.tableSkeleton}>
        <div className={styles.headerRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.headerCell} />
          ))}
        </div>

        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.cell} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className={styles.cardSkeletonList}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.cardSkeleton}>
            <div className={styles.cardHeader} />
            <div className={styles.cardContent}>
              <div className={styles.cardLine} />
              <div className={styles.cardLine} />
              <div className={styles.cardLineShort} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle} />
    </div>
  );
}
