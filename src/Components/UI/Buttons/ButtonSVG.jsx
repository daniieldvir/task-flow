import styles from "./ButtonSVG.module.scss";

export default function ButtonSVG({ className, icon, onClick, disabled }) {
  return (
    <button
      className={`${styles.buttonSVG} ${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled && icon}
    </button>
  );
}
