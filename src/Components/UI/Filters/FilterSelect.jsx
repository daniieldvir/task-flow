import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./FilterSelect.module.scss";

export default function FilterSelect({ options, value, onChange, label }) {
  // Helper function to get option value
  const getOptionValue = (opt) => {
    if (typeof opt === "string") return opt;
    if (typeof opt === "object" && opt !== null) {
      return opt.value || opt.label || String(opt);
    }
    return String(opt);
  };

  // Helper function to get option label for display
  const getOptionLabel = (opt) => {
    if (typeof opt === "string") return opt;
    if (typeof opt === "object" && opt !== null) {
      return opt.label || opt.value || String(opt);
    }
    return String(opt);
  };

  return (
    <label className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.control}>
        <select
          className={styles.select}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((opt, index) => {
            const optionValue = getOptionValue(opt);
            const optionLabel = getOptionLabel(opt);
            return (
              <option key={optionValue || index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>

        <ArrowDropDownIcon className={styles.chevron} />
      </div>
    </label>
  );
}
