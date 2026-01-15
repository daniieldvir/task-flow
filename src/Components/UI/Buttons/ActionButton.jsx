import styles from "./ActionButton.module.scss";

export default function ActionButton({
  className = styles.button,
  label,
  onClick,
}) {
  return (
    <button className={className} onClick={onClick}>
      <span>{label}</span>
    </button>
  );
}
