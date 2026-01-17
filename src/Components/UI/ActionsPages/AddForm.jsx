import { useState } from "react";
import ActionButton from "../Buttons/ActionButton";
import styles from "./AddForm.module.scss";

export default function AddForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
}) {
  // Initialize formData once from initialData and field defaults
  const [formData, setFormData] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.name] = initialData[field.name] ?? field.defaultValue ?? "";
      return acc;
    }, {})
  );

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label htmlFor={field.name}>{field.label}</label>

          {field.type === "select" && (
            <select
              id={field.name}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "textarea" && (
            <textarea
              id={field.name}
              rows={field.rows ?? 4}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}

          {field.type === "text" && (
            <input
              id={field.name}
              type="text"
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.name] ?? ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className={styles.actions}>
        <ActionButton label="Cancel" type="button" onClick={onCancel} />
        <ActionButton label="Submit" type="submit" />
      </div>
    </form>
  );
}
