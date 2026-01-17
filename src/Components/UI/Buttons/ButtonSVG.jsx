import styles from "./ButtonSVG.module.scss";

export default function ButtonSVG({ className, icon, onClick }) {
  return (
    <button className={`${styles.buttonSVG} ${className}`} onClick={onClick}>
      {icon}
    </button>
  );
}
