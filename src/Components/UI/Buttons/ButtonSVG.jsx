import styles from "./ButtonSVG.module.scss";

export default function ButtonSVG({ className, icon, onClick, disabled }) {
  return (
    <button
      className={`${styles.buttonSVG} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
