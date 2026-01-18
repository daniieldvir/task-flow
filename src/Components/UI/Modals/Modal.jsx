import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import ButtonSVG from "../Buttons/ButtonSVG";
import styles from "./Modal.module.scss";

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <ButtonSVG icon={<CloseIcon onClick={onClose} />} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
