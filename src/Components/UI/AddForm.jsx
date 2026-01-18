import { useState } from "react";
import { useAuth } from "../../hooks/authContext";
import styles from "./AddForm.module.scss";
import ActionButton from "./Buttons/ActionButton";
import FilterSelect from "./Filters/FilterSelect";
import Input from "./Input";

export default function AddForm({
  fields,
  initialData = {},
  onSubmit,
  onCancel,
}) {
  const { isAuthenticated } = useAuth();

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
          {field.type === "select" ? (
            <FilterSelect
              label={field.label}
              options={field.options}
              value={formData[field.name] ?? ""}
              onChange={(value) => handleChange(field.name, value)}
            />
          ) : (
            <>
              <label htmlFor={field.name}>{field.label}</label>
              {(field.type === "text" || field.type === "textarea") && (
                <Input
                  field={field}
                  type={field.type === "text" ? "text" : "textarea"}
                  value={formData[field.name] ?? ""}
                  handleChange={handleChange}
                />
              )}
            </>
          )}
        </div>
      ))}

      <div className={styles.actions}>
        <ActionButton
          label="Cancel"
          type="button"
          onClick={onCancel}
          disabled={!isAuthenticated}
        />
        <ActionButton
          label="Submit"
          type="submit"
          disabled={!isAuthenticated}
        />
      </div>
    </form>
  );
}
