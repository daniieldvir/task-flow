import { memo } from "react";
import styles from "./StatCard.module.scss";

function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <header className={styles.header}>
        {icon}
        <span>{label}</span>
      </header>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

export default memo(StatCard);
