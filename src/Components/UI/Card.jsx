import styles from "./Card.module.scss";

const Card = (props) => {
  return <div className={styles.Card}>{props.children} </div>;
};

export default Card;
