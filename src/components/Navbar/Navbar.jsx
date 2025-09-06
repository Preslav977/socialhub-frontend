import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { id, profile_picture } = userLogIn;

  return (
    <nav className={styles.navbarContainer}>
      <ul className={styles.leftSideFlexUlContainer}>
        <Link className={styles.homeLinkContainer} to="/">
          <img
            className={styles.homeLinkImage}
            src="/socialhub.png"
            alt="socialhub logo"
          />
          <h2 className={styles.homeLinkPara}>SocialHub</h2>
        </Link>
      </ul>

      <ul className={styles.rightSideFlexUlContainer}>
        <Link className={styles.userProfileLinkContainer} to={`/profile/${id}`}>
          <img
            className={styles.userProfilePictureImg}
            src={profile_picture ? profile_picture : "/default-profile-pfp.png"}
            alt="user profile picture"
          />
        </Link>
      </ul>
    </nav>
  );
}
