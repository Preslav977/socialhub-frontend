import { Link } from "react-router-dom";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import styles from "./Settings.module.css";

export function Settings() {
  return (
    <div className={styles.settingsFlexWrapper}>
      <LeftArrow textProp={"Settings"} />
      <p className={styles.accountPara}>Account</p>
      <Link
        onClick={() => localStorage.clear()}
        to={"/login"}
        className={styles.settingsFlexContainer}
      >
        <img className={styles.logoutSVG} src="./logout.svg" alt="logout" />
        <p>Logout</p>
      </Link>
    </div>
  );
}
