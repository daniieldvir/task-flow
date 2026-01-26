import { memo } from "react";
import styles from "./ButtonSVG.module.scss";

function ButtonSVG({ className, icon, onClick, disabled }) {
  return (
    <button
      className={`${styles.buttonSVG} ${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}

export default memo(ButtonSVG);
