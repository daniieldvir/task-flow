import styles from "./Filters.module.scss";

export default function Filters({ title, children }) {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
