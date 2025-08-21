import styles from "./LeftArrow.module.css";

export function LeftArrow({ textProp }) {
  return (
    <div className={styles.leftArrowFlexContainer}>
      <img
        className={styles.leftArrowSVG}
        src="./left-arrow.svg"
        alt="go back to home"
      />

      <p>{textProp}</p>
    </div>
  );
}
