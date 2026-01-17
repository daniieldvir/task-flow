import styles from "./ActionButton.module.scss";

export default function ActionButton({
  className = styles.button,
  label,
  type,
  onClick,
}) {
  return (
    <button type={type} className={className} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}
