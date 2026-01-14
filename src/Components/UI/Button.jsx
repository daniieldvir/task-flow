import styles from "./Button.module.scss";

export default function Button({ className = styles.button, isActive, label }) {
  return (
    <button className={isActive ? styles.active : className}>
      <span>{label}</span>
    </button>
  );
}
