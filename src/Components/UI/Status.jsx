import styles from "./Status.module.scss";

export default function Status({ statusKey }) {
  const statusClassName = statusKey.toLowerCase().replace(/\s+/g, "");
  return (
    <p className={`${styles.status} ${styles[statusClassName]}`}>{statusKey}</p>
  );
}
