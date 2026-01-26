import styles from "./Error.module.scss";

 function Error({ message }) {
  return <div className={styles.error}>{message}</div>;
}

export default Error;
