import UserAvater from "../UI/UserAvater";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.left}>
        <div className={styles.logo}>TaskFlow</div>
        <span className={styles.subtitle}>
          Lightweight Task Management Tool
        </span>
      </div>

      <UserAvater />
    </header>
  );
}
