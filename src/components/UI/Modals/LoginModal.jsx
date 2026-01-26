import { useState } from "react";
import { createPortal } from "react-dom";
import ActionButton from "../Buttons/ActionButton";
import Input from "../Inputs/Input.jsx";
import styles from "./LoginModal.module.scss";

export default function LoginModal({ isOpen, onClose, onConfirm, error }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      onConfirm(formData);
      setFormData({ username: "", password: "" });
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <form className={styles.loginModal} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h3>Login</h3>
      </div>

      <div className={styles.field}>
        <label>name</label>
        <Input
          type="text"
          field={{ name: "username" }}
          value={formData.username}
          handleChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label>password</label>
        <Input
          type="password"
          field={{ name: "password" }}
          value={formData.password}
          handleChange={handleChange}
        />
      </div>

      {error && <div className={styles.error}>Error: Wrong info</div>}

      <div className={styles.actions}>
        <ActionButton
          type="submit"
          label="Login"
          className={styles.confirmBtn}
        />
        <ActionButton onClick={onClose} label="Cancel" />
      </div>
    </form>
  );

  return createPortal(modalContent, document.body);
}
