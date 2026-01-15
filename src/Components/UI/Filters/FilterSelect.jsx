import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./FilterSelect.module.scss";

export default function FilterSelect({ options, value, onChange, label }) {
  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.control}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <ArrowDropDownIcon className={styles.chevron} />
      </div>
    </label>
  );
}
