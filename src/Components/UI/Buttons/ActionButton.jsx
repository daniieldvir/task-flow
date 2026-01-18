import styles from "./ActionButton.module.scss";

export default function ActionButton({
  className,
  label,
  type,
  onClick,
  disabled,
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
    </button>
  );
}
