import { memo, useMemo } from "react";
import styles from "./Status.module.scss";

function Status({ statusKey }) {
  const statusClassName = useMemo(
    () => statusKey?.toLowerCase().replace(/\s+/g, "") || "",
    [statusKey]
  );

  return (
    <p className={`${styles.status} ${styles[statusClassName]}`}>{statusKey}</p>
  );
}

export default memo(Status);
