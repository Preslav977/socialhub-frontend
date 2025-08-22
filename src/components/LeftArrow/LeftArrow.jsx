import { Link } from "react-router-dom";
import styles from "./LeftArrow.module.css";

export function LeftArrow({ textProp }) {
  return (
    <div className={styles.leftArrowFlexContainer}>
      <Link className={styles.leftArrowImgContainer} to={"/home"}>
        <img
          className={styles.leftArrowSVG}
          src="./left-arrow.svg"
          alt="go back to home"
        />
      </Link>
      <p>{textProp}</p>
    </div>
  );
}
