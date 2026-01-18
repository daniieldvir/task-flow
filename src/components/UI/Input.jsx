import styles from "./Input.module.scss";

export default function Input({ field, value, handleChange, type }) {
  if (type === "textarea") {
    return (
      <textarea
        id={field.name}
        rows={field.rows ?? 4}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => handleChange(field.name, e.target.value)}
        className={styles.input}
      />
    );
  }

  return (
    <input
      id={field.name}
      type={type || "text"}
      placeholder={field.placeholder}
      value={value}
      onChange={(e) => handleChange(field.name, e.target.value)}
      className={styles.input}
    />
  );
}
