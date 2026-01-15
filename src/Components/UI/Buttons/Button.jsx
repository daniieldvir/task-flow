import styles from "./Button.module.scss";

export default function Button({
  className = styles.button,
  isActive,
  label,
  onClick,
}) {
  return (
    <button className={isActive ? styles.active : className} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}
