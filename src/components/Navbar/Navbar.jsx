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
        <Link className={styles.homeLinkContainer} to="/home">
          <img
            className={styles.homeLinkImage}
            src="/socialhub.png"
            alt="socialhub logo"
          />
          <p className={styles.homeLinkPara}>SocialHub</p>
        </Link>
      </ul>

      <ul className={styles.rightSideFlexUlContainer}>
        <Link className={styles.userProfileLinkContainer} to={`/profile/${id}`}>
          {profile_picture === "" ? (
            <img
              className={styles.userDefaultProfileImg}
              src="/user-default-pfp.jpg"
              alt="user default profile picture"
            />
          ) : (
            <img
              className={styles.userProfilePictureImg}
              src={profile_picture}
              alt="user profile picture"
            />
          )}
        </Link>
      </ul>
    </nav>
  );
}
