import styles from "./UserAvater.module.scss";

export default function UserAvater() {
  return (
    <div className={styles.appUserChip}>
      <span className={styles.avatar}>A</span>
      <span className={styles.userInfo}>
        <span className={styles.userName}>Admin</span>
        <span className={styles.userRole}>Incident Manager</span>
      </span>
    </div>
  );
}
