import styles from "./DeleteModal.module.scss";
import Modal from "./Modal";

export default function DeleteModal({ isOpen, onClose, entity, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${entity}?`}>
      <div className={styles.content}>
        <p>Are you sure you want to delete this {entity.toLowerCase()}?</p>
        <div className={styles.actions}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Delete
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
